import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import {HomePage} from "./layout/homepage/HomePage";
import {Navbar} from "./layout/navbar-and-footer/Navbar";
import {Footer} from "./layout/navbar-and-footer/Footer";
import {SearchBooksPage} from "./layout/search-books-page/SearchBooksPage";
import {Redirect, Route, Switch} from "react-router-dom";


export const App = () => {
    return (
        <div>
            <Navbar/>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/home"/>
                </Route>
                <Route path="/home">
                    <HomePage/>
                </Route>
                <Route path="/search">
                    <SearchBooksPage/>
                </Route>
            </Switch>
            <Footer/>
        </div>
    );
}