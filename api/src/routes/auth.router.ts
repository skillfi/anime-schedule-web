import { Request, Response, Router, json, urlencoded } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.services";
import Users from "../models/users";
import bcrypt from 'bcrypt';
import Tools from "../tools";

export const api_auth = Router();

api_auth.use(urlencoded({ extended: false }))

api_auth.post("/register", async (req: Request, res: Response) => {
    try {
        const body = req.body
        const password = await bcrypt.hash(body.password, 8)
        const User = new Users(
            body.email,
            password,
            new Date,
            true,
            false,
            body.nickname,
            body.name,
            body.surname,
            'used',
            'en')
        // @ts-ignore
        const current = await collections.users?.findOne({ email: body.email })
        if (current) {
            const response = {
                errors: 'User is registered.'
            }
            const data = Tools.wrap_response(response)
            res.status(data.status).send(data)
        } else {
            const result = await collections.users.insertOne(User);
            const token = await Users.encode_auth_token(result.insertedId.toString())
            User._id = result.insertedId
            const response = {
                auth_token: token,
                duration: 7200,
                user: {
                    id: User._id.toString(),
                    is_admin: User.is_admin,
                    nickname: User.nickname,
                    email: User.email,
                    name: User.name,
                    surname: User.surname,
                    language: User.language
                }
            }
            const data = Tools.wrap_response(response)
            res.status(data.status).send(data.body)
        }
    } catch (error) {
        console.warn(error)
        res.status(400).send(error.message)
    }
})

api_auth.post('/login', async (req: Request, res: Response) => {
    const body = req.body
    // @ts-ignore
    const user = (await collections.users.findOne({ email: body.email })) as Users
    const verify = bcrypt.compareSync(body.password, user.password)
    if (verify) {
        const auth_token = await Users.encode_auth_token(user._id.toString())
        if (auth_token) {
            const response = {
                auth_token: auth_token,
                duration: 7200,
                user: {
                    id: user._id.toString(),
                    is_admin: user.is_admin,
                    nickname: user.nickname,
                    email: user.email,
                    name: user.name,
                    surname: user.surname,
                    language: user.language
                }
            }
            const data = Tools.wrap_response(response)
            res.status(data.status).send(data.body)
        }
    } else {
        const response = {
            errors: 'Incorrect password.'
        }
        const data = Tools.wrap_response(response)
        res.status(data.status).send(data)
    }
})