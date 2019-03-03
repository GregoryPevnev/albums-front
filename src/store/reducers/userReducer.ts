import User from "../../application/models/User";
import AlbumItem from "../../application/models/AlbumItem";
import LoadingState from "../loading";
import { getDefaultState, setLoading, setError, setState } from "../loading";
import { Actions, AppAction } from "../actions/types";
import { NormalState, normalize, setItem, unsetItem } from "../normalization";
import { AlbumInfo } from "../../application/models/AlbumItem";

export interface UserState {
    user: User | null;
    myAlbums: LoadingState<NormalState<AlbumInfo>>;
}

const defaultState = {
    user: null,
    myAlbums: getDefaultState<NormalState<AlbumInfo>>({})
};

const userReducer = (state: UserState = defaultState, action: AppAction): UserState => {
    switch (action.type) {
        case Actions.Auth:
            return { ...state, user: action.payload };
        case Actions.Unauth:
            return { user: null, myAlbums: getDefaultState<NormalState<AlbumInfo>>({}) };

        case Actions.MyAlbumsLoading:
            return { ...state, myAlbums: setLoading(state.myAlbums) };
        case Actions.MyAlbumsError:
            return { ...state, myAlbums: setError(action.payload, state.myAlbums) };
        case Actions.MyAlbumsSuccess:
            return {
                ...state,
                myAlbums: setState(normalize(action.payload), state.myAlbums)
            };

        case Actions.SaveAlbum:
            return { ...state, myAlbums: setState(setItem(action.payload, state.myAlbums.state), state.myAlbums) };
        case Actions.DeleteAlbum:
            return { ...state, myAlbums: setState(unsetItem(action.payload, state.myAlbums.state), state.myAlbums) };

        default:
            return state;
    }
};

export default userReducer;
