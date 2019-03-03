import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import { RouteParams, routeMapper } from "./routeParams";

const PublicRouteComponent = ({ authed, ...params }: RouteParams) =>
    authed ? <Redirect to="/app" /> : <Route {...params} />;

const PublicRoute = connect(routeMapper)(PublicRouteComponent);

export default PublicRoute;
