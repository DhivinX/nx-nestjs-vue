const { merge } = require('webpack-merge');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');

const basePackage = {
    "name": process.env.npm_package_name,
    "version": process.env.npm_package_version,
    "main": "main.js",
    "author": "Test",

    "build": {
        "appId": "com.my-website.my-app",
        "productName": "MyApp",
        "copyright": "Copyright © 2019 ${author}",
        "mac": {
          "category": "public.app-category.utilities"
        },
        "nsis": {
          "oneClick": false,
          "allowToChangeInstallationDirectory": true
        },
        "files": [
            "main.js",
            "assets/**/*",
            {
                "from": "../web",
                "to": "./",
                "filter": ["**/*"]
            }
        ],
        "directories": {
            "buildResources": "assets",
            "output": "dist_electron"
        }
    },

    "devDependencies": {
        "electron": "^19.0.6"
    }
}

module.exports = (config, context) => {
    return merge(config, {
        plugins: [
            new GeneratePackageJsonPlugin(basePackage, {
                excludeDependencies: ["electron"],
            })
        ],
    });
};
