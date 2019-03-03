import React, { Fragment } from "react";

interface Props {
    rating: number | null;
}

const Rating = ({ rating }: Props) => (
    <div className="rating">
        {rating === null ? (
            <span>Not rated</span>
        ) : (
            <Fragment>
                <span className="rating__value">{rating}</span>
                <i className="fas fa-star rating__star" />
            </Fragment>
        )}
    </div>
);

export default Rating;
