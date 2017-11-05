import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

require("./main.scss");

window.api = (url) => "https://lgk.io/github-api/?url=" + encodeURIComponent(url);

document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(
        React.createElement(App),
        document.getElementById("mount")
    );
});