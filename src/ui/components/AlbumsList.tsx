import React from "react";
import { withRouter } from "react-router";
import AlbumItem from "../../application/models/AlbumItem";
import { RouteComponentProps, Link } from "react-router-dom";
import AlbumListItem from "./AlbumListItem";

interface Props extends RouteComponentProps {
    albums: AlbumItem[];
}

const AlbumList = ({ albums, history }: Props) =>
    albums.length === 0 ? (
        <h4 className="centerer">No Albums</h4>
    ) : (
        <div className="album-list">
            {albums.map(album => (
                <div
                    className="album-list__item"
                    key={album.id}
                    onClick={() => history.push(`/app/albums/${album.id}`)}
                >
                    <AlbumListItem {...album} />
                </div>
            ))}
        </div>
    );

export default withRouter(AlbumList);
