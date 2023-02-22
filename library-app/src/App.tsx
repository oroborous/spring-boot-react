import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import {HomePage} from "./layout/homepage/HomePage";
import {Navbar} from "./layout/navbar-and-footer/Navbar";
import {Footer} from "./layout/navbar-and-footer/Footer";
import {SearchBooksPage} from "./layout/search-books-page/SearchBooksPage";


export const App = () => {
    return (
        <div>
            <Navbar/>
            {/*<HomePage/>*/}
            <SearchBooksPage/>
            <Footer/>
        </div>
    );
}