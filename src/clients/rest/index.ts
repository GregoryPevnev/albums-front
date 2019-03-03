import axios from "axios";
import { getSignIn, getSignOut, getSignUp } from "./restAuth";
import initailizeAuth from "./authMiddleware";
import { getLoadMyAlbums, getLoadAlbums } from "./restLoaders";
import { getSearchAlbums } from "./restSearch";
import { getViewDetails, getViewTracks, getViewReviews } from "./restViewers";
import { getUpdateAlbum } from "./restOperations";
import {
    getCreateAlbum,
    getDeleteAlbum,
    getCreateReview,
    getDeleteReview,
    getEditReview,
    getLike,
    getDislike
} from "./restOperations";

const initRestClient = (URL: string, authChange: (authed: boolean) => any) => {
    const client = axios.create({
        baseURL: URL
    });

    initailizeAuth(client, authChange);

    return {
        signIn: getSignIn(client),
        signOut: getSignOut(client),
        signUp: getSignUp(client),

        loadMyAlbums: getLoadMyAlbums(client),
        loadAlbums: getLoadAlbums(client),
        search: getSearchAlbums(client),

        viewDetails: getViewDetails(client),
        viewTracks: getViewTracks(client),
        viewReviews: getViewReviews(client),

        createAlbum: getCreateAlbum(client),
        deleteAlbum: getDeleteAlbum(client),
        updateAlbum: getUpdateAlbum(client),

        createReview: getCreateReview(client),
        deleteReview: getDeleteReview(client),
        editReview: getEditReview(client),

        like: getLike(client),
        dislike: getDislike(client)
    };
};

export default initRestClient;
