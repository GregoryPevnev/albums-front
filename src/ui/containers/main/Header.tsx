import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
    <div className="header">
        <NavLink exact={true} to="/" className="header__item header__item--main" activeClassName="header__item--active">
            Albums
        </NavLink>

        <div>
            <NavLink exact={true} to="/signin" className="header__item" activeClassName="header__item--active">
                Sign In
            </NavLink>
            <NavLink
                exact={true}
                to="/signup"
                className="header__item header__item--primary"
                activeClassName="header__item--primary--active"
            >
                Sign Up
            </NavLink>
        </div>
    </div>
);

export default Header;
