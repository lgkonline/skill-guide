import React from "react";
import { Router, Route, Link } from "react-router-dom";
import createHistory from "history/createHashHistory";

import global from "../global";
import HomePage from "../pages/HomePage";
import GuidesPage from "../pages/GuidesPage";
import GuidePage from "../pages/GuidePage";
import NewGuidePage from "../pages/NewGuidePage";
import SnippetsPage from "../pages/SnippetsPage";

global.history = createHistory();

class App extends React.Component {
    render() {
        return (
            <Router history={global.history}>
                <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/guides" component={GuidesPage} />
                    <Route path="/guide/:name" component={GuidePage} />
                    <Route path="/new-guide" component={NewGuidePage} />
                    <Route path="/snippets" component={SnippetsPage} />
                </div>
            </Router>
        );
    }
}

export default App;