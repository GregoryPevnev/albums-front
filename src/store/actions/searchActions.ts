import { Actions } from "./types";
import Bundle from "../bundle";
import { distinct } from "../utils";
import AlbumItem from "../../application/models/AlbumItem";

export interface SearchLoadingAction {
    type: Actions.SearchLoading;
}

export interface SearchErrorAction {
    type: Actions.SearchError;
    payload: string;
}

export interface SearchSuccessAction {
    type: Actions.SearchSuccess;
    payload: AlbumItem[];
}

export interface SearchSuggestionsAction {
    type: Actions.SearchSuggestions;
    payload: string[];
}

export const searchAlbums = (term: string) => async (dispatch: Function, _: any, { albums: { search } }: Bundle) => {
    dispatch({ type: Actions.SearchLoading });

    try {
        dispatch({ type: Actions.SearchSuccess, payload: await search(term) });
    } catch (e) {
        dispatch({ type: Actions.SearchError, payload: e.type });
    }
};

export const findSuggestions = (term: string) => async (dispatch: Function, _: any, { albums: { search } }: Bundle) => {
    try {
        const results = await search(term);
        dispatch({ type: Actions.SearchSuggestions, payload: distinct(results.map(album => album.title)) });
    } catch (e) {
        dispatch({ type: Actions.SearchSuggestions, payload: e.type });
    }
};
