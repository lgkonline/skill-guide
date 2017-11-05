import React from "react";
import PropTypes from "prop-types";
import Superagent from "superagent";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { githubGist } from "react-syntax-highlighter/dist/styles";

import Busy from "./Busy";

class GuideStep extends React.Component {
    constructor() {
        super();

        this.state = {
            selectedFile: null
        };
    }

    render() {
        return (
            <div className="card border-guides mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <ReactMarkdown source={this.props.step.readMe} />
                        </div>

                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="list-group">
                                        {this.props.step.files.map((file, j) =>
                                            <a
                                                key={j}
                                                href="javascript:void(0)"
                                                className={"list-group-item list-group-item-action " + (this.state.selectedFile == file ? "bg-guides text-white" : "")}
                                                onClick={() => {
                                                    if (file.content) {
                                                        this.setState({ selectedFile: file });
                                                    }
                                                    else {
                                                        Superagent.get(file.url).end((err, res) => {
                                                            if (err) throw err;

                                                            file.content = atob(res.body.content);

                                                            this.setState({ selectedFile: file });
                                                        });
                                                    }
                                                }}
                                            >
                                                {file.path}
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-7">
                                    {this.state.selectedFile ?
                                        this.state.selectedFile.content &&
                                        <SyntaxHighlighter style={githubGist}>
                                            {this.state.selectedFile.content}
                                        </SyntaxHighlighter>
                                        :
                                        <div className="text-muted">
                                            Choose a file from the list to see its content here.
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

GuideStep.propTypes = {
    step: PropTypes.object.isRequired
};

export default GuideStep;