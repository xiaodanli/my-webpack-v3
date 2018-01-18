require.include('./module')  //只引用不执行

var page = 'subPageB'
if(page === 'subPageA'){
    require.ensure(['./subPageA'],function(){
        var subPageA = require('./subPageA')
        console.log(subPageA.default.txt)
    },'subPageA')
}else if(page === 'subPageB'){
    require.ensure(['./subPageB'],function(){
        var subPageB = require('./subPageB')
        console.log(subPageB.default.txt)
    },'subPageB')
}

require.ensure(['lodash'], function () {
    var _ = require('lodash')
    _.join([1, 2], 3)
},'vendor')

export default 'pageA'