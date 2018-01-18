var webpack = require("webpack");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    entry: {
        pageA: './pageA',
        pageB: './pageB',
        vendor: ['lodash'] //第三方依赖
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        //业务代码提取公用模块
        new CommonsChunkPlugin({
            async: 'async-common',
            children: true,
            minChunks: 2
        }),
        new CommonsChunkPlugin({
            names: ["vendor", "manifest"],
            minChunks: Infinity
        })
    ]
}

