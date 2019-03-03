import React, { Component } from "react";
import { Form, FormikProps } from "formik";
import { DetailsModel } from "./models/albumModel";
import { UploadObject } from "../../application/upload";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getURL, upload } from "../../store/actions/uploadActions";
import SubmitButton from "./inputs/submitButton";
import AlbumDetailsInput from "./inputs/AlbumDetailsInput";
import { getObjectName } from "../../clients/upload/uploaders";
import { DEFAULT_IMAGE } from "../../clients/upload/index";

interface Props extends FormikProps<DetailsModel> {
    getURL: Function;
    upload: Function;
}

interface State {
    image: UploadObject | null;
}

class DetailsFormComponent extends Component<Props, State> {
    private async upload(file: File) {
        const { object, url } = await this.props.getURL(file);
        this.setState(() => ({ image: { url, object: file } }));
        this.props.setFieldValue("image", object);
    }

    private async submitForm() {
        const { submitForm, setSubmitting, values, validateForm, setStatus } = this.props;

        const errors = await validateForm(values);
        if (Object.keys(errors).length !== 0 || !this.props.isValid) {
            submitForm();
            return;
        }

        setSubmitting(true);

        try {
            if (this.state.image) await this.props.upload([this.state.image]);

            this.props.submitForm();
        } catch (e) {
            console.log(e);
            setStatus("Error");
        }
    }

    constructor(props: Props) {
        super(props);

        const { image } = this.props.initialValues;
        this.props.initialValues.image = image === DEFAULT_IMAGE ? null : image;
    }

    public state = { image: null };

    public render() {
        const { initialValues, isSubmitting, status } = this.props;

        return (
            <Form className="form">
                <AlbumDetailsInput
                    url={initialValues.image === DEFAULT_IMAGE ? null : initialValues.image}
                    onPick={this.upload.bind(this)}
                />

                <div className="form__actions">
                    <button className="btn" type="button" onClick={() => this.props.handleReset()}>
                        Cancel
                    </button>
                    <SubmitButton
                        isSubmitting={isSubmitting}
                        onSubmit={() => {
                            this.props.setFieldValue("image", getObjectName(initialValues.image));
                            this.submitForm();
                        }}
                    >
                        Save
                    </SubmitButton>
                </div>

                {status && <p className="error">Could not upload files, try again later</p>}
            </Form>
        );
    }
}

const DetailsForm = connect(
    null,
    dispatch => bindActionCreators({ getURL, upload }, dispatch)
)(DetailsFormComponent);

export default DetailsForm;
