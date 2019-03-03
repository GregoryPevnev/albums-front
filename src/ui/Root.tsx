import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch } from "react-router";
import App from "./pages/App";
import Main from "./pages/Main";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

const Root = () => (
    <Router>
        <div>
            <Switch>
                <PrivateRoute path="/app" component={App} />
                <PublicRoute path="/" component={Main} />
            </Switch>
        </div>
    </Router>
);

export default Root;
