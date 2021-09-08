const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require("@babel/polyfill");



module.exports = {
  entry: ['@babel/polyfill',"./src/index.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../build"),
	//publicPath: path.resolve(__dirname, "../build")
  },
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "../build"),
    index: "index.html",
    port: 3000,
	disableHostCheck:true,
	//publicPath: path.resolve(__dirname, "../build")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ["babel-loader"]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new CleanWebpackPlugin()
  ]
};