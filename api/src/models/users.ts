import { ObjectId } from "mongodb";
import { collections } from "../services/database.services";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { environment, secret } from "../environments/environments";
import BlackListToken from "./blacklist_token.model";
import bcrypt from 'bcrypt';

export interface CustomRequest extends Request {
    token: string | JwtPayload
}

export default class Users {
    constructor(
        public email: string,
        public password: string,
        public registered_on: Date,
        public is_active: boolean,
        public is_admin: boolean,
        public nickname: string,
        public name: string,
        public surname: string,
        public status: string,
        public language: string,
        public main_image?: string,
        public _id?: ObjectId
    ) { }

    static encode_auth_token(id: string) {
        const token = jwt.sign({ _id: id }, secret, { expiresIn: '2 days', })
        return token
    }

    static async decode_auth_token(token: string) {
        try {
            var decoded = jwt.verify(token, secret)
            const is_blacklisted = await BlackListToken.check_blacklist(token)
            if (is_blacklisted) {
                return 'Token blacklisted. Please log in again.'
            } else {
                // @ts-ignore
                return decoded.id
            }
        } catch (error) {
            console.warn(error)
        }
    }
}