import * as Yup from "yup";

const RATING_ERROR = "Rating must be between 0 and 10";

const reviewSchema = Yup.object({
    title: Yup.string()
        .required("Enter title of the review")
        .max(30, "The title is too long"),
    rating: Yup.number()
        .required("Enter rating")
        .min(0, RATING_ERROR)
        .max(10, RATING_ERROR),
    text: Yup.string().max(5000, "The review is too long")
});

export default reviewSchema;
