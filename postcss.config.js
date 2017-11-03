const tailwindcss = require("tailwindcss");

module.exports = {
    plugins: [
        require("postcss-cssnext"),
        require("cssnano"),
        tailwindcss("./tailwind.config.js")
    ]
}