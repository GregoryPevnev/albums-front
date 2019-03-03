import React, { Fragment } from "react";
import ImageSelector from "./ImageSelector";
import FormField from "./FormField";

interface Props {
    url: string | null;
    onPick: (file: File) => any;
}

const AlbumDetailsInput = ({ url, onPick }: Props) => (
    <div className="details">
        <div className="details__image">
            <ImageSelector url={url} onUpdate={onPick} />
        </div>

        <div className="details__info">
            <div>
                <FormField name="title" type="text" placeholder="Album Tiltle" />
                <FormField name="artist" type="text" placeholder="Artist" />
            </div>
        </div>
    </div>
);

export default AlbumDetailsInput;
