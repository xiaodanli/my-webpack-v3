import module from "./module.js"
import $ from './libs/jquery.min.js'

console.log("pageA")

$(".wrap").html("引用第三方库")

var pageA = {
    text:module.txt
}

export default 'pageA'