const path = require("path");
const fs = require("fs");
const { EnvironmentPlugin } = require("webpack");
const CleanPlugin = require("clean-webpack-plugin");
const MiniCssPlugin = require("mini-css-extract-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv");

const plugins = [];

const outputPath = path.join(__dirname, "dist");
const ENV = String(process.env.NODE_ENV);

if (ENV === "production") {
    plugins.push(
        new CopyPlugin([
            {
                from: "./public/*", // Copying from
                to: "./", // Copying to Root
                flatten: true // Removes directories(VERY Useful)
            }
        ])
    );
} else {
    plugins.push(
        new HtmlPlugin({
            template: "./assets/index.html"
        })
    );
}

const envFile = ENV === "production" ? ".env.production" : ".env";

if (fs.existsSync(envFile)) {
    // parsed - { "[CONFIG]": [VALUE] } -> Inject into Files(DefinePlugin - Manually / Environment - Automatically)
    const { parsed } = dotenv.config({ path: ENV === "production" ? ".env.production" : ".env" });
    // Inject everything read from environment-variables into 'process.env'
    plugins.push(new EnvironmentPlugin(Object.keys(parsed)));
}

module.exports = {
    entry: ["@babel/polyfill", "whatwg-fetch", "./index.js"],
    output: {
        path: outputPath,
        filename: "index.js",
        publicPath: "/" // Root for all Assets(Used by HTML-Plugin for injecting assets using /[path])
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".mjs", ".gql", ".graphql", ".json", "*"] // ALWAYS resolve JS(Modules/etc.)
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                use: "babel-loader"
            },
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/],
                use: ["babel-loader", "ts-loader"]
            },
            {
                test: /\.css$/,
                use: [MiniCssPlugin.loader, "css-loader", "postcss-loader"]
            },
            {
                test: /\.scss$/,
                use: [MiniCssPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            }
        ]
    },
    plugins: [new MiniCssPlugin({ filename: "index.css" }), ...plugins],
    devServer: {
        contentBase: "./public", // Manifest, Service Workers, etc.
        port: 4000, // Servig from a port
        historyApiFallback: true // SPA Support(React)
    }
};
