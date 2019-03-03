import { SignIn, SignOut, SignUp, GetUser } from "../application/auth";
import { LoadMyAlbums, LoadAlbums } from "../application/loaders";
import { SearchAlbums } from "../application/search";
import { ViewAlbum } from "../application/viewers";
import { GetURL, Upload } from "../application/upload";
import { UpdateAlbum } from "../application/operations";
import {
    CreateAlbum,
    DeleteAlbum,
    CreateReview,
    DeleteReview,
    EditReview,
    LikeAlbum,
    DislikeAlbum
} from "../application/operations";

interface Bundle {
    auth: {
        signIn: SignIn;
        signOut: SignOut;
        signUp: SignUp;
        getUser: GetUser;
    };
    albums: {
        loadMyAlbums: LoadMyAlbums;
        loadAlbums: LoadAlbums;
        search: SearchAlbums;
        createAlbum: CreateAlbum;
        deleteAlbum: DeleteAlbum;
        updateAlbum: UpdateAlbum;
        like: LikeAlbum;
        dislike: DislikeAlbum;
    };
    view: ViewAlbum;
    upload: {
        getURL: GetURL;
        upload: Upload;
    };
    reviews: {
        createReview: CreateReview;
        deleteReview: DeleteReview;
        editReview: EditReview;
    };
}

export default Bundle;
