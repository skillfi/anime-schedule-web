import { Token } from "@crmackey/fernet";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';


export const environment = {
    DB_CONN_STRING: 'mongodb+srv://admin:3ctkXRD8XQacEAI0@amime-schedule.u2vd9hh.mongodb.net/?retryWrites=true&w=majority',
    DB_NAME: 'anime-dev',
    port: 8080,
    skip_login_list: ['']
}

export const secret: Secret = 'fefe517cdbef408b9fb501c239fbbccbanime'