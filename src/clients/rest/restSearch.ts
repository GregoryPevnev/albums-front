// Use mode="search" and term="term"
import { AxiosInstance } from "axios";
import { SearchAlbums } from "../../application/search";

export const getSearchAlbums = (axios: AxiosInstance): SearchAlbums => async (term: string) => {
    try {
        const { data } = await axios({
            url: "albums",
            method: "GET",
            params: {
                mode: "search",
                term
            }
        });

        return data.result.albums;
    } catch (e) {
        throw { type: "Could not load user's albums" };
    }
};
