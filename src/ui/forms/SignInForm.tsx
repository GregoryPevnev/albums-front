import React from "react";
import { Form, FormikProps } from "formik";
import SignInModel from "./models/signInModel";
import SubmitButton from "./inputs/submitButton";
import FormField from "./inputs/FormField";

const SignInForm = ({ isSubmitting, status }: FormikProps<SignInModel>) => (
    <Form className="form">
        <FormField name="email" type="email" placeholder="Email" />
        <FormField name="password" type="password" placeholder="Password" />

        <div className="form__field form__field--action">
            <SubmitButton isSubmitting={isSubmitting}>Sign In</SubmitButton>
        </div>

        {status && (
            <p className="error" style={{ textAlign: "right" }}>
                {status}
            </p>
        )}
    </Form>
);

export default SignInForm;
