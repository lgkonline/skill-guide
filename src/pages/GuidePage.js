import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Superagent from "superagent";
import ReactMarkdown from "react-markdown";

import Page from "../components/Page";
import Busy from "../components/Busy";
import GuideStep from "../components/GuideStep";

class GuidePage extends React.Component {
    constructor() {
        super();

        this.state = {
            guide: null
        };
    }

    componentDidMount() {
        this.getGuide();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.user != prevProps.match.params.user ||
            this.props.match.params.repo != prevProps.match.params.repo
        ) {
            this.getGuide();
        }
    }

    getGuide() {
        Superagent.get(api("https://api.github.com/repos/" + this.props.match.params.user + "/" + this.props.match.params.repo + "/git/trees/master")).end((err, res) => {
            handleError(err, res);

            this.state.guide = {
                steps: []
            };

            res.body.tree.map(node => {
                if (node.path == "README.md") {
                    Superagent.get(api(node.url)).end((err1, res1) => {
                        this.state.guide.readMe = atob(res1.body.content);

                        this.setState({ guide: this.state.guide });
                    });
                }
                else if (node.type == "tree") {
                    this.getStep(node);
                }
            });

            this.setState({ guide: this.state.guide });
        });
    }

    getStep(node0) {
        Superagent.get(api(node0.url)).end((err, res) => {
            if (err && res.statusCode == "404") {
                throw err;
            }
            else {
                handleError(err, res);
            }

            let step = {
                folders: [],
                files: []
            };

            res.body.tree.map(node => {
                if (node.path == "README.md") {
                    Superagent.get(api(node.url)).end((err2, res2) => {
                        step.readMe = atob(res2.body.content);

                        this.state.guide.steps[node0.path * 1] = step;

                        this.setState({ guide: this.state.guide });
                    });
                }
                else if (node.type == "blob") {
                    step.files.push(node);
                }
                else if (node.type == "tree") {
                    step.folders.push(node);
                }
            });

            this.state.guide.steps[node0.path * 1] = step;

            this.setState({ guide: this.state.guide });
        });
    }

    render() {
        return (
            <Page area="Guides" containerClass="container-fluid">
                {this.state.guide && this.state.guide.readMe ?
                    [
                        <ReactMarkdown key={0} source={this.state.guide.readMe} className="mt-4" />,
                        <div key={1}>
                            {this.state.guide.steps ?
                                this.state.guide.steps.map((step, i) =>
                                    <GuideStep key={i} step={step} />
                                )
                                :
                                <Busy />
                            }
                        </div>
                    ]
                    :
                    <Busy />
                }
            </Page>
        );
    }
}

export default GuidePage;