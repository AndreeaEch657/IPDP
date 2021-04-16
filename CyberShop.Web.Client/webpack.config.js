/// <binding ProjectOpened='Watch - Development' />
var path = require('path');
var webpack = require('webpack');
module.exports = {
    // Target the output of the typescript compiler
    context: path.join(__dirname, ""),

    // File(s) to target in the 'build' directory
    entry: {
        //appBundle: "./dist/app/main.js",
        loginBundle: "./dist/app/UI/Account/SignIn.js",
        registerBundle: "./dist/app/UI/Account/Register.js"
        //forgotPasswordBundle: "./dist/app/UI/Account/ForgotPassword.js",
        //resetPasswordBundle: "./dist/App/UI/Account/ResetPassword.js"
    },

    // Output
    output: {
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, '../CyberShop.Web/wwwroot/Scripts/App'),
        publicPath: '/Scripts/App/'
    },
    devServer: {
        inline: false,
        contentBase: "./dist",
    },


    devtool: 'source-map',
    plugins: [
        new webpack.ProvidePlugin({
            Promise: 'es6-promise'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
};