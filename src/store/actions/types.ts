import { AuthAction, UnauthAction } from "./authActions";
import {
    MyAlbumsErrorAction,
    MyAlbumsLoadingAction,
    MyAlbumsSuccessAction,
    AlbumsErrorAction,
    AlbumsLoadingAction,
    AlbumsSuccessAction,
    TracksLoadingAction,
    TracksErrorAction,
    TracksSuccessAction,
    ReviewsErrorAction,
    ReviewsLoadingAction,
    ReviewsSuccessAction,
    DetailsLoadingAction,
    DetailsErrorAction,
    DetailsSuccessAction
} from "./albumActions";
import { SearchErrorAction, SearchLoadingAction, SearchSuggestionsAction, SearchSuccessAction } from "./searchActions";
import { SaveAlbumAction, DeleteAlbumAction } from "./likeActions";
import { SaveReviewAction, DeleteReviewAction } from "./reviewActions";
import { PlayTracksAction, PlayNextAction, PlayPrevAction, SetRandomAction, SetLoopAction } from "./playerActions";
import { UpdateDetailsAction } from "./albumActions";

export enum Actions {
    MyAlbumsLoading,
    MyAlbumsError,
    MyAlbumsSuccess,

    AlbumsLoading,
    AlbumsError,
    AlbumsSuccess,

    SearchLoading,
    SearchError,
    SearchSuccess,
    SearchSuggestions,

    DetailsLoading,
    DetailsError,
    DetailsSuccess,

    TracksLoading,
    TracksError,
    TracksSuccess,

    ReviewsLoading,
    ReviewsError,
    ReviewsSuccess,

    Auth,
    Unauth,

    SaveAlbum,
    DeleteAlbum,

    UpdateDetails,

    SaveReview,
    DeleteReview,

    PlayTracks,
    PlayNext,
    PlayPrev,
    SetRandom,
    SetLoop
}

export type AppAction =
    | AuthAction
    | UnauthAction
    | MyAlbumsErrorAction
    | MyAlbumsLoadingAction
    | MyAlbumsSuccessAction
    | AlbumsErrorAction
    | AlbumsLoadingAction
    | AlbumsSuccessAction
    | SearchErrorAction
    | SearchLoadingAction
    | SearchSuccessAction
    | SearchSuggestionsAction
    | TracksLoadingAction
    | TracksErrorAction
    | TracksSuccessAction
    | ReviewsLoadingAction
    | ReviewsErrorAction
    | ReviewsSuccessAction
    | DetailsLoadingAction
    | DetailsErrorAction
    | DetailsSuccessAction
    | SaveAlbumAction
    | DeleteAlbumAction
    | SaveReviewAction
    | DeleteReviewAction
    | PlayTracksAction
    | PlayNextAction
    | PlayPrevAction
    | SetRandomAction
    | SetLoopAction
    | UpdateDetailsAction;
