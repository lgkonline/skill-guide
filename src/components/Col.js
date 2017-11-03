import React from "react";
import PropTypes from "prop-types";

class Col extends React.Component {
    static get defaultProps() {
        return {
        };
    }

    render() {
        return (
            <div className="w-full md:w-1/2 p-4">
                {this.props.children}
            </div>
        );
    }
}

Col.propTypes = {
    children: PropTypes.any
};

export default Col;