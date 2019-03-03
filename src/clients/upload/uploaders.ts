import { GetURL, Upload } from "../../application/upload";
import mime from "mime";

interface RequestConfig {
    getToken: () => string | null;
    baseURL: string;
}

export const getURLRaw = ({ getToken, baseURL }: RequestConfig): GetURL => file =>
    fetch(baseURL + "/upload/url?filename=" + file.name, {
        headers: {
            Authorization: `JWT ${getToken()}`
        }
    }).then(res => res.json());

export const uploadRaw = (_: any): Upload => objs =>
    Promise.all(
        objs.map(({ url, object }) =>
            fetch(url, {
                method: "PUT",
                body: object,
                headers: {
                    "Content-Type": mime.getType(object ? object.name : "") || "text/plain"
                }
            })
        )
    );

export const getObjectName = (url: string | null): string | null => {
    if (url === null) return null;

    const parts = url.split("/");
    return parts[parts.length - 1];
};
