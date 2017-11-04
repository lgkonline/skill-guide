import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Page extends React.Component {
    static get defaultProps() {
        return {
        };
    }

    render() {
        return (
            <div className="container">
                <header className="text-center py-4">
                    <Link
                        to="/"
                        className="h1 text-uppercase"
                    >
                        Skill Guide<br /><span className="icon-lgk-filled" />
                    </Link>
                </header>

                {this.props.children}
            </div>
        );
    }
}

Page.propTypes = {
    children: PropTypes.any
};

export default Page;