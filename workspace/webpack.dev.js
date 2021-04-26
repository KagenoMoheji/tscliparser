const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(
    common(isProd = false),
    {
        mode: "development",
        devtool: "inline-source-map"
    }
);