interface SignInModel {
    email: string;
    password: string;
}

export const defaultSignInModel: SignInModel = { email: "", password: "" };

export default SignInModel;
