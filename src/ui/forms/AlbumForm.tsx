import React, { Component } from "react";
import { Form, FormikProps } from "formik";
import AlbumModel from "./models/albumModel";
import { UploadObject, getUploadObject } from "../../application/upload";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getURL, upload } from "../../store/actions/uploadActions";
import SubmitButton from "./inputs/submitButton";
import TracksInput from "./inputs/TracksInput";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import AlbumDetailsInput from "./inputs/AlbumDetailsInput";
import BackButton from "../components/BackButton";

interface Props extends FormikProps<AlbumModel> {
    getURL: Function;
    upload: Function; // Upload all objects simulatnuously
}

interface State {
    image: UploadObject | null;
    tracks: (UploadObject | null)[];
    songError: null | string;
}

class AlbumFormComponent extends Component<Props, State> {
    private validateSongs() {
        const songs = this.props.values.songs.filter(s => s !== null);

        if (songs.length === 0) {
            return "At least one track is required";
        } else if (songs.find(({ object, name }) => !object || !name)) {
            return "Tracks are incomplete";
        }
        return null;
    }

    private async uploadTrack(pos: number, file: File) {
        const { object, url } = await this.props.getURL(file);

        this.setState(({ tracks }) => {
            const newTracks = tracks.slice();
            newTracks[pos] = { object: file, url };
            return { tracks: newTracks };
        });

        this.props.setFieldValue(`songs[${pos}].object`, object);
    }

    private async uploadImage(file: File) {
        const { object, url } = await this.props.getURL(file);
        this.setState(() => ({ image: { url, object: file } }));
        this.props.setFieldValue("image", object);
    }

    private addTrack() {
        if (this.state.tracks.length >= 30) return;

        const tracks = [...this.state.tracks, getUploadObject()];
        this.setState(() => ({ tracks }));
        this.props.setFieldValue(`songs[${tracks.length - 1}].name`, "");
        this.props.setFieldValue(`songs[${tracks.length - 1}].object`, "");
    }

    private deleteTrack(at: number) {
        if (this.state.tracks.length <= 1) return;

        this.props.setFieldValue(`songs[${at}]`, null);

        this.setState(({ tracks }) => ({ tracks: [...tracks.slice(0, at), null, ...tracks.slice(at + 1)] }));
    }

    private async submitForm() {
        const { submitForm, setSubmitting, values, validateForm, setStatus } = this.props;
        const songError = this.validateSongs();
        this.setState({ songError });

        const errors = await validateForm(values);

        if (this.state.songError !== null) return;
        if (Object.keys(errors).length !== 0 || !this.props.isValid) {
            submitForm();
            return;
        }

        setSubmitting(true);

        try {
            await this.props.upload([
                ...this.state.tracks.filter(s => s !== null),
                ...(this.state.image === null ? [] : [this.state.image])
            ]);

            this.props.submitForm();
        } catch (e) {
            console.log(e);
            setStatus("Error");
        }
    }

    public state = { image: null, tracks: [getUploadObject()], songError: null };

    public render() {
        const { initialValues, isSubmitting, status } = this.props;

        return (
            <Form className="form">
                <AlbumDetailsInput url={initialValues.image} onPick={this.uploadImage.bind(this)} />

                <TracksInput
                    tracks={this.state.tracks}
                    onAddTrack={this.addTrack.bind(this)}
                    onDeleteTrack={this.deleteTrack.bind(this)}
                    onFileSelect={this.uploadTrack.bind(this)}
                />
                {this.state.songError && <p className="error">{this.state.songError}</p>}

                <div className="form__actions">
                    <BackButton />
                    <SubmitButton isSubmitting={isSubmitting} onSubmit={this.submitForm.bind(this)}>
                        Save
                    </SubmitButton>
                </div>

                <Modal active={isSubmitting} isBlank={true}>
                    <Loading>Uploading Album...</Loading>
                </Modal>

                {status && <p className="error">Could not upload files, try again later</p>}
            </Form>
        );
    }
}

const AlbumForm = connect(
    null,
    dispatch => bindActionCreators({ getURL, upload }, dispatch)
)(AlbumFormComponent);

export default AlbumForm;
