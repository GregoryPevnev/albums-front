import React, { Fragment } from "react";
import Review from "../../application/models/Review";
import Rating from "./Rating";
import Loading from "./Loading";

interface Props {
    loading: boolean;
    error: string | null;
    reviews: Review[];
    user: string;

    onDelete: Function;
    onEdit: Function;
    onWrite: Function;
}

const Reviews = ({ loading, error, reviews, user, onDelete, onEdit, onWrite }: Props) => {
    if (loading) return <Loading>Loading Reviews...</Loading>;
    if (error) return <p className="error">Could not load reviews</p>;
    return (
        <Fragment>
            <div className="reviews">
                {reviews.length === 0 ? (
                    <p>No Reviews</p>
                ) : (
                    reviews.map(({ title, rating, by, text, id, byId }) => (
                        <div className="review" key={id}>
                            <h4 className="review__head">{title}</h4>
                            <p className="review__info">By {by}</p>

                            <div className="review__rating">
                                <Rating rating={rating} />
                            </div>

                            <p className="review__text">{text || "No text"}</p>

                            {user === byId && (
                                <div>
                                    <hr />
                                    <div className="review__action">
                                        <button
                                            className="btn btn--toggle btn--toggle--danger"
                                            onClick={() => onDelete(id)}
                                        >
                                            <i className="fas fa-trash" />
                                        </button>
                                        <button className="btn btn--toggle" onClick={() => onEdit(id)}>
                                            <i className="fas fa-pen" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
            {/* Only render for users that never wrote a review */}
            {reviews.find(r => r.byId === user) == null && (
                <button className="btn btn--primary" onClick={() => onWrite()}>
                    Write Review
                </button>
            )}
        </Fragment>
    );
};

export default Reviews;
