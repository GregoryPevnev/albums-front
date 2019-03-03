import Album from "./models/Album";
import Review from "./models/Review";
import Track from "./models/Track";

export interface ViewDetails {
    (albumId: string): Promise<Album>;
}

export interface ViewReviews {
    (albumId: string): Promise<Review[]>;
}

export interface ViewTracks {
    (albumId: string): Promise<Track[]>;
}

interface ViewerParams {
    details: ViewDetails;
    reviews: ViewReviews;
    tracks: ViewTracks;
}

export interface ViewAlbum {
    (albumId: string): {
        details: Promise<Album>;
        reviews: Promise<Review[]>;
        tracks: Promise<Track[]>;
    };
}

export const getAlbumViewer = ({ details, reviews, tracks }: ViewerParams): ViewAlbum => albumId => ({
    details: details(albumId),
    reviews: reviews(albumId),
    tracks: tracks(albumId)
});
