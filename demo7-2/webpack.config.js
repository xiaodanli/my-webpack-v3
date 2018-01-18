var webpack = require("webpack");

module.exports = {
    entry:{
        main:'./main'
    },
    output:{
        filename:'[name].bundle.js',
        chunkFilename:'[name].chunk.js'
    }
}

