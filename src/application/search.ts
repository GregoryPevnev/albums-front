import AlbumItem from "./models/AlbumItem";

export interface SearchAlbums {
    (term: string): Promise<AlbumItem[]>;
}
