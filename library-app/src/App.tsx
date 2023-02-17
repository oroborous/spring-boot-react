import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";

import {Navbar} from "./layout/navbar-and-footer/Navbar";
import {ExploreTopBooks} from "./layout/homepage/ExploreTopBooks";
import {Carousel} from "./layout/homepage/Carousel";
import {Heroes} from "./layout/homepage/Heroes";

function App() {
    return (
        <div>
            <Navbar/>
            <ExploreTopBooks/>
            <Carousel/>
            <Heroes/>
        </div>
    );
}

export default App;
