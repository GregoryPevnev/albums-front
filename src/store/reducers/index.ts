import { combineReducers } from "redux";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";
import albumReducer from "./albumsReducer";
import viewReducer from "./viewReducer";
import { UserState } from "./userReducer";
import { SearchState } from "./searchReducer";
import { AlbumState } from "./viewReducer";
import { AlbumsState } from "./albumsReducer";
import playerReducer, { PlayerState } from "./playerReducer";

export interface AppState {
    user: UserState;
    search: SearchState;
    albums: AlbumsState;
    view: AlbumState;
    player: PlayerState;
}

const rootReducer = combineReducers<AppState>({
    user: userReducer,
    search: searchReducer,
    albums: albumReducer,
    view: viewReducer,
    player: playerReducer
});

export default rootReducer;
