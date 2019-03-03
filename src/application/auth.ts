import User from "./models/User";

export interface SignInParams {
    email: string;
    password: string;
}

export interface SignUpParams {
    email: string;
    username: string;
    password: string;
}

export interface SignIn {
    (params: SignInParams): Promise<User>;
}

export interface SignUp {
    (params: SignUpParams): Promise<User>;
}

export interface SignOut {
    (): Promise<any>;
}

export interface GetUser {
    (): User;
}
