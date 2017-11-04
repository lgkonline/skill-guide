import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Superagent from "superagent";
import ReactMarkdown from "react-markdown";

import global from "../global";
import Page from "../components/Page";
import Busy from "../components/Busy";

class GuidePage extends React.Component {
    constructor() {
        super();

        this.state = {
            name: "...",
            guide: null,
            error: null
        };
    }

    componentDidMount() {
        this.setState({ name: this.props.match.params.name }, this.getGuide);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.name != this.props.match.params.name) {
            this.componentDidMount();
        }
    }

    getGuide() {
        Superagent.get("https://api.github.com/repos/lgkonline/skill-guide/contents/guides/" + this.state.name).end((err0, res0) => {
            if (err0) {
                this.setState({ error: res0.body });

                throw err0;
            }

            this.setState({ guide: res0.body }, () => {
                this.state.guide.map(step => {
                    Superagent.get(step.git_url).end((err1, res1) => {
                        res1.body.tree && res1.body.tree.map(file => {
                            if (file.path == "README.md") {
                                Superagent.get(file.url).end((err2, res2) => {
                                    step.readMe = atob(res2.body.content);

                                    this.setState({ guide: this.state.guide });
                                });
                            }
                        });
                    });
                });
            });
        });
    }

    render() {
        return (
            <Page area="Guides" title={this.state.error ? this.state.error.message : this.state.name}>
                {this.state.error ?
                    <p>
                        <a href={this.state.error.documentation_url}>{this.state.error.documentation_url}</a>
                    </p>
                    :
                    this.state.guide ?
                        <div className="fade-in">
                            {this.state.guide.map((step, i) =>
                                step.readMe &&
                                <div key={i} className="fade-in card mb-3">
                                    <div className="card-body">
                                        <ReactMarkdown source={step.readMe} />
                                    </div>
                                </div>
                            )}
                        </div>
                        :
                        <Busy />
                }
            </Page>
        );
    }
}

export default GuidePage;