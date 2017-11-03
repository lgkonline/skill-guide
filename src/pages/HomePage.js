import React from "react";
import { Link } from "react-router-dom";

import Page from "../components/Page";
import PageTitle from "../components/PageTitle";

class Homepage extends React.Component {
    render() {
        return (
            <Page>
                <PageTitle>What is Skill Guide?</PageTitle>
                <p className="lead">Are you stocking when you want to create a new project? For example a React project? There are many ways to do this.<br />
                    Skill Guide should help you. Here you'll find guides for many scenarios.</p>

                <div className="flex flex-wrap -m-4">
                    <div className="w-full md:w-1/2 p-4">
                        <button type="button" className="large-btn bg-orange hover:bg-orange-light text-orange-darker">
                            <span className="icon-arrow-right2" /><br />Guides
                        </button>
                    </div>

                    <div className="w-full md:w-1/2 p-4">
                        <Link to="/snippets" className="large-btn bg-teal hover:bg-teal-light text-teal-darker">
                            <span className="icon-code" /><br />Snippets
                        </Link>
                    </div>
                </div>
            </Page>
        );
    }
}

export default Homepage;