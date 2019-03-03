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
    // Production-Plugins
    plugins.push(new CleanPlugin([outputPath]));
    plugins.push(
        new CopyPlugin([
            {
                from: "./public/*", // Copying from
                to: "./", // Copying to Root
                ignore: ["index.html"], // NOT copying 'index.html' - Used by HtmlPlugin
                flatten: true // Removes directories(VERY Useful)
            }
        ])
    );
}

// parsed - { "[CONFIG]": [VALUE] } -> Inject into Files(DefinePlugin - Manually / Environment - Automatically)
if (fs.existsSync(".env") && ENV !== "production") {
    const { parsed } = dotenv.config({ path: ".env" });
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
    plugins: [
        new MiniCssPlugin({ filename: "index.css" }),
        new HtmlPlugin({ template: "./public/index.html" }),
        ...plugins
    ],
    devServer: {
        contentBase: "./public", // Manifest, Service Workers, etc.
        port: 4000, // Servig from a port
        historyApiFallback: true // SPA Support(React)
    }
};
