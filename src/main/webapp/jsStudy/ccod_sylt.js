$(document).ready(function() {
    try {
        var title = $("#subject").val();
        if (title && title.indexOf("试用工单-联通") != -1) {
            var sylt = new SYLT();
            qnObjs.sylt = sylt;
            sylt.initPage();
        }
    } catch (e) {
        // alert("SYSL_ready:"+e);
    }
});
/**
 * 直签试用工单
 * @constructor
 */
function SYLT(){
    var _sylt = this;
    SYLT.prototype.initPage = function() {
        try{
            this.initTrObjs();
            this.initDisableComps();
            this.eventMouseSSPTTR();
            this.bindEvent();
        }catch(e){

        }
    };
    /**
     * 初始化 tr
     */
    SYLT.prototype.initTrObjs = function() {
        $("#field0009").css('background','#FCDD8B');//企业id
    };
    /**
     * 初始化不可用组件
     */
    SYLT.prototype.initDisableComps = function() {
        $.each(_sylt.elements, function(key, val) {
            if(val && val.initDisable){
                if(val.type =='radio'){
                    var _radios = $("input[name="+key+"]");
                    $.each(_radios,function(key,value){
                        _sylt.disableComp($(this), true);
                    });
                }else{
                    var elem = $("#" + val.id);
                    if(elem.length == 1){
                        _sylt.disableComp(elem, true);
                    }
                }
            }
        });
    };
    /**
     * 设置为不可用的方法
     * @param elem
     * @param val
     */
    SYLT.prototype.disableComp = function(elem, val) {
        if (!elem || elem.length == 0) {
            return;
        }
        elem.attr("disabled", val);
    };
    /**
     * 绑定事件
     */
    SYLT.prototype.bindEvent = function() {
        $.each(_sylt.events,function(key,val){
            if(_sylt.elements[key].type=="radio" || _sylt.elements[key].type=="checkbox"){
                var elem = eval($('input[name='+key+']'));
                var func = eval("_sylt.constructor.prototype."+val.func);
                elem.each(function(){
                    var func = eval("_sylt.constructor.prototype."+val.func);
                    $(this).bind(val.event,func);
                });
            }else {
                var elem = $("#" + key);
                var func = eval("_sylt.constructor.prototype."+val.func);
                elem.bind(val.event,func);
            }
        });
    };
    /**
     * 当表单中某一个空间状态改变时 修改与其有关联的一些表单的状态
     * @param fireObjID
     */
    SYLT.prototype.changeOtherCompsState = function(fireObjID) {
        var obj = _sylt.elements[fireObjID];
        var objs = _sylt.relations[fireObjID];

        if(!(obj && objs)){
            return ;
        }
        if(obj.type =='radio'){
            var value = $("input[name="+fireObjID+"]:checked").attr("value");
            $.each(objs,function(key,val){
                var comps={};
                if(value == key){
                    comps = val.checked;
                }else{
                    comps = val.unchecked;
                }
                $.each(comps,function(key,val){
                    var _obj = _sysl.elements[key];
                    var attrs = val.attrs;

                    if(_obj.type == 'radio'){
                        $.each(attrs,function(key1,val1){
                            $("input[name="+key+"]").attr(key1,val1);
                        });

                    }else{
                        var elem = eval("$(\"#"+key+"\")");
                        $.each(attrs,function(key1,val1){
                            elem.attr(key1,val1);
                        });
                    }
                });
            });
        }
    };
    /**
     * 校验
     * @returns {boolean}
     */
    SYLT.prototype.validate = function(){
        if(!_sylt.validateEntId()){
            return false;
        }
        if(!_sylt.validateAccessNum()){
            return false;
        }
        if(!_sylt.validateAgentTel()){
            return false;
        }
        if(!_sylt.validateOutNum()){
            return false;
        }
        if(!_sylt.validate_JFnumber()){
            return false;
        }
        if(!_sylt.validateZD()){
            return false;
        }
        if(!_sylt.validateOtherText()){
            return false;
        }
        return true;
    };

    /**
     * 外显号码校验
     */
    SYLT.prototype.validateOutNum = function(){
        //外显文本框
        var outNum1 = $("#field0142");
        var outNum2 = $("#field0143");
        var outNum3 = $("#field0144");

        var yz_outNum1 = $("#field0142").val();
        var yz_outNum2 = $("#field0143").val();
        var yz_outNum3 = $("#field0144").val();


        var isPhoneNum = (yz_outNum1=='')?true:_sylt.until_valiPhoneNum(yz_outNum1);
        isPhoneNum = isPhoneNum && ((yz_outNum2=='')?true:_sylt.until_valiPhoneNum(yz_outNum2));
        isPhoneNum = isPhoneNum && ((yz_outNum3=='')?true:_sylt.until_valiPhoneNum(yz_outNum3));

        if(!isPhoneNum){
            alert("【外显号码】电话格式不正确，请重新填写。");
            $("#field0142").focus();
            return false;
        }
        //外显附件
        var attachment = $("#field0029_span").children(":first").next();
        var attachmentChilds = attachment.children();
        //外显号与附件不能同时存在
        if((outNum1.val() != '' || outNum2.val() != '' || outNum3.val() != '') && attachmentChilds.length!=0){
            alert("【外显号码】外显号码及附件不能同时上传，请选择其中一项后再次上传！");
            return false;
        }
        return true;
    };

    /**
     *校验所有的其他选择选项中的文本是否填写
     */
    SYLT.prototype.validateOtherText =function(){
        var value = $("input[name=field0035]:checked").attr("value");
        if(value != null){
            if(value == "-2683795712946518790"){//其他
                if($("#field0036").val() == ""){
                    alert("请填写业务系统类型中的【其它】");
                    return false;
                }
            }
        }
        //有终端其它
        var value1 = $("input[name=field0039]:checked").attr("value");
        if(value1 != null){
            if (value1 == "5567501390920437337") {//其他
                if($("#field0040").val() == ""){
                    alert("请填写有终端中的【其它】");
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * 终端需求中校验
     * 二个必选其一
     */
    SYLT.prototype.validateZD = function(){
        if(!($("#field0037").is(":checked")||$("#field0038").is(":checked"))){
            alert("【终端需求】终端需求中必须选择一个终端类型");
            return false;
        }
        //校验业务系统和有终端之间的关联关系
        var value = $("input[name=field0035]:checked").attr("value");
        var zdxq = $("input[name=field0039]:checked").attr("value");
        if(value != null) {
            /*if (value == "-8035373081964597131") {//客+
                if (zdxq != "3911880719776501017") {//选择客+ 终端需求应该选择js
                    alert("业务需求中选择【客+】，有终端应该选择【JS】");
                    return false;
                }
            }*/
            if(value == "-8429465311877512806" || value == "-9150741835358384558"){ //选择客服通或电销通
                if(zdxq != "-5010749408830733596"){
                    alert("【终端需求】当选择客服通或这电销通时，有终端应该选择【ADT】");
                    return false;
                }
            }
        }

        if($("#field0037").is(":checked")){
            if(typeof(zdxq)=="undefined"){
                alert("【终端需求】勾选了有终端，需要勾选后面的具体选项！");
                return false;
            }
        }
        return true;
    };
    /**
     * 坐席电话校验
     */
    SYLT.prototype.validateAgentTel = function(){
        if(!($("#field0145").is(":checked")||$("#field0146").is(":checked"))){
            alert("【坐席电话】必须选择坐席电话中一个选项");
            return false;
        }
        //填写坐席号码不能超过70字符  与上传附件不能同时填写
        if($("#field0147").val() != "" && $("#field0147").val().length > 70 ){
            alert("【坐席电话】坐席号码不能超多70个字符");
            return false;
        }
        //坐席号码附件
        var agentTel = $("#field0023_span").children(":first").next();
        var agentTelChilds = agentTel.children();
        if(agentTelChilds.length !=0 && $("#field0147").val() != "" ){
            alert("【坐席电话】坐席电话和附件不能同时输入");
            return false;
        }
        //联通上传邮件
        var email = $("#field0033_span").children(":first").next();
        var emailChild = email.children();
        if(emailChild.length == 0){
            alert("请上传联通信息");
            return false;
        }
        return true;
    };

    /**
     * 企业id必填
     */
    SYLT.prototype.validateEntId = function(){
        var entId = $("#field0009").val();
        if(entId == '' ){
            alert("【企业ID】企业id为必填项");
            $("#field0009").focus();
            return false;
        }

        return true;
    };

    /**
     * 平台接入号校验  填写或者上传附件必填其一
     */
    SYLT.prototype.validateAccessNum = function(){
        var accessNum = $("#field0136").val();
        //平台接入号附件
        var attachment = $("#field0022_span").children(":first").next();
        var attachmentChilds = attachment.children();
        if(accessNum != ''){
            if(!_sylt.until_valiPhoneNum(accessNum)){
                alert("【平台接入号】接入号码必须为为5-16为数字");
                return false;
            }
        }
        if(accessNum == '' && attachmentChilds.length == 0) {
            alert("【平台接入号】必须填写一项");
            return false;
        }
        if(accessNum != '' && attachmentChilds.length != 0){
            alert("【平台接入号】填写接入号与上传附件只能选择一项");
            return false;
        }
        return true;
    };
    /**
     * 缴费号码
     * @returns {boolean}
     */
    SYLT.prototype.validate_JFnumber = function() {
        var hrsh1 =$("#field0024").val();
        var hrct1 =$("#field0025").val();
        var hrsh2 =$("#field0026").val();
        var hrct2 =$("#field0027").val();
        var yyfwf =$("#field0028").val();

        var isPhoneNum = (hrsh1=='')?true:this.until_valiJfNum(hrsh1);
        isPhoneNum = isPhoneNum && ((hrct1=='')?true:this.until_valiJfNum(hrct1));
        isPhoneNum = isPhoneNum && ((hrsh2=='')?true:this.until_valiJfNum(hrsh2));
        isPhoneNum = isPhoneNum && ((hrct2=='')?true:this.until_valiJfNum(hrct2));
        isPhoneNum = isPhoneNum && ((yyfwf=='')?true:this.until_valiJfNum(yyfwf));


        if(!isPhoneNum){
            alert("【缴费号码】缴费号码应为10-14为数字，请重新填写。");
            $(":contains('缴费号码')").parents("td").css("color","red");
            $("#field0024").focus();
            return false;
        }
        $(":contains('缴费号码')").parents("td").css("color","black");
        return true;
    };


    /**
     * 业务系统类型联动关系
     * 选择其他 _后面不能填写
     *
     */
    SYLT.prototype.ywxt = function(){
        var value = $("input[name=field0035]:checked").attr("value");
        //var zdxq = $("input[name=field0039]");
        if(value == "-5891212324087446913"){//其他
            $("#field0036").attr("disabled",false);
            $("#field0036").css('background','#FCDD8B');
        }else{
            $("#field0036").val("");
            $("#field0036").attr("disabled",true);
            $("#field0036").css('background','');//人工服务基本服务费折扣单价
        }
      /*  if(value == "6404582267989804173" || value == "9013198972058747339"){ //选择客服通或电销通
            $.each(zdxq,function(key,val){
                if(val.value == "-4305093821079142156"){
                    $(this).attr("checked",true);
                }
            });
        }*/
    };
    /**
     * 终端需求联动关系
     * 有终端中 选择其他 _后面不能填写，
     * 其他选项后面的 _不选中不能填写
     */
    SYLT.prototype.zdxq = function(){
        var value = $("input[name=field0039]:checked").attr("value");
        if(value != null && typeof(value)!="undefined"){
            //当有终端中有选中的时候 有终端的多选框要选中
            $("#field0037").attr("checked", true);
        }
        if (value == "-1122618658103079534") {//其他
            $("#field0040").attr("disabled", false);
            $("#field0040").css('background','#FCDD8B');
        } else {
            $("#field0040").val("");
            $("#field0040").attr("disabled", true);
            $("#field0040").css('background','');
        }
    };

    /**
     * 有终端多选按钮
     * 未选中状态 所有的单选按钮都不能选中
     */
    SYLT.prototype.yzd = function(){
        if(!$("#field0037").is(":checked")){
            $("input[name=field0039]").each(function(){
                $(this).attr("checked",false);
            });
        }
    };

    /**
     * 所属平台和各个控件之间的关系
     * 当平台类型为未验收的时候所属平台可以输入
     * 当所属平台是ccod4.5平台的  坐席功能变为可选否则不可选
     * 试用数量中不可选择变为选择
     */
    SYLT.prototype.eventMouseSSPTTR = function(){
        var shptr = $("#field0017").parents("table");
        shptr.mouseover(function(){
            //获取平台类型
            var ptType = $("#field0016").html();
            if(ptType == "未验收平台"){
                $("#field0017").attr("disabled",false);
            }else{
                $("#field0017").attr("disabled",true);
            }
        });
    };
    /**
     * 业务系统类型和终端需求之间的联动关系
     */
    SYLT.prototype.relations = function(){
        //业务系统
        _sylt.ywxt();
        //终端需求
        _sylt.zdxq();
    };
    /**
     *元素的初始化信息
     */
    SYLT.prototype.elements = {
        "field0036":{id : "field0036",	type : "text",name : "业务系统其它",initDisable:true},
        "field0040":{id : "field0040",	type : "text",name : "有终端其它",initDisable:true},
        "field0017":{id : "field0017",	type : "text",name : "所属平台",initDisable:true},
        "field0037":{id : "field0037",	type : "checkbox",name : "有终端"},
        "field0035":{id : "field0035",	type : "radio",		name : "客服通", 		value:"-5951425570627761360"},
        "field0035":{id : "field0035",	type : "radio",		name : "电销通",		value:"6193382351362802577"},
        "field0035":{id : "field0035",	type : "radio",		name : "不配置",		value:"7221839946071951327"},
        "field0035":{id : "field0035",	type : "radio",		name : "其他",		value:"3288302870514713075"},
        "field0039":{id : "field0039",	type : "radio",		name : "CCEA",		value:"8254392202341730514"},
        "field0039":{id : "field0039",	type : "radio",		name : "ADT",		value:"-4305093821079142156"},
        "field0039":{id : "field0039",	type : "radio",		name : "OCX",		value:"-7530274332352494683"},
        "field0039":{id : "field0039",	type : "radio",		name : "其它",		value:"-1122618658103079534"}
    };
    SYLT.prototype.validateRela= {
        // REQUIRED:[R 必填项] [NR 不必填] [RC 有条件的必填项] [COMS 需要组件]
        "field0040":{
            required : 'RC',
            conditions : {
                "field0039":{id:"field0039", isValue:true, condition:"EQ", value:"-1122618658103079534"}
            },
            validateMsg:"请填写终端需求",
            warnText : "终端需求",
            color : "red",
            focus:true
        }
    };
    SYLT.prototype.trs={};

    /*事件注册*/
    SYLT.prototype.events = {
        "field0035":{event:"click",func:"relations"},
        "field0039":{event:"click",func:"zdxq"},
        "field0161":{event:"click",func:"zdxq"},
        "field0037":{event:"click",func:"yzd"}
    };

    /** **************工具函数********************** */
    SYLT.prototype.until_valiPhoneNum = function(tel) {
        var isPhoneNum = false;
        // 手机正则表达式
        var mp_reg = /^\d{5,16}$/;
        if (mp_reg.test(tel)) {
            isPhoneNum = true;
        }
        return isPhoneNum;
    };
    SYLT.prototype.until_valiJfNum = function(tel) { // 缴费号码
        var isPhoneNum = false;
        // 手机正则表达式
        var mp_reg = /^\d{10,14}$/;
        if (mp_reg.test(tel)) {
            isPhoneNum = true;
        }
        return isPhoneNum;
    };
}