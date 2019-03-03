import React from "react";
import { Form, FormikProps } from "formik";
import SubmitButton from "./inputs/SubmitButton";
import FormField from "./inputs/FormField";
import ReviewModel from "./models/reviewModel";

const ReviewForm = ({ isSubmitting, handleReset, status }: FormikProps<ReviewModel>) => (
    <Form className="form">
        <FormField name="title" type="text" placeholder="Title" />
        <FormField name="rating" type="number" min="0" max="10" placeholder="Rating" />
        <FormField name="text" component="textarea" placeholder="Text" />

        <div className="form__actions">
            <button className="btn" type="button" onClick={() => handleReset()}>
                Discard
            </button>
            <SubmitButton isSubmitting={isSubmitting}>Save</SubmitButton>
        </div>

        {status && <p className="error">An error occured, try again later</p>}
    </Form>
);

export default ReviewForm;
