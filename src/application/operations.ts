import Album from "./models/Album";
import Review from "./models/Review";

// Data-Objets

export interface SongData {
    name: string;
    object: string;
}

export interface AlbumInfoData {
    title: string;
    artist: string;
    image: string;
}

export interface AlbumData extends AlbumInfoData {
    songs: SongData[];
}

export interface ReviewData {
    title: string;
    text: string;
    rating: number;
}

// Abstractions

export interface CreateAlbum {
    (data: AlbumData): Promise<Album>;
}

export interface DeleteAlbum {
    (albumId: string): Promise<any>;
}

export interface UpdateAlbum {
    (albumId: string, data: AlbumInfoData): Promise<Album>;
}

export interface CreateReview {
    (albumId: string, data: ReviewData): Promise<Review>;
}

export interface DeleteReview {
    (albumId: string, reviewId: string): Promise<any>;
}

export interface EditReview {
    (albumId: string, reviewId: string, data: ReviewData): Promise<Review>;
}

export interface LikeAlbum {
    (albumId: string): Promise<any>;
}

export interface DislikeAlbum {
    (albumId: string): Promise<any>;
}
