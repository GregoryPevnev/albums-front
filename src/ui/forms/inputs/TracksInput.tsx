import React, { Component, Fragment } from "react";
import { Field } from "formik";
import { UploadObject } from "../../../application/upload";
import { getFile } from "./utils";

interface Props {
    tracks: UploadObject[];

    onFileSelect: Function;
    onAddTrack: Function;
    onDeleteTrack: Function;
}

class TracksInput extends Component<Props> {
    private static readonly MAX_TRACKS = 20;

    private tracks: HTMLElement | null = null;

    private addTrack() {
        this.props.onAddTrack();

        setTimeout(() => this.tracks && this.tracks.scrollBy(0, 10000), 0); // Scorlling down after the track has been added
    }

    private formatContent(i: number) {
        const file = this.props.tracks[i].object;
        if (file === null) return "Select";
        return file.name;
    }

    private loading(i: number) {
        getFile("audio").then(file => file && this.props.onFileSelect(i, file));
    }

    public render() {
        const tracks = this.props.tracks;
        const canDelete = tracks.filter(t => t !== null).length >= 2;

        return (
            <Fragment>
                <div className="tracks" ref={tracks => (this.tracks = tracks)}>
                    {tracks.map((track, i) => {
                        if (track === null) return null;
                        return (
                            <div className="tracks__track" key={i}>
                                <Field
                                    className="tracks__input"
                                    name={`songs[${i}].name`}
                                    type="text"
                                    placeholder="Track Name"
                                />
                                <button
                                    type="button"
                                    className="btn btn--fixed"
                                    onClick={() => this.loading(i)}
                                    style={{ width: 150 }}
                                >
                                    {this.formatContent(i)}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn--toggle btn--toggle--danger"
                                    onClick={() => this.props.onDeleteTrack(i)}
                                    style={{ display: canDelete ? "inline" : "none" }}
                                >
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        );
                    })}
                </div>

                <button
                    type="button"
                    className="btn btn--primary"
                    onClick={this.addTrack.bind(this)}
                    disabled={this.props.tracks.length >= TracksInput.MAX_TRACKS}
                >
                    Add Track
                </button>
            </Fragment>
        );
    }
}

export default TracksInput;
