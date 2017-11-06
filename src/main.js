import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

require("./main.scss");

window.api = (url) => "https://lgk.io/github-api/?url=" + encodeURIComponent(url);
window.routeHistory;
window.handleError = (err, res) => {
    if (err) {
        console.error(res);

        alert(res.body.message + " - " + res.body.documentation_url);
        throw err;
    }
};
window.guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(
        React.createElement(App),
        document.getElementById("mount")
    );
});