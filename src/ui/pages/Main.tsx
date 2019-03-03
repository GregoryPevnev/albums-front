import React from "react";
import Header from "../containers/main/Header";
import { Route, Switch } from "react-router";
import NotFoundPage from "./NotFound";
import SignIn from "../containers/main/SignIn";
import SignUp from "../containers/main/SignUp";
import Home from "../containers/main/Home";

const Main = () => (
    <div className="main">
        <header className="main__header">
            <Header />
        </header>
        <main className="main__content">
            <Switch>
                <Route path="/" component={Home} exact={true} />
                <Route path="/signin" component={SignIn} exact={true} />
                <Route path="/signup" component={SignUp} exact={true} />
                <Route path="*" component={NotFoundPage} />
            </Switch>
        </main>
    </div>
);

export default Main;
