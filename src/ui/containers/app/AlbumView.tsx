import React, { Component, Fragment } from "react";
import AlbumDetails from "../../components/AlbumDetails";
import Tracks from "../../components/Tracks";
import Reviews from "../../components/Reviews";
import Album from "../../../application/models/Album";
import Track from "../../../application/models/Track";
import Review from "../../../application/models/Review";
import { AppState } from "../../../store/reducers/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { viewAlbum, deleteAlbum, updateAlbum } from "../../../store/actions/albumActions";
import { like, dislike } from "../../../store/actions/likeActions";
import { RouteComponentProps } from "react-router-dom";
import Modal from "../../components/Modal";
import { Formik, Form } from "formik";
import ReviewForm from "../../forms/ReviewForm";
import reviewSchema from "../../forms/schemas/reviewSchema";
import { denormalize, NormalState } from "../../../store/normalization";
import { createReview, deleteReview, editReview } from "../../../store/actions/reviewActions";
import { AlbumInfo } from "../../../application/models/AlbumItem";
import { playTracks } from "../../../store/actions/playerActions";
import DetailsForm from "../../forms/DetailsForm";
import detailSchema from "../../forms/schemas/detailSchema";
import BackButton from "../../components/BackButton";
import User from "../../../application/models/User";

interface SubProps<T> {
    loading: boolean;
    error: string | null;
    state: T;
}

interface Props extends RouteComponentProps<{ id: string }> {
    details: SubProps<Album | null>;
    tracks: SubProps<Track[]>;
    reviews: SubProps<NormalState<Review>>;
    user: User | null;
    favorite: boolean;

    viewAlbum: Function;
    createReview: Function;
    editReview: Function;
    deleteReview: Function;
    deleteAlbum: Function;
    updateAlbum: Function;

    like: Function;
    dislike: Function;

    playTracks: Function;
}

interface State {
    deleteActive: boolean;
    editActive: boolean;
    edit: Review | null;
    deleting: boolean;
}

class AlbumViewComponent extends Component<Props, State> {
    private subscription: any;

    private getRating(): number {
        const reviews = denormalize(this.props.reviews.state);
        if (reviews.length === 0) return 0;

        const ratings = reviews.map(r => r.rating);
        const comp = ratings.reduce((total, rating) => total + rating) / ratings.length;
        return Math.round(comp * 10) / 10;
    }

    private renderReviewForm() {
        const { createReview, editReview } = this.props;
        const edit: any = this.state.edit;
        const user = this.props.user;
        const values =
            edit !== null
                ? { title: edit.title, rating: String(edit.rating), text: edit.text }
                : { title: "", rating: "", text: "" };

        if (user === null) return null;

        return (
            <Fragment>
                <h2 className="centerer">{edit === null ? "New Review" : "Edit Review"}</h2>
                <Formik
                    initialValues={values}
                    onSubmit={async (values, actions) => {
                        const albumId = this.props.details.state ? this.props.details.state.id : null;
                        actions.setSubmitting(true);

                        try {
                            if (edit !== null) await editReview(albumId, edit.id, values, user);
                            else await createReview(albumId, values, user);
                            this.hideForm();
                        } catch (e) {
                            actions.setStatus("Error");
                        }

                        actions.setSubmitting(false);
                    }}
                    onReset={() => this.hideForm()}
                    component={ReviewForm}
                    validationSchema={reviewSchema}
                />
            </Fragment>
        );
    }

    private renderDetailsForm() {
        const album = this.props.details.state;

        if (album === null) return null;

        const { title, artist, image } = album;

        return (
            <Fragment>
                <h2 className="centerer">Edit Album</h2>
                <Formik
                    initialValues={{ title, artist, image }}
                    onSubmit={async (values, actions) => {
                        actions.setSubmitting(true);

                        try {
                            await this.props.updateAlbum(album.id, values);
                            this.setState(() => ({ editActive: false }));
                        } catch (e) {
                            actions.setStatus("Error");
                        }

                        actions.setSubmitting(false);
                    }}
                    onReset={() => this.setState(() => ({ editActive: false }))}
                    component={DetailsForm}
                    validationSchema={detailSchema}
                />
            </Fragment>
        );
    }

    private delete() {
        const state = this.props.details.state;

        if (!state) return;

        this.setState(() => ({ deleting: true }));
        this.props.deleteAlbum(state.id).then(() => this.props.history.push("/app/dashboard"));
    }

    private showForm(id: string | null = null) {
        this.setState(() => ({ deleteActive: true, edit: id ? this.props.reviews.state[id] : null }));
    }

    private hideForm() {
        this.setState(() => ({ deleteActive: false, edit: null }));
    }

    public state = { deleteActive: false, editActive: false, edit: null, deleting: false };

    public componentDidMount() {
        const { history, viewAlbum } = this.props;

        viewAlbum(this.props.match.params.id);

        this.subscription = history.listen(({ pathname }) => {
            if (pathname !== this.props.location.pathname)
                // Wait for update
                setTimeout(() => viewAlbum(this.props.match.params.id), 0);
        });
    }

    public componentWillUnmount() {
        this.subscription();
    }

    public render() {
        const { tracks, details, reviews, favorite, dislike, like, playTracks, user } = this.props;

        return (
            <div className="view">
                <div className="view__panel">
                    <AlbumDetails
                        loading={details.loading}
                        error={details.error}
                        deleting={this.state.deleting}
                        rating={this.getRating()}
                        album={details.state}
                        favorite={favorite}
                        user={user ? user.id : ""}
                        onDelete={this.delete.bind(this)}
                        onEdit={() => this.setState(() => ({ editActive: true }))}
                        onFavorite={(info: AlbumInfo) => (favorite ? dislike(info) : like(info))}
                    />
                </div>

                <div className="view__panel">
                    <h3>Tracks</h3>
                    <Tracks
                        tracks={tracks.state}
                        loading={tracks.loading}
                        error={tracks.error}
                        onPlay={index => playTracks(tracks.state, index)}
                    />
                </div>

                <div className="view__panel">
                    <h3>Reviews</h3>
                    <Reviews
                        loading={reviews.loading}
                        error={reviews.error}
                        reviews={denormalize(reviews.state)}
                        user={user ? user.id : ""}
                        onDelete={(reviewId: string) =>
                            this.props.details.state && this.props.deleteReview(this.props.details.state.id, reviewId)
                        }
                        onEdit={(id: string) => this.showForm(id)}
                        onWrite={() => this.showForm()}
                    />
                </div>

                <Modal active={this.state.deleteActive}>{this.state.deleteActive && this.renderReviewForm()}</Modal>
                <Modal active={this.state.editActive}>{this.state.editActive && this.renderDetailsForm()}</Modal>

                <BackButton />
            </div>
        );
    }
}

const isFavorite = (albums: AlbumInfo[], id: string) => !!albums.find(album => album.id === id);

const AlbumView = connect(
    ({ view, user }: AppState) => ({
        details: view.details,
        tracks: view.tracks,
        reviews: view.reviews,
        user: user.user || null,
        favorite: !!(
            user.myAlbums.state &&
            view.details.state &&
            isFavorite(denormalize(user.myAlbums.state), view.details.state.id)
        )
    }),
    dispatch =>
        bindActionCreators(
            {
                viewAlbum,
                createReview: createReview,
                deleteReview,
                editReview,
                deleteAlbum,
                like,
                dislike,
                playTracks,
                updateAlbum
            },
            dispatch
        )
)(AlbumViewComponent);

export default AlbumView;
