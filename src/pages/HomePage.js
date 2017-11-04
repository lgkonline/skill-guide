import React from "react";
import { Link } from "react-router-dom";

import Page from "../components/Page";
import PageTitle from "../components/PageTitle";

class Homepage extends React.Component {
    render() {
        return (
            <Page>
                <PageTitle>What is Skill Guide?</PageTitle>
                <p className="lead">Are you stocking when you want to create a new project? For example a React project? There are many ways to do this.<br />
                    Skill Guide should help you. Here you'll find guides for many scenarios.</p>

                <div className="row">
                    <div className="col">
                        <button type="button" disabled className="btn btn-guides btn-block btn-lg">
                            <span className="icon-arrow-right2" /><br />Guides
                        </button>
                    </div>

                    <div className="col">
                        <Link to="/snippets" className="btn btn-snippets btn-block btn-lg">
                            <span className="icon-code" /><br />Snippets
                        </Link>
                    </div>
                </div>
            </Page>
        );
    }
}

export default Homepage;