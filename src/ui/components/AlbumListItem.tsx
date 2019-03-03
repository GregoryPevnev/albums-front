import React from "react";
import AlbumItem from "../../application/models/AlbumItem";
import Rating from "./Rating";

const AlbumItem = ({ image, title, rating, artist, id }: AlbumItem) => (
    <div className="album" key={id}>
        <img src={image} className="image" />
        <div className="album__info">
            <div className="album__rating">
                <Rating rating={rating} />
            </div>
            <div className="album__details">
                <h3>{title}</h3>
                <p className="centerer">{artist}</p>
            </div>
        </div>
    </div>
);

export default AlbumItem;
