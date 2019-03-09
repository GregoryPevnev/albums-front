import { AxiosInstance } from "axios";
import { getToken, saveAuth, deleteAuth } from "./tokenStore";

const formatJWT = (token: string) => `JWT ${token}`;

const JWT_HEADER = "jwt";
const AUTH_HEADER = "Authorization";

const initailizeAuth = (axios: AxiosInstance, authChange: (authed: boolean) => any) => {
    axios.interceptors.request.use(config => {
        const token = getToken();

        if (token) config.headers[AUTH_HEADER] = formatJWT(token);

        return config;
    });

    axios.interceptors.response.use(
        res => {
            if (res.headers[JWT_HEADER]) {
                saveAuth(res.headers[JWT_HEADER], res.data.user);
                authChange(true);
            }

            return res;
        },
        error => {
            if (error.response.status === 401) {
                deleteAuth();
                authChange(false);
            }

            return Promise.reject(error);
        }
    );
};

export default initailizeAuth;
