import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import rootReducer, { AppState } from "./reducers/index";
import Bundle from "./bundle";
import { AppAction } from "./actions/types";
import { getDefaultState } from "./loading";

const initStore = (bundle: Bundle): Store<AppState, AppAction> => {
    const injectedThunk = thunk.withExtraArgument(bundle);

    return createStore<AppState, AppAction, any, any>(
        rootReducer,
        { user: { user: bundle.auth.getUser(), myAlbums: getDefaultState({}) } },
        applyMiddleware(injectedThunk)
    );
};

export default initStore;
