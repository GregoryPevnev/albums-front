export interface AlbumInfo {
    id: string;
    title: string;
}

interface AlbumItem extends AlbumInfo {
    image: string;
    artist: string;
    rating: number;
}

export default AlbumItem;
