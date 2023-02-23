import { Request, Response, Router, json } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.services";
import Users from "../models/users";

export const api_users = Router();

api_users.get("/", async (_req: Request, res: Response) => {
    try {
        // @ts-ignore
        const users = (await collections.users.find({}).toArray()) as Users[];
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
});