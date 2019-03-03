import Album from "../../application/models/Album";
import LoadingState from "../loading";
import { getDefaultState, setLoading, setError, setState } from "../loading";
import Review from "../../application/models/Review";
import Track from "../../application/models/Track";
import { Actions, AppAction } from "../actions/types";
import { setItem, NormalState, normalize, unsetItem } from "../normalization";

// TODO: DOcument pattern of storing complex object as a subset -> Real time operations and CRUD

export interface AlbumState {
    details: LoadingState<Album | null>; // Not performing CRUD -> No need to use Normalized State
    reviews: LoadingState<NormalState<Review>>; // PERFORMING CRUD (Delete / Add in real-time)
    tracks: LoadingState<Track[]>;
}

const defaultState = {
    details: getDefaultState<Album | null>(null),
    reviews: getDefaultState<NormalState<Review>>({}),
    tracks: getDefaultState<Track[]>([])
};

const viewReducer = (state: AlbumState = defaultState, action: AppAction): AlbumState => {
    switch (action.type) {
        case Actions.TracksLoading:
            return { ...state, tracks: setLoading(state.tracks) };
        case Actions.TracksError:
            return { ...state, tracks: setError(action.payload, state.tracks) };
        case Actions.TracksSuccess:
            return { ...state, tracks: setState(action.payload, state.tracks) };

        case Actions.DetailsLoading:
            return { ...state, details: setLoading(state.details) };
        case Actions.DetailsError:
            return { ...state, details: setError(action.payload, state.details) };
        case Actions.DetailsSuccess:
            return { ...state, details: setState(action.payload, state.details) };

        case Actions.ReviewsLoading:
            return { ...state, reviews: setLoading(state.reviews) };
        case Actions.ReviewsError:
            return { ...state, reviews: setError(action.payload, state.reviews) };
        case Actions.ReviewsSuccess:
            return { ...state, reviews: setState(normalize(action.payload), state.reviews) };

        case Actions.SaveReview:
            return { ...state, reviews: setState(setItem(action.payload, state.reviews.state), state.reviews) };
        case Actions.DeleteReview:
            return { ...state, reviews: setState(unsetItem(action.payload, state.reviews.state), state.reviews) };

        case Actions.UpdateDetails:
            return { ...state, details: setState(action.payload, state.details) };

        default:
            return state;
    }
};

export default viewReducer;
