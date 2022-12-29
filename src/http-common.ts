import axios from "axios";
import {environment} from "./environments/environment";

export default axios.create({
    baseURL: environment.apiUrl,
    headers: {
        "Content-type": "application/x-www-form-urlencoded"
    }
});