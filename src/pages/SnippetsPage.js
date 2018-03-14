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
            data: null,
            genres: [],
            selectedGenre: null
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

                this.state.data.map(snippet => {
                    const nameSplitted = snippet.name.split(/[-.]/);

                    snippet.genre = nameSplitted[0];
                    snippet.title = nameSplitted[1];

                    if (!(this.state.genres.indexOf(snippet.genre) > -1)) {
                        this.state.genres.push(snippet.genre);
                        this.setState({ genres: this.state.genres });
                    }

                    console.log(snippet);
                    Superagent.get(api(snippet.git_url)).end((err3, res3) => {
                        if (err3) throw err3;

                        snippet.blob = res3.body;

                        this.setState({ data: this.state.data });
                    });
                });

            });
        });
    }

    render() {
        return (
            <Page area="Snippets" title="Snippets" containerClass="container-fluid">
                <div className="row">
                    <div className="col-md-7">
                        <p className="lead">
                            Hint: Double click on a source code to select it all.
                        </p>

                        <p>
                            You want to add snippets? You can do it on GitHub: <a href="https://github.com/lgkonline/skill-guide">https://github.com/lgkonline/skill-guide</a><br />
                            Then add your code into the snippets folder and make a pull request.
                            Make sure to name the file in this format: <code>[genre]-[title].[ext]</code> (e.g. <code>CSS-General Style.css</code>)<br />
                            Thank you very much! 😁
                        </p>

                        <p>
                            If you need any help you can <a href="https://github.com/lgkonline/skill-guide/issues">report an issue</a> or just message me directly on Twitter: <a href="https://twitter.com/lgkonline">@lgkonline</a>.
                        </p>
                    </div>

                    <div className="col-md-5">
                        <div className="btn-group btn-group-lg">
                            <button
                                className={"btn btn-light " + (!this.state.selectedGenre ? "active" : "")}
                                onClick={() => this.setState({ selectedGenre: null })}
                            >
                                Show all
                            </button>

                            {this.state.genres.map(genre =>
                                <button
                                    key={genre}
                                    className={"btn btn-light " + (this.state.selectedGenre == genre ? "active " : null)}
                                    onClick={() => this.setState({ selectedGenre: genre })}
                                >
                                    {genre}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row">
                    {this.state.data ?
                        this.state.data.map((snippet, h) =>
                            (!this.state.selectedGenre || snippet.genre == this.state.selectedGenre) &&
                            <div key={h} className="col-md-4 py-2">
                                <div className={`fade-in card bg-snippets bg-${snippet.genre} text-white mb-3`}>
                                    <div className="card-body">
                                        <h2 className="pb-2">
                                            {snippet.title}
                                        </h2>

                                        <div className="fade-in card text-dark">
                                            <div className="card-body">
                                                {snippet.blob ?
                                                    <SyntaxHighlighter
                                                        // language based on the file extension
                                                        language={snippet.path.split(".")[snippet.path.split(".") - 1]}
                                                    >
                                                        {atob(snippet.blob.content)}
                                                    </SyntaxHighlighter>
                                                    :
                                                    <Busy />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
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