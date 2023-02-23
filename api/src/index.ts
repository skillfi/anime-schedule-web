import express from 'express';
import { connectToDatabase } from './services/database.services'
import { api_users } from './routes/users.router'
import { api_auth } from './routes/auth.router';
import { environment } from './environments/environments';

let app = express();

function beforeRequest(req: Request, res: Response) {
    if (req.method != 'OPTIONS') {
        let route_func_name = null
        const user = sessionStorage.getItem('user')
        return user ? JSON.parse(user) : {};
    }
}

connectToDatabase()
    .then(() => {
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use("/api/users", api_users);
        app.use("/api/", api_auth)

        app.listen(environment.port, () => {
            console.log(`server started at http://localhost:${environment.port}`)
        })
    }).catch((error: Error) => {
        process.exit();
    })