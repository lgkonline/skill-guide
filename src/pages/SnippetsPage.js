import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Superagent from "superagent";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github, githubGist } from "react-syntax-highlighter/dist/styles";

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
        // First get the correct git url
        Superagent.get("https://api.github.com/repos/lgkonline/skill-guide/contents/snippets").end((err0, res0) => {
            if (err0) throw err0;

            // Use Git URL to get the sub folders of "snippets"
            Superagent.get(res0.body[0].git_url).end((err1, res1) => {
                if (err1) throw err1;

                // Set snippets to state
                this.setState({ snippets: res1.body.tree }, () => {
                    // Go through each snippet
                    this.state.snippets.map(snippet => {
                        // Receive the files of each snippet folder
                        Superagent.get(snippet.url).end((err2, res2) => {
                            if (err2) throw err2;

                            // Go through each file and receive its content as blob
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
        });
    }

    selectText(areaId) {
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(areaId));
            range.select();
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(document.getElementById(areaId));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    }

    render() {
        return (
            <Page>
                <PageTitle>Snippets</PageTitle>

                <p className="lead">
                    Hint: Double click on a source code to select it all.
                </p>

                <p>
                    You want to add snippets? Clone this repository from GitHub: <a href="https://github.com/lgkonline/skill-guide">https://github.com/lgkonline/skill-guide</a><br />
                    Then add your code into the snippets folder and make a pull request.<br />
                    Thank you very much! 😁
                </p>

                <p>
                    If you need any help you can <a href="https://github.com/lgkonline/skill-guide/issues">report an issue</a> or just message me directly on Twitter: <a href="https://twitter.com/lgkonline">@lgkonline</a>.
                </p>

                {this.state.snippets &&
                    this.state.snippets.map((snippet, i) =>
                        <div key={i} className="bg-teal-lighter rounded p-4 mb-4">
                            <h1 className="font-medium pb-2">
                                {snippet.path}
                            </h1>

                            {snippet.tree && snippet.tree.map((file, j) =>
                                <div key={j} className="bg-grey-light p-1 rounded">
                                    <h4 className="text-center">{file.path}</h4>

                                    {file.blob &&
                                        <SyntaxHighlighter
                                            id={"syntax-" + i + "-" + j}
                                            onDoubleClick={() => {
                                                this.selectText("syntax-" + i + "-" + j);
                                            }}

                                            // language based on the file extension
                                            language={file.path.split(".")[file.path.split(".") - 1]}
                                            style={githubGist}
                                        >
                                            {atob(file.blob.content)}
                                        </SyntaxHighlighter>
                                    }
                                </div>
                            )}
                        </div>
                    )
                }
            </Page>
        );
    }
}

SnippetsPage.propTypes = {
    firstProp: PropTypes.string
};

export default SnippetsPage;