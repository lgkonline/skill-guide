const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

module.exports = {
    context: path.join(__dirname, "src"),
    entry: [
        "./main.js",
    ],
    output: {
        path: path.join(__dirname, "."),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                ],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader", options: { importLoaders: 1 }
                        }
                    ]
                })
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: "file-loader?name=contents/[name].[ext]"
            }
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, "node_modules"),
        ],
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ]
};