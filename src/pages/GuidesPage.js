import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Superagent from "superagent";

import global from "../global";
import Page from "../components/Page";
import Busy from "../components/Busy";

class GuidesPage extends React.Component {
    constructor() {
        super();

        this.state = {
            guides: null
        };
    }

    componentDidMount() {
        this.getGuides();
    }

    getGuides() {
        Superagent.get("https://api.github.com/repos/lgkonline/skill-guide/contents/guides").end((err0, res0) => {
            this.setState({ guides: res0.body }, () => {
                this.state.guides.map(guide => {
                    Superagent.get(guide.git_url).end((err1, res1) => {
                        res1.body.tree.map(node => {
                            if (node.path == "config.json") {
                                Superagent.get(node.url).end((err2, res2) => {
                                    guide.config = JSON.parse(atob(res2.body.content));

                                    this.setState({ guides: this.state.guides });
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
            <Page area="Guides" title="Guides">
                {this.state.guides ?
                    <div className="list-group">
                        {this.state.guides.map((guide, i) =>
                            <Link key={i} to={"/guide/" + encodeURIComponent(guide.name)} className="fade-in list-group-item list-group-item-action">
                                <h5>{guide.name}</h5>
                                <p>{guide.config ? guide.config.description : "..."}</p>
                            </Link>
                        )}
                    </div>
                    :
                    <Busy />
                }
            </Page>
        );
    }
}

export default GuidesPage;