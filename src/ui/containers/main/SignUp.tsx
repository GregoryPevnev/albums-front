import React from "react";
import { Formik } from "formik";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SignUpForm from "../../forms/SignUpForm";
import signUpSchema from "../../forms/schemas/signUpSchema";
import { signUp } from "../../../store/actions/authActions";
import { defaultSignUpModel } from "../../forms/models/signUpModel";

interface Props extends RouteComponentProps {
    signUp: Function;
}

const passwordValidator = (password: string, repeat: string) => {
    if (repeat === "") return "Repeat Password";
    if (repeat !== password) return "Passwords do not match";
    return null;
};

const SignUpComponent = ({ signUp, history }: Props) => (
    <div className="container container--panel">
        <h2 className="centerer">Sign Up</h2>

        <div className="auth-form">
            <Formik
                initialValues={defaultSignUpModel}
                component={SignUpForm}
                onSubmit={async ({ email, username, password }, actions) => {
                    actions.setSubmitting(true);

                    try {
                        await signUp({ email, username, password });
                        history.push("/app");
                    } catch (e) {
                        console.log(e);
                        actions.setFieldError(e.type, `User with such ${e.type} already exists`);
                    }

                    actions.setSubmitting(false);
                }}
                validationSchema={signUpSchema}
                validate={({ password, repeat }) => {
                    const passwordError = passwordValidator(password, repeat);
                    return passwordError ? { repeat: passwordError } : {};
                }}
            />
        </div>

        <hr />

        <div className="centerer">
            <h3>Already have Account?</h3>
            <Link to="/signin" className="btn btn--inline">
                Sign In
            </Link>
        </div>
    </div>
);

const SignUp = connect(
    null,
    dispatch => bindActionCreators({ signUp }, dispatch)
)(SignUpComponent);

export default SignUp;
