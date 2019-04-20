import React, { Component } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import AlbumItem from "../../../application/models/AlbumItem";
import User from "../../../application/models/User";
import { AppState } from "../../../store/reducers/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signOut } from "../../../store/actions/authActions";
import { loadMyAlbums } from "../../../store/actions/albumActions";
import { denormalize } from "../../../store/normalization";
import { AlbumInfo } from "../../../application/models/AlbumItem";

interface Props extends RouteComponentProps {
    albums: AlbumInfo[];
    loading: boolean;
    error: string | null;
    user: User | null;

    loadMyAlbums: Function;
    signOut: Function;
}

class SidebarComponent extends Component<Props> {
    private renderList() {
        const { albums, loading, error, history } = this.props;

        if (loading) return <p>Loading...</p>;
        if (error !== null) return <p className="error">{error}</p>;

        if (albums.length === 0) return <p className="centerer">No albums</p>;

        return albums.map(({ title, id }) => (
            <p key={id} className="sidebar__link" onClick={() => history.replace("/app/albums/" + String(id))}>
                {title}
            </p>
        ));
    }

    componentDidMount() {
        this.props.loadMyAlbums();
    }

    public render() {
        const { user, signOut, history } = this.props;

        return (
            <div className="sidebar">
                <div className="sidebar__profile">
                    <h3>{user && user.username}</h3>
                    <h4>{user && user.email}</h4>
                </div>

                <div className="sidebar__links">
                    <h3>Liked Albums</h3>
                    {this.renderList()}
                </div>

                <div className="sidebar__controls">
                    <button
                        className="btn btn--primary btn--full"
                        onClick={() => {
                            signOut().then(() => history.push("/signin"));
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        );
    }
}

const Sidebar = connect(
    ({
        user: {
            user,
            myAlbums: { state, loading, error }
        }
    }: AppState) => ({
        user,
        albums: denormalize(state),
        loading,
        error
    }),
    dispatch => bindActionCreators({ signOut, loadMyAlbums }, dispatch)
)(SidebarComponent);

export default withRouter(Sidebar);
