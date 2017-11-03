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
            <div className="container mx-auto px-8 font-sans font-normal">
                <Link
                    to="/"
                    className="font-sans font-bold text-center uppercase text-3xl my-8 text-grey block no-underline"
                >
                    Skill Guide<br /><span className="icon-lgk-filled" />
                </Link>
                {this.props.children}
            </div>
        );
    }
}

Page.propTypes = {
    children: PropTypes.any
};

export default Page;