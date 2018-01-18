import module from "./module.js"
import $ from './libs/jquery.min.js'
console.log("pageB")

var pageB = {
    text:module.txt
}

$(".wrap").css("color","red")

export default 'pageB'