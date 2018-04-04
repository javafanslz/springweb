/**
 * Created by Lee on 2018/3/22.
 */
/**
 * function f(){}  这种定义方式在任何地方都能被调用
 * var f = function
 */
$(document).ready(function(){
    function foo(){
        function bar() {
            return 3;
        }
        return bar();
        var bar =function bar() {
            return 8;
        }
    }
    alert(foo());

});