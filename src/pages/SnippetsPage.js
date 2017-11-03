import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Superagent from "superagent";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/styles";

import Page from "../components/Page";
import PageTitle from "../components/PageTitle";
import Row from "../components/Row";
import Col from "../components/Col";

class SnippetsPage extends React.Component {
    static get defaultProps() {
        return {
            firstProp: "Hello World"
        };
    }

    constructor() {
        super();

        this.state = {
            snippets: null
        };
    }

    componentDidMount() {
        this.getSnippets();
    }

    getSnippets() {
        Superagent.get("https://api.github.com/repos/lgkonline/skill-guide/git/trees/4e27ec7f7ed65f130450c0546875a74b65a78625").end((err, res) => {
            if (err) throw err;

            console.log(res);

            this.setState({ snippets: res.body.tree }, () => {
                this.state.snippets.map(snippet => {
                    Superagent.get(snippet.url).end((err2, res2) => {
                        if (err2) throw err2;

                        res2.body.tree.map(file => {
                            Superagent.get(file.url).end((err3, res3) => {
                                if (err3) throw err3;

                                file.blob = res3.body;

                                this.setState({ snippets: this.state.snippets });
                            });
                        });

                        snippet.tree = res2.body.tree;

                        this.setState({ snippets: this.state.snippets });
                    });
                });
            });
        });
    }

    render() {
        return (
            <Page>
                <PageTitle>Snippets</PageTitle>

                {this.state.snippets &&
                    <Row>
                        {this.state.snippets.map((snippet, i) =>
                            <Col key={i}>
                                <h1>
                                    {snippet.path}
                                </h1>

                                {snippet.tree && snippet.tree.map((file, j) =>
                                    <div key={j}>
                                        <strong>{file.path}</strong>

                                        {file.blob &&
                                            <SyntaxHighlighter language="javascript" style={github}>{atob(file.blob.content)}</SyntaxHighlighter>
                                        }
                                    </div>
                                )}
                            </Col>
                        )}
                    </Row>
                }
            </Page>
        );
    }
}

SnippetsPage.propTypes = {
    firstProp: PropTypes.string
};

export default SnippetsPage;