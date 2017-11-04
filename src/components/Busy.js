import React from "react";

class Busy extends React.Component {
    render() {
        return (
            <div className="progress my-3">
                <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    style={{ width: "100%" }}
                />
            </div>
        );
    }
}

export default Busy;