import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

require("./main.scss");

window.api = (url) => "https://lgk.io/github-api/?url=" + encodeURIComponent(url);
window.handleError = (err, res) => {
    if (err) {
        console.error(res);

        alert(res.body.message + " - " + res.body.documentation_url);
        throw err;
    }
};

document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(
        React.createElement(App),
        document.getElementById("mount")
    );
});