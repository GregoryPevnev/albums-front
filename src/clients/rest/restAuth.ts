import { AxiosInstance, AxiosError } from "axios";
import { SignIn, SignUp, SignOut } from "../../application/auth";
import { deleteAuth } from "./tokenStore";

export const getSignIn = (axios: AxiosInstance): SignIn => async data => {
    try {
        const result = await axios({
            url: "/auth/tokens",
            method: "POST",
            data
        });

        return result.data.user;
    } catch (e) {
        console.log(e);
        throw { type: "Could not sign in" };
    }
};

export const getSignUp = (axios: AxiosInstance): SignUp => async data => {
    try {
        const result = await axios({
            url: "/auth/users",
            method: "POST",
            data
        });

        return result.data.user;
    } catch (e) {
        const result = e.response.data.error;
        console.log(result);
        throw { type: result.type === "user-exists" ? result.kind : "Unknown error" };
    }
};

export const getSignOut = (axios: AxiosInstance): SignOut => async () =>
    axios({
        url: "/auth/tokens",
        method: "DELETE"
    })
        .catch(() => null)
        .then(() => deleteAuth());
