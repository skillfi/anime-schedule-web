import { ObjectId } from "mongodb";
import { collections } from "../services/database.services";

export default class BlackListToken {
    constructor(
        public token: string,
        public blacklisted_on: Date,
        public id?: ObjectId
    ) { }

    static async check_blacklist(auth_token: string) {
        const query = { token: auth_token }
        // @ts-ignore
        const blacklist = (await collections.blacklist_tokens?.findOne(query)) as BlackListToken
        if (blacklist) {
            return true
        } else {
            return false
        }
    }
}