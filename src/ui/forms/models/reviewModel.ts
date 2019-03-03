interface ReviewModel {
    title: string;
    rating: string;
    text: string;
}

export const defaultReviewModel: ReviewModel = { title: "", rating: "", text: "" };

export default ReviewModel;
