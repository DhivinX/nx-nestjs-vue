const path = require('path');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');

const basePackage = {
    "name": process.env.npm_package_name,
    "version": process.env.npm_package_version,
    "main": "main.js",
    "bin": "main.js",
    "pkg": {
        "outputPath": "bin",
        "targets": [
            "node16-win"
        ]
    },
    "scripts": {
        "binary": "npx pkg . && npx copyfiles \"assets/**/*\" \"bin\" && npx copyfiles \"python/**/*\" \"bin\" && npx copyfiles -u 2 \"../web/**/*\" \"bin/static\""
    }
}

module.exports = (config, context) => {
    return merge(config, {
        externals: [nodeExternals()],

        plugins: [
            new GeneratePackageJsonPlugin(basePackage)
        ],

        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                }
            ]
        },

        resolve: {
            extensions: ['*', '.js']
        },
    });
};
