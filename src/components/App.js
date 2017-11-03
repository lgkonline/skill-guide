import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import HomePage from "../pages/HomePage";
import SnippetsPage from "../pages/SnippetsPage";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/snippets" component={SnippetsPage} />
                </div>
            </Router>
        );
    }
}

export default App;