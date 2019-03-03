import { AxiosInstance } from "axios";
import { UpdateAlbum } from "../../application/operations";
import {
    LikeAlbum,
    DislikeAlbum,
    CreateAlbum,
    DeleteAlbum,
    CreateReview,
    DeleteReview,
    EditReview
} from "../../application/operations";

// Albums

export const getCreateAlbum = (axios: AxiosInstance): CreateAlbum => async data => {
    try {
        const result = await axios({
            url: "/albums",
            method: "POST",
            data
        });

        return result.data.album;
    } catch (e) {
        throw { type: "Cannot create album" };
    }
};

// Document: Deletes must be Stateless
export const getDeleteAlbum = (axios: AxiosInstance): DeleteAlbum => async id =>
    axios({
        url: `/albums/${id}`,
        method: "DELETE"
    }).catch(() => null);

export const getUpdateAlbum = (axios: AxiosInstance): UpdateAlbum => async (id, data) => {
    try {
        const result = await axios({
            url: "/albums/" + String(id),
            method: "PUT",
            data
        });

        return result.data.album;
    } catch (e) {
        throw { type: "Cannot update album" };
    }
};

// Reviews

export const getCreateReview = (axios: AxiosInstance): CreateReview => async (albumId, data) => {
    try {
        const result = await axios({
            url: `/albums/${albumId}/reviews`,
            method: "POST",
            data
        });

        return result.data.review;
    } catch (e) {
        throw { type: "Cannot create review" };
    }
};

// Document: Deletes must be Stateless
export const getDeleteReview = (axios: AxiosInstance): DeleteReview => async (albumId, reviewId) =>
    axios({
        url: `/albums/${albumId}/reviews/${reviewId}`,
        method: "DELETE"
    }).catch(() => null);

export const getEditReview = (axios: AxiosInstance): EditReview => async (albumId, reviewId, data) => {
    try {
        const result = await axios({
            url: `/albums/${albumId}/reviews/${reviewId}`,
            method: "PUT",
            data
        });

        return result.data.review;
    } catch (e) {
        throw { type: "Cannot edit review" };
    }
};

// Likes

export const getLike = (axios: AxiosInstance): LikeAlbum => async id =>
    axios({
        url: `/albums/${id}/like`,
        method: "PUT"
    }).catch(() => null);

export const getDislike = (axios: AxiosInstance): DislikeAlbum => async id =>
    axios({
        url: `/albums/${id}/like`,
        method: "DELETE"
    }).catch(() => null);
