import * as Yup from "yup";

const signInSchema = Yup.object({
    email: Yup.string()
        .required("Enter email")
        .email("Invalid Email"),
    password: Yup.string().required("Enter password")
});

export default signInSchema;
