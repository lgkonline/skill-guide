import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const version = require("../../package.json").version;

class Page extends React.Component {
    static get defaultProps() {
        return {
            title: "",
            containerClass: "container"
        };
    }

    componentWillMount() {
        document.title = "Skill Guide";

        if (this.props.area) {
            document.title += " - " + this.props.area;
        }
    }

    render() {
        return [
            <main key={0} style={{ flex: "1" }}>
                <div className="bg-primary pt-5 pb-3">
                    <div className="container">
                        <h1 className="display-5 text-center text-white">
                            <Link to="/" className="logo text-white">
                                Skill Guide
                                <h4><span className="icon-lgk-filled" /></h4>
                            </Link>
                        </h1>

                        {this.props.back ?
                            <Link to={this.props.back.to} className="text-white">
                                <span className="icon-arrow-left2" /> {this.props.back.label}
                            </Link>
                            :
                            <span>&nbsp;</span>
                        }
                    </div>
                </div>
                <div className={"fade-in " + this.props.containerClass}>
                    <h1 className="page-title">{this.props.title}</h1>

                    {this.props.children}
                </div>
            </main>,
            <footer key={1} className="py-3 mt-5 text-center">
                <div className="container">
                    <span className="badge badge-secondary">Version {version}</span><br />
                    Made with <span className="icon-heart" /> in Germany by LGK.
                    Checkout my <a href="http://lgk.io">website</a> or follow me on <a href="https://twitter.com/lgkonline">Twitter</a>.<br />
                    The font HK Grotesk by Hanken Design Co is <a href="https://www.fontsquirrel.com/license/hk-grotesk">SIL licensed</a>.<br />
                    The code is <a href="https://github.com/lgkonline/skill-guide/blob/master/LICENSE">MIT licensed</a>.<br />
                    <a href="https://github.com/lgkonline/skill-guide">GitHub</a>
                </div>
            </footer>
        ];
    }
}

Page.propTypes = {
    children: PropTypes.any,
    area: PropTypes.string,
    title: PropTypes.string,
    containerClass: PropTypes.string,
    back: PropTypes.object
};

export default Page;