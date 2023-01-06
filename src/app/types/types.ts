
export interface IUser{
    birthday: string | null;
    email: string;
    id: string;
    is_admin: boolean;
    main_image: string | null;
    name: string;
    surname: string;
    nickname: string;
}
export interface ILogin{
    auth_token: string;
    duration: number;
    user: IUser;
}

export interface ILogout{
    data: []
}