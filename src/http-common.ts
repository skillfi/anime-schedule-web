import Axios from 'axios-observable';
import axios from "axios";
import {environment} from "./environments/environment";


export default axios.create({
    baseURL: environment.apiUrl
});