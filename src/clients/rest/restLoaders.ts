import { AxiosInstance } from "axios";
import { LoadAlbums, LoadMyAlbums } from "../../application/loaders";

export const getLoadAlbums = (axios: AxiosInstance): LoadAlbums => async ({ sort, page }) => {
    try {
        const { data } = await axios({
            url: "albums",
            method: "GET",
            params: {
                mode: "query",
                sort: String(sort),
                page
            }
        });

        return data.result;
    } catch (e) {
        throw { type: "Could not load albums" };
    }
};

export const getLoadMyAlbums = (axios: AxiosInstance): LoadMyAlbums => async () => {
    try {
        const { data } = await axios({
            url: "albums",
            method: "GET",
            params: {
                mode: "my"
            }
        });

        return data.result.albums;
    } catch (e) {
        throw { type: "Could not load user's albums" };
    }
};
