import { AxiosInstance } from "axios";
import { ViewDetails, ViewTracks, ViewReviews } from "../../application/viewers";

export const getViewDetails = (axios: AxiosInstance): ViewDetails => async id => {
    try {
        const result = await axios({
            url: `/albums/${id}`,
            method: "GET"
        });

        return result.data.album;
    } catch (e) {
        throw { type: "Could not load album's details" };
    }
};

export const getViewTracks = (axios: AxiosInstance): ViewTracks => async id => {
    try {
        const result = await axios({
            url: `/albums/${id}/songs`,
            method: "GET"
        });

        return result.data.songs;
    } catch (e) {
        throw { type: "Could not load album's tracks" };
    }
};

export const getViewReviews = (axios: AxiosInstance): ViewReviews => async id => {
    try {
        const result = await axios({
            url: `/albums/${id}/reviews`,
            method: "GET"
        });

        return result.data.reviews;
    } catch (e) {
        throw { type: "Could not load album's reviews" };
    }
};
