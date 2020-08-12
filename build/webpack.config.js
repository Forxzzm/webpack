const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')            //打包后文件导入到html文件内
const {CleanWebpackPlugin} = require('clean-webpack-plugin')        //清除上次打包文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");    //拆分css使用外链
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin') //将打包的css文件拆分  后续使用

module.exports = {
    mode:'development', // 开发模式
    entry: {            // 入口文件
        main:["@babel/polyfill",path.resolve(__dirname,'../src/main.js')],
        mainCopy:["@babel/polyfill",path.resolve(__dirname,'../src/main-copy.js')]
        // main: path.resolve(__dirname,'../src/main.js'),
        // mainCopy: path.resolve(__dirname,'../src/main-copy.js'),
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
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].css",
        })
    ],
    module:{
        rules:[
            // {
            //   test:/\.css$/,
            //   use:['style-loader','css-loader'] // 从右向左解析原则
            // },
            {
              test:/\.scss$/,
              use:[
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:[
                                // require('autoprefixer')({browsers: ['last 3 versions']})     //当前版本会报错
                                require('autoprefixer')({overrideBrowserslist: ['> 0.15% in CN']})
                            ]
                        }
                    },
                    'sass-loader'
                ] // 从右向左解析原则, 从下往上
            },
            {
                test:/\.js$/,       //可将ES6/7/8转换为ES5
                use:{
                  loader:'babel-loader',
                  options:{
                    presets:['@babel/preset-env']   //根据浏览器版本解析js
                  }
                },
                exclude:/node_modules/      //排除该目录下的文件编译
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10240,     //小于10kb 使用url-loader打包成base64
                      fallback: {
                        loader: 'file-loader',  //其他情况使用file-loader
                        options: {
                            name: 'img/[name].[hash:8].[ext]'
                        }
                      }
                    }
                  }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10240,
                      fallback: {
                        loader: 'file-loader',
                        options: {
                          name: 'media/[name].[hash:8].[ext]'
                        }
                      }
                    }
                  }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10240,
                      fallback: {
                        loader: 'file-loader',
                        options: {
                          name: 'fonts/[name].[hash:8].[ext]'
                        }
                      }
                    }
                  }
                ]
            },
        ]
    }
}