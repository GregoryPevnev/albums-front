import AlbumItem from "./models/AlbumItem";

export enum SortBy {
    Top = "top",
    Recent = "recent"
}

export interface AlbumsQueryResult {
    albums: AlbumItem[];
    next: boolean;
    page: number;
}

export interface LoadAlbumsParams {
    sort: SortBy;
    page: number;
}

export interface LoadAlbums {
    (params: LoadAlbumsParams): Promise<AlbumsQueryResult>;
}

export interface LoadMyAlbums {
    (): Promise<AlbumItem[]>;
}
