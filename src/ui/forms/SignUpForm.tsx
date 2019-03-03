import React from "react";
import { Form, FormikProps } from "formik";
import SignUpModel from "./models/signUpModel";
import SubmitButton from "./inputs/SubmitButton";
import FormField from "./inputs/FormField";

const SignUpForm = ({ isSubmitting }: FormikProps<SignUpModel>) => (
    <Form className="form">
        <FormField name="email" type="email" placeholder="Email" />
        <FormField name="username" type="text" placeholder="Username" />
        <FormField name="password" type="password" placeholder="Password" />
        <FormField name="repeat" type="password" placeholder="Confirm Password" />

        <div className="form__field form__field--action">
            <SubmitButton isSubmitting={isSubmitting}>Sign Up</SubmitButton>
        </div>
    </Form>
);

export default SignUpForm;
