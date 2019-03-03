import React, { Fragment } from "react";
import { Field, ErrorMessage } from "formik";

interface Props {
    name: string;
    [index: string]: string;
}

const FormField = ({ name, ...props }: Props) => (
    <Fragment>
        <Field name={name} {...props} />
        <p className="form__error">
            <ErrorMessage name={name} />
        </p>
    </Fragment>
);

export default FormField;
