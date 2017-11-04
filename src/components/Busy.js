import React from "react";

class Busy extends React.Component {
    render() {
        return (
            <div className="text-center text-primary h1 py-3">
                <span className="icon-spinner10 animation-spin" />
            </div>
        );
    }
}

export default Busy;