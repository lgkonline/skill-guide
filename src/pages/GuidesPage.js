import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Superagent from "superagent";

import Page from "../components/Page";
import Busy from "../components/Busy";

class GuidesPage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Page area="Guides" title="Guides">
                <div className="list-group">
                    <Link to="/guide" className="list-group-item list-group-item-action">
                        <h5>React project</h5>
                        <p>A Skill Guide to create an empty React project.</p>
                    </Link>
                </div>
            </Page>
        );
    }
}

export default GuidesPage;