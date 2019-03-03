import AlbumItem from "../../application/models/AlbumItem";
import LoadingState from "../loading";
import { getDefaultState, setLoading, setError, setState } from "../loading";
import { Actions, AppAction } from "../actions/types";

export interface SearchState {
    results: LoadingState<AlbumItem[]>;
    suggestions: string[];
}

const defaultState = {
    results: getDefaultState<AlbumItem[]>([]),
    suggestions: []
};

// Term - Stored in Query-Parameter
// Not performing CRUD -> No need to use Normalized State
const searchReducer = (state: SearchState = defaultState, action: AppAction): SearchState => {
    switch (action.type) {
        case Actions.SearchLoading:
            return { suggestions: [], results: setLoading(state.results) };
        case Actions.SearchError:
            return { ...state, results: setError(action.payload, state.results) };
        case Actions.SearchSuccess:
            return { ...state, results: setState(action.payload, state.results) };
        case Actions.SearchSuggestions:
            return { ...state, suggestions: action.payload };
        default:
            return state;
    }
};

export default searchReducer;
