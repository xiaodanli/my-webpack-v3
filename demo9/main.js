require.include('./module')  //只引用不执行

var page = 'subPageB'
if(page === 'subPageA'){
    import(/* webpackChunkName:'subPageA' */'./subPageA').then(function(subPageA){
        console.log(subPageA)
    })
}else if(page === 'subPageB'){
    import(/* webpackChunkName:'subPageB' */'./subPageB').then(function(subPageB){
        console.log(subPageB)
    })
}

require.ensure(['lodash'], function () {
    var _ = require('lodash')
    _.join([1, 2], 3)
},'vendor')

export default 'pageA'