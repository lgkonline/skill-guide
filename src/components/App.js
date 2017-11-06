import React from "react";
import { Router, Route, Link } from "react-router-dom";
import createHistory from "history/createHashHistory";

import HomePage from "../pages/HomePage";
import GuidePage from "../pages/GuidePage";
import SnippetsPage from "../pages/SnippetsPage";

window.routeHistory = createHistory();

class App extends React.Component {
    render() {
        return (
            <Router history={routeHistory}>
                <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/guide/:user/:repo" component={GuidePage} />
                    <Route path="/snippets" component={SnippetsPage} />
                </div>
            </Router>
        );
    }
}

export default App;