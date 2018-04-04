
/**
 * Created by Lee on 2018/3/19.
 */
/**
 * 校验正则表达式
 */
function regTest(){
    var reg = /^\d{10,14}$/;
    var regTest = $("#reg").val();
    console.log(reg.test(regTest));
}