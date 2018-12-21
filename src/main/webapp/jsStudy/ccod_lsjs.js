$(document).ready(function () {
    try {
        var title = $("#subject").val();
        if (title.indexOf("临时结算规则") != -1) {
            var lsjs = new LSJS();
            qnObjs.lsjs = lsjs;
            lsjs.initPage(lsjs);
        }
    } catch (e) {
    }
});

/**
 * 直签延期受理单
 */

function LSJS() {
    var _lsjs = this;

    // 初始化页面的方法
    LSJS.prototype.initPage = function (pageType) {
        try {
            this.initDisableComps();
           // this.radiocheck();
            this.bindEvent();
        } catch (e) {
        }
    };

    LSJS.prototype.initDisableComps = function() {
        $.each(_lsjs.elements, function(key, val) {
            if(val && val.initDisable){
                if(val.type =='radio'){
                    var _radios = $("input[name="+key+"]");
                    $.each(_radios,function(key,value){
                        _lsjs.disableComp($(this), true);
                    });
                }else{
                    var elem = $("#" + val.id);
                    if(elem.length == 1){
                        _lsjs.disableComp(elem, true);
                    }
                }
            }
        });
    };
    LSJS.prototype.disableComp = function(elem, val) {
        if (!elem || elem.length == 0) {
            return;
        }
        elem.attr("disabled", val);
    };


    LSJS.prototype.validate = function () {

        if (!_lsjs.beiAnValidate()) {
            return false;
        }
        return true;
    };
    /**
     * 备案类型校验
     * @returns {boolean}
     */
    LSJS.prototype.beiAnValidate = function(){

        if(!$("#field0050").is(":checked")&&!$("#field0052").is(":checked")){
            alert("[备案]请选择备案类型");
            return false;
        }
        if($("#field0050").is(":checked")){
            var cong = $("#field0012").val();
            var zhi = $("#field0013").html();
            $("#field0048").val('');
            $("#field0049").val('');
            if(this.isEmptyStr(cong)||this.isEmptyStr(zhi)){
                alert("[临时备案]请填写临时备案的时间");
                return false;
            }
        }
        if($("#field0052").is(":checked")){
            var cong = $("#field0048").val();
            var zhi = $("#field0049").val();
            $("#field0012").val('');
            $("#field0013").html('');
            if(this.isEmptyStr(cong)||this.isEmptyStr(zhi)){
                alert("[临时备案]请填写长期备案的时间");
                return false;
            }
        }
        return true;
    };




    /**
     * 绑定事件
     */
    LSJS.prototype.bindEvent = function() {
        $.each(_lsjs.events,function(key,val){
            if(_lsjs.elements[key].type=="radio" || _lsjs.elements[key].type=="checkbox"){
                var elem = eval($('input[name='+key+']'));
                var func = eval("_lsjs.constructor.prototype."+val.func);
                elem.each(function(){
                    var func = eval("_lsjs.constructor.prototype."+val.func);
                    $(this).bind(val.event,func);
                });
            }else {
                var elem = $("#" + key);
                var func = eval("_lsjs.constructor.prototype."+val.func);
                elem.bind(val.event,func);
            }
        });
    };

    /**
     * 选择临时备案
     */
    LSJS.prototype.linshi =function(){
        if($("#field0050").is(":checked")){
            //临时备案
            $("#field0012").attr("disabled",false);
            $("#field0013").attr("disabled",false);
            //长期备案
            if($("#field0052").is(":checked")){
                $("#field0052").attr("checked",false);
            }
            $("#field0048").val("");
            $("#field0049").val("");
            $("#field0048").attr("disabled",true);
            $("#field0049").attr("disabled",true);
        }else{
            //临时备案
            $("#field0012").attr("disabled",true);
            $("#field0013").attr("disabled",true);
            $("#field0012").val("");
            $("#field0013").html("");
        }
    };

    /**
     * 选择长期备案
     */
    LSJS.prototype.changqi =function(){
        if($("#field0052").is(":checked")){
            //长期备案
            $("#field0048").attr("disabled",false);
            $("#field0049").attr("disabled",false);
            //临时备案
            if($("#field0050").is(":checked")){
                $("#field0050").attr("checked",false);
            }
            $("#field0012").val("");
            $("#field0013").html("");
            $("#field0012").attr("disabled",true);
            $("#field0013").attr("disabled",true);
        }else{
            //长期备案
            $("#field0048").attr("disabled",true);
            $("#field0049").attr("disabled",true);
            $("#field0048").val("");
            $("#field0049").val("");

        }
    };


    LSJS.prototype.elements = {
        "field0050": {id: "field0050", type: "radio", name: "临时备案", value: "7759575762758486444"},
        "field0052": {id: "field0052", type: "radio", name: "长期备案", value: "2052122236037712217"},
        "field0012" : {id : "field0012",type : "text",name : "临时备案从",initDisable:true},
        "field0013" : {id : "field0013",type : "text",name : "临时备案至",initDisable:true},
        "field0048" : {id : "field0048",type : "text",name : "长期备案从",initDisable:true},
        "field0049" : {id : "field0049",type : "text",name : "长期备案至",initDisable:true}
    };

    /*事件注册*/
    LSJS.prototype.events = {
        "field0050":{event:"click",func:"linshi"},
        "field0052":{event:"click",func:"changqi"},
    };
    /**
     * 判断是否为空
     * @param str
     * @returns {boolean}
     */
    LSJS.prototype.isEmptyStr = function(str){
        if(str==""||$.trim(str).length==0||typeof (str)=="undefined"){
            return true;
        }
        return false;
    }
}