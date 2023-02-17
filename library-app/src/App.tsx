import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";

import {Navbar} from "./layout/navbar-and-footer/Navbar";
import {ExploreTopBooks} from "./layout/homepage/ExploreTopBooks";

function App() {
    return (
        <div>
            <Navbar/>
            <ExploreTopBooks/>
        </div>
    );
}

export default App;
