/**
 * Created by Lee on 2018/3/6.
 */

/**
 * jquery 基本过滤选择器测试
 */
function jqueryCommonSelector(){
    /**
     * :first
     */
    $("div:first").css("background","#FCDD8B");
    console.log($("div:first").css("background"));

    /**
     * :last
     */
    $("div:last").css("background","#FCDD8B");

    /**
     * not
     */
    console.log($("div:not(div[name=div3])").html());
    $("div:not(div[name=div3])").css("background","#FCDD8B");
}

/**
 * 内容选择器
 */
function contextSelector(){
    /**
     * :contains("text") 选取包含文本内容为 text的元素  返回集合元素
     */
    //$("div:contains('父亲')").css("background","#FCDD8B");

    /**
     * :empty  选取不包含子元素或者文本的空元素
     */

    $("div:empty").css("background","#FCDD8B");

    /**
     * :has(selector) 含有选择器所匹配的所有元素
     */
    $("div:has(table)").css("background","#FCDD8B");

    /**
     * :parent   选取含有子元素或者文本的元素
     */
    $("div:parent").css("background","#CCFFCC");

}

/**
 * 可见性过滤选择器
 * 根据元素的可见或者不可见选择相应的元素
 */
function visibalSelector(){
    /**
     * :hidden  选取所有不可见的元素集合
     */
    var val = $("input:hidden").val();
    alert(val);

    /**
     * :visible 选取所有可见的集合元素
     */
    var val1 = $("input:visible").val();
    alert(val1);
}

/**
 * 属性过滤选择器  通过元素的属性选择元素
 */
function attrSelector() {
    /**
     * [attribute] 选取拥有此属性的元素
     */
    console.log($("div[name]"));

    /**
     * [attribute=value] 属性值为value的元素
     */
    //$("div[name=div4]").css("background","#CCFFCC");

    /**
     *  [attribute!=value] 属性值不是value的元素
     */

    /**
     *  [attribute^=value] 属性值以value开始
     */
    $("div[name ^=div]").css("background","#CCFFCC");


    /**
     *  [attribute$=value] 属性值以value结束
     */

    /**
     *  [attribute *=value] 属性值包含value的元素
     */

    /**
     *  [attribute |=value] 选取属性等于或者以该字符串为前缀的元素
     */

    /**
     *  [attribute ~=value] 选取属性用空格分隔的值中包含一个给定的元素
     *  $("div[title ~="uk"]")  选取属性title用空格分隔的之中包含字符uk的元素
     */

    /**
     *  [attribute][attribute][attribute] 用属性选择器合并成一个副歌属性选择器，满足多个条件
     *  每选择一次，缩小一次范围
     */
}

/**
 * 表单对象属性过滤选择器
 * 主要是对所选择的表单元素进行过滤，例如选择被选中的下拉框，多选框等元素
 */
function fieldObjectAttrSelector(){
    /**
     * :enabled  选取所有可用的元素
     */

    /**
     * :disabled 选取所有不可用的元素
     */

    alert($("input[name=button1]:disabled").val());

    /**
     * :checked 选取所有选中的元素
     */

    /**
     * :selected 获取所有选中的元素
     */
}

/**
 * 表单选择器
 */
function fieldSelector() {
    /**
     * :input 选取所有的<input> <textarea> <select> <button> 元素
     */

    /**
     * :text  选取所有的单行文本框
     */

    /**
     * :password 选取所有的密码框
     */

    /**
     * :radio
     */

    /**
     * :checkbox
     */

    /**
     * :submit
     */

    /**
     * :image
     */

    /**
     * :reset
     */

    /**
     * :button
     */

    /**
     * :file
     */

    /**
     * :hidded
     */
}