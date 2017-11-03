import React from "react";

class PageTitle extends React.Component {
    render() {
        return (
            <h1 className="font-sans font-semibold text-4xl mt-8 mb-4 py-2">{this.props.children}</h1>
        );
    }
}

export default PageTitle;