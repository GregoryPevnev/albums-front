import AlbumItem from "../../application/models/AlbumItem";
import LoadingState from "../loading";
import { getDefaultState, setLoading, setError, setState } from "../loading";
import { Actions, AppAction } from "../actions/types";

export interface AlbumsState {
    albums: LoadingState<AlbumItem[]>; // Not performing CRUD -> No need to use Normalized State (Even when editing, changes are applied to view instead)
    page: number;
    next: boolean;
    //Sort-Order - Stored in URL
}

const defaultState = {
    albums: getDefaultState<AlbumItem[]>([]),
    page: 0,
    next: false
};

const albumReducer = (state: AlbumsState = defaultState, action: AppAction): AlbumsState => {
    switch (action.type) {
        case Actions.AlbumsLoading:
            return { ...state, albums: setLoading(state.albums) };
        case Actions.AlbumsError:
            return { ...state, albums: setError(action.payload, state.albums) };
        case Actions.AlbumsSuccess:
            if (action.payload.page < state.page)
                return {
                    albums: setState(action.payload.albums, state.albums),
                    next: action.payload.next,
                    page: action.payload.page + 1
                };

            return {
                albums: setState([...state.albums.state, ...action.payload.albums], state.albums),
                next: action.payload.next,
                page: state.page + 1 // After a page has been successfully loaded, a new
            };
        default:
            return state;
    }
};

export default albumReducer;
