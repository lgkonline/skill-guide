import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Superagent from "superagent";

import global from "../global";
import Page from "../components/Page";
import Busy from "../components/Busy";
import GuideStep from "../components/GuideStep";

class NewGuidePage extends React.Component {
    constructor() {
        super();

        this.state = {
            steps: null
        };
    }

    componentDidMount() {
        this.getStep(0);
    }

    getStep(stepNum) {
        Superagent.get("https://api.github.com/repos/lgkonline/react-guide/git/trees/" + stepNum).end((err, res) => {
            if (err && res.statusCode == "404") {
                throw err;
            }
            else {
                global.handleError(err, res);
            }

            console.log(res.body);

            let step = {
                files: []
            };

            res.body.tree.map(node => {
                if (node.path == "README.md") {
                    Superagent.get(node.url).end((err2, res2) => {
                        step.readMe = atob(res2.body.content);

                        this.setState({ steps: this.state.steps });
                    });
                }
                else {
                    step.files.push(node);
                }
            });

            if (!this.state.steps) this.state.steps = [];
            this.state.steps.push(step);

            this.setState({ steps: this.state.steps });

            this.getStep(stepNum + 1);
        });
    }

    render() {
        return (
            <Page area="Guides" title="React project" containerClass="container-fluid">
                {this.state.steps ?
                    <div className="fade-in">
                        {this.state.steps.map((step, i) =>
                            step.readMe ?
                                <GuideStep key={i} step={step} />
                                :
                                <Busy key={i} />
                        )}
                    </div>
                    :
                    <Busy />
                }
            </Page>
        );
    }
}

export default NewGuidePage;