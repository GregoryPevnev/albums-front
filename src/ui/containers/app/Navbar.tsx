import React, { Component } from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import Search from "../../components/Search";
import { formatSearch } from "../../../store/params";
import { AppState } from "../../../store/reducers/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { findSuggestions } from "../../../store/actions/searchActions";

interface Props extends RouteComponentProps {
    albums: string[];

    findSuggestions: Function;

    onOpen: Function;
}

const NavbarComponent = ({ history, albums, findSuggestions, onOpen }: Props) => (
    <div className="navbar">
        <button className="btn btn--burger btn--burger--sm" style={{ marginRight: 10 }} onClick={() => onOpen()}>
            <i className="fas fa-bars" />
        </button>

        <div className="navbar__links header">
            <NavLink className="header__item" to={{ pathname: "/app/dashboard", search: "?mode=top" }}>
                Top Rated
            </NavLink>
            <NavLink className="header__item" to={{ pathname: "/app/dashboard", search: "?mode=recent" }}>
                Most Recent
            </NavLink>
        </div>

        <div className="navbar__controls">
            <button className="btn btn--burger btn--burger--xs" style={{ marginRight: 10 }} onClick={() => onOpen()}>
                <i className="fas fa-bars" />
            </button>
            <Search
                onSearch={search => {
                    if (search && search.length > 0)
                        history.push({
                            search: formatSearch(search),
                            pathname: "/app/search"
                        });
                }}
                onType={term => findSuggestions(term)}
                items={albums}
                // IMPORTANT: Make suggestions unique - FOR "key"
            />
        </div>
    </div>
);

const Navbar = connect(
    ({ search: { suggestions } }: AppState) => ({ albums: suggestions }),
    dispatch => bindActionCreators({ findSuggestions }, dispatch)
)(NavbarComponent);

export default withRouter(Navbar);
