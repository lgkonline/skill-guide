import React from "react";
import PropTypes from "prop-types";

class Row extends React.Component {
    static get defaultProps() {
        return {
        };
    }

    render() {
        return (
            <div className="flex flex-wrap -m-4">
                {this.props.children}
            </div>
        );
    }
}

Row.propTypes = {
    children: PropTypes.any
};

export default Row;