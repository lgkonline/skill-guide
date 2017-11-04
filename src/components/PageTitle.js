import React from "react";

class PageTitle extends React.Component {
    render() {
        return (
            <h1 className="display-1 my-4">{this.props.children}</h1>
        );
    }
}

export default PageTitle;