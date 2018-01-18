var webpack = require("webpack");

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    entry:{
        pageA:'./pageA',
        pageB:'./pageB'
    },
    output:{
        filename:'[name].bundle.js'
    },
    plugins:[
        new CommonsChunkPlugin({
            name: "commons",
            filename: "commons.js",
            chunk:['pageA','pageB']
        })
    ]
}