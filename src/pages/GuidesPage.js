import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Superagent from "superagent";
import ReactMarkdown from "react-markdown";

import Page from "../components/Page";
import Busy from "../components/Busy";

class GuidesPage extends React.Component {
    constructor() {
        super();

        this.guides = [
            {
                user: "lgkonline",
                repo: "react-guide"
            }
        ];

        this.state = {
            guides: [
                {
                    user: "lgkonline",
                    repo: "react-guide"
                },
                {
                    user: "lgkonline",
                    repo: "skill-guide-guide"
                }
            ]
        };
    }

    componentDidMount() {
        this.state.guides.map(guide => {
            this.getGuide(guide);
        });
    }

    getGuide(guide) {
        Superagent.get(api("https://api.github.com/repos/" + guide.user + "/" + guide.repo + "/git/trees/master")).end((err, res) => {
            handleError(err, res);

            res.body.tree.map(node => {
                if (node.path == "README.md") {
                    Superagent.get(api(node.url)).end((err1, res1) => {
                        guide.readMe = atob(res1.body.content);

                        this.setState({ guides: this.state.guides });
                    });
                }
            });
        });
    }

    render() {
        return (
            <Page area="Guides" title="Guides">
                <div className="list-group">
                    {this.state.guides.map((guide, i) =>
                        guide.readMe ?
                            <Link key={i} to={"/guide/" + guide.user + "/" + guide.repo} className="list-group-item list-group-item-action">
                                <ReactMarkdown source={guide.readMe} />
                            </Link>
                            :
                            <Busy key={i} />
                    )}
                </div>
            </Page>
        );
    }
}

export default GuidesPage;