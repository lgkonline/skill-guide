import React from "react";
import PropTypes from "prop-types";

class MyComponent extends React.Component {
    static get defaultProps() {
        return {
            firstProp: "Hello World"
        };
    }

    render() {
        return (
            <div />
        );
    }
}

MyComponent.propTypes = {
    firstProp: PropTypes.string
};

export default MyComponent;