export interface SongModel {
    name: string;
    object: string;
}

export interface DetailsModel {
    title: string;
    artist: string;
    image: string | null;
}

interface AlbumModel extends DetailsModel {
    songs: SongModel[];
}

export const defaultAlbumModel: AlbumModel = { title: "", artist: "", image: null, songs: [{ name: "", object: "" }] };

export default AlbumModel;
