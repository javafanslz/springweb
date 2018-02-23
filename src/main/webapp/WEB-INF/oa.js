$(document).ready(function() {
    try {
        var title = $("#subject").val();
        if (title && title.indexOf("试用工单") != -1) {
            var sysl = new SYSL();
            qnObjs.sysl = sysl;
            sysl.initPage();
        }
    } catch (e) {
        // alert("SYSL_ready:"+e);
    }
});

/**
 * CCOD业务试用受理单对象
 */
function SYSL() {
    var _sysl = this;

    SYSL.prototype.initPage = function() {
        try{
            this.initTrObjs();
            this.bindEvent();
            this.initDisableComps();
            this.eventMouseSSPTTR();

            this.hideTrObjs();

            this.initEnableComps();
        }catch(e){
            // alert("SYSL_initPage："+e);
        }
    };

    // 绑定事件
    SYSL.prototype.bindEvent = function() {
        $.each(_sysl.events,function(key,val){
            if(_sysl.elements[key].type=="radio"){
                var elem = eval($('input[name='+key+']'));
                var func = eval("_sysl.constructor.prototype."+val.func);
                elem.each(function(){
                    var func = eval("_sysl.constructor.prototype."+val.func);
                    $(this).bind(val.event,func);
                });
            }else{
                var elem = $("#" + key);
                var func = eval("_sysl.constructor.prototype."+val.func);
                elem.bind(val.event,func);
            }
        });
    };

    SYSL.prototype.initDisableComps = function() {
        $.each(_sysl.elements, function(key, val) {
            if(val && val.initDisable){
                if(val.type =='radio'){
                    var _radios = $("input[name="+key+"]");
                    $.each(_radios,function(key,value){
                        _sysl.disableComp($(this), true);
                    });
                }else{
                    var elem = $("#" + val.id);
                    if(elem.length == 1){
                        _sysl.disableComp(elem, true);
                    }
                }
            }
        });
    };

    SYSL.prototype.disableComp = function(elem, val) {
        if (!elem || elem.length == 0) {
            return;
        }
        elem.attr("disabled", val);
    };

    SYSL.prototype.validate_JFnumber = function() {
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
    }
    /*联通用户必须选择上传附件
     * */
    SYSL.prototype.validate_LTYH = function() {
        var khfzqd = $("#field0020");
        var khfzqd_num = khfzqd.val();

        var ltscxx = $("#field0033_span").children(":first").next();
        var ltscxxfj = ltscxx.children();


        if (khfzqd_num == '-373091421883121058'&&ltscxxfj.length ==0) {
            alert("联通客户必须上传联通上传信息邮件");


            $(":contains('上传信息邮件')").parents("td").css("color","red");
            //$(":contains('基本服务费')").parents("td").css("color","red");

            return false;
        }
        $(":contains('联通上传信息邮件')").parents("td").css("color","black");

        return true;
    }



    SYSL.prototype.changeOtherCompsState = function(fireObjID) {
        var obj = _sysl.elements[fireObjID];
        var objs = _sysl.relations[fireObjID];

        if(!(obj && objs)){
            return ;
        }

        if(obj && objs && obj.type =='checkbox'){
            var operObj = $("#" + fireObjID);
            if(operObj.is(':checked')){
                $.each(objs.checked,function(key,val){
                    var _obj = _sysl.elements[key];
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
                    var _obj = _sysl.elements[key];
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
                    var _obj =_sysl.elements[key];
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
                    var _obj =_sysl.elements[key];
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

    SYSL.prototype.changeCompsCSS = function(fireObjID) {
        var obj = _sysl.elements[fireObjID];
        var relaObj = _sysl.cssRela[fireObjID];
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
                    var _obj = _sysl.elements[compkey];
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
                    var _obj = _sysl.elements[compkey];
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
    };

    SYSL.prototype.initEnableComps = function() {
        $.each(_sysl.initRelations,function(key,value){
            if(value.reltype=="tr"){
                _sysl.changeHideState(key);
            }else{
                _sysl.changeOtherCompsState(key);
            }
        });
        _sysl.showFjDiv();
    }

    SYSL.prototype.validate = function(){
        if(!_sysl.validate_ptlx()){
            return false;
        }
        if(!_sysl.validate_JFnumber()){
            return false;
        }
        if(!_sysl.validate_ZD()){
            return false;
        }
        if(!_sysl.validateJSDX_ZH()){
            return false;
        }
        if(!_sysl.validateAgentPSTN()){
            return false;
        }
        /*if(!_sysl.validate_ptjrh()){
         return false;
         }*/
        if(!_sysl.validateOutNum()){
            return false;
        }
        if(!_sysl.validatePltCustType()){
            return false;
        }
        if(!_sysl.validate_LTYH()){
            return false;
        }
        if($("input[name=field0035]:checked").val()==3288302870514713075){
            if($("#field0036").val()==""){
                alert("【业务系统类型】为【其他】,请输入具体类型后再次提交！");
                $(":contains('业务系统类型')").parents("td").css("color","red");
                $("#field0036").focus();
                return false;
            }
            $(":contains('业务系统类型')").parents("td").css("color","black");
            if($("input[name=field0039]:checked").val()==-1122618658103079534){
                if($("#field0040").val()==""){
                    alert("终端需求类型为其他,请输入该类型！");
                    $(":contains('终端需求')").parents("td").css("color","red");
                    $("#field0040").focus();
                    return false;
                }
            }
            $(":contains('终端需求')").parents("td").css("color","black");
        }

        var validateResult = true;
        $.each(_sysl.validateRela,function(key,val){
            var obj = _sysl.elements[key];
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
                    var _comsObj = _sysl.elements[comsKey];
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
                        var obj1 = _sysl.elements[consKey];
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

    SYSL.prototype.validate_ZD = function() {
        var YZD = $("#field0037");
        var WZD = $("#field0038");

        var yzdnum = $("#field0056").val();
        var wzdnum = $("#field0059").val();

        if(YZD.is(':checked') && (yzdnum==0 || yzdnum=='')){
            alert("有终端坐席数量有误，不能为空或0。");
            $(":contains('有终端坐席数量')").parents("td").css("color","red");
            $("#field0056").focus();
            return false;
        }
        $(":contains('有终端坐席数量')").parents("td").css("color","black");

        if(WZD.is(':checked')&& (wzdnum==0 || wzdnum=='')){
            alert("无终端坐席数量有误，不能为空或0。");
            $(":contains('无终端坐席数量')").parents("td").css("color","red");
            $("#field0059").focus();
            return false;
        }
        $(":contains('无终端坐席数量')").parents("td").css("color","black");

        return true;
    };

    /**
     * 渠道客户与平台的验证
     */
    SYSL.prototype.validatePltCustType = function() {
        var pltType = $("#field0016").text();
        var khfzqd = $("#field0020");
        var khfzqd_num = khfzqd.val();

        //-373091421883121058联通客户 | "8141723194883722334"直签客户
        if (khfzqd_num == '-373091421883121058' && pltType.indexOf("合作运营平台") == -1) {
            alert("联通客户只能选择合作运营平台，请重新选择！");
            $(":contains('平台类型')").parents("td").css("color","red");
            $("#field0017").focus();
            return false;
        }
        $(":contains('平台类型')").parents("td").css("color","black");
        if (khfzqd_num == '8141723194883722334' && (pltType.indexOf("资源平台") == -1 && pltType.indexOf("未验收") == -1)) {
            alert("直签客户只能选择资源平台或未验收平台，请重新选择！");
            $("#field0017").focus();
            $(":contains('平台类型')").parents("td").css("color","red");
            return false;
        }
        $(":contains('平台类型')").parents("td").css("color","black");
        return true;
    }
    /**
     * 江苏电信业务规则校验--验证智恒的反馈结果
     * @returns {Boolean}
     */
    //-373091421883121058联通客户 | "8141723194883722334"直签客户
    SYSL.prototype.validateJSDX_ZH =function(){
        // 智恒工单附件
        var pltName = $("#field0017").val();

        var khfzqd =$("#field0020");
        var khfzqd_num =  khfzqd.val();

        //青牛附件
        // var attachment1 = $("#field0030_span").children(":first").next();
        // var attachmentChilds1 = attachment1.children();

        //智恒附件
        var attachment = $("#field0131_span").children(":first").next();
        var attachmentChilds = attachment.children();

        //运营商受理单附件
        var yys = $("#field0031_span").children(":first").next();
        var yysfj = yys.children();

        //外显号码附件
        var wxhm = $("#field0032_span").children(":first").next();
        var wxhmfj = wxhm.children();

        //外显文本框
        var outNum1 = $("#field0142");
        var outNum2 = $("#field0143");
        var outNum3 = $("#field0144");

        //外显附件
        var _attachment = $("#field0029_span").children(":first").next();
        var _attachmentChilds = _attachment.children();

        if (khfzqd_num == "8141723194883722334" && pltName.indexOf("江苏电信") != -1 && ((outNum1.val() != '' || outNum2.val() != '' || outNum3.val() != '') || _attachmentChilds.length!=0)) {

//			if (attachmentChilds1.length == 0) {
//				alert('江苏电信平台上的直签用户需上传【青牛外显申请】，请上传后再次提交！');
//				return false;
//			}

            if (attachmentChilds.length == 0) {
                alert('江苏电信平台上的直签用户需上传【智恒反馈结果】，请上传后再次提交！');
                return false;
            }
        }

        if(pltName.indexOf("江苏电信") == -1){
            //attachmentChilds1.length != 0||
            if (attachmentChilds.length != 0) {
                alert("除江苏电信平台，其他平台无需填写【智恒反馈】");
                return false;
            }
        }
        return true;
    }

    /**
     * 校验坐席电话
     */
    SYSL.prototype.validateAgentPSTN = function() {
        var sipchk = $("#field0145");
        var pstnchk = $("#field0146");

        var sipischk = sipchk.is(':checked');
        var pstnischk = pstnchk.is(':checked');

        var zxdh1 =$("#field0139").val();
        var zxdh2 =$("#field0140").val();
        var zxdh3 =$("#field0141").val();

        var isPhoneNum = (zxdh1=='')?true:_sysl.until_valiPhoneNum(zxdh1);
        isPhoneNum = isPhoneNum && ((zxdh2=='')?true:_sysl.until_valiPhoneNum(zxdh2));
        isPhoneNum = isPhoneNum && ((zxdh3=='')?true:_sysl.until_valiPhoneNum(zxdh3));

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
    SYSL.prototype.initTrObjs = function() {

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


        var zhfkjg_txt = $(":contains('智恒反馈结果')").parents("td").children(":first");
        var zhfkjg_fj = $(":contains('智恒反馈结果')").parents("td").next().children(":first");

        var hmgszm_txt = $(":contains('号码归属证明')").parents("td").children(":first");
        var hmgszm_fj = $(":contains('号码归属证明')").parents("td").next().children(":first");

        var wxhmzqs_txt = $(":contains('外显号码知情书')").parents("td").children(":first");
        var wxhmzqs_fj =  $(":contains('外显号码知情书')").parents("td").next().children(":first");

        var scxxyj_txt = $(":contains('上传信息邮件')").parents("td").children();
        var scxxyj_fj = $(":contains('上传信息邮件')").parents("td").next().children(":first");

        //$(":contains('外显号码知情书')").parents("td").text("&nbsp;aaa");
        _sysl.trs = {
            zhfkjg_txt : zhfkjg_txt,
            zhfkjg_fj : zhfkjg_fj,

            hmgszm_txt: hmgszm_txt,
            hmgszm_fj:hmgszm_fj,

            wxhmzqs_txt:wxhmzqs_txt,
            wxhmzqs_fj : wxhmzqs_fj,

            scxxyj_txt : scxxyj_txt,
            scxxyj_fj : scxxyj_fj
        };
    }
    SYSL.prototype.hideTrObjs = function() {
        $.each(_sysl.trs,function(key,val){
            if(val){
                val.hide();
            }
        });
    };
    SYSL.prototype.eventChange0020 =function(e){

        _sysl.showFjDiv();
    }
    SYSL.prototype.eventChange0020 =function(e){
        _sysl.eventMouseSSPTTR();
    }
    SYSL.prototype.changePSTNColor =function(e){
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

    //所属平台行
    SYSL.prototype.eventMouseSSPTTR = function(){

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
            _sysl.showFjDiv();
        });

    }
    SYSL.prototype.showFjDiv = function(){
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

        if (khfzqd_num == "-373091421883121058"){
            _sysl.trs.zhfkjg_txt.hide();
            _sysl.trs.zhfkjg_fj.hide();

            _sysl.trs.hmgszm_txt.hide();
            _sysl.trs.hmgszm_fj.hide();
            _sysl.trs.wxhmzqs_txt.hide();
            _sysl.trs.wxhmzqs_fj.hide();

            _sysl.trs.scxxyj_txt.show();
            _sysl.trs.scxxyj_fj.show();
        }else{
            _sysl.trs.scxxyj_txt.hide();
            _sysl.trs.scxxyj_fj.hide();
        }

        if(yz_outNum1=='' && yz_outNum2 == '' && yz_outNum3=='' && attachmentChilds.length==0){
            _sysl.trs.zhfkjg_txt.hide();
            _sysl.trs.zhfkjg_fj.hide();

            _sysl.trs.hmgszm_txt.hide();
            _sysl.trs.hmgszm_fj.hide();
            _sysl.trs.wxhmzqs_txt.hide();
            _sysl.trs.wxhmzqs_fj.hide();

            return ;
        }

        if(khfzqd_num==""){
            _sysl.trs.zhfkjg_txt.hide();
            _sysl.trs.zhfkjg_fj.hide();

            _sysl.trs.hmgszm_txt.hide();
            _sysl.trs.hmgszm_fj.hide();
            _sysl.trs.wxhmzqs_txt.hide();
            _sysl.trs.wxhmzqs_fj.hide();

            return;
        }
        //-373091421883121058联通客户 | "8141723194883722334"直签客户
        if (khfzqd_num == "8141723194883722334" && pltName.indexOf("江苏电信") != -1) {
            _sysl.trs.zhfkjg_txt.show();
            _sysl.trs.zhfkjg_fj.show();

            _sysl.trs.hmgszm_txt.hide();
            _sysl.trs.hmgszm_fj.hide();
            _sysl.trs.wxhmzqs_txt.hide();
            _sysl.trs.wxhmzqs_fj.hide();
        }else if (khfzqd_num == "8141723194883722334" && pltName.indexOf("江苏电信") == -1){
            _sysl.trs.zhfkjg_txt.hide();
            _sysl.trs.zhfkjg_fj.hide();

            _sysl.trs.hmgszm_txt.show();
            _sysl.trs.hmgszm_fj.show();
            _sysl.trs.wxhmzqs_txt.show();
            _sysl.trs.wxhmzqs_fj.show();
        }else{
            _sysl.trs.zhfkjg_txt.hide();
            _sysl.trs.zhfkjg_fj.hide();

            _sysl.trs.hmgszm_txt.hide();
            _sysl.trs.hmgszm_fj.hide();
            _sysl.trs.wxhmzqs_txt.hide();
            _sysl.trs.wxhmzqs_fj.hide();
        }
    };

    /**
     * 验证平台接入号 填三个中的一个或挂附件
     */
    SYSL.prototype.validate_ptjrh =function(){
        var attachment = $("#field0022_span").children(":first").next();
        var attachmentChilds = attachment.children();//附件

        var prjrh1 =$("#field0136").val();
        var prjrh2 =$("#field0137").val();
        var prjrh3 =$("#field0138").val();

        var isPhoneNum = (prjrh1=='')?true:_sysl.until_valiPhoneNum(prjrh1);
        isPhoneNum = isPhoneNum && ((prjrh2=='')?true:_sysl.until_valiPhoneNum(prjrh2));
        isPhoneNum = isPhoneNum && ((prjrh3=='')?true:_sysl.until_valiPhoneNum(prjrh3));


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

    /**
     * 验证平台类型 选择未验收平台时，必须填写所属平台
     * */
    SYSL.prototype.validate_ptlx =function(){
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
    /**
     * 外显号码校验
     */
    SYSL.prototype.validateOutNum = function(){
        //外显文本框
        var outNum1 = $("#field0142");
        var outNum2 = $("#field0143");
        var outNum3 = $("#field0144");

        var yz_outNum1 = $("#field0142").val();
        var yz_outNum2 = $("#field0143").val();
        var yz_outNum3 = $("#field0144").val();


        var isPhoneNum = (yz_outNum1=='')?true:_sysl.until_valiPhoneNum(yz_outNum1);
        isPhoneNum = isPhoneNum && ((yz_outNum2=='')?true:_sysl.until_valiPhoneNum(yz_outNum2));
        isPhoneNum = isPhoneNum && ((yz_outNum3=='')?true:_sysl.until_valiPhoneNum(yz_outNum3));

        if(!isPhoneNum){
            alert("【外显号码】电话格式不正确，请重新填写。");
            $("#field0142").focus();
            return false;
        }

        //外显附件
        var attachment = $("#field0029_span").children(":first").next();
        var attachmentChilds = attachment.children();



        // 运营商受理单/号码归属证明
        var outNumattachment1 = $("#field0031_span").children(":first").next();
        var outattachmentChilds1 = outNumattachment1.children();

        // 外显号码知情书
        var outNumattachment2 = $("#field0032_span").children(":first").next();
        var outattachmentChilds2 = outNumattachment2.children();

        //青牛外显申请
        //var attachment3 = $("#field0030_span").children(":first").next();
        //var attachmentChilds3 = attachment3.children();

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
//			if(attachmentChilds3.length!=0){
//				alert("未录入外显号，无需上传相关证明材料，请删除后再次提交！");
//				return false;
//			}
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

            if (khfzqd_num == "8141723194883722334" && pltName.indexOf("江苏电信") == -1) {

                if (outattachmentChilds1.length == 0 || outattachmentChilds2.length == 0) {
                    alert("【运营商受理单/号码归属证明】和【外显号码知情书】为必要的证明材料，请上传后再次提交！");
                    $(":contains('外显号码知情书')").parents("td").css("color","red");
                    $(":contains('号码归属证明')").parents("td").css("color","red");
                    return false;
                }
            }
        }
        $(":contains('外显号码知情书')").parents("td").css("color","black");
        $(":contains('号码归属证明')").parents("td").css("color","black");
        return true;
    };

    SYSL.prototype.eventClick0039 = function() {
        _sysl.changeOtherCompsState("field0039");
        _sysl.changeCompsCSS("field0039");
    };

    SYSL.prototype.eventClick0035 = function() {
        _sysl.changeOtherCompsState("field0035");
        _sysl.changeCompsCSS("field0035");
    };
    SYSL.prototype.eventClick0037 = function() {
        _sysl.changeOtherCompsState("field0037");
        _sysl.changeCompsCSS("field0037");
    };

    SYSL.prototype.eventClick0146 = function(e) {
        _sysl.changeOtherCompsState("field0146");
        _sysl.changePSTNColor();
    };
    SYSL.prototype.cssRela ={
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
        }
    };

    SYSL.prototype.elements = {
        "field0004":{id : "field0004",	type : "text",		name : "要求完成时间",initDisable:true},
        "field0006":{id : "field0006",	type : "span",		name : "客户经理"},
        "field0007":{id : "field0007",	type : "span",		name : "归属部门"},
        "field0009":{id : "field0009",	type : "text",		name : "企业ID"},
        "field0010":{id : "field0010",	type : "text",		name : "企业名称"},
        "field0014":{id : "field0014",	type : "span",		name : "归属区域"},

        "field0015":{id : "field0015",	type : "span",		name : "企业属地"},
            "field0016":{id : "field0016",	type : "text",		name : "平台类型"},
            "field0017":{id : "field0017",	type : "text",		name : "所属平台"},
            "field0018":{id : "field0018",	type : "span",		name : "所属行业"},
            "field0019":{id : "field0019",	type : "span",		name : "子行业"},
            "field0020":{id : "field0020",	type : "select",		name : "客户发展渠道"},
        "field0020_txt":{id : "field0020_txt",	type : "select",		name : "客户发展渠道"},
        "field0021_txt":{id : "field0021_txt",	type : "select",		name : "工单类型"},
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

        "field0030_span":{id : "field0030_span",	type : "span",		name : "青牛外显申请"},
        "field0031_span":{id : "field0031_span",	type : "span",		name : "运营商受理单/号码归属证明"},
        "field0032_span":{id : "field0032_span",	type : "span",		name : "外显号码知情书"},
        "field0033_span":{id : "field0033_span",	type : "span",		name : "直签/联通上传信息邮件"},
        "field0131_span":{id : "field0031_span",	type : "span",		name : "智恒反馈结果"},


        "field0024":{id : "field0024",	type : "text",		name : "呼入市话"},
        "field0025":{id : "field0025",	type : "text",		name : "呼出市话"},
        "field0026":{id : "field0026",	type : "text",		name : "呼入长途"},
        "field0027":{id : "field0027",	type : "text",		name : "呼出长途"},
        "field0028":{id : "field0028",	type : "text",		name : "应用服务费"},

        "field0035":{id : "field0035",	type : "radio",		name : "客服通", 		value:"-5951425570627761360"},
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
        "field0052":{id : "field0052",	type : "text",		name : "IVR数量"},
        "field0054":{id : "field0054",	type : "text",		name : "自动外拨通道数量"},
        "field0056":{id : "field0056",	type : "text",		name : "有终端坐席数量"},
        "field0059":{id : "field0059",	type : "text",		name : "无终端坐席数量"},

        "field0151":{id : "field0151",  type :"textarea",	name : "备注"},
        "field0152":{id : "field0152",  type :"text",		name : "试用时间开始"},
        "field0153":{id : "field0153",  type :"text",		name : "试用时间结束"},
        "field0154":{id : "field0154",	type :"span",		name : "系统正式开始试用时间"}
    };
    SYSL.prototype.relations = {
        "field0037":{//有终端坐席复选框
            checked : {
                "field0039" : {id : "field0039",attrs:{"disabled" : false}}
            },
            unchecked :{
                "field0039" : {id : "field0039",attrs:{"disabled" : true,"checked":false}}
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
        }
    };

    SYSL.prototype.initRelations = {
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
        "field0037":{//有终端坐席复选框
            checked : {
                "field0039" : {id : "field0039",attrs:{"disabled" : false}}
            },
            unchecked :{
                "field0039" : {id : "field0039",attrs:{"disabled" : true,"checked":false}}
            }
        }
    };
    SYSL.prototype.validateRela= {
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
    SYSL.prototype.trs={};

    /*事件注册*/
    SYSL.prototype.events = {
        "field0020":{event:"change",func:"eventChange0020"},
        "field0017":{event:"change",func:"eventChange0017"},
        "field0035":{event:"click",func:"eventClick0035"},
        "field0037":{event:"click",func:"eventClick0037"},
        "field0039":{event:"click",func:"eventClick0039"},
        "field0146":{event:"click",func:"eventClick0146"}
    };
    /** **************工具函数********************** */
    SYSL.prototype.until_valiPhoneNum = function(tel) {
        var isPhoneNum = false;
        // 手机正则表达式
        var mp_reg = /^(\(\d{3,4}\)|\d{3,4}|\s)?\d{5,16}$/;
        if (mp_reg.test(tel)) {
            isPhoneNum = true;
        }
        return isPhoneNum;
    };
    SYSL.prototype.until_valiJfNum = function(tel) { // 缴费号码
        var isPhoneNum = false;
        // 手机正则表达式
        var mp_reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{10,14}$/;
        if (mp_reg.test(tel)) {
            isPhoneNum = true;
        }
        return isPhoneNum;
    };
}