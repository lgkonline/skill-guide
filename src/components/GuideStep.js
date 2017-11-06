import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Superagent from "superagent";
import ReactMarkdown from "react-markdown";

import SyntaxHighlighter from "./SyntaxHighlighter";
import Explorer from "./Explorer";
import Busy from "./Busy";

class GuideStep extends React.Component {
    constructor() {
        super();

        this.state = {
            selectedFile: null
        };
    }

    render() {
        const currentRoute = "/guide/" + this.props.user + "/" + this.props.repo;

        return (
            <div className="card border-primary mb-3">
                <ul className="pagination justify-content-center">
                    {this.props.guide.steps.map((step, i) =>
                        <li
                            key={i}
                            className={"page-item " + (step == this.props.step ? "active" : "")}
                        >
                            <Link
                                to={currentRoute + "/" + (i + 1)}
                                className="page-link"
                                style={{ borderTopLeftRadius: "0", borderTopRightRadius: "0" }}
                            >
                                {i + 1}
                            </Link>
                        </li>
                    )}
                </ul>

                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            {this.props.step.readMe ?
                                <ReactMarkdown source={this.props.step.readMe} />
                                :
                                <Busy />
                            }

                            {this.props.stepIndex != (this.props.guide.steps.length - 1) &&
                                <Link
                                    to={currentRoute + "/" + (this.props.stepIndex + 2)}
                                    className="btn btn-outline-primary mt-4"
                                >
                                    Next
                            </Link>
                            }
                        </div>

                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-5">
                                    <Explorer
                                        node={this.props.step}
                                        onSelectFile={file => {
                                            this.setState({ selectedFile: file });
                                        }}
                                        isSelectedFile={file => this.state.selectedFile == file}
                                    />
                                </div>

                                <div className="col-md-7">
                                    {this.state.selectedFile ?
                                        this.state.selectedFile.content &&
                                        <SyntaxHighlighter>
                                            {this.state.selectedFile.content}
                                        </SyntaxHighlighter>
                                        :
                                        this.props.step.files && this.props.step.files.length > 0 &&
                                        <div className="text-muted text-center">
                                            <span className="icon-info" /><br />
                                            Choose a file from the list to see its content here
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.props.guide.config && this.props.guide.config.liveView &&
                        <div className="card bg-primary text-white mt-4">
                            <div className="card-body">
                                <h2 className="pb-2">Live view</h2>

                                <div className="card text-dark">
                                    <div className="card-body">
                                        <h3 className="text-center">{this.props.guide.config.liveView}</h3>
                                        <iframe
                                            src={"https://" + this.props.user + ".github.io/" +
                                                this.props.repo + "/" + this.props.stepIndex + "/" + this.props.guide.config.liveView}
                                            className="embed-responsive border-0 bg-white"
                                            style={{ height: "30vh" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

GuideStep.propTypes = {
    stepIndex: PropTypes.number,
    step: PropTypes.object.isRequired,
    guide: PropTypes.object,
    user: PropTypes.string,
    repo: PropTypes.string
};

export default GuideStep;