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
    constructor() {
        super();

        this.state = {
            data: null
        };
    }

    componentDidMount() {
        this.getSnippets();
    }

    getSnippets() {
        // First get the correct git url
        Superagent.get("https://api.github.com/repos/lgkonline/skill-guide/contents/snippets").end((err0, res0) => {
            if (err0) throw err0;

            // Set state
            this.setState({ data: res0.body }, () => {
                this.state.data.map(genre => {
                    Superagent.get(genre.git_url).end((err1, res1) => {
                        if (err1) throw err1;

                        genre.tree = res1.body.tree;

                        genre.tree.map(snippet => {
                            Superagent.get(snippet.url).end((err2, res2) => {
                                if (err2) throw err2;

                                snippet.tree = res2.body.tree;

                                snippet.tree.map(file => {
                                    Superagent.get(file.url).end((err3, res3) => {
                                        if (err3) throw err3;

                                        file.blob = res3.body;

                                        this.setState({ data: this.state.data });
                                    });
                                });
                            });
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

                {this.state.data && this.state.data.map((genre, h) =>
                    <div key={h}>
                        <h2>{genre.name}</h2>

                        {genre.tree && genre.tree.map((snippet, i) =>
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
                        )}
                    </div>
                )}
            </Page>
        );
    }
}

export default SnippetsPage;