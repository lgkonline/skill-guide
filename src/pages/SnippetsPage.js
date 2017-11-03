import React from "react";
import PropTypes from "prop-types";

import Page from "../components/Page";
import PageTitle from "../components/PageTitle";

class SnippetsPage extends React.Component {
    static get defaultProps() {
        return {
            firstProp: "Hello World"
        };
    }

    render() {
        return (
            <Page>
                <PageTitle>Snippets</PageTitle>
            </Page>
        );
    }
}

SnippetsPage.propTypes = {
    firstProp: PropTypes.string
};

export default SnippetsPage;