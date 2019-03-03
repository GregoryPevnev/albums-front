import { getURLRaw, uploadRaw } from "./uploaders";
import { getToken } from "../rest/tokenStore";

// Note: Bad solution, but whatever
export const DEFAULT_IMAGE = "https://s3.amazonaws.com/albums-uploader-bucket/default-image.png";

const getUploaders = (baseURL: string) => ({
    getURL: getURLRaw({
        baseURL,
        getToken
    }),
    upload: uploadRaw({})
});

export default getUploaders;
