import React from "react";
import PropTypes from "prop-types";
import Superagent from "superagent";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { githubGist } from "react-syntax-highlighter/dist/styles";

class GuideStep extends React.Component {
    constructor() {
        super();

        this.state = {
            selectedFile: null
        };
    }

    render() {
        return (
            <div className="card mb-3">
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
                                                className="list-group-item list-group-item-action"
                                                onClick={() => {
                                                    console.log(file);
                                                    Superagent.get(file.url).end((err, res) => {
                                                        if (err) throw err;

                                                        this.setState({ selectedFile: atob(res.body.content) });
                                                    });
                                                }}
                                            >
                                                {file.path}
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-7">
                                    {this.state.selectedFile &&
                                        <SyntaxHighlighter style={githubGist}>
                                            {this.state.selectedFile}
                                        </SyntaxHighlighter>
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