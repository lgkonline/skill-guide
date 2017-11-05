import React from "react";
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
        return (
            <div className="card border-guides mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            {this.props.step.readMe ?
                                <ReactMarkdown source={this.props.step.readMe} />
                                :
                                <Busy />
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