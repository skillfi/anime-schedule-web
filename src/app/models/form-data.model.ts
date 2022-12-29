interface FormData extends HTMLFormControlsCollection{
    'login-mail': HTMLInputElement;
    'login-password': HTMLInputElement;
}

export interface LoginFormElement extends HTMLFormElement {
    readonly elements: FormData
}

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

export interface Data {
    auth_token?: string;
    duration?: number;
    favorites?: any;
    subscribes?: any;
    user?: User;
}

export interface loginResponse {
    data?: Data;
}