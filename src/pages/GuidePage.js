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
            guide: null,
            activeStep: null,
            user: null
        };
    }

    componentDidMount() {
        this.getGuide();
        this.getUser();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.user != prevProps.match.params.user ||
            this.props.match.params.repo != prevProps.match.params.repo
        ) {
            this.getGuide();
            this.getUser();
        }

        if (this.props.match.params.step != prevProps.match.params.step) {
            this.setActiveStep();
        }
    }

    getGuide() {
        Superagent.get(api("https://api.github.com/repos/" + this.props.match.params.user + "/" + this.props.match.params.repo + "/git/trees/master")).end((err, res) => {
            handleError(err, res);

            this.state.guide = {
                steps: [],
                config: null,
                gitContent: res.body
            };

            res.body.tree.map(node => {
                if (node.path == "README.md") {
                    Superagent.get(api(node.url)).end((err1, res1) => {
                        this.state.guide.readMe = atob(res1.body.content);

                        this.setState({ guide: this.state.guide });
                    });
                }
                else if (node.path == "skill-guide.json") {
                    Superagent.get(api(node.url)).end((err2, res2) => {
                        this.state.guide.config = JSON.parse(atob(res2.body.content));

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

            this.setState({ guide: this.state.guide }, this.setActiveStep);
        });
    }

    setActiveStep() {
        const activeStepIndex = this.props.match.params.step ? ((this.props.match.params.step * 1) - 1) : 0;
        this.setState({ activeStep: this.state.guide.steps[activeStepIndex] });
    }

    getUser() {
        Superagent.get(api("https://api.github.com/users/" + this.props.match.params.user)).end((err, res) => {
            handleError(err, res);

            this.setState({ user: res.body });
        });
    }

    render() {
        return (
            <Page area="Guides" containerClass="container-fluid">
                {this.state.guide && this.state.guide.readMe ?
                    [
                        <ReactMarkdown key={0} source={this.state.guide.readMe} className="guide mt-4" />,
                        <div key={1}>
                            {this.state.guide.steps ?
                                this.state.guide.steps.map((step, i) =>
                                    step == this.state.activeStep &&
                                    <GuideStep
                                        key={i}
                                        stepIndex={i}
                                        step={step}
                                        guide={this.state.guide}
                                        user={this.props.match.params.user}
                                        repo={this.props.match.params.repo}
                                        currentRoute={"/guide/" + this.props.match.params.user + "/" + this.props.match.params.repo}
                                    />
                                )
                                :
                                <Busy />
                            }
                        </div>
                    ]
                    :
                    <Busy />
                }

                {this.state.user ?
                    <div className="text-center mt-5">
                        <span className="lead">A guide by&nbsp;</span>

                        <img
                            src={this.state.user.avatar_url}
                            alt={this.state.user.login}
                            className="rounded-circle"
                            style={{ width: "64px", height: "64px" }}
                        />

                        <h2>{this.state.user.name}</h2>
                        <p>{this.state.user.bio}</p>
                        <p><a href={this.state.user.html_url}>GitHub</a></p>
                    </div>
                    :
                    <Busy />
                }
            </Page>
        );
    }
}

export default GuidePage;