import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Superagent from "superagent";
import ReactMarkdown from "react-markdown";

import Page from "../components/Page";
import Busy from "../components/Busy";

class Homepage extends React.Component {
    constructor() {
        super();

        this.state = {
            guides: [
                {
                    user: "lgkonline",
                    repo: "react-guide"
                },
                {
                    user: "lgkonline",
                    repo: "skill-guide-guide"
                },
                {
                    user: "lgkonline",
                    repo: "react-router-guide"
                },
                {
                    user: "lgkonline",
                    repo: "react-bootstrap-guide"
                }
            ]
        };
    }

    componentDidMount() {
        this.state.guides.reverse();
        this.setState({ guides: this.state.guides }, () => {
            this.state.guides.map(guide => {
                this.getGuide(guide);
            });
        });
    }

    getGuide(guide) {
        Superagent.get(api("https://api.github.com/repos/" + guide.user + "/" + guide.repo + "/git/trees/master")).end((err, res) => {
            handleError(err, res);

            res.body.tree.map(node => {
                if (node.path == "skill-guide.json") {
                    Superagent.get(api(node.url)).end((err1, res1) => {
                        guide.config = JSON.parse(atob(res1.body.content));

                        this.setState({ guides: this.state.guides });
                    });
                }
            });
        });
    }

    render() {
        return (
            <Page title="What is Skill Guide?">
                <p className="lead">Are you stocking when you want to create a new project? For example a React project? There are many ways to do this.<br />
                    Skill Guide should help you. Here you'll find guides for many scenarios.</p>


                <Link to="/snippets" className="h2 btn btn-snippets btn-block btn-lg my-4">
                    <span className="icon-code" /> Code snippets
                </Link>

                <div className="list-group">
                    {this.state.guides.map((guide, i) =>
                        guide.config ?
                            <Link key={i} to={"/guide/" + guide.user + "/" + guide.repo} className="list-group-item list-group-item-action">
                                <h1>{guide.config.title}</h1>
                                <p>{guide.config.description}</p>
                            </Link>
                            :
                            <Busy key={i} />
                    )}
                </div>
            </Page>
        );
    }
}

export default Homepage;