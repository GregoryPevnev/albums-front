import React, { Dispatch } from "react";
import { Formik } from "formik";
import SignInForm from "../../forms/SignInForm";
import signInSchema from "../../forms/schemas/signInSchema";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signIn } from "../../../store/actions/authActions";
import { defaultSignInModel } from "../../forms/models/signInModel";

interface Props extends RouteComponentProps {
    signIn: Function;
}

const extractTo = (search: string) => {
    const match = search.match(/^\?error=(\S+)$/);
    return match ? match[1] : null;
};

const SignInComponent = ({ location: { search }, history, signIn }: Props) => {
    const error = extractTo(search);

    return (
        <div className="container container--panel">
            <h2 className="centerer">Sign In</h2>

            <div className="auth-form">
                <Formik
                    component={SignInForm}
                    onSubmit={async (values, actions) => {
                        actions.setSubmitting(true);

                        try {
                            await signIn(values);
                            history.push("/app");
                        } catch (e) {
                            actions.setStatus("Invalid email or password");
                        }

                        actions.setSubmitting(false);
                    }}
                    initialValues={defaultSignInModel}
                    validationSchema={signInSchema}
                />
            </div>

            {error && <p className="error centerer">Sign In First</p>}

            <hr />

            <div className="centerer">
                <h3>No Account?</h3>
                <Link to="/signup" className="btn btn--inline">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

const SignIn = connect(
    null,
    dispatch => bindActionCreators({ signIn }, dispatch)
)(SignInComponent);

export default SignIn;
