import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Page extends React.Component {
    static get defaultProps() {
        return {
        };
    }

    render() {
        const areas = [
            {
                path: "/guides",
                name: "Guides"
            },
            {
                path: "/snippets",
                name: "Snippets"
            }
        ];

        return [
            <div key={0} className="bg-primary py-5">
                <div className="container">
                    <h1 className="display-5 text-center text-uppercase">
                        <Link to="/" className="logo text-white">
                            Skill Guide<br /><span className="icon-lgk-filled" />
                        </Link>
                    </h1>
                </div>
            </div>,
            <nav key={1} className="bg-light">
                <div className="container">
                    <ul className="nav nav-pivots nav-fill">
                        {areas.map(area =>
                            <li key={area.path} className="nav-item">
                                <Link
                                    to={area.path}
                                    className={"nav-link " + (this.props.area && this.props.area == area.name ? "active" : "")}
                                >
                                    {area.name}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>,
            <div key={2} className="container">
                {this.props.children}
            </div>
        ];
    }
}

Page.propTypes = {
    children: PropTypes.any,
    area: PropTypes.string
};

export default Page;