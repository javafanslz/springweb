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
        var beiAn = $("input[name=field0050]").is(":checked");
        if(!beiAn){
            alert("[备案]请选择备案类型");
            return false;
        }
        var checkedValue =$("input[name=field0050]:checked").val();

        if(checkedValue == '7759575762758486444'){
            var cong = $("#field0012").val();
            var zhi = $("#field0013").val();
            if(this.isEmptyStr(cong)||this.isEmptyStr(zhi)){
                alert("[临时备案]请填写临时备案的时间");
                return false;
            }
            if(!this.checkTime(cong,zhi)){
                alert("[临时备案]时间差大于两个月");
                return false;
            }
        }
        if(checkedValue == '-8511638806594959112'){
            var cong = $("#field0012").val();
            var zhi = $("#field0013").val();
            var reason = $("#field0051").val();
            if(this.isEmptyStr(cong)||this.isEmptyStr(zhi)){
                alert("[长期备案]请填写长期备案的时间");
                return false;
            }
            if(this.isEmptyStr(reason)){
                alert("[长期备案原因] 请填写长期备案原因");
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
        var checkedValue = $("input[name=field0050]:checked").val();
        if(checkedValue =='7759575762758486444'){
           /* //临时备案
            $("#field0012").attr("disabled",false);
            $("#field0013").attr("disabled",false);
            //长期备案
            if($("#field0052").is(":checked")){
                $("#field0052").attr("checked",false);
            }
            $("#field0048").val("");
            $("#field0049").val("");
            $("#field0048").attr("disabled",true);
            $("#field0049").attr("disabled",true);*/
            //长期备案原因
            $("#field0051").css('background','');
            $("#field0051").attr('disabled',true);
            $("#field0051").val('');
        }else{
            //临时备案
          /*  $("#field0012").attr("disabled",true);
            $("#field0013").attr("disabled",true);
            $("#field0012").val("");
            $("#field0013").val("");*/
            //长期备案原因
            $("#field0051").css('background','#FCDD8B');
            $("#field0051").attr('disabled',false);
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
            $("#field0013").val("");
            $("#field0012").attr("disabled",true);
            $("#field0013").attr("disabled",true);
            //长期备案原因
            $("#field0051").css('background','#FCDD8B');
            $("#field0051").attr('disabled',false);
        }else{
            //长期备案
            $("#field0048").attr("disabled",true);
            $("#field0049").attr("disabled",true);
            $("#field0048").val("");
            $("#field0049").val("");
            //长期备案原因
            $("#field0051").css('background','');
            $("#field0051").attr('disabled',true);
            $("#field0051").val('');

        }
    };


    LSJS.prototype.elements = {
        "field0050": {id: "field0050", type: "radio", name: "临时备案", value: "7759575762758486444"},
        "field0050": {id: "field0050", type: "radio", name: "长期备案", value: "-8511638806594959112"},
        "field0012" : {id : "field0012",type : "text",name : "临时备案从"},
        "field0013" : {id : "field0013",type : "text",name : "临时备案至"},
        "field0051" : {id : "field0051",type : "text",name : "长期备案原因",initDisable:true}
    };

    /*事件注册*/
    LSJS.prototype.events = {
        "field0050":{event:"click",func:"linshi"},
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
    };

    LSJS.prototype.checkTime = function(startTime,endTime){
        try {
            //  把日期转化为毫秒数

            var time1 = new Date(startTime).getTime();
            var time2 = new Date(endTime).getTime();

            if(time1 > time2){
                alert("开始时间不能大于结束时间");
                return false;
            }

            //判断时间跨度是否大于2个月
            var arr1 = startTime.split('-');
            var arr2 = endTime.split('-');
            arr1[1] = parseInt(arr1[1]);
            arr1[2] = parseInt(arr1[2]);
            arr2[1] = parseInt(arr2[1]);
            arr2[2] = parseInt(arr2[2]);
            var flag = true;
            if(arr1[0] == arr2[0]){//同年
                if(arr2[1]-arr1[1] > 2){ //月间隔超过2个月
                    flag = false;
                }else if(arr2[1]-arr1[1] == 2){ //月相隔2个月，比较日
                    if(arr2[2] > arr1[2]){ //结束日期的日大于开始日期的日
                        flag = false;
                    }
                }
            }else{ //不同年
                if(arr2[0] - arr1[0] > 1){
                    flag = false;
                }else if(arr2[0] - arr1[0] == 1){
                    if(arr1[1] < 10){ //开始年的月份小于10时，不需要跨年
                        flag = false;
                    }else if(arr1[1]+2-arr2[1] < 12){ //月相隔大于2个月
                        flag = false;
                    }else if(arr1[1]+2-arr2[1] == 12){ //月相隔2个月，比较日
                        if(arr2[2] > arr1[2]){ //结束日期的日大于开始日期的日
                            flag = false;
                        }
                    }
                }
            }
            if(!flag){
                return false;
            }
            return true;
        } catch (e) {
            alert("[备案]时间格式应为yyyy-MM-dd");
            return false;
        }

    }
}