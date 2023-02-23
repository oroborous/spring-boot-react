import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import {HomePage} from "./layout/homepage/HomePage";
import {Navbar} from "./layout/navbar-and-footer/Navbar";
import {Footer} from "./layout/navbar-and-footer/Footer";
import {SearchBooksPage} from "./layout/search-books-page/SearchBooksPage";
import {Redirect, Route, Switch} from "react-router-dom";
import {BookCheckoutPage} from "./layout/book-checkout-page/BookCheckoutPage";


export const App = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar/>
            <div className="flex-grow-1">
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
                    <Route path="/checkout/:bookId">
                        <BookCheckoutPage/>
                    </Route>
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}