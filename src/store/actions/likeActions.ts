import { AlbumInfo } from "../../application/models/AlbumItem";
import Bundle from "../bundle";
import { Actions } from "./types";

// IMPORTANT: Album-CRUD are only used with Adding / Removing albums from My-Favourites
export interface SaveAlbumAction {
    type: Actions.SaveAlbum;
    payload: AlbumInfo;
}
// Only used for removing liked albums
export interface DeleteAlbumAction {
    type: Actions.DeleteAlbum;
    payload: string;
}

export const like = (album: AlbumInfo) => (dispatch: Function, _: any, { albums: { like } }: Bundle) => {
    like(album.id); // No need to await
    dispatch({ type: Actions.SaveAlbum, payload: album });
};

export const dislike = (album: AlbumInfo) => (dispatch: Function, _: any, { albums: { dislike } }: Bundle) => {
    dislike(album.id); // No need to await
    dispatch({ type: Actions.DeleteAlbum, payload: album.id });
};
