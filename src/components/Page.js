import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Page extends React.Component {
    static get defaultProps() {
        return {
        };
    }

    render() {
        return [
            <div key={0} className="jumbotron jumbotron-fluid bg-primary">
                <div className="container">
                    <h1 className="display-5 text-center text-uppercase">
                        <Link to="/" className="logo text-white">
                            Skill Guide<br /><span className="icon-lgk-filled" />
                        </Link>
                    </h1>
                </div>
            </div>,
            <div key={1} className="container">
                {this.props.children}
            </div>
        ];
    }
}

Page.propTypes = {
    children: PropTypes.any
};

export default Page;