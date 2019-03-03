import * as Yup from "yup";

const albumSchema = Yup.object({
    title: Yup.string()
        .required("Enter title")
        .max(50, "The title is too long"),
    artist: Yup.string()
        .required("Enter artist")
        .max(50, "The artist's name is too long"),
    image: Yup.string().nullable(true),
    songs: Yup.array(
        // Important: Allowing anything -> Filtering and Mapping manually
        Yup.object({
            name: Yup.string().required(),
            object: Yup.string().required()
        }).nullable(true)
    ).min(1)
});

export default albumSchema;
