import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
    <div className="container">
        <h1 className="centerer">Welcome to Albums</h1>

        <div className="container__columns">
            <div className="container__text-column">
                <p>A website for playing, searching and saving music albums.</p>
            </div>

            <div className="container__btns-column centerer">
                <h2>Have an Account?</h2>
                <p>Log in to access functionality of the website</p>
                <Link className="btn btn--block" to="/signin">
                    Sign In
                </Link>

                <hr />

                <h2>No Account?</h2>
                <p>Sign up and get started now</p>
                <Link className="btn btn--primary btn--block" to="/signup">
                    Sign Up
                </Link>
            </div>
        </div>
    </div>
);

export default Home;
