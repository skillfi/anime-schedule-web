import { wrap } from "module"
import { environment } from "./environments/environments"

type Func = (...args: any) => any;

interface ResponseData extends ResponseInit {
    reason?: any,
    body?: any
}

export default class Tools {
    constructor() { }

    static wrap_response(data: any, auth = 'Authorized', access = 'Permitted') {
        const body = data
        if (typeof body == 'object' && body.errors) {
            const response: ResponseData = {
                statusText: 'Failed',
                reason: body.errors
            }
            if (auth == 'Unauthorized') {
                response.status = 401
                return response
            } else {
                response.status = 400
                return response
            }

        } else {
            const response: ResponseData = {
                statusText: 'OK',
                status: 200
            }
            if (typeof body == 'object' && body.message) {
                response.body = body.message
                return response
            } else {
                response.body = body
                return response
            }
        }
    }


}