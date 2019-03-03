import User from "../../application/models/User";
import { GetUser } from "../../application/auth";

const TOKEN = "token";
const USER = "user";

export const saveAuth = (token: string, user: User) => {
    localStorage.setItem(TOKEN, token);
    localStorage.setItem(USER, JSON.stringify(user));
};

export const deleteAuth = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
};

export const getToken = () => localStorage.getItem(TOKEN) || null;

export const getLocalUser: GetUser = () => {
    const userData = localStorage.getItem(USER);
    return userData ? JSON.parse(userData) : null;
};
