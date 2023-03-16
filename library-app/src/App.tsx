import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import {HomePage} from "./layout/homepage/HomePage";
import {Navbar} from "./layout/navbar-and-footer/Navbar";
import {Footer} from "./layout/navbar-and-footer/Footer";
import {SearchBooksPage} from "./layout/search-books-page/SearchBooksPage";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {BookCheckoutPage} from "./layout/book-checkout-page/BookCheckoutPage";
import {oktaConfig} from "./lib/OktaConfig";
import {OktaAuth, toRelativeUrl} from "@okta/okta-auth-js";
import {Security, LoginCallback, SecureRoute} from "@okta/okta-react";
import LoginWidget from "./auth/LoginWidget";
import {ReviewListPage} from "./layout/book-checkout-page/ReviewListPage";
import {ShelfPage} from "./layout/shelf-page/ShelfPage";
import {MessagesPage} from "./layout/messages-page/MessagesPage";
import {ManageLibraryPage} from "./layout/manage-library-page/ManageLibraryPage";

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
    const customAuthHandler = () => {
        history.push("/login");
    };

    const history = useHistory();

    const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
        history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Security oktaAuth={oktaAuth}
                      restoreOriginalUri={restoreOriginalUri}
                      onAuthRequired={customAuthHandler}>
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
                        <Route path="/reviewlist/:bookId">
                            <ReviewListPage/>
                        </Route>
                        <Route path="/checkout/:bookId">
                            <BookCheckoutPage/>
                        </Route>
                        <Route path="/login"
                               render={() => <LoginWidget config={oktaConfig}/>}/>
                        <Route path="/login/callback"
                               component={LoginCallback}/>
                        <SecureRoute path="/shelf">
                            <ShelfPage/>
                        </SecureRoute>
                        <SecureRoute path="/messages">
                            <MessagesPage/>
                        </SecureRoute>
                        <SecureRoute path="/admin">
                            <ManageLibraryPage/>
                        </SecureRoute>
                    </Switch>
                </div>
                <Footer/>
            </Security>
        </div>
    );
}