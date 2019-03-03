import Bundle from "../bundle";
import { Actions } from "./types";
import { SortBy, AlbumsQueryResult } from "../../application/loaders";
import { AlbumData, UpdateAlbum } from "../../application/operations";
import Album from "../../application/models/Album";
import Track from "../../application/models/Track";
import AlbumItem from "../../application/models/AlbumItem";
import Review from "../../application/models/Review";
import { AlbumInfo } from "../../application/models/AlbumItem";

// Types

export interface AlbumsLoadingAction {
    type: Actions.AlbumsLoading;
}

export interface AlbumsErrorAction {
    type: Actions.AlbumsError;
    payload: string;
}

export interface AlbumsSuccessAction {
    type: Actions.AlbumsSuccess;
    payload: AlbumsQueryResult;
}

export interface MyAlbumsLoadingAction {
    type: Actions.MyAlbumsLoading;
}

export interface MyAlbumsErrorAction {
    type: Actions.MyAlbumsError;
    payload: string;
}

export interface MyAlbumsSuccessAction {
    type: Actions.MyAlbumsSuccess;
    payload: AlbumItem[];
}

export interface DetailsLoadingAction {
    type: Actions.DetailsLoading;
}
export interface DetailsErrorAction {
    type: Actions.DetailsError;
    payload: string;
}
export interface DetailsSuccessAction {
    type: Actions.DetailsSuccess;
    payload: Album;
}

export interface TracksLoadingAction {
    type: Actions.TracksLoading;
}
export interface TracksErrorAction {
    type: Actions.TracksError;
    payload: string;
}
export interface TracksSuccessAction {
    type: Actions.TracksSuccess;
    payload: Track[];
}

export interface ReviewsLoadingAction {
    type: Actions.ReviewsLoading;
}
export interface ReviewsErrorAction {
    type: Actions.ReviewsError;
    payload: string;
}
export interface ReviewsSuccessAction {
    type: Actions.ReviewsSuccess;
    payload: Review[];
}

export interface UpdateDetailsAction {
    type: Actions.UpdateDetails;
    payload: Album;
}

// Actions

export const loadAlbums = (page: number, sort: SortBy) => async (
    dispatch: Function,
    _: any,
    { albums: { loadAlbums } }: Bundle
) => {
    dispatch({ type: Actions.AlbumsLoading });

    try {
        const result = await loadAlbums({ page, sort });
        dispatch({ type: Actions.AlbumsSuccess, payload: result });
    } catch (e) {
        dispatch({ type: Actions.AlbumsError, payload: e.type });
    }
};

export const loadMyAlbums = () => async (dispatch: Function, _: any, { albums: { loadMyAlbums } }: Bundle) => {
    dispatch({ type: Actions.MyAlbumsLoading });

    try {
        const result = await loadMyAlbums();
        dispatch({ type: Actions.MyAlbumsSuccess, payload: result });
    } catch (e) {
        dispatch({ type: Actions.MyAlbumsError, payload: e.type });
    }
};

export const viewAlbum = (id: string) => (dispatch: Function, _: any, { view }: Bundle) => {
    const { tracks, details, reviews } = view(id);

    dispatch({ type: Actions.ReviewsLoading });
    dispatch({ type: Actions.TracksLoading });
    dispatch({ type: Actions.DetailsLoading });

    return Promise.all([
        tracks
            .then(data => dispatch({ type: Actions.TracksSuccess, payload: data }))
            .catch(error => dispatch({ type: Actions.TracksError, payload: error })),

        details
            .then(data => dispatch({ type: Actions.DetailsSuccess, payload: data }))
            .catch(error => dispatch({ type: Actions.DetailsError, payload: error })),

        reviews
            .then(data => dispatch({ type: Actions.ReviewsSuccess, payload: data }))
            .catch(error => dispatch({ type: Actions.ReviewsError, payload: error }))
    ]);
};

// No Additional actions -> Just reload
export const createAlbum = (data: AlbumData) => (__: Function, _: any, { albums: { createAlbum } }: Bundle) =>
    createAlbum(data);

export const deleteAlbum = (id: string) => (dispatch: Function, _: any, { albums: { deleteAlbum } }: Bundle) =>
    deleteAlbum(id).then(() => dispatch({ type: Actions.DeleteAlbum, payload: id }));

export const updateAlbum = (id: string, data: AlbumData) => async (
    dispatch: Function,
    _: any,
    { albums: { updateAlbum } }: Bundle
) => updateAlbum(id, data).then(album => dispatch({ type: Actions.UpdateDetails, payload: album }));
