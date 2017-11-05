import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Superagent from "superagent";

import SyntaxHighlighter from "../components/SyntaxHighlighter";
import Page from "../components/Page";
import Busy from "../components/Busy";

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
        Superagent.get(api("https://api.github.com/repos/lgkonline/skill-guide/contents/snippets")).end((err0, res0) => {
            if (err0) throw err0;

            // Set state
            this.setState({ data: res0.body }, () => {
                this.state.data.map(genre => {
                    Superagent.get(api(genre.git_url)).end((err1, res1) => {
                        if (err1) throw err1;

                        genre.tree = res1.body.tree;

                        genre.tree.map(snippet => {
                            Superagent.get(api(snippet.url)).end((err2, res2) => {
                                if (err2) throw err2;

                                snippet.tree = res2.body.tree;

                                snippet.tree.map(file => {
                                    Superagent.get(api(file.url)).end((err3, res3) => {
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

    render() {
        return (
            <Page area="Snippets" title="Snippets">
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

                <div className="row">
                    {this.state.data ?
                        this.state.data.map((genre, h) =>
                            <div key={h} className="col-md-6 py-2">
                                <h1 className="display-3 mb-2">{genre.name}</h1>

                                {genre.tree ?
                                    genre.tree.map((snippet, i) =>
                                        <div key={i} className="fade-in card bg-snippets text-white mb-3">
                                            <div className="card-body">
                                                <h2 className="pb-2">
                                                    {snippet.path}
                                                </h2>

                                                {snippet.tree ?
                                                    snippet.tree.map((file, j) =>
                                                        <div key={j} className="fade-in card text-dark">
                                                            <div className="card-body">
                                                                <h3 className="text-center">{file.path}</h3>

                                                                {file.blob ?
                                                                    <SyntaxHighlighter
                                                                        // language based on the file extension
                                                                        language={file.path.split(".")[file.path.split(".") - 1]}
                                                                    >
                                                                        {atob(file.blob.content)}
                                                                    </SyntaxHighlighter>
                                                                    :
                                                                    <Busy />
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                    :
                                                    <Busy />
                                                }
                                            </div>
                                        </div>
                                    )
                                    :
                                    <Busy />
                                }
                            </div>
                        )
                        :
                        <Busy />
                    }
                </div>
            </Page>
        );
    }
}

export default SnippetsPage;