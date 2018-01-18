var ExtractTextPlugin = require('extract-text-webpack-plugin');
var PurifyCSS = require('purifycss-webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var path = require('path');
var glob = require('glob-all');


module.exports = {
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename:'[name].bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.(less|css)$/,
                use:ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test:/\.(jpe?g|png|gif|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options: {
                            limit:10000,
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            gifsicle: {
                                interlaced: false
                            },
                            mozjpeg: {
                                progressive: true,
                                arithmetic: false
                            },
                            optipng: false, // disabled
                            pngquant: {
                                quality: 60,
                                floyd: 0.5,
                                speed: 2
                            },
                            svgo: {
                                plugins: [
                                    {removeTitle: true},
                                    {convertPathData: false}
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'img:data-src']
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin({
            filename: '[name].min.css'
        }),
        new PurifyCSS({
            paths: glob.sync([
                path.join(__dirname, './*.html'),
                path.join(__dirname, './*.js')
            ]),
            minimize: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: false
        })
    ]
}