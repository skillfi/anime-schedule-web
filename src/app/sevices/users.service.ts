import http from "../../http-common";

export interface User {
    birthday?: any;
    email?: string;
    id?: number;
    is_active?: boolean;
    is_admin?: boolean;
    main_image?: string
    name?: string
    nickname?: string;
    registered_on?: string;
    status?: string;
    surname?: string
}

const getUser = (userId: number) => {
    return http.get<User>(`/user/${userId}`)
}

const UserService = {
    getUser
}

export default UserService;