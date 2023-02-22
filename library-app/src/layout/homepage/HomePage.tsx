import {Navbar} from "../navbar-and-footer/Navbar";
import {ExploreTopBooks} from "./components/ExploreTopBooks";
import {Carousel} from "./components/Carousel";
import {Heroes} from "./components/Heroes";
import {LibraryServices} from "./components/LibraryServices";
import {Footer} from "../navbar-and-footer/Footer";
import React from "react";

export const HomePage = () => {
    return (
        <>
            <Navbar/>
            <ExploreTopBooks/>
            <Carousel/>
            <Heroes/>
            <LibraryServices/>
            <Footer/>
        </>
    );
};