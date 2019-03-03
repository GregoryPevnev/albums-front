import SignUpModel from "../../ui/forms/models/signUpModel";
import SignInModel from "../../ui/forms/models/signInModel";
import Bundle from "../bundle";
import { Actions } from "./types";
import User from "../../application/models/User";

export interface AuthAction {
    type: Actions.Auth;
    payload: User;
}

export interface UnauthAction {
    type: Actions.Unauth;
}

export const signIn = (data: SignInModel) => async (dispatch: Function, _: any, { auth }: Bundle) => {
    const user = await auth.signIn(data);
    dispatch({ type: Actions.Auth, payload: user });
};

export const signUp = (data: SignUpModel) => async (dispatch: Function, _: any, { auth }: Bundle) => {
    const user = await auth.signUp(data);
    dispatch({ type: Actions.Auth, payload: user });
};

export const signOut = () => async (dispatch: Function, _: any, { auth }: Bundle) => {
    await auth.signOut();
    dispatch({ type: Actions.Unauth });
};
