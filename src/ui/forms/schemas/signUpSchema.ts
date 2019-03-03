import * as Yup from "yup";

const STRONG_PASSWORD = /(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*[0-9].*){6}/;

const signUpSchema = Yup.object({
    email: Yup.string()
        .required("Enter email")
        .email("Invalid Email"),
    username: Yup.string()
        .required("Enter username")
        .min(3, "Enter longer username")
        .max(30, "Enter shorter username"),
    password: Yup.string()
        .required("Enter password")
        .matches(STRONG_PASSWORD, "Password is too weak"),
    repeat: Yup.string().required("Repeat password")
});

export default signUpSchema;
