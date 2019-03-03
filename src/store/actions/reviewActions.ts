import { ReviewData } from "../../application/operations";
import Bundle from "../bundle";
import { Actions } from "./types";
import Review from "../../application/models/Review";
import { AppState } from "../reducers/index";
import User from "../../application/models/User";

export interface SaveReviewAction {
    type: Actions.SaveReview;
    payload: Review;
}
export interface DeleteReviewAction {
    type: Actions.DeleteReview;
    payload: string;
}

export const createReview = (albumId: string, data: ReviewData, user: User) => (
    dispatch: Function,
    api: any,
    { reviews: { createReview } }: Bundle
) =>
    createReview(albumId, data).then(result =>
        dispatch({ type: Actions.SaveReview, payload: { ...result, byId: user.id, by: user.username } })
    );

export const deleteReview = (albumId: string, reviewId: string) => (
    dispatch: Function,
    _: any,
    { reviews: { deleteReview } }: Bundle
) => deleteReview(albumId, reviewId).then(() => dispatch({ type: Actions.DeleteReview, payload: reviewId }));

export const editReview = (albumId: string, reviewId: string, data: ReviewData, user: User) => (
    dispatch: Function,
    _: any,
    { reviews: { editReview } }: Bundle
) =>
    editReview(albumId, reviewId, data).then(result =>
        dispatch({ type: Actions.SaveReview, payload: { ...result, byId: user.id, by: user.username } })
    );
