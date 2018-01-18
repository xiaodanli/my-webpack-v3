var ExtractTextPlugin = require('extract-text-webpack-plugin');
var PurifyCSS = require('purifycss-webpack');

var path = require('path');
var glob = require('glob-all');


module.exports = {
    entry:'./main.js',
    output:{
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
        })
    ]
}