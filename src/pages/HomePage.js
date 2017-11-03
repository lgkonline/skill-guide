import React from "react";
import { Link } from "react-router-dom";

import Page from "../components/Page";
import PageTitle from "../components/PageTitle";
import Row from "../components/Row";
import Col from "../components/Col";

class Homepage extends React.Component {
    render() {
        return (
            <Page>
                <PageTitle>What is Skill Guide?</PageTitle>
                <p className="lead">Are you stocking when you want to create a new project? For example a React project? There are many ways to do this.<br />
                    Skill Guide should help you. Here you'll find guides for many scenarios.</p>

                <Row>
                    <Col>
                        <button type="button" disabled className="large-btn bg-orange hover:bg-orange-light text-orange-darker">
                            <span className="icon-arrow-right2" /><br />Guides
                        </button>
                    </Col>

                    <Col>
                        <Link to="/snippets" className="large-btn bg-teal hover:bg-teal-light text-teal-darker">
                            <span className="icon-code" /><br />Snippets
                        </Link>
                    </Col>
                </Row>
            </Page>
        );
    }
}

export default Homepage;