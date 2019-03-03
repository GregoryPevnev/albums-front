import React, { Component } from "react";
import Navbar from "../containers/app/Navbar";
import Sidebar from "../containers/app/Sidebar";
import { Switch, Route, Redirect } from "react-router";
import Dashboard from "../containers/app/Dashboard";
import Search from "../containers/app/SearchList";
import { Link } from "react-router-dom";
import AlbumView from "../containers/app/AlbumView";
import AlbumAdd from "../containers/app/AlbumNew";
import Footer from "../containers/app/Footer";

interface Props {}

interface State {
    open: boolean;
}

class App extends Component<Props, State> {
    constructor(props: any) {
        super(props);
    }

    public state = { open: false };

    public render() {
        return (
            <div className="app">
                <aside className="app__sidebar">
                    <Sidebar />
                </aside>

                <div className={`app__modal ${this.state.open ? "app__modal--open" : ""}`} onClick={console.log}>
                    <button className="app__modal__close" onClick={() => this.setState(() => ({ open: false }))}>
                        <i className="fas fa-times" />
                    </button>
                    <div className="app__modal__container" onClick={e => e.stopPropagation()}>
                        <Sidebar />
                    </div>
                </div>

                <main className="app__content">
                    <nav className="app__nav">
                        <Navbar onOpen={() => this.setState(() => ({ open: true }))} />
                    </nav>

                    <section className="app__view">
                        <Switch>
                            <Route path="/app/dashboard" component={Dashboard} />
                            <Route path="/app/search" exact={true} component={Search} />

                            {/* <Route path="/my" exact={true} render={()=>"Liked Albums"} /> - No need to (Displayed at Sidebar) */}

                            <Route path="/app/albums/add" exact={true} component={AlbumAdd} />
                            <Route path="/app/albums/:id" exact={true} component={AlbumView} />
                            <Redirect to="/app/dashboard" />
                        </Switch>
                    </section>

                    <footer className="app__footer">
                        <Footer />
                    </footer>

                    <Link className="btn btn--primary btn--floating" to="/app/albums/add" title="Add New Album">
                        <i className="fas fa-plus" />
                    </Link>
                </main>
            </div>
        );
    }
}

export default App;
