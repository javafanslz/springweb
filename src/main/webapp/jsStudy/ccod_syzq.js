$(document).ready(function() {
    try {
        var title = $("#subject").val();
        if (title && title.indexOf("试test用工单-直签") != -1) {
            var syzq = new SYZQ();
            qnObjs.syzq = syzq;
            syzq.initPage();
        }
    } catch (e) {
        // alert("SYSL_ready:"+e);
    }
});
/**
 * 直签试用工单
 * @constructor
 */
function SYZQ(){
    var _syzq = this;
    SYZQ.prototype.initPage = function() {
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
    SYZQ.prototype.initTrObjs = function() {
    };
    /**
     * 初始化不可用组件
     */
    SYZQ.prototype.initDisableComps = function() {
        $.each(_syzq.elements, function(key, val) {
            if(val && val.initDisable){
                if(val.type =='radio'){
                    var _radios = $("input[name="+key+"]");
                    $.each(_radios,function(key,value){
                        _syzq.disableComp($(this), true);
                    });
                }else{
                    var elem = $("#" + val.id);
                    if(elem.length == 1){
                        _syzq.disableComp(elem, true);
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
    SYZQ.prototype.disableComp = function(elem, val) {
        if (!elem || elem.length == 0) {
            return;
        }
        elem.attr("disabled", val);
    };
    /**
     * 绑定事件
     */
    SYZQ.prototype.bindEvent = function() {
        $.each(_syzq.events,function(key,val){
            if(_syzq.elements[key].type=="radio" || _syzq.elements[key].type=="checkbox"){
                var elem = eval($('input[name='+key+']'));
                var func = eval("_syzq.constructor.prototype."+val.func);
                elem.each(function(){
                    var func = eval("_syzq.constructor.prototype."+val.func);
                    $(this).bind(val.event,func);
                });
            }else {
                var elem = $("#" + key);
                var func = eval("_syzq.constructor.prototype."+val.func);
                elem.bind(val.event,func);
            }
        });
    };
    /**
     * 当表单中某一个空间状态改变时 修改与其有关联的一些表单的状态
     * @param fireObjID
     */
    SYZQ.prototype.changeOtherCompsState = function(fireObjID) {
        var obj = _syzq.elements[fireObjID];
        var objs = _syzq.relations[fireObjID];

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
    SYZQ.prototype.validate = function(){
        if(!_syzq.validatePT()){
            return false;
        }
        if(!_syzq.validate_JFnumber()){
           return false;
        }
        if(!_syzq.validateOutNum()){
            return false;
        }
        if(!_syzq.validateOtherText()){
            return false;
        }
        if(!_syzq.validateZD()){
            return false;
        }
        if(!_syzq.validateAgentTel()){
            return false;
        }
        return true;
    };
    /**
     * 平台校验
     * @returns {boolean}
     */
    SYZQ.prototype.validatePT =function(){
        var ptType = $("#field0016").html();
        if(ptType != "" && ptType.indexOf('合作') != -1){
            alert("【平台类型】直签试用工单不能选择联通合作平台");
            return false;
        }
        return true;
    };

    /**
     * 缴费号码
     * @returns {boolean}
     */
    SYZQ.prototype.validate_JFnumber = function() {
        var hrsh1 =$("#field0024").val();
        var isPhoneNum = (hrsh1=='')?true:this.until_valiJfNum(hrsh1);

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
     * 外显号码校验
     */
    SYZQ.prototype.validateOutNum = function(){
        //外显文本框
        var outNum1 = $("#field0142");
        var outNum2 = $("#field0143");
        var outNum3 = $("#field0144");

        var yz_outNum1 = $("#field0142").val();
        var yz_outNum2 = $("#field0143").val();
        var yz_outNum3 = $("#field0144").val();


        var isPhoneNum = (yz_outNum1=='')?true:_syzq.until_valiPhoneNum(yz_outNum1);
        isPhoneNum = isPhoneNum && ((yz_outNum2=='')?true:_syzq.until_valiPhoneNum(yz_outNum2));
        isPhoneNum = isPhoneNum && ((yz_outNum3=='')?true:_syzq.until_valiPhoneNum(yz_outNum3));

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
        //反馈结果
        var attachment1 = $("#field0123_span").children(":first").next();
        var attachmentChilds1 = attachment1.children();
        //填写了外显号或者上传了附件之后 得上传外显结果
        if(( outNum1.val() != '' || outNum2.val() != '' || outNum3.val() != '' || attachmentChilds.length!=0)&&attachmentChilds1.length ==0){
            alert("【外显号码】请上传外显反馈结果");
            return false;
        }
        return true;
    };

    /**
     *校验所有的其他选择选项中的文本是否填写
     */
    SYZQ.prototype.validateOtherText =function(){
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
        //终端需求其他
        if ($("#field0161").is(":checked")) {
            if($("#field0162").val() == ""){
                alert("请填写终端需求中的【其它】");
                return false;
            }
        }
        return true;
    };
    /**
     * 终端需求中校验
     * 三个必选其一
     */
    SYZQ.prototype.validateZD = function(){
        if(!($("#field0037").is(":checked")||$("#field0038").is(":checked")||$("#field0161").is(":checked"))){
            alert("【终端需求】终端需求中必须选择一个终端类型");
            return false;
        }
        //校验业务系统和有终端之间的关联关系
        var value = $("input[name=field0035]:checked").attr("value");
        var zdxq = $("input[name=field0039]:checked").attr("value");
        if(value != null) {
            if (value == "-8035373081964597131") {//客+
                var pingtai = $("#field0017").val();
                if(pingtai.indexOf("CCOD4.5平台") == -1){//不是ccod4.5平台 不能选择客+
                    alert("【业务系统类型】不是4.5平台不能选择客+");
                    return false;
                }
                if (zdxq != "3911880719776501017") {//选择客+ 终端需求应该选择js
                    alert("业务需求中选择【客+】，有终端应该选择【JS】");
                    return false;
                }
            }
            if(value == "-8429465311877512806" || value == "-9150741835358384558"){ //选择客服通或电销通
                if(zdxq != "-5010749408830733596"){
                    alert("当选择客服通或这电销通时，有终端应该选择【ADT】");
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
    SYZQ.prototype.validateAgentTel = function(){
        if(!($("#field0145").is(":checked")||$("#field0146").is(":checked")||$("#field0166").is(":checked"))){
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
        return true;
    };


    /**
     * 业务系统类型联动关系
     * 选择其他 _后面不能填写
     * 选择客+ 终端需求自动选择js
     *
     */
    SYZQ.prototype.ywxt = function(){
        var value = $("input[name=field0035]:checked").attr("value");
        var zdxq = $("input[name=field0039]");
        if(value == "-2683795712946518790"){//其他
            $("#field0036").attr("disabled",false);
            $("#field0036").css('background','#FCDD8B');
        }else{
            $("#field0036").val("");
            $("#field0036").attr("disabled",true);
            $("#field0036").css('background','');
        }
        if(value == "8035373081964597131"){//客+
            var pingtai = $("#field0017").val();
            if(pingtai.indexOf("CCOD4.5平台") == -1){//不是ccod4.5平台 不能选择客+
                alert("【业务系统类型】不是4.5平台不能选择客+");
            }
            $.each(zdxq,function(key,val){
                if(val.value == "3911880719776501017"){
                    $(this).attr("checked",true);
                }
            });
        }
        if(value == "-8429465311877512806" || value == "-9150741835358384558"){ //选择客服通或电销通
            $.each(zdxq,function(key,val){
                if(val.value == "-5010749408830733596"){
                    $(this).attr("checked",true);
                }
            });
        }
    };
    /**
     * 终端需求联动关系
     * 有终端中 选择其他 _后面不能填写，
     * 其他选项后面的 _不选中不能填写
     */
    SYZQ.prototype.zdxq = function(){
        var value = $("input[name=field0039]:checked").attr("value");
        if(value != null){
            //当有终端中有选中的时候 有终端的多选框要选中
            $("#field0037").attr("checked", true);
        }
        if (value == "5567501390920437337") {//其他
            $("#field0040").attr("disabled", false);
            $("#field0040").css('background','#FCDD8B');
        } else {
            $("#field0040").val("");
            $("#field0040").attr("disabled", true);
            $("#field0040").css('background','');
        }
        //终端需求其他
        if ($("#field0161").is(":checked")) {
            $("#field0162").attr("disabled", false);
            $("#field0162").css('background','#FCDD8B');
        } else {
            $("#field0162").val("");
            $("#field0162").attr("disabled", true);
            $("#field0162").css('background','');
        }
    };

    /**
     * 有终端多选按钮
     * 未选中状态 所有的单选按钮都不能选中
     */
    SYZQ.prototype.yzd = function(){
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
    SYZQ.prototype.eventMouseSSPTTR = function(){
        var shptr = $("#field0017").parents("table");
        shptr.mouseover(function(){
            //获取平台类型
            var ptType = $("#field0016").html();
            if(ptType == "未验收平台"){
                $("#field0017").attr("disabled",false);
            }else{
                $("#field0017").attr("disabled",true);
            }
            var pingtai = $("#field0017").val();
            if(pingtai.indexOf("CCOD4.5平台") != -1){
                //客+ 文本机器人
                $("#field0159").attr("disabled",false);
                $("#field0160").attr("disabled",false);
                //坐席无终端
                $("#field0059").attr("disabled",true);
                //坐席功能
                $("#field0163").attr("disabled",false);
                $("#field0164").attr("disabled",false);
                $("#field0165").attr("disabled",false);

                //终端需求 无终端需要不可选择
                $("#field0038").attr("disabled",true);
                $("#field0038").attr("checked",false);

            }else{
                //客+ 文本机器人
                $("#field0159").attr("disabled",true);
                $("#field0160").attr("disabled",true);
                //坐席无终端
                $("#field0059").attr("disabled",false);
                //坐席功能
                $("#field0163").attr("disabled",true);
                $("#field0164").attr("disabled",true);
                $("#field0165").attr("disabled",true);
                //终端需求 无终端需要不可选择
                $("#field0038").attr("disabled",false);
            }
        });
    };
    /**
     * 业务系统类型和终端需求之间的联动关系
     */
    SYZQ.prototype.relations = function(){
        //业务系统
        _syzq.ywxt();
        //终端需求
        _syzq.zdxq();
    };
    /**
     *元素的初始化信息
     */
    SYZQ.prototype.elements = {
        "field0036":{id : "field0036",	type : "text",name : "业务系统其它",initDisable:true},
        "field0040":{id : "field0040",	type : "text",name : "有终端其它",initDisable:true},
        "field0162":{id : "field0162",	type : "text",name : "终端需求其它",initDisable:true},
        "field0159":{id : "field0159",	type : "text",name : "客+数量",initDisable:true},
        "field0160":{id : "field0160",	type : "text",name : "文本机器人",initDisable:true},
        "field0017":{id : "field0017",	type : "text",name : "所属平台",initDisable:true},
        "field0059":{id : "field0059",	type : "text",name : "坐席无终端",initDisable:false},
        "field0163":{id : "field0163",	type : "checkbox",name : "文本/IM坐席",initDisable:true},
        "field0164":{id : "field0164",	type : "checkbox",name : "坐席语音",initDisable:true},
        "field0165":{id : "field0165",	type : "checkbox",name : "视频坐席",initDisable:true},
        "field0037":{id : "field0037",	type : "checkbox",name : "有终端"},
        "field0161":{id : "field0161",	type : "checkbox",name : "有终端其他"},
        "field0035":{id : "field0035",	type : "radio",		name : "客服通", 		value:"-5951425570627761360"},
        "field0035":{id : "field0035",	type : "radio",		name : "电销通",		value:"6193382351362802577"},
        "field0035":{id : "field0035",	type : "radio",		name : "不配置",		value:"7221839946071951327"},
        "field0035":{id : "field0035",	type : "radio",		name : "其他",		value:"3288302870514713075"},
        "field0039":{id : "field0039",	type : "radio",		name : "JS", 		value:"3911880719776501017"},
        "field0039":{id : "field0039",	type : "radio",		name : "CCEA",		value:"1883269994569024117"},
        "field0039":{id : "field0039",	type : "radio",		name : "ADT",		value:"-5010749408830733596"},
        "field0039":{id : "field0039",	type : "radio",		name : "OCX",		value:"-567094536524971470"},
        "field0039":{id : "field0039",	type : "radio",		name : "其它",		value:"5567501390920437337"}
    };

    SYZQ.prototype.validateRela= {
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
    SYZQ.prototype.trs={};

    /*事件注册*/
    SYZQ.prototype.events = {
        "field0035":{event:"click",func:"relations"},
        "field0039":{event:"click",func:"zdxq"},
        "field0161":{event:"click",func:"zdxq"},
        "field0037":{event:"click",func:"yzd"}
    };

    /** **************工具函数********************** */
    SYZQ.prototype.until_valiPhoneNum = function(tel) {
        var isPhoneNum = false;
        // 手机正则表达式
        var mp_reg = /^\d{5,16}$/;
        if (mp_reg.test(tel)) {
            isPhoneNum = true;
        }
        return isPhoneNum;
    };
    SYZQ.prototype.until_valiJfNum = function(tel) { // 缴费号码
        var isPhoneNum = false;
        // 手机正则表达式
        var mp_reg = /^\d{10,14}$/;
        if (mp_reg.test(tel)) {
            isPhoneNum = true;
        }
        return isPhoneNum;
    };

}