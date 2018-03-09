$(document).ready(function() {
    try {
        var title = $("#subject").val();
        if (title && title.indexOf("上线计费工单") != -1) {
            var sxjf = new SXJF();
            qnObjs.sxjf = sxjf;
            sxjf.initPage(sxjf);
        }
    } catch (e) {
    }
});

/**
 * 上线计费工单对象
 */
function SXJF() {
    var _sxjf = this;

    // 初始化页面的方法
    SXJF.prototype.initPage = function(pageType) {
        try{
            this.initTrObjs();
            this.initDisableComps();
            this.bindEvent();
            this.eventMouseSSPTTR();
            this.radiocheck();
            this.calFee();

            this.hideTrObjs();
            this.initEnableComps();//

        }catch(e){
        }
    };
    // 绑定事件
    SXJF.prototype.bindEvent = function() {
        $.each(_sxjf.events,function(key,val){
            if(_sxjf.elements[key].type=="radio"){
                var elem = eval($('input[name='+key+']'));
                var func = eval("_sxjf.constructor.prototype."+val.func);
                elem.each(function(){
                    var func = eval("_sxjf.constructor.prototype."+val.func);
                    $(this).bind(val.event,func);
                });
            }else{
                var elem = eval("$(\"#" + key + "\")");
                var func = eval("_sxjf.constructor.prototype."+val.func);
                elem.bind(val.event,func);
            }
        });
    };

    SXJF.prototype.validate = function() {
        if(!this.validate_zqjfsj()){
            return false;
        }
        if(!this.validate_ptlx()){
            return false;
        }
        if(!this.validate_ZDWB()){
            return false;
        }
        if(!this.validate_ptjrh()){
            return false;
        }
        if(!this.validate_zysxxq()){
            return false;
        }
        /*if(!this.validatePltCustType()){
         return false;
         }*/
        if(!this.validateAgentPSTN()){
            return false;
        }
        if(!this.validateOutNum()){
            return false;
        }
        if(!this.validate_jfnumber()){
            return false;
        }
        if(!this.validateJSDX_ZH()){
            return false;
        }
        if(!this.validate_thzf()){
            return false;
        }
        if(!this.validate_RGFW()){
            return false;
        }
        if(!this.validate_jbfwf()){
            return false;
        }
        if(!this.validate_ZQJFDATE()){
            return false;
        }


        var validateResult = true;
        $.each(_sxjf.validateRela,function(key,val){
            var obj = _sxjf.elements[key];
            var value = '';
            if(obj.type == 'radio'){
                value = $("input[name="+key+"]:checked").val();
            }else if(obj.type == 'checkbox'){
                if($('#'+key).is(':checked')){
                    value = $("#"+key).val();
                }
            }else{
                value = $("#"+key).val();
            }
            var required = val.required ;

            /*需要其他选项的 BEGIN*/
            if(required == "COMS"){
                $.each(val.coms,function(comsKey,comsValObj){
                    var _comsObj = _sxjf.elements[comsKey];
                    var _comsVal = '';

                    if(_comsObj.type == 'radio'){
                        _comsVal = $("input[name="+comsKey+"]:checked").val();
                    }else{
                        _comsVal = $("#"+comsKey).val();
                    }

                    if(value && value !='' && comsValObj.needValue){
                        if(!_comsVal || _comsVal == ''){
                            alert(val.validateMsg);
                            if(val.focus){
                                $("#"+key).focus();
                            }
                            $(":contains('"+ val.warnText +"')").parents("td").css("color","red");
                            validateResult = false;
                        }else{
                            $(":contains('"+ val.warnText +"')").parents("td").css("color","black");
                        }
                    }else{
                        $(":contains('"+ val.warnText +"')").parents("td").css("color","black");
                    }
                });
            }
            if(!validateResult){
                return false;
            }
            /*需要其他选项的 END*/

            /*有条件的必填项 BEGIN*/
            if(required == "RC"){
                $.each(val.conditions,function(consKey,consValObj){
                    if(consValObj.isValue){
                        var obj1 = _sxjf.elements[consKey];
                        var conObj = $("#"+obj1.id);
                        var conVal;
                        //alert(obj.type);

                        if(obj1.type == 'radio'){
                            conVal = $("input[name="+consKey+"]:checked").val();
                        }else{
                            conVal = conObj.val();
                        }

                        if(consValObj.value == conVal){
                            if(value == ''){
                                alert(val.validateMsg);
                                if(conObj.focus){
                                    $("#"+key).focus();
                                }
                                $(":contains('"+ val.warnText +"')").parents("td").css("color","red");
                                validateResult =  false;
                            }else{
                                $(":contains('"+ val.warnText +"')").parents("td").css("color","black");
                            }

                        }else{
                            $(":contains('"+ val.warnText +"')").parents("td").css("color","black");
                        }
                    }
                });
            }
            if(!validateResult){
                return false;
            }
            /*有条件的必填项 END*/
        });

        return validateResult;
    };



    SXJF.prototype.validate_ZQJFDATE = function(e) {
        var zqjfdate = $("#field0135").val();

        var zqjfdate_1 = $("#field0162");
        var systemDate =  zqjfdate_1.val();

        var myDate = new Date();
        //获取当前年
        var year=myDate.getFullYear();
        //获取当前月
        var month=myDate.getMonth()+1;
        //获取当前日
        var date=myDate.getDate();

        var nowDate =year+'-'+month+"-"+date;

        var start = new Date(zqjfdate.replace("-", "/").replace("-", "/"));  //计费日期
        var end = new Date(systemDate.replace("-", "/").replace("-", "/"));  //当前日期
        if (start < end) {
            alert('计费日期不能小于当前日期！');
            return false;
        }
        return true;
    }
    /**
     * 有自动外拨数量—一定开通有终端坐席数量—坐席电话可能是ip、可能是PSTN
     * */
    SXJF.prototype.validate_ZDWB = function(e) {
        var sip = $("#field0145").attr('checked');
        var pstn = $("#field0146").attr('checked');
        var yzdlx =$("#field0037").attr('checked');
        var wzdlx =$("#field0038").attr('checked');
        if(yzdlx=='checked'){
            if(sip==null&&pstn==null){
                alert("【有终端】选中时请选择SIP或PSTN电话");
                return false;
            }
        }
        if(wzdlx=='checked'){
            if(pstn==null){
                alert("【无终端】选中时请选择【PSTN】");
                return false;
            }
        }
        return true;
    }
    SXJF.prototype.validate_zqjfsj = function(e) {
        var khfzqd = $("#field0020");
        var khfzqd_num = khfzqd.val();//选择联通或者直签用户
        //-2308135508315779848联通客户 | 6096262930536024380直签客户

        var zqjfsj =$("#field0135").val();
        var jfsjxq_zq =$(":contains('正式开始计费')").parents("td");
        if(zqjfsj==""&& khfzqd_num=="6096262930536024380"){
            alert("直签用户必须填写 计费时间需求！");
            jfsjxq_zq.css("color","red");
            return false;
        }
        jfsjxq_zq.css("color","black");

        return true;
    }
    /**
     * 验证平台类型 选择未验收平台时，必须填写所属平台
     * */
    SXJF.prototype.validate_ptlx = function(e) {
        var shpt=$("#field0017").val(); //所属平台
        var ptlx=$("#field0016").text(); //平台类型

        if(ptlx=="未验收平台" && shpt ==""){
            $("#field0017").css('background','#FCDD8B');
            alert("平台类型为未验收平台时,请填写所属平台！");
            return false;
        }else{
            $("#field0017").css('background','#FFFFFF');
        }
        return true;
    }

    SXJF.prototype.validate_zysxxq = function(e){
        var khfzqd = $("#field0020");
        var khfzqd_num = khfzqd.val();//选择联通或者直签用户
        //-2308135508315779848联通客户 | 6096262930536024380直签客户

        var lyblsx = $("#field0048_txt").attr("title");  //录音保留时限值
        var lyqt = $("#field0102").val();

        var baobsx = $("#field0049_txt").attr("title");  //报表保留时限值
        var baoqt = $("#field0103").val();

        var bool_lyblsx =(lyblsx!="");//有值 true
        var bool_lyqt =(lyqt!="");//有值 true

        var bool_bsx =(baobsx!="");
        var bool_bqt =(baoqt!="");

        if(khfzqd_num==6096262930536024380 && (!lyblsx || !baobsx || lyblsx=="" || baobsx=="")){
            alert("直签用户，请必须输入录音保留时限、报表保留时限！");
            return false;
        }

        if(lyblsx=="其他"&&lyqt==""){
            alert("录音保留时限为【其他】时，请填写【其他时限】！");
            return false;
        }
        if(baobsx=="其他"&&baoqt==""){
            alert("报表保留时限为【其他】时，请填写【其他时限】！");
            return false;
        }


        return true;
    }
    SXJF.prototype.validate_jbfwf = function(e) {
        // 人工基本服务费
        var rg_jbfwf_zkdj = $("#field0073").val();
        var rg_yzdzx = $("#field0056").val();
        var rg_tjfx = $("#field0057").val();
        var rg_zxly = $("#field0058").val();
        var rg_wzdzx = $("#field0059").val();

        if(rg_yzdzx!=""||rg_tjfx!=""||rg_zxly!=""||rg_wzdzx!= ""){
            if(rg_jbfwf_zkdj==""){
                alert("已选择人工服务功能，【人工服务：折扣单价不能为空！】，请填写后再次提交！");
                $(":contains('基本服务费')").parents("td").css("color","red");
                $("#field0073").focus();
                return false;
            }
        }
        $(":contains('基本服务费')").parents("td").css("color","black");


        return true;
    }


    /**
     * 有终端选择下 必须填写人工服务费中 有终端坐席
     * */
    SXJF.prototype.validate_RGFW = function(e) {

        var rgfw_yzdzx=$("#field0056").val();
        var rgfw_tjfx=$("#field0057").val();
        var rgfw_zxly=$("#field0058").val();

        var yzdlx =$("#field0037").attr("checked");
        if(yzdlx=='checked'){
            if(rgfw_yzdzx==''&&rgfw_tjfx==''&&rgfw_zxly==''){
                alert("请必须填写人工有终端坐席");
                $(":contains('有终端坐席')").parents("td").css("color","red");
                $("#field0056").focus();
                return false;
            }
        }
        $(":contains('有终端坐席')").parents("td").css("color","black");
        var shuls=[52,53,54,56,57,58,59];
        for(var i=0;i<shuls.length;i++){
            var isOK = true;
            var str="var shul_num =  $('#field00"+shuls[i]+"').val();";
            str+="var zktype_num = $(\"input[name='field00"+(shuls[i]+9)+"']:checked\").val();";
            str+="var danjia_num = $('#field00"+ (shuls[i]+18)+"').val();";
            str+="if(!(shul_num!=\"\"&&zktype_num!=null&&danjia_num!=\"\")){";
            str+="if(shul_num!=\"\")		{alert('必须选择折扣,填写单价');isOK=isOK&&false;}";
            str+="else if(zktype_num!=null)	{alert('必须填写数量,单价');isOK=isOK&&false;}";
            str+="else if(danjia_num!=\"\") {alert('必须填写数量,选择折扣');isOK=isOK&&false;}}" ;
            eval(str);
            if(!isOK){
                return false;
            }
        }

        if(!(rgfw_yzdzx!=""&&rgfw_tjfx!=""&&rgfw_zxly!="")){
            if(rgfw_yzdzx!=""){
                alert("有终端坐席有值,必须填写【统计分析】和【坐席录音】");
                return false;
            }else if(rgfw_tjfx!=""){
                alert("统计分析有值,必须填写【有终端坐席】和【坐席录音】");
                return false;
            }else if(rgfw_zxly!=""){
                alert("坐席录音有值,必须填写【有终端坐席】和【统计分析】");
                return false;
            }
        }
        return true;

    }

    SXJF.prototype.eventClick0090 = function(e) {
        if ($("input[name=field0090]:checked").val() == -3963605101769899438) {
            _sxjf.trs._t1.attr('rowspan', 18);
            _sxjf.trs._t2.attr('rowspan', 4);
            $("#field0091").val("");
            $("#field0151").val("");
            $("#field0101").val("");
            $("input[name=field0092]:checked").attr("checked",false);
            $("#field0093").val("");

            $("#field0094").attr("checked",false);
            $("#field0095").attr("checked",false);
            $("#field0096").attr("checked",false);
            $("#field0097").attr("checked",false);
            $("#field0098").attr("checked",false);
            $("#field0099").attr("checked",false);
            _sxjf.trs.zfxx.show();
            _sxjf.trs.bzzf.show();
            _sxjf.trs.dzhzf.hide();
            _sxjf.trs.huabao.hide();
            _sxjf.trs.zfbh.hide();
            _sxjf.trs.qtsm.hide();
        }
        if ($("input[name=field0090]:checked").val() == -1244957151022398219) {
            _sxjf.trs._t1.attr('rowspan', 20);
            _sxjf.trs._t2.attr('rowspan', 6);


            $("#field0094").attr("checked",false);
            $("#field0095").attr("checked",false);
            $("#field0096").attr("checked",false);
            $("#field0097").attr("checked",false);
            $("#field0098").attr("checked",false);
            $("#field0099").attr("checked",false);
            _sxjf.trs.zfxx.hide();
            _sxjf.trs.bzzf.hide();
            _sxjf.trs.dzhzf.show();
            _sxjf.trs.huabao.show();
            _sxjf.trs.zfbh.show();
            _sxjf.trs.qtsm.show();
        }
    };

    SXJF.prototype.eventchange0151 = function(){
        _sxjf.changeOtherCompsState("field0151");
    };
    SXJF.prototype.eventchange0017 = function(){
        _sxjf.eventMouseSSPTTR();
    };

    SXJF.prototype.eventchange0091 = function(){
        _sxjf.changeOtherCompsState("field0091");
    };
    SXJF.prototype.eventClikPstn = function(e) {
        _sxjf.changeOtherCompsState("field0146");
        _sxjf.changePSTNColor();
    };
    SXJF.prototype.eventChange0020 =function(e){
        _sxjf.changeHideState("field0020");
        _sxjf.changeOtherCompsState("field0020");
        _sxjf.changeCompsCSS("field0020");
        var khfzqd = $("#field0020");
        khfzqd.change(function() {
            var khfzqd_num = khfzqd.val();
            if(khfzqd_num == -2308135508315779848){
                var c=$("a.common_button.common_button_gray.margin_r_10");
                if(c.length != 0){
                    try{
                        c[1].click();
                    }catch (e) {
                    }
                }
            }
        });
        _sxjf.showFjDiv();
    };

    //所属平台行
    SXJF.prototype.eventMouseSSPTTR = function(){
        $("#field0017").attr("disabled",true);
        var shptr = $("#field0017").parents("table");
        shptr.mouseover(function(){
            if($("#field0016").text()=="未验收平台"){
                $("#field0017").attr("disabled",false);
                $("#field0017").css('background','#FCDD8B');
            }else{
                $("#field0017").attr("disabled",true);
                $("#field0017").css('background','#FFFFFF');
            }
            _sxjf.showFjDiv();
        });
        shptr.keypress(function(){
            if($("#field0016").text()=="未验收平台"){
                $("#field0017").attr("disabled",false);
            }else{
                $("#field0017").attr("disabled",true);
            }
            _sxjf.showFjDiv();
        });
    }

    SXJF.prototype.eventClick0037 = function() {
        _sxjf.changeOtherCompsState("field0037");
        _sxjf.changeCompsCSS("field0037");
        _sxjf.changeYzdColor();
    };
    SXJF.prototype.eventClick0038 = function() {
        _sxjf.changeOtherCompsState("field0038");
        _sxjf.changeYzdColor();
    };
    SXJF.prototype.eventChange0069 = function() {
        _sxjf.changeOtherCompsState("field0069");
    };
    SXJF.prototype.eventChange0073 = function() {
        _sxjf.changeOtherCompsState("field0073");
    };

    SXJF.prototype.eventClick0039 = function() {
        _sxjf.changeOtherCompsState("field0039");
        _sxjf.changeCompsCSS("field0039");
    };

    SXJF.prototype.eventClick0035 = function() {
        _sxjf.changeOtherCompsState("field0035");
        _sxjf.changeCompsCSS("field0035");
    };

    SXJF.prototype.eventClick0041 = function(){
        _sxjf.changeOtherCompsState("field0041");
        _sxjf.changeCompsCSS("field0041");
    };
    SXJF.prototype.eventClick0042 = function() {
        _sxjf.changeOtherCompsState("field0042");
        _sxjf.changeCompsCSS("field0042");
    };
    SXJF.prototype.eventClick0044 = function() {
        _sxjf.changeOtherCompsState("field0044");
        _sxjf.changeCompsCSS("field0044");
    };
    SXJF.prototype.eventChange0048 = function() {
        _sxjf.changeOtherCompsState("field0048");
        _sxjf.changeCompsCSS("field0048");
    };
    SXJF.prototype.eventChange0049 = function() {
        _sxjf.changeOtherCompsState("field0049");
        _sxjf.changeCompsCSS("field0049");
    };
    SXJF.prototype.changePSTNColor = function() {

        var pstn = $("#field0146").attr('checked');
        if(pstn=='checked'){
            var zxdh1 = $("#field0139").css('background','#CCFFCC');
            var zxdh2 = $("#field0140").css('background','#CCFFCC');
            var zxdh3 = $("#field0141").css('background','#CCFFCC');
            var zxdh1 = $("#field0147").css('background','#CCFFCC');
            var zxdh2 = $("#field0148").css('background','#CCFFCC');
            var zxdh3 = $("#field0149").css('background','#CCFFCC');
            var zxdhfj = $("#field0023_span").css('background','#CCFFCC');
        }else{
            var zxdh1 = $("#field0139").css('background','#FFFFFF');
            var zxdh2 = $("#field0140").css('background','#FFFFFF');
            var zxdh3 = $("#field0141").css('background','#FFFFFF');
            var zxdh1 = $("#field0147").css('background','#FFFFFF');
            var zxdh2 = $("#field0148").css('background','#FFFFFF');
            var zxdh3 = $("#field0149").css('background','#FFFFFF');
            var zxdhfj = $("#field0023_span").css('background','#FFFFFF');
        }

    }
    SXJF.prototype.changeYzdColor = function() {
        var yzdlx =$("#field0037").attr('checked');
        var wzdlx =$("#field0038").attr('checked');

        var jbfwf_zkdj =$("#field0073");
        var yzdzx_shul =$("#field0056");
        var yzdzx_dx =$("[id='field0065_txt']");
        var yzdzx_zkdj = $("#field0074");

        var tjfx_shul =$("#field0057");
        var tjfx_dx =$("[id='field0066_txt']");
        var tjfx_zkdj = $("#field0075");

        var zxly_shul =$("#field0058");
        var zxly_dx =$("[id='field0067_txt']");
        var zxly_zkdj = $("#field0076");

        var wzdzx_shul =$("#field0059");
        var wzdzx_dx =$("[id='field0068_txt']");
        var wzdzx_zkdj = $("#field0077");

        if(yzdlx=='checked'){
            jbfwf_zkdj.css('background','#FCDD8B');
            yzdzx_shul.css('background','#FCDD8B');
            yzdzx_dx.css('background','#FCDD8B');
            yzdzx_zkdj.css('background','#FCDD8B');
            tjfx_shul.css('background','#FCDD8B');
            tjfx_dx.css('background','#FCDD8B');
            tjfx_zkdj.css('background','#FCDD8B');
            zxly_shul.css('background','#FCDD8B');
            zxly_dx.css('background','#FCDD8B');
            zxly_zkdj.css('background','#FCDD8B');
        }else if(yzdlx!='checked'){
            jbfwf_zkdj.css('background','#F8F8F8');
            yzdzx_shul.css('background','#F8F8F8');
            yzdzx_dx.css('background','#F8F8F8');
            yzdzx_zkdj.css('background','#F8F8F8');
            tjfx_shul.css('background','#F8F8F8');
            tjfx_dx.css('background','#F8F8F8');
            tjfx_zkdj.css('background','#F8F8F8');
            zxly_shul.css('background','#F8F8F8');
            zxly_dx.css('background','#F8F8F8');
            zxly_zkdj.css('background','#F8F8F8');
        }

        if(wzdlx=='checked'){
            wzdzx_shul.css('background','#FCDD8B');
            wzdzx_dx.css('background','#FCDD8B');
            wzdzx_zkdj.css('background','#FCDD8B');
        }else{
            wzdzx_shul.css('background','#FFFFFF');
            wzdzx_dx.css('background','#FFFFFF');
            wzdzx_zkdj.css('background','#FFFFFF');
        }

    }
    SXJF.prototype.changeHideState = function(fireObjID) {
        var obj =_sxjf.elements[fireObjID];			//获取焦点
        var relaObj =_sxjf.trRelations[fireObjID];			//获取要操作的对象

        if(obj.type =='select'){
            var value=$("#"+fireObjID+" option:selected").val();
            var sel = relaObj[value];
            $.each(sel.checked, function(key, val) {
                if (val.need == "hide") {
                    _sxjf.trs[key].hide();
                }
                if (val.need == "show") {
                    _sxjf.trs[key].show();
                }
            });
        }
    }
    SXJF.prototype.changeCompsCSS = function(fireObjID) {
        var obj = _sxjf.elements[fireObjID];
        var relaObj = _sxjf.cssRela[fireObjID];
        var pageObj;
        if (obj.type == 'select') {
            var value = $("#" + fireObjID + "").val();
            $.each(relaObj, function(rkey, rval) {
                var comps = {};
                if (value == rkey) {
                    comps = rval.checked;
                } else {
                    comps = rval.unchecked;
                }
                $.each(comps, function(compkey, compval) {
                    var _obj = _sxjf.elements[compkey];
                    var attrs = compval.attrs;

                    var comp = $("#" + compkey);
                    $.each(attrs, function(attrKey, attrVal) {
                        comp.attr("style");
                        comp.css(attrKey, attrVal);
                    });
                });
            });
        } else if (obj.type == 'radio') {
            var value = $("input[name=" + fireObjID + "]:checked").val();
            $.each(relaObj, function(rkey, rval) {
                var comps = {};
                if (value == rkey) {
                    comps = rval.checked;
                } else {
                    comps = rval.unchecked;
                }
                $.each(comps, function(compkey, compval) {
                    var _obj = _sxjf.elements[compkey];
                    var attrs = compval.attrs;

                    var comp = $("#" + compkey);
                    $.each(attrs, function(attrKey, attrVal) {
                        comp.attr("style");
                        comp.css(attrKey, attrVal);
                    });
                });
            });
        } else if (obj && obj.type == 'checkbox') {
            var pageObj = $("#" + fireObjID);
            if (pageObj.is(':checked')) {
                $.each(relaObj.checked, function(rkey, rval) {
                    var attrs = rval.attrs;
                    var comp = $("#" + rkey);

                    $.each(attrs, function(attrKey, attrVal) {
                        comp.css(attrKey, attrVal);
                    });
                });
            } else {
                $.each(relaObj.unchecked, function(rkey, rval) {
                    var attrs = rval.attrs;
                    var comp = $("#" + rkey);

                    $.each(attrs, function(attrKey, attrVal) {
                        comp.css(attrKey, attrVal);
                    });
                });
            }
        }
    }
    SXJF.prototype.changeOtherCompsState = function(fireObjID) {
        var obj = _sxjf.elements[fireObjID];
        var objs = _sxjf.relations[fireObjID];

        if(!(obj && objs)){
            return ;
        }

        if(obj && objs && obj.type =='checkbox'){
            var operObj = $("#" + fireObjID);
            if(operObj.is(':checked')){
                $.each(objs.checked,function(key,val){
                    var _obj = _sxjf.elements[key];
                    var attrs = val.attrs;
                    if(_obj.type == 'radio'){
                        var elems = $("input[name="+key+"]");
                        $.each(attrs,function(key2,val2){
                            elems.attr(key2,val2);
                        });
                    }else{
                        var elems = eval("$(\"#"+key+"\")");
                        $.each(attrs,function(key1,val1){
                            elems.attr(key1,val1);
                        });
                    }
                });
            }else{
                $.each(objs.unchecked,function(key,val){
                    var _obj = _sxjf.elements[key];
                    var attrs = val.attrs;
                    if(!_obj || !_obj.type){
                        alert(key);
                    }
                    if(_obj.type && _obj.type == 'radio'){
                        var elems = $("input[name="+key+"]");
                        $.each(attrs,function(key2,val2){
                            elems.attr(key2,val2);
                        });
                    }else{
                        var elems = eval("$(\"#"+key+"\")");
                        $.each(attrs,function(key1,val1){
                            elems.attr(key1,val1);
                        });
                    }
                });
            }
        }else

        if(obj && objs && obj.type =='radio'){
            var value = $("input[name="+fireObjID+"]:checked").attr("value");
            $.each(objs,function(key,val){
                var comps={};
                if(value == key){
                    comps = val.checked;
                }else{
                    comps = val.unchecked;
                }
                $.each(comps,function(key,val){
                    var _obj = _sxjf.elements[key];
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
        }else

        if(obj && objs && obj.type =='select'){
            var value=$("#"+fireObjID+" option:selected").val();
            $.each(objs,function(key,val){
                var comps={};
                if(value == key){
                    comps = val.checked;
                }else{
                    comps = val.unchecked;
                }
                $.each(comps,function(key,val){
                    var _obj =_sxjf.elements[key];
                    var attrs = val.attrs;

                    var elem = eval("$(\"#"+key+"\")");
                    $.each(attrs,function(key1,val1){
                        elem.attr(key1,val1);
                    });
                });
            });
        }else{
            var value=$("#"+fireObjID).val();
            $.each(objs,function(key,val){
                var comps={};
                if(value != ''){
                    comps = objs.checked;
                }else{
                    comps = objs.unchecked;
                }
                $.each(comps,function(key,val){
                    var _obj =_sxjf.elements[key];
                    var attrs = val.attrs;
                    var elem;
                    if(_obj.type =="radio"){
                        elem = $("input[name="+key+"]");
                    }else{
                        elem = $("#"+key);
                    }
                    $.each(attrs,function(key1,val1){
                        elem.attr(key1,val1);
                    });
                });
            });
        }
    };

    SXJF.prototype.test = function(a) {

    };

    SXJF.prototype.initTrObjs = function() {
        var jrh1 = $("#field0136").css('background','#CCFFCC');
        var jrh2 = $("#field0137").css('background','#CCFFCC');
        var jrh3 = $("#field0138").css('background','#CCFFCC');
        var jrhfj = $("#field0022_span").css('background','#CCFFCC');


        /*var wxhm1 = $("#field0142").css('background','#CCFFCC');
         var wxhm2 = $("#field0143").css('background','#CCFFCC');
         var wxhm3 = $("#field0144").css('background','#CCFFCC');
         var wxfj = $("#field0029_span").css('background','#CCFFCC');*/

        var yyssld = $("#field0031_span").css('background','#FCDD8B');  //运营商受理单
        var wxhmzqs = $("#field0032_span").css('background','#FCDD8B');
        var ltscxxyj = $("#field0033_span").css('background','#FCDD8B');
        var zhfkjg = $("#field0131_span").css('background','#FCDD8B');



        var lyblsx =$(":contains('录音保留时限')").parents("td");
        var bbblsx =$(":contains('报表保留时限')").parents("td");

        var jfsjxq_zq =$(":contains('正式开始计费')").parents("td");		//计费时间需求-直签用户行
        var jfsjxq_lt =$(":contains('报竣时间')").parents("td");			//计费时间需求-联通用户行

        var zfxxtrs = $(":contains('资费信息')").parents("tr");
        var zfxx={};
        $.each(zfxxtrs,function(__key,__val){
            if(__val.innerHTML.indexOf("IVR")!=-1){
                zfxx = $(this);
            }
        });
        var bzzf = $(":contains('（元/分）')").parents("tr");

        var dzhzftrs = $(":contains('定制化资费')").parents("tr");
        var dzhzf = {};
        $.each(dzhzftrs,function(__key,__val){
            if(__val.innerHTML.indexOf("通话资费为")!=-1){
                dzhzf = $(this);
            }
        });

        var huabao = $(":contains('通话超出部分按照')").parents("tr");
        var zfbh =   $(":contains('通话资费包含：')").parents("tr");
        var qtsm = $(":contains('其他，请说明')").parents("tr");

        var zhfkjg_txt = $(":contains('智恒反馈结果')").parents("td").children(":first");
        var zhfkjg_fj = $(":contains('智恒反馈结果')").parents("td").next().children(":first");

        var hmgszm_txt = $(":contains('号码归属证明')").parents("td").children(":first");
        var hmgszm_fj = $(":contains('号码归属证明')").parents("td").next().children(":first");

        var wxhmzqs_txt = $(":contains('外显号码知情书')").parents("td").children(":first");
        var wxhmzqs_fj =  $(":contains('外显号码知情书')").parents("td").next().children(":first");

        var scxxyj_txt = $(":contains('上传信息邮件')").parents("td").children();
        var scxxyj_fj = $(":contains('上传信息邮件')").parents("td").next().children(":first");

        _sxjf.trs = {
            'lyblsx' : lyblsx,
            'bbblsx' : bbblsx,
            'zfxx' : zfxx,
            'bzzf' : bzzf,
            'dzhzf' : dzhzf,
            'huabao' : huabao,
            'zfbh' : zfbh,
            'qtsm' : qtsm,
            'jfsjxq_zq' : jfsjxq_zq,
            'jfsjxq_lt' : jfsjxq_lt,
            zhfkjg_txt : zhfkjg_txt,
            zhfkjg_fj : zhfkjg_fj,

            hmgszm_txt: hmgszm_txt,
            hmgszm_fj:hmgszm_fj,

            wxhmzqs_txt:wxhmzqs_txt,
            wxhmzqs_fj : wxhmzqs_fj,

            scxxyj_txt : scxxyj_txt,
            scxxyj_fj : scxxyj_fj
        };
    };

    //6096262930536024380 直签 -2308135508315779848 联通
    SXJF.prototype.showFjDiv = function(){
        var khfzqd = $("#field0020");
        var khfzqd_num = khfzqd.val();
        var pltName = $("#field0017").val();

        //外显文本框
        var outNum1 = $("#field0142");
        var outNum2 = $("#field0143");
        var outNum3 = $("#field0144");

        var yz_outNum1 = $("#field0142").val();
        var yz_outNum2 = $("#field0143").val();
        var yz_outNum3 = $("#field0144").val();

        //外显附件
        var attachment = $("#field0029_span").children(":first").next();
        var attachmentChilds = attachment.children();

        if (khfzqd_num == "-2308135508315779848"){
            _sxjf.trs.zhfkjg_txt.hide();
            _sxjf.trs.zhfkjg_fj.hide();

            _sxjf.trs.hmgszm_txt.hide();
            _sxjf.trs.hmgszm_fj.hide();
            _sxjf.trs.wxhmzqs_txt.hide();
            _sxjf.trs.wxhmzqs_fj.hide();

            _sxjf.trs.scxxyj_txt.show();
            _sxjf.trs.scxxyj_fj.show();
        }else{
            _sxjf.trs.scxxyj_txt.hide();
            _sxjf.trs.scxxyj_fj.hide();
        }

        if(yz_outNum1=='' && yz_outNum2 == '' && yz_outNum3=='' && attachmentChilds.length==0){
            _sxjf.trs.zhfkjg_txt.hide();
            _sxjf.trs.zhfkjg_fj.hide();

            _sxjf.trs.hmgszm_txt.hide();
            _sxjf.trs.hmgszm_fj.hide();
            _sxjf.trs.wxhmzqs_txt.hide();
            _sxjf.trs.wxhmzqs_fj.hide();

            return ;
        }

        if(khfzqd_num==""){
            _sxjf.trs.zhfkjg_txt.hide();
            _sxjf.trs.zhfkjg_fj.hide();

            _sxjf.trs.hmgszm_txt.hide();
            _sxjf.trs.hmgszm_fj.hide();
            _sxjf.trs.wxhmzqs_txt.hide();
            _sxjf.trs.wxhmzqs_fj.hide();

            return;
        }
        //-373091421883121058联通客户 | "8141723194883722334"直签客户
        if (khfzqd_num == "6096262930536024380" && pltName.indexOf("江苏电信") != -1) {
            _sxjf.trs.zhfkjg_txt.show();
            _sxjf.trs.zhfkjg_fj.show();

            _sxjf.trs.hmgszm_txt.hide();
            _sxjf.trs.hmgszm_fj.hide();
            _sxjf.trs.wxhmzqs_txt.hide();
            _sxjf.trs.wxhmzqs_fj.hide();
        }else if (khfzqd_num == "6096262930536024380" && pltName.indexOf("江苏电信") == -1){
            _sxjf.trs.zhfkjg_txt.hide();
            _sxjf.trs.zhfkjg_fj.hide();

            _sxjf.trs.hmgszm_txt.show();
            _sxjf.trs.hmgszm_fj.show();
            _sxjf.trs.wxhmzqs_txt.show();
            _sxjf.trs.wxhmzqs_fj.show();
        }else{
            _sxjf.trs.zhfkjg_txt.hide();
            _sxjf.trs.zhfkjg_fj.hide();

            _sxjf.trs.hmgszm_txt.hide();
            _sxjf.trs.hmgszm_fj.hide();
            _sxjf.trs.wxhmzqs_txt.hide();
            _sxjf.trs.wxhmzqs_fj.hide();
        }
    };

    SXJF.prototype.hideTrObjs = function() {
        $.each(_sxjf.trs,function(key,val){
            if(val){
                val.hide();
            }
        });
        $("#field0162_span").hide();
        var _t1 =$("td[rowspan='22']")//第一列
        var _t2 = $("td[rowspan='8'][colspan ='3']");//通话服务列
        _t1.attr('rowspan',16);
        _t2.attr('rowspan',2);
        _sxjf.trs._t1 =  _t1;
        _sxjf.trs._t2 = _t2;
    };

    SXJF.prototype.initDisableComps = function() {
        $.each(_sxjf.elements, function(key, val) {
            if(val && val.initDisable){
                if(val.type =='radio'){
                    var _radios = $("input[name="+key+"]");
                    $.each(_radios,function(key,value){
                        _sxjf.disableComp($(this), true);
                    });
                }else{
                    var elem = $("#" + val.id);
                    if(elem.length == 1){
                        _sxjf.disableComp(elem, true);
                    }
                }
            }
        });
    };
    SXJF.prototype.disableComp = function(elem, val) {
        if (!elem || elem.length == 0) {
            return;
        }
        elem.attr("disabled", val);
    };
    /**
     * 设置所有单选 点击选中再点击取消
     */
    SXJF.prototype.radiocheck = function (){
        $(":radio").each(function (){
            if($(this).val()!=-'3963605101769899438' && $(this).val()!='-1244957151022398219'
                && $(this).val()!='1621254934994570452' && $(this).val()!='-1449570944700694416'
                && $(this).val()!='3288302870514713075'){
                $(this).attr('cs',false);

                $(this).click(function(arg1){
                    var _name=$(this).attr('name');

                    if($(this).attr('cs')=='true'){
                        $(this).attr('cs','false');
                        $(this).removeAttr('checked');
                    }else{
                        $("input[name="+_name+"]").each(function (){
                            $(this).attr('cs','false');
                        });

                        $(this).attr('checked','checked');
                        $(this).attr('cs','true');
                    }
                });
            }

        });
    };

    /**
     * 验证定制化资费中
     *  通话资费行，如果单选整体优惠或平均坐席，则必须后面填写分钟
     */
    SXJF.prototype.validate_thzf = function() {
        var dzhzfjf = $("input[name=field0090]:checked").val();
        if (dzhzfjf == -1244957151022398219) {
            var text_thzf = $("#field0091").val();

            var text_zongjia = $("#field0151").val();
            var text_fenz = $("#field0101").val();
            var radio_thzf = $("input[name=field0092]:checked").val();
            var text_chao = $("#field0093").val();

            if(text_thzf == '' && !radio_thzf && text_fenz=='' && text_chao=='' && text_zongjia==''){
                alert("请填写定制资费信息！");
                $("#field0091").focus();
                return false;
            }
            if(text_thzf=='' && (radio_thzf=='' || text_fenz=='' || text_chao=='' || text_zongjia=='')){
                alert("请填写完全资费包");
                $("#field0151").focus();
                return false;
            }
            if (radio_thzf && text_fenz == "") {
                alert("请填写【通话资费分钟数】");
                return false;
            } else if (radio_thzf == null && text_fenz != "") {
                alert("请选择【整体优惠】或【平均每坐席】");
                $("#field0092").focus();
                return false;
            }
            var ivrsh =$("input:checkbox[name='field0094']:checked").val(); //IVR市话
            var ivrct =$("input:checkbox[name='field0095']:checked").val(); //IVR长途
            var zxsh  =$("input:checkbox[name='field0096']:checked").val(); //坐席市话
            var zxct  =$("input:checkbox[name='field0097']:checked").val(); //坐席长途
            var whsh  =$("input:checkbox[name='field0098']:checked").val(); //外呼市话
            var whct  =$("input:checkbox[name='field0099']:checked").val(); //外呼长途
            if(typeof(ivrsh) == "undefined" && typeof(ivrct) == "undefined" &&  typeof(zxsh) == "undefined"&&
                typeof(zxct) == "undefined" && typeof(whsh) == "undefined" && typeof(whct) == "undefined" ){
                alert("请必须选择通话资费包含项！");
                return false;
            }
        }
        return true;
    }

    /**
     * 外显号码校验
     */
    SXJF.prototype.validateOutNum = function(){
        //外显文本框
        var outNum1 = $("#field0142");
        var outNum2 = $("#field0143");
        var outNum3 = $("#field0144");

        var yz_outNum1 = $("#field0142").val();
        var yz_outNum2 = $("#field0143").val();
        var yz_outNum3 = $("#field0144").val();


        var isPhoneNum = (yz_outNum1=='')?true:this.until_valiPhoneNum(yz_outNum1);
        isPhoneNum = isPhoneNum && ((yz_outNum2=='')?true:this.until_valiPhoneNum(yz_outNum2));
        isPhoneNum = isPhoneNum && ((yz_outNum3=='')?true:this.until_valiPhoneNum(yz_outNum3));

        if(!isPhoneNum){
            alert("【外显号码】电话格式不正确，请重新填写。");
            $("#field0142").focus();
            return false;
        }

        //外显附件
        var attachment = $("#field0029_span").children(":first").next();
        var attachmentChilds = attachment.children();

        var khfzqd =$("#field0020");
        var khfzqd_num =  khfzqd.val();

        // 运营商受理单/号码归属证明
        var outNumattachment1 = $("#field0031_span").children(":first").next();
        var outattachmentChilds1 = outNumattachment1.children();

        // 外显号码知情书
        var outNumattachment2 = $("#field0032_span").children(":first").next();
        var outattachmentChilds2 = outNumattachment2.children();

        //青牛外显申请
        var attachment3 = $("#field0030_span").children(":first").next();
        var attachmentChilds3 = attachment3.children();

        //智恒反馈结果
        var attachment4 = $("#field0131_span").children(":first").next();
        var attachmentChilds4 = attachment4.children();

        //没填外显号，不需传附件
        if((outNum1.val() == '' && outNum2.val() == '' && outNum3.val() == '') && attachmentChilds.length==0){
            if(outattachmentChilds1.length!=0){
                alert("未录入外显号，无需上传相关证明材料，请删除后再次提交！");
                return false;
            }
            if(outattachmentChilds2.length!=0){
                alert("未录入外显号，无需上传相关证明材料，请删除后再次提交！");
                return false;
            }
            if(attachmentChilds3.length!=0){
                alert("未录入外显号，无需上传相关证明材料，请删除后再次提交！");
                return false;
            }
            if(attachmentChilds4.length!=0){
                alert("未录入外显号，无需上传相关证明材料，请删除后再次提交！");
                return false;
            }
        }
        //外显号与附件不能同时存在
        if((outNum1.val() != '' || outNum2.val() != '' || outNum3.val() != '') && attachmentChilds.length!=0){
            alert("外显号码及附件不能同时上传，请选择其中一项后再次上传！");
            return false;
        }

        if((outNum1.val() != '' || outNum2.val() != '' || outNum3.val() != '') || attachmentChilds.length!=0){

            var pltName = $("#field0017").val();

            if (khfzqd_num == 6096262930536024380 && pltName.indexOf("江苏电信") == -1) {

                if (outattachmentChilds1.length == 0 || outattachmentChilds2.length == 0) {
                    alert("【运营商受理单/号码归属证明】和【外显号码知情书】为必要的证明材料，请上传后再次提交！");
                    return false;
                }
            }
        }
        return true;
    };

    /**
     * 渠道客户与平台的验证
     */
    SXJF.prototype.validatePltCustType = function() {
        var pltType = $("#field0016").text();
        var khfzqd = $("#field0020");
        var khfzqd_num = khfzqd.val();

        //-2308135508315779848联通客户 | 6096262930536024380直签客户
        if (khfzqd_num == '-2308135508315779848' && pltType.indexOf("合作运营平台") == -1) {
            alert("联通客户只能选择合作运营平台，请重新选择！");
            $(":contains('平台类型')").parents("td").css("color","red");
            $("#field0017").focus();
            return false;
        }
        $(":contains('平台类型')").parents("td").css("color","black");

        /*	if (khfzqd_num == '6096262930536024380' && (pltType.indexOf("资源平台") == -1 && pltType.indexOf("未验收") == -1) ) {
         alert("直签客户只能选择资源平台或未验收平台，请重新选择！");
         $("#field0017").focus();
         $(":contains('平台类型')").parents("td").css("color","red");
         return false;
         }
         $(":contains('平台类型')").parents("td").css("color","black");*/
        return true;
    };
    /**
     * 江苏电信业务规则校验--验证智恒的反馈结果
     * @returns {Boolean}
     */
    SXJF.prototype.validateJSDX_ZH =function(){
        // 智恒工单附件
        var pltName = $("#field0017").val();

        var khfzqd =$("#field0020");
        var khfzqd_num =  khfzqd.val();

        //青牛附件
        /*var attachment1 = $("#field0030_span").children(":first").next();
         var attachmentChilds1 = attachment1.children();*/

        //智恒附件
        var attachment = $("#field0131_span").children(":first").next();
        var attachmentChilds = attachment.children();

        //运营商受理单附件
        var yys = $("#field0031_span").children(":first").next();
        var yysfj = yys.children();

        //外显号码知情书附件
        var wxhm = $("#field0032_span").children(":first").next();
        var wxhmfj = wxhm.children();

        //外显文本框
        var outNum1 = $("#field0142");
        var outNum2 = $("#field0143");
        var outNum3 = $("#field0144");

        //外显号码附件
        var _attachment = $("#field0029_span").children(":first").next();
        var _attachmentChilds = _attachment.children();

        if (khfzqd_num == 6096262930536024380 && pltName.indexOf("江苏电信") != -1 && ((outNum1.val() != '' || outNum2.val() != '' || outNum3.val() != '') || _attachmentChilds.length!=0)) {

            if (attachmentChilds.length == 0) {
                alert('江苏电信平台上的直签用户需上传【智恒反馈结果】，请上传后再次提交！');
                return false;
            }
        }

        if(pltName.indexOf("江苏电信") == -1){
            if (attachmentChilds.length != 0) {
                alert("除江苏电信平台，其他平台不可填写【智恒反馈】，【运营商受理单号码归属证明】，【外显号码知情书】");
                return false;
            }
        }
        return true;
    }



    /**
     * 验证缴费号码
     * */
    SXJF.prototype.validate_jfnumber =function(){
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
            alert("【缴费号码】电话格式不正确，请重新填写。");
            $(":contains('缴费号码')").parents("td").css("color","red");
            $("#field0024").focus();
            return false;
        }
        $(":contains('缴费号码')").parents("td").css("color","black");
        return true;
    };

    /**
     * 校验坐席电话
     */
    SXJF.prototype.validateAgentPSTN = function() {
        var sipchk = $("#field0145");
        var pstnchk = $("#field0146");

        var sipischk = sipchk.is(':checked');
        var pstnischk = pstnchk.is(':checked');

        var zxdh1 =$("#field0139").val();
        var zxdh2 =$("#field0140").val();
        var zxdh3 =$("#field0141").val();

        var isPhoneNum = (zxdh1=='')?true:_sxjf.until_valiPhoneNum(zxdh1);
        isPhoneNum = isPhoneNum && ((zxdh2=='')?true:_sxjf.until_valiPhoneNum(zxdh2));
        isPhoneNum = isPhoneNum && ((zxdh3=='')?true:_sxjf.until_valiPhoneNum(zxdh3));

        if(!isPhoneNum){
            alert("【坐席电话】电话格式不正确，请重新填写。");
            $("#field0142").focus();
            return false;
        }
        if ((sipischk == false && pstnischk == false)) {
            //alert("坐席电话类型不能为空，请选择！");
            //return false;
        }

        if(!pstnischk){
            var attachment = $("#field0023_span").children(":first").next();
            var attachmentChilds = attachment.children();//附件
            if(attachmentChilds.length != 0){
                alert("座席电话类型不是PSTN，无须上传附件，请删除附件后，再次提交！");
                return false;
            }
        }

        var spandphoneHasVal = false;

        if (pstnischk) {
            for (var i = 0; i < 3; i++) {
                var tel = $("#field0" + (139 + i)).val();
                var sp = $("#field0" + (139 + i + 8)).val();
                if (!((tel != '') == (sp != ''))) {
                    alert("请补全【坐席电话】第" + (i + 1) + "行数据,【坐席电话】及【运营商】不能为空！");
                    return false;
                }
                if ((tel != '') && (sp != '')) {
                    spandphoneHasVal = spandphoneHasVal || true;
                }else{
                    spandphoneHasVal = spandphoneHasVal || false;
                }
            }

            var attachment = $("#field0023_span").children(":first").next();
            var attachmentChilds = attachment.children();//附件

            if (!spandphoneHasVal && attachmentChilds.length == 0) {
                alert("已选PSTN坐席电话，请输入【坐席电话】及【运营商】或上传【坐席电话附件】！");
                $("#field0139").focus();
                return false;
            }
            if (spandphoneHasVal && attachmentChilds.length != 0) {
                alert("【座席电话】及【坐席电话附件】不能同时提交，请提选择其中一项提交！");
                return false;
            }
        }

        return true;
    }

    /**
     * 验证平台接入号 填三个中的一个或挂附件
     */
    SXJF.prototype.validate_ptjrh =function(){
        var attachment = $("#field0022_span").children(":first").next();
        var attachmentChilds = attachment.children();//附件

        var prjrh1 =$("#field0136").val();
        var prjrh2 =$("#field0137").val();
        var prjrh3 =$("#field0138").val();

        var isPhoneNum = (prjrh1=='')?true:_sxjf.until_valiPhoneNum(prjrh1);
        isPhoneNum = isPhoneNum && ((prjrh2=='')?true:_sxjf.until_valiPhoneNum(prjrh2));
        isPhoneNum = isPhoneNum && ((prjrh3=='')?true:_sxjf.until_valiPhoneNum(prjrh3));


        if(!isPhoneNum){
            alert("【接入号】电话格式不正确，请重新填写。");
            $("#field0136").focus();
            return false;
        }
        if((prjrh1!="")||(prjrh2!="")||(prjrh3!="")){
            if(attachmentChilds.length!= 0){
                alert("已填写平台接入号，不要选择附件！");
                attachmentChilds.focus();
                return false;
            }
        }else if(attachmentChilds.length!= 0){
            if((prjrh1!="")||(prjrh2!="")||(prjrh3!="")){
                alert("已选择附件，请清空平台接入号！");
                $("#field0136").focus();
                return false;
            }
        }else{
            alert("请填写【接入号】，或上传【接入号附件】");
            $("#field0136").focus();
            $(":contains('填写接入号')").parents("td").css("color","red");
            return false;
        }
        $(":contains('填写接入号')").parents("td").css("color","black");
        return true;
    };
    SXJF.prototype.initEnableComps = function() {
        $.each(_sxjf.initRelations,function(key,value){
            if(value.reltype=="tr"){
                _sxjf.changeHideState(key);
            }else{
                _sxjf.changeOtherCompsState(key);
            }
        });
        this.showFjDiv();
        this.eventClick0090();
    }

    SXJF.prototype.calFee = function() {
        var shuls = [ 52, 53, 54, 56, 57, 58, 59 ];
        for (i = 0; i < shuls.length; i++) {

            var str = "$('#field00" + shuls[i] + "').blur(";
            str += "function(){";
            str += " var shul_num =  $('#field00" + shuls[i] + "').val();";
            str += " var zktype_num = $(\"input[name='field00" + (shuls[i] + 9) + "']:checked\").val();"
            str += " var danjia_num = $('#field00" + (shuls[i] + 18) + "').val();";
            str += " var xiaoj_num = $('#field00" + (shuls[i] + 28) + "').val();";

            str += " if(zktype_num == 8815518299078869716){";
            str += " $('#field00" + (shuls[i] + 28) + "').val(shul_num*danjia_num); ";
            str += "} else if";
            str += "(zktype_num == 4643084639652627293) {";
            str += " $('#field00" + (shuls[i] + 28) + "').val(danjia_num);";
            str += "}";
            if(shuls[i]==56 || shuls[i]==57 || shuls[i]==58){
                var rgshuls =[56,57,58];   //人工服务下，有终端坐席，统计分析，坐席录音以及下一行，费用小计的汇总合计行处理，
                str += " var sgnfhj=0;";
                for(___i=0;___i<rgshuls.length;___i++){
                    str += " var rgshul_num =  $('#field00"+rgshuls[___i]+"').val(); ";
                    str += " var rgzktype_num = $(\"input[name='field00"+(rgshuls[___i]+9)+"']:checked\").val();";
                    str += " var rgdanjia_num = $('#field00"+ (rgshuls[___i]+18)+"').val();";

                    str += " if(isNaN(rgshul_num)){rgshul_num==0}";
                    str += " if(isNaN(rgzktype_num)){rgzktype_num==0}";
                    str += " if(isNaN(rgdanjia_num)){rgdanjia_num==0}";

                    str += " if(rgzktype_num == 8815518299078869716){";
                    str += " sgnfhj = parseInt(sgnfhj)+parseInt(rgdanjia_num);";
                    str += "} else if(rgzktype_num ==4643084639652627293){ ";
                    str += " if(rgshul_num==0){alert('数量不能等于0'); sgnfhj==0;";
                    str += "}else {";
                    str += " sgnfhj = parseFloat(sgnfhj)+parseFloat(rgdanjia_num)/parseFloat(rgshul_num);";
                    str += "}}";
                }
                str += "$(\"#field0088\").val(parseInt(sgnfhj));";
            }
            str += "});";

            eval(str);

            str= "$(\"input[name='field00"+(shuls[i]+9)+"']\").change(";
            str+="function(){";
            str+="var shul_num =  $('#field00"+shuls[i]+"').val();";
            str+="var zktype_num = $(\"input[name='field00"+(shuls[i]+9)+"']:checked\").val();";
            str+="var danjia_num = $('#field00"+ (shuls[i]+18)+"').val();";
            str+="var xiaoj_num = $('#field00"+(shuls[i]+28)+"').val();";

            str+="if(zktype_num == 8815518299078869716){ ";
            str+=" $('#field00"+(shuls[i]+28)+"').val(shul_num*danjia_num);";
            str+=" } else if (zktype_num == 4643084639652627293){ ";
            str+=" $('#field00"+(shuls[i]+28)+"').val(danjia_num);";
            str+=" }";
            if(shuls[i]==56 || shuls[i]==57 || shuls[i]==58){
                var rgshuls =[56,57,58];   //人工服务下，有终端坐席，统计分析，坐席录音以及下一行，费用小计的汇总合计行处理，
                str += " var sgnfhj=0;";
                for(___i=0;___i<rgshuls.length;___i++){
                    str += " var rgshul_num =  $('#field00"+rgshuls[___i]+"').val(); ";
                    str += " var rgzktype_num = $(\"input[name='field00"+(rgshuls[___i]+9)+"']:checked\").val();";
                    str += " var rgdanjia_num = $('#field00"+ (rgshuls[___i]+18)+"').val();";

                    str += " if(isNaN(rgshul_num)){rgshul_num==0}";
                    str += " if(isNaN(rgzktype_num)){rgzktype_num==0}";
                    str += " if(isNaN(rgdanjia_num)){rgdanjia_num==0}";

                    str += " if(rgzktype_num == 8815518299078869716){";
                    str += " sgnfhj = parseInt(sgnfhj)+parseInt(rgdanjia_num);";
                    str += "} else if(rgzktype_num ==4643084639652627293){ ";
                    str += " if(rgshul_num==0){alert('数量不能等于0'); sgnfhj==0;";
                    str += "}else {";
                    str += " sgnfhj = parseFloat(sgnfhj)+parseFloat(rgdanjia_num)/parseFloat(rgshul_num);";
                    str += "}}";
                }
                str += "$(\"#field0088\").val(parseInt(sgnfhj));";
            }
            str+=" })";

            eval(str);

            str= "$('#field00"+(shuls[i]+18)+"').blur(";
            str+="function(){";
            str+="var shul_num =  $('#field00"+shuls[i]+"').val();";
            str+="var zktype_num = $(\"input[name='field00"+(shuls[i]+9)+"']:checked\").val();";
            str+="var danjia_num = $('#field00"+ (shuls[i]+18)+"').val();";
            str+="var xiaoj_num = $('#field00"+(shuls[i]+28)+"').val();";

            str+="if(zktype_num == 8815518299078869716){ ";
            str+=" $('#field00"+(shuls[i]+28)+"').val(shul_num*danjia_num);";
            str+=" } else if (zktype_num == 4643084639652627293) {";
            str+=" $('#field00"+(shuls[i]+28)+"').val(danjia_num);";
            str+=" } ";
            if(shuls[i]==56 || shuls[i]==57 || shuls[i]==58){
                var rgshuls =[56,57,58];   //人工服务下，有终端坐席，统计分析，坐席录音以及下一行，费用小计的汇总合计行处理，
                str += " var sgnfhj=0;";
                for(___i=0;___i<rgshuls.length;___i++){
                    str += " var rgshul_num =  $('#field00"+rgshuls[___i]+"').val(); ";
                    str += " var rgzktype_num = $(\"input[name='field00"+(rgshuls[___i]+9)+"']:checked\").val();";
                    str += " var rgdanjia_num = $('#field00"+ (rgshuls[___i]+18)+"').val();";

                    str += " if(isNaN(rgshul_num)){rgshul_num==0}";
                    str += " if(isNaN(rgzktype_num)){rgzktype_num==0}";
                    str += " if(isNaN(rgdanjia_num)){rgdanjia_num==0}";

                    str += " if(rgzktype_num == 8815518299078869716){";
                    str += " sgnfhj = parseInt(sgnfhj)+parseInt(rgdanjia_num);";
                    str += "} else if(rgzktype_num ==4643084639652627293){ ";
                    str += " if(rgshul_num==0){alert('数量不能等于0'); sgnfhj==0;";
                    str += "}else {";
                    str += " sgnfhj = parseFloat(sgnfhj)+parseFloat(rgdanjia_num)/parseFloat(rgshul_num);";
                    str += "}}";
                }
                str += "$(\"#field0088\").val(parseInt(sgnfhj));";
            }
            str+=" })";

            eval(str);
        }
    };

    /*表单上组件的基本信息*/
    SXJF.prototype.elements = {"field0004":{id : "field0004",	type : "text",		name : "要求完成时间",initDisable:true},
        "field0006":{id : "field0006",	type : "span",		name : "客户经理"},
        "field0007":{id : "field0007",	type : "span",		name : "归属部门"},
        "field0008":{id : "field0008",	type : "text",		name : "我司结算负责人"},
        "field0009":{id : "field0009",	type : "text",		name : "企业ID"},
        "field0010":{id : "field0010",	type : "text",		name : "企业名称"},
        "field0011":{id : "field0011",	type : "text",		name : "合同编号"},
        "field0012":{id : "field0012",	type : "text",		name : "项目编号"},
        "field0013":{id : "field0013",	type : "text",		name : "项目名称"},
        "field0014":{id : "field0014",	type : "span",		name : "要求完成时间"},

        "field0015":{id : "field0015",	type : "span",		name : "企业属地"},
        "field0016":{id : "field0016",	type : "text",		name : "平台类型"},
        "field0017":{id : "field0017",	type : "text",		name : "所属平台"},
        "field0020":{id : "field0020",	type : "select",		name : "客户发展渠道"},
        "field0020_txt":{id : "field0020_txt",	type : "select",		name : "客户发展渠道"},
        "field0021_txt":{id : "field0021_txt",	type : "select",		name : "客户类型"},
        "field0136":{id : "field0136",	type : "text",		name : "接入号1"},
        "field0137":{id : "field0137",	type : "text",		name : "接入号2"},
        "field0138":{id : "field0138",	type : "text",		name : "接入号3"},
        "field0145":{id : "field0145",	type : "checkbox",	name : "SIP电话复选"},
        "field0146":{id : "field0146",	type : "checkbox",	name : "PSTN电话"},
        "field0139":{id : "field0139",	type : "text",		name : "坐席电话1",initDisable:true},
        "field0140":{id : "field0140",	type : "text",		name : "坐席电话2",initDisable:true},
        "field0141":{id : "field0141",	type : "text",		name : "坐席电话3",initDisable:true},
        "field0147":{id : "field0147",	type : "text",		name : "电话运营商1",initDisable:true},
        "field0148":{id : "field0148",	type : "text",		name : "电话运营商2",initDisable:true},
        "field0149":{id : "field0149",	type : "text",		name : "电话运营商3",initDisable:true},
        "field0142":{id : "field0142",	type : "text",		name : "外显号码1"},
        "field0143":{id : "field0143",	type : "text",		name : "外显号码2"},
        "field0144":{id : "field0144",	type : "text",		name : "外显号码3"},
        "field0024":{id : "field0024",	type : "text",		name : "呼入市话"},
        "field0025":{id : "field0025",	type : "text",		name : "呼出市话"},
        "field0026":{id : "field0026",	type : "text",		name : "呼入长途"},
        "field0027":{id : "field0027",	type : "text",		name : "呼出长途"},
        "field0028":{id : "field0028",	type : "text",		name : "应用服务费"},

        "field0035":{id : "field0035",	type : "radio",		name : "客服通", 	value:"-5951425570627761360"},
        "field0035":{id : "field0035",	type : "radio",		name : "电销通",		value:"6193382351362802577"},
        "field0035":{id : "field0035",	type : "radio",		name : "不配置",		value:"7221839946071951327"},
        "field0035":{id : "field0035",	type : "radio",		name : "其他",		value:"3288302870514713075"},
        "field0036":{id : "field0036",	type : "text",		name : "业务系统类型其他文本框",initDisable:true},
        "field0037":{id : "field0037",	type : "checkbox",	name : "有终端"},
        "field0038":{id : "field0038",	type : "checkbox",	name : "无终端"},
        "field0039":{id : "field0039",	type : "radio",		name : "CCEA",	value:"8254392202341730514",initDisable:true},
        "field0039":{id : "field0039",	type : "radio",		name : "ADT",	value:"-4305093821079142156",initDisable:true},
        "field0039":{id : "field0039",	type : "radio",		name : "OXC",	value:"-7530274332352494683",initDisable:true},
        "field0039":{id : "field0039",	type : "radio",		name : "其他",	value:"-1122618658103079534",initDisable:true},
        "field0040":{id : "field0040",	type : "text",		name : "终端需求-其他文本框",initDisable:true},
        "field0041":{id : "field0041",	type : "radio",		name : "有IVR流程",		value:"1621254934994570452"},
        "field0041":{id : "field0041",	type : "radio",		name : "无IVR流程",		value:"-1449570944700694416"},
        "field0042":{id : "field0042",	type : "radio",		name : "IVR流程不收费",	value:"-2216726970797110809",initDisable:true},
        "field0042":{id : "field0042",	type : "radio",		name : "IVR流程收费",	value:"8666697211134168264",initDisable:true},
        "field0043":{id : "field0043",	type : "text",		name : "IVR流程收费金额",initDisable:true},
        "field0048":{id : "field0048",	type : "select",	name : "录音保留时限"},
        "field0102":{id : "field0102",	type : "text",		name : "录音保留时限其他文本框",initDisable:true},
        "field0049":{id : "field0049",	type : "select",	name : "报表保留时限"},
        "field0103":{id : "field0103",	type : "text",		name : "报表保留时限其他文本框",initDisable:true},
        "field0044":{id : "field0044",	type : "radio",		name : "计费方式-授权",	value:"5152544322694234967"},
        "field0044":{id : "field0044",	type : "radio",		name : "计费方式-分机",	value:"6930836508661205117"},
        "field0044":{id : "field0044",	type : "radio",		name : "计费方式-其他",	value:"-2749828302988163729"},
        "field0045":{id : "field0045",	type : "text",		name : "计费方式-其他文本框",initDisable:true},
        "field0046":{id : "field0046",	type : "radio",		name : "全月、半月、天",		value:"2996027766622669878"},
        "field0046":{id : "field0046",	type : "radio",		name : "全月、半月",		value:"-4276381005207550160"},
        "field0046":{id : "field0046",	type : "radio",		name : "天",		value:"136407541464123289"},
        "field0135":{id : "field0135",	type : "text",		name : "直签计费日期",initDisable:true},
        "field0124":{id : "field0124",	type : "text",		name : "联通报竣时间"},
        "field0050":{id : "field0050",	type : "textarea",	name : "特殊需求"},
        "field0051":{id : "field0051",	type : "text",		name : "基本服务费"},
        "field0069":{id : "field0069",	type : "text",		name : "基本服务费单价"},
        "field0079":{id : "field0079",	type : "text",		name : "基本服务费小计",initDisable:true},
        "field0052":{id : "field0052",	type : "text",		name : "IVR数量",initDisable:true},
        "field0053":{id : "field0053",	type : "text",		name : "TTS数量",initDisable:true},
        "field0054":{id : "field0054",	type : "text",		name : "自动外拨",initDisable:true},
        "field0055":{id : "field0055",	type : "text",		name : "人工服务-基本服务费",initDisable:true},
        "field0073":{id : "field0073",	type : "text",		name : "人工基本服务费折扣单价",initDisable:true},
        "field0056":{id : "field0056",	type : "text",		name : "有终端坐席",initDisable:true},
        "field0057":{id : "field0057",	type : "text",		name : "统计分析",initDisable:true},
        "field0058":{id : "field0058",	type : "text",		name : "坐席录音",initDisable:true},
        "field0059":{id : "field0059",	type : "text",		name : "无终端坐席含录音及报表",initDisable:true},
        "field0061":{id : "field0061",	type : "radio",		name : "IVR-单个服务",	value:"8815518299078869716",initDisable:true},
        "field0061":{id : "field0061",	type : "radio",		name : "IVR-服务合计",	value:"4643084639652627293",initDisable:true},
        "field0062":{id : "field0062",	type : "radio",		name : "TTS-单个服务",	value:"8815518299078869716",initDisable:true},
        "field0062":{id : "field0062",	type : "radio",		name : "TTS-服务合计",	value:"4643084639652627293",initDisable:true},
        "field0063":{id : "field0063",	type : "radio",		name : "自动外拨-单个服务",	value:"8815518299078869716",initDisable:true},
        "field0063":{id : "field0063",	type : "radio",		name : "自动外拨-服务合计",	value:"4643084639652627293",initDisable:true},
        "field0065":{id : "field0065",	type : "radio",		name : "有终端坐席-单个服务",		value:"8815518299078869716",initDisable:true},
        "field0065":{id : "field0065",	type : "radio",		name : "有终端坐席-服务合计",		value:"4643084639652627293",initDisable:true},
        "field0066":{id : "field0066",	type : "radio",		name : "统计分析-单个服务",	value:"8815518299078869716",initDisable:true},
        "field0066":{id : "field0066",	type : "radio",		name : "统计分析-服务合计",	value:"4643084639652627293",initDisable:true},
        "field0067":{id : "field0067",	type : "radio",		name : "坐席录音-单个服务",	value:"8815518299078869716",initDisable:true},
        "field0067":{id : "field0067",	type : "radio",		name : "坐席录音-服务合计",	value:"4643084639652627293",initDisable:true},
        "field0068":{id : "field0068",	type : "radio",		name : "无终端坐席含录音及报表-单个服务",	value:"8815518299078869716",initDisable:true},
        "field0068":{id : "field0068",	type : "radio",		name : "无终端坐席含录音及报表-服务合计",	value:"4643084639652627293",initDisable:true},

        "field0070":{id : "field0070",	type : "text",		name : "IVR折扣单价",initDisable:true},
        "field0071":{id : "field0071",	type : "text",		name : "TTS折扣单价",initDisable:true},
        "field0072":{id : "field0072",	type : "text",		name : "自动外拨折扣单价",initDisable:true},
        "field0074":{id : "field0074",	type : "text",		name : "有终端坐席折扣单价",initDisable:true},
        "field0075":{id : "field0075",	type : "text",		name : "统计分析折扣单价",initDisable:true},
        "field0076":{id : "field0076",	type : "text",		name : "坐席录音折扣单价",initDisable:true},
        "field0077":{id : "field0077",	type : "text",		name : "无终端坐席含录音及报表折扣单价",initDisable:true},
        "field0080":{id : "field0080",	type : "text",		name : "IVR费用小计",initDisable:true},
        "field0081":{id : "field0081",	type : "text",		name : "TTS费用小计",initDisable:true},
        "field0082":{id : "field0082",	type : "text",		name : "自动外拨费用小计",initDisable:true},
        "field0083":{id : "field0083",	type : "text",		name : "人工基本服务费用小计",initDisable:true},
        "field0084":{id : "field0084",	type : "text",		name : "有终端坐席费用小计",initDisable:true},
        "field0085":{id : "field0085",	type : "text",		name : "统计分析费用小计",initDisable:true},
        "field0086":{id : "field0086",	type : "text",		name : "坐席录音费用小计",initDisable:true},
        "field0087":{id : "field0087",	type : "text",		name : "无终端坐席含录音及报表费用小计",initDisable:true},
        "field0088":{id : "field0088",	type : "text",		name : "有终端坐席、统计分析、坐席录音单价合计金额",initDisable:true},
        "field0090":{id : "field0090",	type : "radio",		name : "标准资费计费",					value : "-3963605101769899438"},
        "field0090":{id : "field0090",	type : "radio",		name : "定制化资费计费",					value : "-1244957151022398219"},
        "field0089":{id : "field0089",	type : "radio",		name : "分钟计费",						value : "-299398103284628050"},
        "field0089":{id : "field0089",	type : "radio",		name : "6秒计费",						value : "6437327097438027856"},
        "field0091":{id : "field0091",	type : "text",		name : "定制通话资费"},
        "field0151":{id : "field0151",	type : "text",		name : "话包整体费用"},
        "field0101":{id : "field0101",	type : "text",		name : "话包分钟数"},
        "field0092":{id : "field0092",	type : "radio",		name : "整体优惠",					value : "5015726088828177190"},
        "field0092":{id : "field0092",	type : "radio",		name : "平均每坐席",					value : "-6682866882824746749"},
        "field0093":{id : "field0093",	type : "text",		name : "话包超出费用"}
    };
    /*事件注册*/
    SXJF.prototype.events = {
        "field0020":{event:"change",func:"eventChange0020"},
        "field0048":{event:"change",func:"eventChange0048"},
        "field0049":{event:"change",func:"eventChange0049"},
        "field0069":{event:"change",func:"eventChange0069"},
        "field0073":{event:"change",func:"eventChange0073"},
        "field0091":{event:"change",func:"eventchange0091"},
        "field0151":{event:"change",func:"eventchange0151"},
        "field0017":{event:"change",func:"eventchange0017"},

        "field0146":{event:"click",func:"eventClikPstn"},
        "field0035":{event:"click",func:"eventClick0035"},
        "field0039":{event:"click",func:"eventClick0039"},
        "field0041":{event:"click",func:"eventClick0041"},
        "field0090":{event:"click",func:"eventClick0090"},
        "field0042":{event:"click",func:"eventClick0042"},
        "field0037":{event:"click",func:"eventClick0037"},
        "field0038":{event:"click",func:"eventClick0038"},
        "field0044":{event:"click",func:"eventClick0044"}		//计费需求 其他
    };
    SXJF.prototype.initRelations = {
        "field0069":{
            checked : {
                "field0052" : {id : "field0052",attrs:{"disabled" : false}},
                "field0061" : {id : "field0061",attrs:{"disabled" : false}},
                "field0070" : {id : "field0070",attrs:{"disabled" : false}},

                "field0053" : {id : "field0052",attrs:{"disabled" : false}},
                "field0062" : {id : "field0061",attrs:{"disabled" : false}},
                "field0071" : {id : "field0070",attrs:{"disabled" : false}}
            },
            unchecked :{
                "field0052" : {id : "field0052",attrs:{"disabled" : true,'value':''}},
                "field0061" : {id : "field0061",attrs:{"disabled" : true,"checked":false}},
                "field0070" : {id : "field0070",attrs:{"disabled" : true,'value':''}},

                "field0053" : {id : "field0053",attrs:{"disabled" : true,'value':''}},
                "field0062" : {id : "field0062",attrs:{"disabled" : true,"checked":false}},
                "field0071" : {id : "field0071",attrs:{"disabled" : true,'value':''}}
            }
        },
        "field0073":{
            checked : {
                "field0056" : {id : "field0056",attrs:{"disabled" : false}},
                "field0065" : {id : "field0065",attrs:{"disabled" : false}},
                "field0074" : {id : "field0074",attrs:{"disabled" : false}},

                "field0057" : {id : "field0056",attrs:{"disabled" : false}},
                "field0066" : {id : "field0065",attrs:{"disabled" : false}},
                "field0075" : {id : "field0074",attrs:{"disabled" : false}},

                "field0058" : {id : "field0056",attrs:{"disabled" : false}},
                "field0067" : {id : "field0065",attrs:{"disabled" : false}},
                "field0076" : {id : "field0074",attrs:{"disabled" : false}}

            },
            unchecked :{
                "field0056" : {id : "field0056",attrs:{"disabled" : true,'value':''}},
                "field0065" : {id : "field0065",attrs:{"disabled" : true,"checked":false}},
                "field0074" : {id : "field0074",attrs:{"disabled" : true,'value':''}},

                "field0057" : {id : "field0056",attrs:{"disabled" : true,'value':''}},
                "field0066" : {id : "field0065",attrs:{"disabled" : true,"checked":false}},
                "field0075" : {id : "field0074",attrs:{"disabled" : true,'value':''}},

                "field0058" : {id : "field0056",attrs:{"disabled" : true,'value':''}},
                "field0067" : {id : "field0065",attrs:{"disabled" : true,"checked":false}},
                "field0076" : {id : "field0074",attrs:{"disabled" : true,'value':''}}
            }
        },
        "field0048" : {
            "5292152230183979277" :{
                "value" : "5292152230183979277",
                "checked" : {
                    "field0102" : {id : "field0102",attrs:{disabled:false}}
                },
                "unchecked" : {
                    "field0102" : {id : "field0102",attrs:{disabled:true,"value":''}}
                }
            }
        },
        "field0049" : {
            "-1432866995684749427" :{
                "value" : "-1432866995684749427",
                "checked" : {
                    "field0103" : {id : "field0103",attrs:{disabled:false}}

                },
                "unchecked" : {
                    "field0103" : {id : "field0103",attrs:{disabled:true,"value":''}}
                }
            }
        },
        "field0044" : {
            "-2749828302988163729" : {
                "value" : "-2749828302988163729",
                "checked" : {
                    "field0045" : {id : "field0045",attrs:{disabled:false}}
                },
                "unchecked" : {
                    "field0045" : {id : "field0045",attrs:{disabled:true,"value":''}}
                }
            }
        },
        "field0146":{
            checked : {
                "field0139" : {id : "field0139",attrs:{"disabled" : false}},
                "field0140" : {id : "field0140",attrs:{"disabled" : false}},
                "field0141" : {id : "field0141",attrs:{"disabled" : false}},

                "field0147" : {id : "field0147",attrs:{"disabled" : false}},
                "field0148" : {id : "field0148",attrs:{"disabled" : false}},
                "field0149" : {id : "field0149",attrs:{"disabled" : false}}
            },
            unchecked :{
                "field0139" : {id : "field0139",attrs:{"disabled" : true,"value":''}},
                "field0140" : {id : "field0140",attrs:{"disabled" : true,"value":''}},
                "field0141" : {id : "field0141",attrs:{"disabled" : true,"value":''}},

                "field0147" : {id : "field0147",attrs:{"disabled" : true,"value":''}},
                "field0148" : {id : "field0148",attrs:{"disabled" : true,"value":''}},
                "field0149" : {id : "field0149",attrs:{"disabled" : true,"value":''}}
            }
        },
        "field0041" : {
            "1621254934994570452" : {
                "value" : "1621254934994570452",
                "checked" : {
                    "field0042" : {id : "field0042",attrs:{disabled:false}}
                },
                "unchecked" : {
                    "field0042" : {id : "field0042",attrs:{disabled:true,checked:false}}
                }
            },
            "-1449570944700694416" : {
                "value" : "-1449570944700694416",
                "checked" : {
                    "field0042" : {id : "field0042",attrs:{disabled:true}},
                    "field0043" : {id : "field0043",attrs:{disabled:true,"value":''}}
                },
                "unchecked" : {
                    "field0042" : {id : "field0042",attrs:{disabled:false,checked:false}}
                }
            }
        },
        "field0042" : {
            "8666697211134168264" : {
                "value" : "8666697211134168264",
                "checked" : {
                    "field0043" : {id : "field0043",attrs:{disabled:false}}
                },
                "unchecked" : {
                    "field0043" : {id : "field0043",attrs:{disabled:true,"value":''}}
                }
            }
        },
        "field0035" : {
            "3288302870514713075" : {
                "value" : "3288302870514713075",
                "checked" : {
                    "field0036" : {id : "field0036",attrs:{disabled:false}}
                },
                "unchecked" : {
                    "field0036" : {id : "field0036",attrs:{disabled:true,"value":''}}
                }
            }
        },
        "field0039" : {
            "-1122618658103079534" : {
                "value" : "-1122618658103079534",
                "checked" : {
                    "field0040" : {id : "field0040",attrs:{disabled:false}}
                },
                "unchecked" : {
                    "field0040" : {id : "field0040",attrs:{disabled:true,"value":''}}
                }
            }
        },
        "field0038":{//无终端坐席复选框
            checked : {
                "field0059" : {id : "field0059",attrs:{"disabled" : false}},
                "field0068" : {id : "field0068",attrs:{"disabled" : false}},
                "field0077" : {id : "field0077",attrs:{"disabled" : false}}
            },
            unchecked :{
                "field0059" : {id : "field0059",attrs:{"disabled" : true,'value':''}},
                "field0068" : {id : "field0068",attrs:{"disabled" : true,"checked":false}},
                "field0077" : {id : "field0077",attrs:{"disabled" : true,'value':''}},
                "field0087" : {id : "field0087",attrs:{"disabled" : true,'value':''}}
            }
        },
        "field0037":{//有终端坐席复选框
            checked : {
                "field0039" : {id : "field0039",attrs:{"disabled" : false}},

                "field0054" : {id : "field0054",attrs:{"disabled" : false}},
                "field0063" : {id : "field0063",attrs:{"disabled" : false}},
                "field0072" : {id : "field0072",attrs:{"disabled" : false}},

                "field0055" : {id : "field0055",attrs:{"disabled" : false}},
                "field0073" : {id : "field0073",attrs:{"disabled" : false}}

            },
            unchecked :{
                "field0039" : {id : "field0039",attrs:{"disabled" : true,"checked":false}},
                "field0040" : {id : "field0040",attrs:{disabled:true,"value":''}},

                "field0054" : {id : "field0054",attrs:{"disabled" : true,'value':''}},
                "field0063" : {id : "field0063",attrs:{"disabled" : true,"checked":false}},
                "field0072" : {id : "field0072",attrs:{"disabled" : true,'value':''}},
                "field0082" : {id : "field0082",attrs:{"disabled" : true,'value':''}},

                "field0055" : {id : "field0055",attrs:{"disabled" : true,'value':''}},
                "field0073" : {id : "field0073",attrs:{"disabled" : true,'value':''}},

                "field0056" : {id : "field0056",attrs:{"disabled" : true,'value':''}},
                "field0065" : {id : "field0065",attrs:{"disabled" : true,"checked":false}},
                "field0074" : {id : "field0074",attrs:{"disabled" : true,'value':''}},
                "field0084" : {id : "field0084",attrs:{"disabled" : true,'value':''}},

                "field0057" : {id : "field0056",attrs:{"disabled" : true,'value':''}},
                "field0066" : {id : "field0065",attrs:{"disabled" : true,"checked":false}},
                "field0075" : {id : "field0074",attrs:{"disabled" : true,'value':''}},
                "field0085" : {id : "field0085",attrs:{"disabled" : true,'value':''}},

                "field0058" : {id : "field0056",attrs:{"disabled" : true,'value':''}},
                "field0067" : {id : "field0065",attrs:{"disabled" : true,"checked":false}},
                "field0076" : {id : "field0074",attrs:{"disabled" : true,'value':''}},
                "field0086" : {id : "field0086",attrs:{"disabled" : true,'value':''}},

                "field0088" : {id : "field0088",attrs:{"disabled" : true,'value':''}}
            }
        },
        "field0020":{
            "-2308135508315779848" : {		//联通用户
                "value" : "-2308135508315779848",
                "checked" : {
                    "lyblsx" : {name : "lyblsx",need:"hide"},
                    "bbblsx" : {name : "bbblsx",need:"hide"},
                    "jfsjxq_zq" : {name : "jfsjxq_zq",need:"hide"},
                    "jfsjxq_lt" : {name : "jfsjxq_lt",need:"show"}
                },
                "unchecked" : {
                    "lyblsx" : {name : "lyblsx",need:"hide"},
                    "bbblsx" : {name : "bbblsx",need:"hide"},
                    "jfsjxq_zq" : {name : "jfsjxq_zq",need:"hide"},
                    "jfsjxq_lt" : {name : "jfsjxq_lt",need:"hide"}
                }
            },
            "6096262930536024380" : {		//直签用户
                "value"	: "6096262930536024380",
                "checked" : {
                    "lyblsx" : {name : "lyblsx",need:"show"},
                    "bbblsx" : {name : "bbblsx",need:"show"},
                    "jfsjxq_zq" : {name : "jfsjxq_zq",need:"show"},
                    "jfsjxq_lt" : {name : "jfsjxq_lt",need:"hide"}
                },
                "unchecked" : {
                    "lyblsx" : {name : "lyblsx",need:"hide"},
                    "bbblsx" : {name : "bbblsx",need:"hide"},
                    "jfsjxq_zq" : {name : "jfsjxq_zq",need:"hide"},
                    "jfsjxq_lt" : {name : "jfsjxq_lt",need:"hide"}
                }
            },
            reltype : "tr"
        }
    }
    /*各个控件之间的状态关联关系定义*/
    SXJF.prototype.relations = {
        "field0151":{
            checked:{
                "field0091" : {id : "field0091",attrs:{'value':''}}
            }
        },
        "field0091":{
            checked:{
                "field0151" : {id : "field0151",attrs:{'value':''}},
                "field0101" : {id : "field0101",attrs:{'value':''}},
                "field0092" : {id : "field0092",attrs:{"checked":false}},
                "field0093" : {id : "field0093",attrs:{'value':''}}
            },
            unchecked:{

            }
        },
        "field0069":{
            checked : {
                "field0052" : {id : "field0052",attrs:{"disabled" : false}},
                "field0061" : {id : "field0061",attrs:{"disabled" : false}},
                "field0070" : {id : "field0070",attrs:{"disabled" : false}},

                "field0053" : {id : "field0052",attrs:{"disabled" : false}},
                "field0062" : {id : "field0061",attrs:{"disabled" : false}},
                "field0071" : {id : "field0070",attrs:{"disabled" : false}}
            },
            unchecked :{
                "field0052" : {id : "field0052",attrs:{"disabled" : true,'value':''}},
                "field0061" : {id : "field0061",attrs:{"disabled" : true,"checked":false}},
                "field0070" : {id : "field0070",attrs:{"disabled" : true,'value':''}},

                "field0053" : {id : "field0053",attrs:{"disabled" : true,'value':''}},
                "field0062" : {id : "field0062",attrs:{"disabled" : true,"checked":false}},
                "field0071" : {id : "field0071",attrs:{"disabled" : true,'value':''}}
            }
        },
        "field0073":{
            checked : {
                "field0056" : {id : "field0056",attrs:{"disabled" : false}},
                "field0065" : {id : "field0065",attrs:{"disabled" : false}},
                "field0074" : {id : "field0074",attrs:{"disabled" : false}},

                "field0057" : {id : "field0056",attrs:{"disabled" : false}},
                "field0066" : {id : "field0065",attrs:{"disabled" : false}},
                "field0075" : {id : "field0074",attrs:{"disabled" : false}},

                "field0058" : {id : "field0056",attrs:{"disabled" : false}},
                "field0067" : {id : "field0065",attrs:{"disabled" : false}},
                "field0076" : {id : "field0074",attrs:{"disabled" : false}}

            },
            unchecked :{
                "field0056" : {id : "field0056",attrs:{"disabled" : true,'value':''}},
                "field0065" : {id : "field0065",attrs:{"disabled" : true,"checked":false}},
                "field0074" : {id : "field0074",attrs:{"disabled" : true,'value':''}},
                "field0084" : {id : "field0084",attrs:{"disabled" : true,'value':''}},

                "field0057" : {id : "field0057",attrs:{"disabled" : true,'value':''}},
                "field0066" : {id : "field0066",attrs:{"disabled" : true,"checked":false}},
                "field0085" : {id : "field0085",attrs:{"disabled" : true,'value':''}},

                "field0058" : {id : "field0058",attrs:{"disabled" : true,'value':''}},
                "field0067" : {id : "field0067",attrs:{"disabled" : true,"checked":false}},
                "field0076" : {id : "field0076",attrs:{"disabled" : true,'value':''}},
                "field0086" : {id : "field0086",attrs:{"disabled" : true,'value':''}}
            }
        },
        "field0037":{//有终端坐席复选框
            checked : {
                "field0039" : {id : "field0039",attrs:{"disabled" : false}},

                "field0054" : {id : "field0054",attrs:{"disabled" : false}},
                "field0055" : {id : "field0063",attrs:{"disabled" : false}},
                "field0056" : {id : "field0072",attrs:{"disabled" : false}},
                "field0057" : {id : "field0055",attrs:{"disabled" : false}},
                "field0058" : {id : "field0073",attrs:{"disabled" : false}},

                "field0072" : {id : "field0072",attrs:{"disabled" : false}},
                "field0073" : {id : "field0073",attrs:{"disabled" : false}},
                "field0074" : {id : "field0074",attrs:{"disabled" : false}},
                "field0075" : {id : "field0075",attrs:{"disabled" : false}},
                "field0076" : {id : "field0076",attrs:{"disabled" : false}},

                "field0063" : {id : "field0063",attrs:{"disabled" : false}},


                "field0065" : {id : "field0065",attrs:{"disabled" : false}},
                "field0066" : {id : "field0066",attrs:{"disabled" : false}},
                "field0067" : {id : "field0067",attrs:{"disabled" : false}},

                /*


                 * */

            },
            unchecked :{
                "field0039" : {id : "field0039",attrs:{"disabled" : true,"checked":false}},
                "field0040" : {id : "field0040",attrs:{disabled:true,"value":''}},

                "field0054" : {id : "field0054",attrs:{"disabled" : true,'value':''}},
                "field0063" : {id : "field0063",attrs:{"disabled" : true,"checked":false}},
                "field0072" : {id : "field0072",attrs:{"disabled" : true,'value':''}},
                "field0082" : {id : "field0082",attrs:{"disabled" : true,'value':''}},

                "field0055" : {id : "field0055",attrs:{"disabled" : true,'value':''}},
                "field0073" : {id : "field0073",attrs:{"disabled" : true,'value':''}},

                "field0056" : {id : "field0056",attrs:{"disabled" : true,'value':''}},
                "field0065" : {id : "field0065",attrs:{"disabled" : true,"checked":false}},
                "field0074" : {id : "field0074",attrs:{"disabled" : true,'value':''}},
                "field0084" : {id : "field0084",attrs:{"disabled" : true,'value':''}},

                "field0057" : {id : "field0056",attrs:{"disabled" : true,'value':''}},
                "field0066" : {id : "field0065",attrs:{"disabled" : true,"checked":false}},
                "field0075" : {id : "field0074",attrs:{"disabled" : true,'value':''}},
                "field0085" : {id : "field0085",attrs:{"disabled" : true,'value':''}},

                "field0058" : {id : "field0056",attrs:{"disabled" : true,'value':''}},
                "field0067" : {id : "field0065",attrs:{"disabled" : true,"checked":false}},
                "field0076" : {id : "field0074",attrs:{"disabled" : true,'value':''}},
                "field0086" : {id : "field0086",attrs:{"disabled" : true,'value':''}},

                "field0088" : {id : "field0088",attrs:{"disabled" : true,'value':''}}
            }
        },
        "field0038":{//无终端坐席复选框
            checked : {
                "field0059" : {id : "field0059",attrs:{"disabled" : false}},
                "field0068" : {id : "field0068",attrs:{"disabled" : false}},
                "field0077" : {id : "field0077",attrs:{"disabled" : false}}
            },
            unchecked :{
                "field0059" : {id : "field0059",attrs:{"disabled" : true,'value':''}},
                "field0068" : {id : "field0068",attrs:{"disabled" : true,"checked":false}},
                "field0077" : {id : "field0077",attrs:{"disabled" : true,'value':''}},
                "field0087" : {id : "field0087",attrs:{"disabled" : true,'value':''}}
            }
        },
//	"field0041":{
//		checked : {
//			"field0039" : {id : "field0139",attrs:{"disabled" : false}}
//		},
//		unchecked :{
//			"field0039" : {id : "field0139",attrs:{"disabled" : true,"checked":false}},
//			"field0040" : {id : "field0040",attrs:{disabled:true,"value":''}}
//		}
//	},
        "field0041" : {
            "1621254934994570452" : {
                "value" : "1621254934994570452",
                "checked" : {
                    "field0042" : {id : "field0042",attrs:{disabled:false}}
                },
                "unchecked" : {
                    "field0042" : {id : "field0042",attrs:{disabled:true,checked:false}}
                }
            },
            "-1449570944700694416" : {
                "value" : "-1449570944700694416",
                "checked" : {
                    "field0042" : {id : "field0042",attrs:{disabled:true}},
                    "field0043" : {id : "field0043",attrs:{disabled:true,"value":''}}
                },
                "unchecked" : {
                    "field0042" : {id : "field0042",attrs:{disabled:false,checked:false}}
                }
            }
        },
        "field0146":{
            checked : {
                "field0139" : {id : "field0139",attrs:{"disabled" : false}},
                "field0140" : {id : "field0140",attrs:{"disabled" : false}},
                "field0141" : {id : "field0141",attrs:{"disabled" : false}},

                "field0147" : {id : "field0147",attrs:{"disabled" : false}},
                "field0148" : {id : "field0148",attrs:{"disabled" : false}},
                "field0149" : {id : "field0149",attrs:{"disabled" : false}}
            },
            unchecked :{
                "field0139" : {id : "field0139",attrs:{"disabled" : true,"value":''}},
                "field0140" : {id : "field0140",attrs:{"disabled" : true,"value":''}},
                "field0141" : {id : "field0141",attrs:{"disabled" : true,"value":''}},

                "field0147" : {id : "field0147",attrs:{"disabled" : true,"value":''}},
                "field0148" : {id : "field0148",attrs:{"disabled" : true,"value":''}},
                "field0149" : {id : "field0149",attrs:{"disabled" : true,"value":''}}
            }
        },
        "field0041" : {
            "1621254934994570452" : {
                "value" : "1621254934994570452",
                "checked" : {
                    "field0042" : {id : "field0042",attrs:{disabled:false}}
                },
                "unchecked" : {
                    "field0042" : {id : "field0042",attrs:{disabled:true,checked:false}}
                }
            },
            "-1449570944700694416" : {
                "value" : "-1449570944700694416",
                "checked" : {
                    "field0042" : {id : "field0042",attrs:{disabled:true}},
                    "field0043" : {id : "field0043",attrs:{disabled:true,"value":''}}
                },
                "unchecked" : {
                    "field0042" : {id : "field0042",attrs:{disabled:false,checked:false}}
                }
            }
        },
        "field0042" : {
            "8666697211134168264" : {
                "value" : "8666697211134168264",
                "checked" : {
                    "field0043" : {id : "field0043",attrs:{disabled:false}}
                },
                "unchecked" : {
                    "field0043" : {id : "field0043",attrs:{disabled:true,"value":''}}
                }
            }
        },
        "field0044" : {
            "-2749828302988163729" : {
                "value" : "-2749828302988163729",
                "checked" : {
                    "field0045" : {id : "field0045",attrs:{disabled:false}}
                },
                "unchecked" : {
                    "field0045" : {id : "field0045",attrs:{disabled:true,"value":''}}
                }
            }
        },
        "field0035" : {
            "3288302870514713075" : {
                "value" : "3288302870514713075",
                "checked" : {
                    "field0036" : {id : "field0036",attrs:{disabled:false}}
                },
                "unchecked" : {
                    "field0036" : {id : "field0036",attrs:{disabled:true,"value":''}}
                }
            }
        },
        "field0039" : {
            "-1122618658103079534" : {
                "value" : "-1122618658103079534",
                "checked" : {
                    "field0040" : {id : "field0040",attrs:{disabled:false}}
                },
                "unchecked" : {
                    "field0040" : {id : "field0040",attrs:{disabled:true,"value":''}}
                }
            }
        },
        "field0048" : {
            "5292152230183979277" :{
                "value" : "5292152230183979277",
                "checked" : {
                    "field0102" : {id : "field0102",attrs:{disabled:false}}
                },
                "unchecked" : {
                    "field0102" : {id : "field0102",attrs:{disabled:true,"value":''}}
                }
            }
        },
        "field0049" : {
            "-1432866995684749427" :{
                "value" : "-1432866995684749427",
                "checked" : {
                    "field0103" : {id : "field0103",attrs:{disabled:false}}

                },
                "unchecked" : {
                    "field0103" : {id : "field0103",attrs:{disabled:true,"value":''}}
                }
            }
        }
    };
    SXJF.prototype.trs={};
    SXJF.prototype.trRelations = {
        "field0020":{
            "-2308135508315779848" : {		//联通用户
                "value" : "-2308135508315779848",
                "checked" : {
                    "lyblsx" : {name : "lyblsx",need:"hide"},
                    "bbblsx" : {name : "bbblsx",need:"hide"},
                    "jfsjxq_zq" : {name : "jfsjxq_zq",need:"hide"},
                    "jfsjxq_lt" : {name : "jfsjxq_lt",need:"show"}
                },
                "unchecked" : {
                    "lyblsx" : {name : "lyblsx",need:"hide"},
                    "bbblsx" : {name : "bbblsx",need:"hide"},
                    "jfsjxq_zq" : {name : "jfsjxq_zq",need:"hide"},
                    "jfsjxq_lt" : {name : "jfsjxq_lt",need:"hide"}
                }
            },
            "6096262930536024380" : {		//直签用户
                "value"	: "6096262930536024380",
                "checked" : {
                    "lyblsx" : {name : "lyblsx",need:"show"},
                    "bbblsx" : {name : "bbblsx",need:"show"},
                    "jfsjxq_zq" : {name : "jfsjxq_zq",need:"show"},
                    "jfsjxq_lt" : {name : "jfsjxq_lt",need:"hide"}
                },
                "unchecked" : {
                    "lyblsx" : {name : "lyblsx",need:"hide"},
                    "bbblsx" : {name : "bbblsx",need:"hide"},
                    "jfsjxq_zq" : {name : "jfsjxq_zq",need:"hide"},
                    "jfsjxq_lt" : {name : "jfsjxq_lt",need:"hide"}
                }
            },
            reltype : "tr"

        }
    };
    SXJF.prototype.cssRela ={
        "field0020":{
            "-2308135508315779848" : {		//联通用户
                "value" : "-2308135508315779848",
                "checked" : {
                    "field0048" : {id : "field0048",attrs:{"background-color":"rgb(252, 000, 139)"}}
                },
                "unchecked" : {
                    "field0048" : {id : "field0048",attrs:{"background-color":"white"}},
                    "field0048_txt": {id : "field0048_txt",attrs:{"background-color":"rgb(252, 000, 139)"}}
                }
            },
            "6096262930536024380" : {		//直签用户
                "value"	: "6096262930536024380",
                "checked" : {
                    "field0011" : {id : "field0011",attrs:{"background-color":"rgb(252, 221, 139)"}},
                    "field0048" : {id : "field0048",attrs:{"background-color":"rgb(252, 221, 139)"}},
                    "field0048_txt": {id : "field0048_txt",attrs:{"background-color":"rgb(252, 221, 139)"}},
                    "field0049_txt": {id : "field0049_txt",attrs:{"background-color":"rgb(252, 221, 139)"}},
                    "field0135":{id : "field0049_txt",attrs:{"background-color":"rgb(252, 221, 139)"}}
                },
                "unchecked" : {
                    "field0011" : {id : "field0011",attrs:{"background-color":"white"}},
                    "field0048" : {id : "field0048",attrs:{"background-color":"white"}},
                    "field0048_txt": {id : "field0048_txt",attrs:{"background-color":"white"}},
                    "field0049_txt": {id : "field0049_txt",attrs:{"background-color":"white"}},
                    "field0135":{id : "field0049_txt",attrs:{"background-color":"white"}}
                }
            }
        },
        "field0035":{
            "3288302870514713075":{
                "value"	: "3288302870514713075",
                "checked" : {
                    "field0036" : {id : "field0036",attrs:{"background-color":"rgb(252, 221, 139)"}}
                },
                "unchecked" : {
                    "field0036" : {id : "field0036",attrs:{"background-color":"#e4e4e4"}}
                }
            }
        },
        "field0037":{
            id:"field0037",
            "checked" : {
                "field0040" : {id : "field0040",attrs:{"background-color":"#e4e4e4"}}
            },
            "unchecked" : {
                "field0040" : {id : "field0040",attrs:{"background-color":"#e4e4e4"}}
            }
        },
        "field0039":{
            "-1122618658103079534":{
                "value"	: "-1122618658103079534",
                "checked" : {
                    "field0040" : {id : "field0040",attrs:{"background-color":"rgb(252, 221, 139)"}}
                },
                "unchecked" : {
                    "field0040" : {id : "field0040",attrs:{"background-color":"#e4e4e4"}}
                }
            }
        },
        "field0041" :{
            "-1449570944700694416":{
                "value"	: "-1449570944700694416",
                "checked" : {
                    "field0043" : {id : "field0043",attrs:{"background-color":"#e4e4e4"}}
                },
                "unchecked" : {
                    "field0043" : {id : "field0043",attrs:{"background-color":"#e4e4e4"}}
                }
            }
        },
        "field0042":{
            "8666697211134168264" : {
                "value"	: "8666697211134168264",
                "checked" : {
                    "field0043" : {id : "field0043",attrs:{"background-color":"rgb(252, 221, 139)"}}
                },
                "unchecked" : {
                    "field0043" : {id : "field0043",attrs:{"background-color":"#e4e4e4"}}
                }
            }
        },
        "field0044":{
            "-2749828302988163729" : {
                "value"	: "-2749828302988163729",
                "checked" : {
                    "field0045" : {id : "field0045",attrs:{"background-color":"rgb(252, 221, 139)"}}
                },
                "unchecked" : {
                    "field0045" : {id : "field0045",attrs:{"background-color":"#e4e4e4"}}
                }
            }
        },
        "field0048":{
            "5292152230183979277":{
                "value"	: "5292152230183979277",
                "checked" : {
                    "field0102" : {id : "field0102",attrs:{"background-color":"rgb(252, 221, 139)"}}
                },
                "unchecked" : {
                    "field0102" : {id : "field0102",attrs:{"background-color":"#e4e4e4"}}
                }
            }
        },
        "field0049":{
            "-1432866995684749427":{
                "value"	: "-1432866995684749427",
                "checked" : {
                    "field0103" : {id : "field0103",attrs:{"background-color":"rgb(252, 221, 139)"}}
                },
                "unchecked" : {
                    "field0103" : {id : "field0103",attrs:{"background-color":"#e4e4e4"}}
                }
            }
        }
    };
    SXJF.prototype.validateRela= {
        // REQUIRED:[R 必填项] [NR 不必填] [RC 有条件的必填项] [COMS 需要组件]
        "field0011":{
            required : 'RC',
            conditions : {
                "field0020":{id:"field0020", isValue:true, condition:"EQ", value:"6096262930536024380"}
            },
            validateMsg:"直签客户必须填写合同号",
            warnText : "合同编号",
            color : "red",
            focus:true
        },
        "field0036":{
            required : 'RC',
            conditions : {
                "field0035":{id:"field0035", isValue:true, condition:"EQ", value:"3288302870514713075"}
            },
            validateMsg:"请填写业务系统类型",
            warnText : "业务系统类型",
            color : "red",
            focus:true
        },
        "field0040":{
            required : 'RC',
            conditions : {
                "field0039":{id:"field0039", isValue:true, condition:"EQ", value:"-1122618658103079534"}
            },
            validateMsg:"请填写终端需求",
            warnText : "终端需求",
            color : "red",
            focus:true
        },
        "field0043":{
            required : 'RC',
            conditions : {
                "field0042":{id:"field0042", isValue:true, condition:"EQ", value:"-2749828302988163729"}
            },
            validateMsg:"请填写IVR需求收费费用",
            warnText : "IVR需求",
            color : "red",
            focus:true
        },
        "field0045":{
            required : 'RC',
            conditions : {
                "field0044":{id:"field0044", isValue:true, condition:"EQ", value:"-2749828302988163729"}
            },
            validateMsg:"请填写计费需求",
            warnText : "计费需求",
            color : "red",
            focus:true
        },
        "field0037" :{
            required : 'COMS',
            coms :{
                "field0039" : {id:'field0039',needValue:true}
            },
            validateMsg:"请选择有终端类型",
            warnText : "终端需求",
            color : "red",
            focus:true
        }
    };

    /** **************工具函数********************** */
    SXJF.prototype.until_valiPhoneNum = function(tel) {
        var isPhoneNum = false;
        // 手机正则表达式
        var mp_reg = /^(\(\d{3,4}\)|\d{3,4}|\s)?\d{5,16}$/;
        if (mp_reg.test(tel)) {
            isPhoneNum = true;
        }
        return isPhoneNum;
    };
    SXJF.prototype.until_valiJfNum = function(tel) { // 缴费号码
        var isPhoneNum = false;
        // 手机正则表达式
        var mp_reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{10,14}$/;
        if (mp_reg.test(tel)) {
            isPhoneNum = true;
        }
        return isPhoneNum;
    };
}

