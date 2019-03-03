import React, { Component, Fragment } from "react";
import { getFile } from "../utils";
import { DEFAULT_IMAGE } from "../../../clients/upload/index";

interface Props {
    url: string | null;

    onUpdate(file: File): any;
}

interface State {
    url: string | null;
}

class ImageSelector extends Component<Props, State> {
    private async readURL(file: File) {
        const url = await new Promise<string>(res => {
            const reader = new FileReader();

            reader.addEventListener("load", () => res(String(reader.result)));

            reader.readAsDataURL(file);
        });

        this.setState({ url });
    }

    public selectImage() {
        getFile("image").then(image => {
            if (image === null) return;

            this.readURL(image);
            this.props.onUpdate(image);
        });
    }

    constructor(props: Props) {
        super(props);

        this.state = { url: props.url };
    }

    public render() {
        const { url } = this.state;

        return (
            <Fragment>
                <img
                    src={url || DEFAULT_IMAGE}
                    onClick={this.selectImage.bind(this)}
                    className="image"
                    style={{ cursor: "pointer" }}
                />
                {url === null && (
                    <p className="centerer" style={{ fontSize: 12 }}>
                        Select image
                    </p>
                )}
            </Fragment>
        );
    }
}

export default ImageSelector;
