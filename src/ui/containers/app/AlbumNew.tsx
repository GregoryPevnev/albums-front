import React from "react";
import { Formik } from "formik";
import AlbumForm from "../../forms/AlbumForm";
import albumSchema from "../../forms/schemas/albumSchema";
import { defaultAlbumModel } from "../../forms/models/albumModel";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createAlbum } from "../../../store/actions/albumActions";
import { RouteComponentProps } from "react-router-dom";
import Album from "../../../application/models/Album";

interface Props extends RouteComponentProps {
    createAlbum: Function;
}

const AlbumNewComponent = ({ createAlbum, history }: Props) => (
    // Important: Passing null to image -> ImageSelector interprets it
    <div className="view">
        <div className="view__panel">
            <h2 className="centerer">New Album</h2>
            <Formik
                initialValues={defaultAlbumModel}
                onSubmit={async (values, actions) => {
                    actions.setSubmitting(true);

                    try {
                        const album: Album = await createAlbum({
                            ...values,
                            songs: values.songs.filter(s => s !== null)
                        });

                        // Replacing -> No Going back
                        history.replace("/app/albums/" + album.id);
                    } catch (e) {
                        actions.setStatus("Error");
                    }

                    actions.setSubmitting(false);
                }}
                component={AlbumForm}
                validationSchema={albumSchema}
            />
        </div>
    </div>
);

const AlbumNew = connect(
    null,
    dispatch => bindActionCreators({ createAlbum }, dispatch)
)(AlbumNewComponent);

export default AlbumNew;
