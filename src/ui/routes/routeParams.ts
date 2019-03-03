import { RouteProps } from "react-router";
import { AppState } from "../../store/reducers/index";

export interface RouteParams extends RouteProps {
    authed: boolean;
}

export const routeMapper = ({ user: { user } }: AppState) => ({ authed: user !== null });
