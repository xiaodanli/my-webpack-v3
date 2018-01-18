module.exports = {
    entry:{
        bundle1:'./main1.js',
        bundle2:'./main2.js'
    },
    output:{
        filename:'[name].js'  //name对应entry对象里面的对应键名
    }
}