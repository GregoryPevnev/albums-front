import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Root from "./ui/Root";
import initStore from "./store/index";
import initRestClient from "./clients/rest";
import { getLocalUser } from "./clients/rest/tokenStore";
import { getAlbumViewer } from "./application/viewers";
import getUploaders from "./clients/upload/index";
import { Actions } from "./store/actions/types";

// Important: Using actual Environment-Variables for build

const API_URL = String(process.env.API_URL);
const SW = Boolean(process.env.SW);

const {
    signIn,
    signUp,
    signOut,
    loadMyAlbums,
    loadAlbums,
    search,
    viewDetails,
    viewTracks,
    viewReviews,
    createAlbum,
    deleteAlbum,
    updateAlbum,
    createReview,
    deleteReview,
    editReview,
    like,
    dislike
} = initRestClient(API_URL, state => {
    if (!state) store.dispatch({ type: Actions.Unauth });
});

const upload = getUploaders(API_URL);

const store = initStore({
    auth: { signIn, signUp, signOut, getUser: getLocalUser },
    albums: { loadMyAlbums, loadAlbums, search, createAlbum, deleteAlbum, updateAlbum, like, dislike },
    view: getAlbumViewer({
        details: viewDetails,
        tracks: viewTracks,
        reviews: viewReviews
    }),
    upload,
    reviews: { createReview, deleteReview, editReview }
});

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById("app")
);

if (SW) {
    console.log("Using Service Worker", SW);
    if ("serviceWorker" in window.navigator) window.navigator.serviceWorker.register("/sw.js");
}
