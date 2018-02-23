/**
 * Created by Lee on 2018/2/5.
 */
/**
 * 创建对象直接量
 * @type {{}}
 */
var empty = {};
var point = {
  x:1,y:2
};
var point1 = {
    x:point.x,y:point.y
};
var book = {
    "main title":"javascript",
    author:{
        firstName:"zhu",
        secondName:"li"
    }
};
/**
 * 使用N new 关键字创建对象
 */
var o = new Object(); //相当于创建一个空对象
var arr = new Array();//相当于创建一个[]数字
var dateObj = new Date();//创建一个日期对象
var re = new RegExp();//创建一个正则表达式对象

/**
 * 原型对象
 *每个对象都有一个原型
 * 使用对象直接量创建对象的原型是  Object.prototype  和使用new Object()相同的原型
 * 使用关键字new 和构造函数创建的对象的原型是构造函数的prototype属性
 */

function testObject(){
    console.log(point);
    console.log(point.x);
    console.log(point1.x);
    console.log(book.author.firstName);
    console.log(Object.prototype);
    console.log(Date.prototype);
    //console.log(Date.prototype.);
}

function createObject(){
    /**
     * 使用这种方式创建的对象 只需传入所需对象的原型
     * 可以传入Null 但是不会继承任何原型属性
     * @type {Object}
     */
    var obj1 = Object.create(new Array());
    console.log(obj1);
    var nullObj = Object.create(Object.prototype);
    console.log(nullObj);
    alert(Object.create);
}

/**
 * 对象的取值
 * 可以使用 . 或者[]取值
 *  .的左侧应该是对象对结果的对象的表达式   右侧应该是对象中的属性值
 *  ECMAScript3中 .的右侧不能是关键字 如果是关键字则需要使用[]
 *  [] 运算符的左侧同 .的左侧  []中的内容应该是字符串表达式或者可以转换为字符串的表达式
 *  当取的属性是一个变量的时候应该使用[]
 *
 */

function getValue(){
    console.log(point);
    console.log(point.x);
    console.log(point1.x);
}

/**
 * 关联数组的表达式
 *
 */
function accociateObj(){
    var port = {
        "IBM":50,
        "Tencent":100
    };
    for(s in port){
        console.log(port[s]);
    }
}

function inherit(p){
    if(p == null){
        throw TypeError();
    }
    if(Object.create){
        return Object.create(p);
    }
    var t = typeof p;
    if(t !== "object" && t !== "function") throw TypeError();

    function f(){};
    f.prototype = p;
    return new f();
}

/**
 * 继承
 */
function inheritTest(){
    var o = {};
    o.x = 1;
    var p = inherit(o);
    p.y = 2;
    //继承中值覆盖问题
    /**
     * 总是在原始连中修改或者创建值  而不会修改原始链
     * @type {number}
     */
    p.x = 99;
    console.log(p.x); //99
    var q = inherit(o);
    console.log(q.x);//1

}
/**
 * 如果对象存在   访问其中不存在的属性的时候会放回undefine
 * 如果对象不存在  访问属性的时候会报错
 *
 *
 *  删除属性 delete
 *  只能删除自己的属性不能删除继承的属性
 */
function getProperties(){
    if(book){
        if(book.a){

        }
    }

    var deleteObj ={};
    deleteObj.x = 0;
    delete deleteObj.x;
    console.log(deleteObj.x);
}