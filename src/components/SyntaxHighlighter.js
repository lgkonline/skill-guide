import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { githubGist } from "react-syntax-highlighter/dist/styles";

class MyComponent extends React.Component {
    selectText(areaId) {
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(areaId));
            range.select();
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(document.getElementById(areaId));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    }

    render() {
        const id = "syntax-" + guid();

        return (
            <SyntaxHighlighter
                {...this.props}
                style={githubGist}
                id={id}
                onDoubleClick={() => {
                    this.selectText(id);
                }}
            >
                {this.props.children}
            </SyntaxHighlighter>
        );
    }
}

export default MyComponent;