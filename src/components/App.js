import React from "react";
import { Router, Route, Link } from "react-router-dom";
import createHistory from "history/createHashHistory";


import global from "../global";
import HomePage from "../pages/HomePage";
import SnippetsPage from "../pages/SnippetsPage";

global.history = createHistory();

class App extends React.Component {
    render() {
        return (
            <Router history={global.history}>
                <div>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/snippets" component={SnippetsPage} />
                </div>
            </Router>
        );
    }
}

export default App;