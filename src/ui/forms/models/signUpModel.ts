interface SignUpModel {
    email: string;
    username: string;
    password: string;
    repeat: string;
}

export const defaultSignUpModel: SignUpModel = { email: "", username: "", password: "", repeat: "" };

export default SignUpModel;
