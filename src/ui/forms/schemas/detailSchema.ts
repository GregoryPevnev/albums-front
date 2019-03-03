import * as Yup from "yup";

const detailSchema = Yup.object({
    title: Yup.string()
        .required("Enter title")
        .max(50, "The title is too long"),
    artist: Yup.string()
        .required("Enter artist")
        .max(50, "The artist's name is too long"),
    image: Yup.string().nullable(true)
});

export default detailSchema;
