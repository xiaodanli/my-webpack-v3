var webpack = require("webpack");

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    entry:{
        pageA:'./pageA',
        pageB:'./pageB'
    },
    output:{
        filename:'[name].min.js'
    },
    plugins:[
        new CommonsChunkPlugin({
            name: "commons",
            filename: "commons.js",
            chunk:['pageA','pageB']
        })
    ]
}