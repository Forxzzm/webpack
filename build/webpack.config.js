const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')    
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode:'development', // 开发模式
    entry: {            // 入口文件
        main: path.resolve(__dirname,'../src/main.js'),
        mainCopy: path.resolve(__dirname,'../src/main-copy.js'),
    },    
    output: {
        filename: '[name].[hash:8].js',      // 打包后的文件名称
        path: path.resolve(__dirname,'../dist')  // 打包后的目录
    },
    plugins:[
        new HtmlWebpackPlugin({
          template:path.resolve(__dirname,'../public/index.html'),   //打包到的地方
          filename:'index.html',
          chunks:['main'] // 与入口文件对应的模块名
        }),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index-copy.html'),   //打包到的地方
            filename:'index-copy.html',
            chunks:['mainCopy'] // 与入口文件对应的模块名
        }),
        new CleanWebpackPlugin(),
    ]
}