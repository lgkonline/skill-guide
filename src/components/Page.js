import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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
            <main key={0} style={{ flex: "1" }}>
                <div className="bg-primary py-5">
                    <div className="container text-center">
                        <h1 className="display-5 text-uppercase">
                            <Link to="/" className="logo text-white">
                                Skill Guide<br /><span className="icon-lgk-filled" />
                            </Link>
                        </h1>
                        <div className="badge badge-secondary">Currently still in development</div>
                    </div>
                </div>
                <div className={"fade-in " + this.props.containerClass}>
                    <h1 className="display-2 my-4">{this.props.title}</h1>

                    {this.props.children}
                </div>
            </main>,
            <footer key={1} className="py-3 mt-5 text-center">
                <div className="container">
                    Made with <span className="icon-heart" /> in Germany by LGK.
                    Checkout my <a href="http://lgk.io">website</a> or follow me on <a href="https://twitter.com/lgkonline">Twitter</a>.<br />
                    The font HK Grotesk by Hanken Design Co is <a href="https://www.fontsquirrel.com/license/hk-grotesk">SIL licensed</a>.<br />
                    The code is <a href="https://github.com/lgkonline/skill-guide/blob/master/LICENSE">MIT licensed</a>.
                </div>
            </footer>
        ];
    }
}

Page.propTypes = {
    children: PropTypes.any,
    area: PropTypes.string,
    title: PropTypes.string,
    containerClass: PropTypes.string
};

export default Page;