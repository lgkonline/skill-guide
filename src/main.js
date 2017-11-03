import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

require("./main.css");

document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(
        React.createElement(App),
        document.getElementById("mount")
    );
});