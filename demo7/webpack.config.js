var webpack = require("webpack");

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    entry:{
        pageA:'./pageA',
        pageB:'./pageB',
        vendor:['./libs/jquery.min.js'] //第三方依赖
    },
    output:{
        filename:'[name].min.js'
    },
    plugins:[
        //业务代码提取公用模块
        new CommonsChunkPlugin({
            name: "common",
            chunks:['pageA','pageB'],
            minChunks:2
        }),
        //vendor和manifest可以合并写
        new CommonsChunkPlugin({
            names: ["vendor","manifest"],
            minChunks:Infinity
        }),
        //如果需要保证第三方库的纯净，加上下面的代码，把编译的webpack的代码提取出来
        // new CommonsChunkPlugin({
        //     name: "manifest",  //起的名字是entry里面没有的chunk名
        //     minChunks:Infinity
        // })
    ]
}

/*
*
* */