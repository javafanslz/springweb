/**
 * Created by Lee on 2018/2/24.
 */
/**
 * 数组测试
 */


/**
 * 设置属性为只读属性
 */
function defineArray(){
    var a = [];
    Object.defineProperties(a,"length");
}

/**
 * 添加或者删除数组元素
 */
function addAndDelete(){
    var a = [];
    a[0] = "li";
    a[1] = "zhu";
    a.push("zhen");
    a.push("li","hai");
    for(var i in a){
        console.log(a[i]);
    }
    /**
     * 使用delete删除数组不会改变数组的length属性  会将数组变为稀疏数组
     */
    delete a[3];
    for(var i in a){
        console.log(a[i]);
    }
    console.log(a.length);//5
    a.pop(2);
    console.log(a.length); //4

    //ecmaScript5
    a.forEach(function(x){
        console.log(x);
    })
    var b = a.map(function(x){
      return  x+x;
    });
    console.log(b.toString());
}

/**
 * 多维数组
 * js使用嵌套数组来实现多维数组
 */
function dimAyyay(){
 var x = new  Array(3);
    x.push(new Array(1,2,3));
    x.push(new Array(4,5,6));
    x.push(new Array(7,8,9));
    console.log(x);
}