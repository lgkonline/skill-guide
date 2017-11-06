import React from "react";
import PropTypes from "prop-types";
import Superagent from "superagent";

class Explorer extends React.Component {
    static get defaultProps() {
        return {
            className: "",
            listGroupItemClass: ""
        };
    }

    constructor() {
        super();

        this.state = {
            node: null
        };
    }

    componentWillMount() {
        this.setState({ node: this.props.node });
    }

    formatPath(path) {
        if (path == "~README.md") {
            return path.replace("~", "");
        }
        else {
            return path;
        }
    }

    render() {
        return (
            <div className={"list-group " + this.props.className}>
                {this.state.node.folders.map((folder, j) =>
                    [
                        <a
                            key={j}
                            href="javascript:void(0)"
                            className={"list-group-item list-group-item-action " + this.props.listGroupItemClass + (folder.node ? " rounded-left" : "")}
                            onClick={() => {
                                if (folder.node) {
                                    folder.node = null;
                                    this.setState({ node: this.state.node });
                                }
                                else {
                                    Superagent.get(api(folder.url)).end((err, res) => {
                                        handleError(err, res);

                                        let step = {
                                            folders: [],
                                            files: []
                                        };

                                        res.body.tree.map(node => {
                                            if (node.path == "README.md") {
                                                Superagent.get(api(node.url)).end((err2, res2) => {
                                                    step.readMe = atob(res2.body.content);

                                                    this.state.guide.steps[node0.path * 1] = step;

                                                    this.setState({ guide: this.state.guide });
                                                });
                                            }
                                            else if (node.type == "blob") {
                                                step.files.push(node);
                                            }
                                            else if (node.type == "tree") {
                                                step.folders.push(node);
                                            }
                                        });

                                        folder.node = step;
                                        this.setState({ node: this.state.node });
                                    });
                                }
                            }}
                        >
                            <span className={folder.node ? "icon-folder-open" : "icon-folder"} /> {folder.path}
                        </a>,
                        folder.node &&
                        <Explorer
                            {...this.props}
                            key={"explorer-" + j}
                            node={folder.node}
                            className="ml-4"
                            listGroupItemClass="rounded-0"
                        />
                    ]
                )}

                {this.state.node.files.map((file, j) =>
                    <a
                        key={j}
                        href="javascript:void(0)"
                        className={"list-group-item list-group-item-action " + this.props.listGroupItemClass + " " +
                            (this.props.isSelectedFile(file) ? "active" : "")}
                        onClick={() => {
                            if (file.content) {
                                this.props.onSelectFile(file);
                            }
                            else {
                                Superagent.get(file.url).end((err, res) => {
                                    if (err) throw err;

                                    file.content = atob(res.body.content);

                                    this.props.onSelectFile(file);
                                });
                            }
                        }}
                    >
                        <span className="icon-file-text2" /> {this.formatPath(file.path)}
                    </a>
                )}
            </div>
        );
    }
}

Explorer.propTypes = {
    node: PropTypes.object.isRequired,
    onSelectFile: PropTypes.func,
    isSelectedFile: PropTypes.func,
    className: PropTypes.string,
    listGroupItemClass: PropTypes.string
};

export default Explorer;