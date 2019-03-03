import React from "react";
import { connect } from "react-redux";
import { RouteParams, routeMapper } from "./routeParams";
import { Redirect, Route } from "react-router";

const PrivateRouteComponent = ({ authed, ...params }: RouteParams) =>
    authed ? (
        <Route {...params} />
    ) : (
        <Redirect
            to={{
                pathname: "/signin",
                search: "?error=" + params.path
            }}
        />
    );

const PrivateRoute = connect(routeMapper)(PrivateRouteComponent);

export default PrivateRoute;
