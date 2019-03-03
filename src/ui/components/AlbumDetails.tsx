import React from "react";
import Album from "../../application/models/Album";
import Rating from "./Rating";
import Loading from "./Loading";

interface Props {
    loading: boolean;
    error: string | null;
    album: Album | null;

    deleting: boolean;
    rating: number;
    user: string;
    favorite: boolean;

    onDelete: Function;
    onEdit: Function;
    onFavorite: Function;
}

const AlbumDetails = ({
    loading,
    error,
    album,
    deleting,
    rating,
    user,
    favorite,
    onDelete,
    onEdit,
    onFavorite
}: Props) => {
    if (loading) return <Loading>Loading Details...</Loading>;
    if (error || album === null) return <p className="error">Could not load details</p>;

    const { id, title, image, artist, by } = album;
    return (
        <div className="details">
            <img className="image details__image" src={image} />
            <div className="details__info">
                <div>
                    <h2 style={{ marginBottom: 0 }}>{title}</h2>
                    <h4>{artist}</h4>
                    <button
                        className={`btn ${!favorite ? "btn--primary" : ""}`}
                        onClick={() => onFavorite({ id, title })}
                    >
                        {favorite ? (
                            <span className="success">
                                Liked
                                <i style={{ marginLeft: 5 }} className="fas fa-check" />
                            </span>
                        ) : (
                            "Like"
                        )}
                    </button>
                </div>

                {by === user && (
                    <div className="details__btns">
                        <button
                            disabled={deleting}
                            className="btn btn--toggle btn--toggle--danger"
                            onClick={() => onDelete()}
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </button>
                        <button className="btn" onClick={() => onEdit()}>
                            Edit
                        </button>
                    </div>
                )}
            </div>

            <h3 className="details__rating">
                <Rating rating={rating} />
            </h3>
        </div>
    );
};

export default AlbumDetails;
