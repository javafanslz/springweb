/*
 * 业务延期
 * 
 * */
$(document).ready(function() {
	try {
		var title = $("#subject").val();
		if (title && title.indexOf("业务变更单-联通") != -1) {
			var bglt = new BGLT();
			qnObjs.bglt = bglt;
			bglt.initPage(bglt);
		}
	} catch (e) {
	}
});
/**
 * CCOD业务延期受理单
 */

function BGLT() {

	var _bglt = this;
	var trs={};
	// 初始化页面的方法
	BGLT.prototype.initPage = function(pageType) {
		try {
			this.initDisableComps();
			this.bindEvent();
			this.radiocheck();
			this.eventMouseSSPTTR();
		} catch (e) {
			alert(e);
		}

	};
	/**
	 * 初始化不可用控件
	 */
	BGLT.prototype.initDisableComps = function() {
		$.each(_bglt.elements, function(key, val) {
			if(val && val.initDisable){
				if(val.type =='radio'){
					var _radios = $("input[name="+key+"]");
					$.each(_radios,function(key,value){
						_bglt.disableComp($(this), true);
					});
				}else{
					var elem = $("#" + val.id);
					if(elem.length == 1){
						_bglt.disableComp(elem, true);
					}
				}
			}
			if(val && val.readOnly){
				if(val.type =='radio'){
					var _radios = $("input[name="+key+"]");
					$.each(_radios,function(key,value){
						_bglt.readOnly($(this), true);
					});
				}else{
					var elem = $("#" + val.id);
					if(elem.length == 1){
						_bglt.readOnly(elem, true);
					}
				}
			}
		});
	};
	BGLT.prototype.disableComp = function(elem, val) {
		if (!elem || elem.length == 0) {
			return;
		}
		elem.attr("disabled", val);
	};

	BGLT.prototype.readOnly = function(elem,val){
		if (!elem || elem.length == 0) {
			return;
		}
		elem.attr("readonly", val);
	};

	/**
	 * 鼠标移入事件
	 */
	BGLT.prototype.eventMouseSSPTTR = function(){
		var shptr = $("#field0016").parents("table");
		shptr.mouseover(function(){
			_bglt.cssRelations();
		});
	};

	/**
	 * 绑定事件
	 */
	BGLT.prototype.bindEvent = function() {
		$.each(_bglt.events,function(key,val){
			if(_bglt.elements[key].type=="radio" || _bglt.elements[key].type=="checkbox"){
				var elem = eval($('input[name='+key+']'));
				var func = eval("_bglt.constructor.prototype."+val.func);
				elem.each(function(){
					var func = eval("_bglt.constructor.prototype."+val.func);
					$(this).bind(val.event,func);
				});
			}else {
				var elem = $("#" + key);
				var func = eval("_bglt.constructor.prototype."+val.func);
				elem.bind(val.event,func);
			}
		});
	};

	/**
	 * 当选择编程多选框的时候 对应更改项的css关联
	 */
	BGLT.prototype.cssRelations = function(){
		_bglt.initJFHM();
		_bglt.initAccNum();
		_bglt.initAgentNum();
		_bglt.initOutNum();
		_bglt.initFWZFNum();
		_bglt.initFWZFType();
        _bglt.initHFZF();
		_bglt.initName();
		_bglt.initJFSj();
	};
    /**
     * 校验
     */
	BGLT.prototype.validate = function(){
		if(!_bglt.validatePT()){
			return false;
		}
        if(!_bglt.validateFZQD()){
            return false;
        }
        if(!_bglt.validateState()){
            return false;
        }
        if(!_bglt.validateJFHM()){
            return false;
        }
        if(!_bglt.validateAccNum()){
            return false;
        }
        if(!_bglt.validateAgentNum()){
            return false;
        }
        if(!_bglt.validateOutNum()){
            return false;
        }
        if(!_bglt.validateNum()){
            return false;
        }
        if(!_bglt.validateType()){
            return false;
        }
        if(!_bglt.validateZdxq()){
            return false;
        }
        if(!_bglt.validateHFZF()){
            return false;
        }
		if(!_bglt.validateName()){
			return false;
		}
		if(!_bglt.validateJFSj()){
			return false;
		}
        return true;
    };

	/**
	 * 平台校验
	 * @returns {boolean}
	 */
	BGLT.prototype.validatePT =function(){
		var ptType = $("#field0015").html();
		if(ptType!= "" && ptType.indexOf('合作') == -1){
			alert("【平台类型】联通变更工单只能选择联通合作平台");
			return false;
		}
		return true;
	};

    /**
     * 平台校验
     * @returns {boolean}
     */
    BGLT.prototype.validateFZQD =function(){
        var qudao = $("#field0019").html();
        if(qudao!= "" && qudao.indexOf('联通合作客户') == -1){
            alert("【发展渠道】联通工单不能选择直签发展的客户");
            return false;
        }
        return true;
    };

    /**
     * 校验企业当前状态
     * 业务终止：不允许发起任何类别的工单。仅在发起人处进行校验。
     * 业务恢复：允许任何变更，无需校验
     */
    BGLT.prototype.validateState = function(){
        var state = $("#field0189").text();
        var selectState = $("#field0185_txt").val();
        if(state != ''&&typeof(state)!="undefined"){
            if(state.indexOf("业务终止")!=-1){
                alert("【状态变更】当前企业已经终止业务，不能发送工单！！");
                return false;
            }
            if(state.indexOf("业务暂停")!=-1){
                if(selectState == ''){
                    alert("【状态变更】当前企业为业务暂停状态，进行操作前请选择要变更的状态");
                    return false;
                }
            }
        }else{
            //第一次提交状态变更不予许提交恢复工单
            if(selectState != '' &&typeof(selectState != "undefined")){
                if(selectState.indexOf("业务恢复")!=-1){
                    alert("【状态变更】第一次提交状态变更不予许提交恢复工单");
                    return false;
                }
            }
        }
		//计费时间
		var stateCheck =  selectState == "业务恢复"||selectState == "业务终止";
		if(state == "业务暂停"){
			if(!stateCheck){
				alert("【状态变更】暂停的用户不能选择业务暂停或不填写");
				return false;
			}
		}
        return true;
    };



	/**
	 * 当选择缴费变更的时候
	 * 缴费号码变背景色  设置disabled为 false
	 * 否则相反
	 *
	 */
	BGLT.prototype.initJFHM = function(){
		if($("#field0195").is(":checked")){
			$("#field0023").attr("disabled",false);
			$("#field0024").attr("disabled",false);
			$("#field0025").attr("disabled",false);
			$("#field0026").attr("disabled",false);
			$("#field0027").attr("disabled",false);
			$("#field0023").css('background','#FCDD8B');
			$("#field0024").css('background','#FCDD8B');
			$("#field0025").css('background','#FCDD8B');
			$("#field0026").css('background','#FCDD8B');
			$("#field0027").css('background','#FCDD8B');
		}else{
			$("#field0023").attr("disabled",true);
			$("#field0024").attr("disabled",true);
			$("#field0025").attr("disabled",true);
			$("#field0026").attr("disabled",true);
			$("#field0027").attr("disabled",true);
			$("#field0023").css('background','');
			$("#field0024").css('background','');
			$("#field0025").css('background','');
			$("#field0026").css('background','');
			$("#field0027").css('background','');

			$("#field0023").val("");
			$("#field0024").val("");
			$("#field0025").val("");
			$("#field0026").val("");
			$("#field0027").val("");

		}
	};

	/**
	 * 校验缴费号码
	 */
	BGLT.prototype.validateJFHM = function(){

		if($("#field0195").is(":checked")){
			var hrsh1 =$("#field0023").val();
			var hrct1 =$("#field0024").val();
			var hrsh2 =$("#field0025").val();
			var hrct2 =$("#field0026").val();
			var yyfwf =$("#field0027").val();

			var isPhoneNum = (hrsh1=='')?true:this.until_valiJfNum(hrsh1);
			isPhoneNum = isPhoneNum && ((hrct1=='')?true:this.until_valiJfNum(hrct1));
			isPhoneNum = isPhoneNum && ((hrsh2=='')?true:this.until_valiJfNum(hrsh2));
			isPhoneNum = isPhoneNum && ((hrct2=='')?true:this.until_valiJfNum(hrct2));
			isPhoneNum = isPhoneNum && ((yyfwf=='')?true:this.until_valiJfNum(yyfwf));

			var isBlank = hrsh1 == ""||hrct1 == ""||hrsh2 == ""||hrct2 == ""||yyfwf == "";
			if(isBlank){
				alert("【缴费号码】选择缴费号码变更，缴费号码需全部填写");
				return false;
			}
			if(!isPhoneNum){
				alert("【缴费号码】缴费号码应为10-14为数字，请重新填写。");
				$("#field0023").focus();
				return false;
			}
			return true;
		}
		return true;
	};

	/**
	 * 接入号
	 */
	BGLT.prototype.initAccNum = function(){
		if($("#field0187").is(":checked")){
			$("#field0108").attr("disabled",false);
			$("#field0111").attr("disabled",false);
			$("#field0021_span").attr("disabled",false);
			$("#field0108").css('background','#FCDD8B');
			$("#field0111").css('background','#FCDD8B');
			$("#field0021_span").css('background','#FCDD8B');
		}else{
			$("#field0108").attr("disabled",true);
			$("#field0111").attr("disabled",true);
			$("#field0021_span").attr("disabled",true);
			$("#field0108").css('background','');
			$("#field0111").css('background','');
			$("#field0021_span").css('background','');

			$("#field0108").val("");
			$("#field0111").val("");
			$("#field0021_span").val("");
		}
	};

	/**
	 * 校验接入号
	 */
	BGLT.prototype.validateAccNum = function(){
		if($("#field0187").is(":checked")){

			var addAccessNum = $("#field0108").val();
			var delAccessNum = $("#field0111").val();
			//平台接入号附件
			var attachment = $("#field0021_span").children(":first").next();
			var attachmentChilds = attachment.children();
			if(addAccessNum != ''){
				if(!_bglt.until_valiPhoneNum(addAccessNum)){
					alert("【平台接入号】接入号码必须为为5-16为数字");
					$("#field0108").focus();
					return false;
				}
			}
			if(delAccessNum!=""){
				if(!_bglt.until_valiPhoneNum(delAccessNum)){
					alert("【平台接入号】接入号码必须为为5-16为数字");
					$("#field0111").focus();
					return false;
				}
			}
			if(addAccessNum == '' && delAccessNum == '' && attachmentChilds.length == 0) {
				alert("【平台接入号】必须填写一项");
				$("#field0111").focus();
				return false;
			}
			if((addAccessNum != ''|| delAccessNum!="") && attachmentChilds.length != 0){
				alert("【平台接入号】填写接入号与上传附件只能选择一项");
				$("#field0111").focus();
				return false;
			}
		}
		return true;
	};


	/**
	 * 坐席电话
	 */
	BGLT.prototype.initAgentNum = function(){
		if($("#field0190").is(":checked")){
			$("#field0114").attr("disabled",false);
			$("#field0120").attr("disabled",false);
			$("#field0022_span").attr("disabled",false);
			$("#field0114").css('background','#FCDD8B');
			$("#field0120").css('background','#FCDD8B');
			$("#field0022_span").css('background','#FCDD8B');
		}else{
			$("#field0114").attr("disabled",true);
			$("#field0120").attr("disabled",true);
			$("#field0022_span").attr("disabled",true);
			$("#field0114").css('background','');
			$("#field0120").css('background','');
			$("#field0022_span").css('background','');

			$("#field0114").val('');
			$("#field0120").val('');
			$("#field0022_span").val('');
		}
	};

	/**
	 * 校验坐席电话
	 */
	BGLT.prototype.validateAgentNum = function(){
		if($("#field0190").is(":checked")){
			if(!($("#field0105").is(":checked")||$("#field0106").is(":checked"))){
				alert("【坐席电话】必须选择坐席电话中一个选项");
				return false;
			}
			var addAgentNum = $("#field0114").val();
			var delAgentNum = $("#field0120").val();
			//填写坐席号码不能超过70字符  与上传附件不能同时填写
			if(addAgentNum != "" && addAgentNum.length > 70 ){
				alert("【坐席电话】增加坐席号码不能超多70个字符");
				return false;
			}
			if(delAgentNum != "" && delAgentNum.length > 70 ){
				alert("【坐席电话】减少坐席号码不能超多70个字符");
				return false;
			}
			//坐席号码附件
			var agentTel = $("#field0022_span").children(":first").next();
			var agentTelChilds = agentTel.children();
			if(agentTelChilds.length !=0 && (addAgentNum != ""||delAgentNum !="") ){
				alert("【坐席电话】坐席电话和附件不能同时输入");
				return false;
			}
			return true;
		}
		return true;
	};

	/**
	 * 外显号码
	 */
	BGLT.prototype.initOutNum = function(){
		if($("#field0191").is(":checked")){
			$("#field0123").attr("disabled",false);
			$("#field0126").attr("disabled",false);
			$("#field0028_span").attr("disabled",false);
			$("#field0123").css('background','#FCDD8B');
			$("#field0126").css('background','#FCDD8B');
			$("#field0028_span").css('background','#FCDD8B');
		}else{
			$("#field0123").attr("disabled",true);
			$("#field0126").attr("disabled",true);
			$("#field0028_span").attr("disabled",true);
			$("#field0123").css('background','');
			$("#field0126").css('background','');
			$("#field0028_span").css('background','');

			$("#field0123").val('');
			$("#field0126").val('');
			$("#field0028_span").val('');
		}
	};
	/**
	 * 校验外显号码
	 */
	BGLT.prototype.validateOutNum = function(){
		if($("#field0191").is(":checked")){
			//外显文本框
			var addOutNum = $("#field0123").val();
			var delOutNum = $("#field0126").val();


			var isPhoneNum = (addOutNum=='')?true:_bglt.until_valiPhoneNum(addOutNum);
			isPhoneNum = isPhoneNum && ((delOutNum=='')?true:_bglt.until_valiPhoneNum(delOutNum));

			if(!isPhoneNum){
				alert("【外显号码】电话格式不正确，请重新填写。");
				$("#field0126").focus();
				return false;
			}
			//外显附件
			var attachment = $("#field0028_span").children(":first").next();
			var attachmentChilds = attachment.children();
			//外显号与附件不能同时存在
			if((addOutNum != '' || delOutNum != '') && attachmentChilds.length!=0){
				alert("【外显号码】外显号码及附件不能同时上传，请选择其中一项后再次上传！");
				return false;
			}
			return true;
		}
		return true;
	};

	/**
	 * 服务资费中的数量变更
	 */
	BGLT.prototype.initFWZFNum = function(){
		if($("#field0188").is(":checked")){
			$("input[name=field0129]").attr("disabled",false);
			$("input[name=field0130]").attr("disabled",false);
			$("input[name=field0131]").attr("disabled",false);
			$("input[name=field0132]").attr("disabled",false);
			$("input[name=field0133]").attr("disabled",false);
			$("input[name=field0134]").attr("disabled",false);
			$("input[name=field0135]").attr("disabled",false);
			$("#field0136").attr("disabled",false);
			$("#field0137").attr("disabled",false);
			$("#field0138").attr("disabled",false);
			$("#field0139").attr("disabled",false);
			$("#field0140").attr("disabled",false);
			$("#field0141").attr("disabled",false);
			$("#field0142").attr("disabled",false);

			$("#field0136").css('background','#FCDD8B');
			$("#field0137").css('background','#FCDD8B');
			$("#field0138").css('background','#FCDD8B');
			$("#field0139").css('background','#FCDD8B');
			$("#field0140").css('background','#FCDD8B');
			$("#field0141").css('background','#FCDD8B');
			$("#field0142").css('background','#FCDD8B');
		}else{
			$("input[name=field0129]").attr("disabled",true);
			$("input[name=field0130]").attr("disabled",true);
			$("input[name=field0131]").attr("disabled",true);
			$("input[name=field0132]").attr("disabled",true);
			$("input[name=field0133]").attr("disabled",true);
			$("input[name=field0134]").attr("disabled",true);
			$("input[name=field0135]").attr("disabled",true);

			$("#field0136").attr("disabled",true);
			$("#field0137").attr("disabled",true);
			$("#field0138").attr("disabled",true);
			$("#field0139").attr("disabled",true);
			$("#field0140").attr("disabled",true);
			$("#field0141").attr("disabled",true);
			$("#field0142").attr("disabled",true);

			$("#field0136").css('background','');
			$("#field0137").css('background','');
			$("#field0138").css('background','');
			$("#field0139").css('background','');
			$("#field0140").css('background','');
			$("#field0141").css('background','');
			$("#field0142").css('background','');

			$("#field0136").val('');
			$("#field0137").val('');
			$("#field0138").val('');
			$("#field0139").val('');
			$("#field0140").val('');
			$("#field0141").val('');
			$("#field0142").val('');
		}
	};

	/**
	 * 数量校验  所有的数量一组必填（勾选了数量变更）
	 *
	 */
	BGLT.prototype.validateNum = function(){
		if($("#field0188").is(":checked")){
			var ivr = $("input[name=field0129]").is(":checked");
			var tts = $("input[name=field0130]").is(":checked");
			var zdwb = $("input[name=field0131]").is(":checked");
			var yzd = $("input[name=field0132]").is(":checked");
			var tjfx = $("input[name=field0133]").is(":checked");
			var zxly = $("input[name=field0134]").is(":checked");
			var wzd = $("input[name=field0135]").is(":checked");

			var ivrVal= $("#field0136").val();
			var ttsVal= $("#field0137").val();
			var zdwbVal =$("#field0138").val();
			var yzdVal= $("#field0139").val();
			var tjfxVal =$("#field0140").val();
			var zxlyVal =$("#field0141").val();
			var wzdVal= $("#field0142").val();

			if(!(ivr||tts||zdwb||yzd||tjfx||zxly||wzd)){
				alert("【服务资费信息】变动类型单选框最少填写一个");
				return false;
			}

			if(ivrVal == "" &&ttsVal == "" &&zdwbVal == "" &&yzdVal == ""
				&&tjfxVal == "" &&zxlyVal == "" &&wzdVal== ""){
				alert("【服务资费信息】变更数量列最少填写一个");
				return false;
			}
			var ivrTest = (ivr&& ivrVal !="") || (!ivr&&ivrVal == "");
			var ttsTest = (tts&& ttsVal !="") || (!tts&&ttsVal == "");
			var zdwbTest = (zdwb&& zdwbVal !="") || (!zdwb&&zdwbVal == "");
			var yzdTest = (yzd&& yzdVal !="") || (!yzd&&yzdVal == "");
			var tjfxTest = (tjfx&& tjfxVal !="") || (!tjfx&&tjfxVal == "");
			var zxlyTest = (zxly&& zxlyVal !="") || (!zxly&&zxlyVal == "");
			var wzdTest = (wzd&& wzdVal !="") || (!wzd&&wzdVal == "");
			if(!ivrTest){
				alert("【服务资费信息】选择ivr变动类型和填写变更数量必须同时填写或同时不填写");
				return false;
			}
			if(!ttsTest){
				alert("【服务资费信息】选择tts变动类型和填写变更数量必须同时填写或同时不填写");
				return false;
			}
			if(!zdwbTest){
				alert("【服务资费信息】选择自动外拨变动类型和填写变更数量必须同时填写或同时不填写");
				return false;
			}
			if(!yzdTest){
				alert("【服务资费信息】选择有终端变动类型和填写变更数量必须同时填写或同时不填写");
				return false;
			}
			if(!tjfxTest){
				alert("【服务资费信息】选择统计分析变动类型和填写变更数量必须同时填写或同时不填写");
				return false;
			}
			if(!zxlyTest){
				alert("【服务资费信息】选择坐席录音变动类型和填写变更数量必须同时填写或同时不填写");
				return false;
			}
			if(!wzdTest){
				alert("【服务资费信息】选择无终端变动类型和填写变更数量必须同时填写或同时不填写");
				return false;
			}
			return true;
		}
		return true;
	};


	/**
	 * 服务资费中的服务类型和单价
	 */
	BGLT.prototype.initFWZFType = function(){
		if($("#field0192").is(":checked")){
			$("input[name=field0049]").attr("disabled",false);
			$("input[name=field0050]").attr("disabled",false);
			$("input[name=field0051]").attr("disabled",false);
			$("input[name=field0052]").attr("disabled",false);
			$("input[name=field0053]").attr("disabled",false);
			$("input[name=field0054]").attr("disabled",false);
			$("input[name=field0055]").attr("disabled",false);

			$("#field0057").attr("disabled",false);
			$("#field0058").attr("disabled",false);
			$("#field0059").attr("disabled",false);
			$("#field0061").attr("disabled",false);
			$("#field0062").attr("disabled",false);
			$("#field0063").attr("disabled",false);
			$("#field0064").attr("disabled",false);

			$("#field0057").css('background','#FCDD8B');
			$("#field0058").css('background','#FCDD8B');
			$("#field0059").css('background','#FCDD8B');
			$("#field0061").css('background','#FCDD8B');
			$("#field0062").css('background','#FCDD8B');
			$("#field0063").css('background','#FCDD8B');
			$("#field0064").css('background','#FCDD8B');
		}else{
			$("input[name=field0049]").attr("disabled",true);
			$("input[name=field0050]").attr("disabled",true);
			$("input[name=field0051]").attr("disabled",true);
			$("input[name=field0052]").attr("disabled",true);
			$("input[name=field0053]").attr("disabled",true);
			$("input[name=field0054]").attr("disabled",true);
			$("input[name=field0055]").attr("disabled",true);

			$("#field0057").attr("disabled",true);
			$("#field0058").attr("disabled",true);
			$("#field0059").attr("disabled",true);
			$("#field0061").attr("disabled",true);
			$("#field0062").attr("disabled",true);
			$("#field0063").attr("disabled",true);
			$("#field0064").attr("disabled",true);

			$("#field0057").css('background','');
			$("#field0058").css('background','');
			$("#field0059").css('background','');
			$("#field0061").css('background','');
			$("#field0062").css('background','');
			$("#field0063").css('background','');
			$("#field0064").css('background','');

			$("#field0057").val('');
			$("#field0058").val('');
			$("#field0059").val('');
			$("#field0061").val('');
			$("#field0062").val('');
			$("#field0063").val('');
			$("#field0064").val('');
		}
	};

	/**
	 * 校验服务资费中的服务类型和单价
	 */
	BGLT.prototype.validateType = function(){
		if($("#field0192").is(":checked")){
			var ivr = $("input[name=field0049]").is(":checked");
			var tts = $("input[name=field0050]").is(":checked");
			var zdwb =$("input[name=field0051]").is(":checked");
			var yzd = $("input[name=field0052]").is(":checked");
			var tjfx =$("input[name=field0053]").is(":checked");
			var zxly =$("input[name=field0054]").is(":checked");
			var wzd = $("input[name=field0055]").is(":checked");

			var ivrVal= $("#field0049").val();
			var ttsVal= $("#field0050").val();
			var zdwbVal =$("#field0051").val();
			var yzdVal= $("#field0052").val();
			var tjfxVal =$("#field0053").val();
			var zxlyVal =$("#field0054").val();
			var wzdVal= $("#field0055").val();

			if(!(ivr||tts||zdwb||yzd||tjfx||zxly||wzd)){
				alert("【服务资费信息】服务类型单选框最少填写一个");
				return false;
			}

			if(ivrVal == "" &&ttsVal == "" &&zdwbVal == "" &&yzdVal == ""
				&&tjfxVal == "" &&zxlyVal == "" &&wzdVal== ""){
				alert("【服务资费信息】折扣后单价列最少填写一个");
				return false;
			}
			var ivrTest = (ivr&& ivrVal !="") || (!ivr&&ivrVal == "");
			var ttsTest = (tts&& ttsVal !="") || (!tts&&ttsVal == "");
			var zdwbTest = (zdwb&& zdwbVal !="") || (!zdwb&&zdwbVal == "");
			var yzdTest = (yzd&& yzdVal !="") || (!yzd&&yzdVal == "");
			var tjfxTest = (tjfx&& tjfxVal !="") || (!tjfx&&tjfxVal == "");
			var zxlyTest = (zxly&& zxlyVal !="") || (!zxly&&zxlyVal == "");
			var wzdTest = (wzd&& wzdVal !="") || (!wzd&&wzdVal == "");
			if(!ivrTest){
				alert("【服务资费信息】选择ivr服务类型和填写折扣后单价必须同时填写或同时不填写");
				return false;
			}
			if(!ttsTest){
				alert("【服务资费信息】选择tts服务类型和填写折扣后单价必须同时填写或同时不填写");
				return false;
			}
			if(!zdwbTest){
				alert("【服务资费信息】选择自动外拨服务类型和填写折扣后单价必须同时填写或同时不填写");
				return false;
			}
			if(!yzdTest){
				alert("【服务资费信息】选择有终端服务类型和填写折扣后单价必须同时填写或同时不填写");
				return false;
			}
			if(!tjfxTest){
				alert("【服务资费信息】选择统计分析服务类型和填写折扣后单价必须同时填写或同时不填写");
				return false;
			}
			if(!zxlyTest){
				alert("【服务资费信息】选择坐席录音服务类型和填写折扣后单价必须同时填写或同时不填写");
				return false;
			}
			if(!wzdTest){
				alert("【服务资费信息】选择无终端服务类型和填写折扣后单价必须同时填写或同时不填写");
				return false;
			}
			return true;
		}
		return true;
	};

    /**
     *校验所有的其他选择选项中的文本是否填写
     */
    BGLT.prototype.validateOtherText =function(){
        var value = $("input[name=field0034]:checked").attr("value");
        if(value != null){
            if(value == "3288302870514713075"){//其他
                if($("#field0036").val() == ""){
                    alert("【业务系统】请填写业务系统类型中的其他");
                    return false;
                }
            }
        }
        //有终端其它
        var value1 = $("input[name=field0038]:checked").attr("value");
        if(value1 != null){
            if (value1 == "-1122618658103079534") {//其他
                if($("#field0040").val() == ""){
                    alert("【有终端】请填写有终端中的其他");
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * 终端需求
     * @returns {boolean}
     */
    BGLT.prototype.validateZdxq = function(){
        if($("#field0036").is(":checked")){
            if($("input[name=field0038]").is(":checked")){
                alert("【终端需求】选择了有终端，必须选择有终端的具体选项");
                return false;
            }
            return true;
        }
      return true;
    };

    /**
     * 话费资费
     */
    BGLT.prototype.initHFZF = function(){

        if($("#field0196").is(":checked")){
			$("input[name=field0076]").attr("disabled", false);
			$("input[name=field0077]").attr("disabled", false);
			var jf = $("input[name=field0077]:checked").attr("value");
			if(typeof (jf) !="undefined" && jf!=""&&jf == "-1244957151022398219"){
            	$("#field0078").attr("disabled",false);//通话资费
            	$("#field0088").attr("disabled",false);//含多少分钟
            	$("#field0107").attr("disabled",false);//含多少分钟
            	$("input[name=field0079]").attr("disabled",false);//整体优惠 平均每坐席
            	$("#field0080").attr("disabled",false);//超出部分按照

            	$("#field0081").attr("disabled",false);
            	$("#field0082").attr("disabled",false);
            	$("#field0083").attr("disabled",false);
            	$("#field0084").attr("disabled",false);
            	$("#field0085").attr("disabled",false);
            	$("#field0086").attr("disabled",false);

            	$("#field0078").css('background','#FCDD8B');//通话资费
            	$("#field0088").css('background','#FCDD8B');//含多少分钟
            	$("#field0107").css('background','#FCDD8B');//含多少分钟
            	$("#field0080").css('background','#FCDD8B');//超出部分按照
       	 	}else {
				$("#field0078").attr("disabled", true);//通话资费
				$("#field0088").attr("disabled", true);//含多少分钟
				$("#field0107").attr("disabled", true);//含多少分钟
				$("input[name=field0079]").attr("disabled", true);//整体优惠 平均每坐席
				$("#field0080").attr("disabled", true);//超出部分按照

				$("#field0081").attr("disabled", true);
				$("#field0082").attr("disabled", true);
				$("#field0083").attr("disabled", true);
				$("#field0084").attr("disabled", true);
				$("#field0085").attr("disabled", true);
				$("#field0086").attr("disabled", true);

				$("#field0078").css('background', '');//通话资费
				$("#field0088").css('background', '');//含多少分钟
				$("#field0107").css('background', '');//含多少分钟
				$("#field0080").css('background', '');//超出部分按照

				$("#field0078").val('');//通话资费
				$("#field0088").val('');//含多少分钟
				$("#field0107").val('');//含多少分钟
				$("#field0080").val('');//超出部分按照
			}
        }else{
			$("input[name=field0076]").attr("disabled", true);
			$("input[name=field0077]").attr("disabled", true);
		}
    };

    /**
     * 校验话费资费
     */
    BGLT.prototype.validateHFZF = function(){
        if($("#field0196").is(":checked")){
			var jf = $("input[name=field0077]:checked").attr("value");
			if(typeof (jf) !="undefined" && jf!=""&&jf == "-1244957151022398219") {
				var thzf = $("#field0078");//通话资费
				var han = $("#field0088");//含多少分钟
				var yuan = $("#field0107");//含多少分钟
				var ztyh = $("input[name=field0079]:checked");//整体优惠 平均每坐席
				var chaochu = $("#field0080");//超出部分按照


				var group1 = thzf.val() == "";
				//有一个不为空
				var group2 = han.val() != "" || yuan.val() != ""||typeof(ztyh.val()) != "undefined" ||chaochu.val() != "";
				//有一个为空
				var group2_1= han.val() == "" || yuan.val() == ""||typeof(ztyh.val()) == "undefined" ||chaochu.val() == "";
				//全部为空
				var group2_2 = han.val() == ""&& yuan.val() == "" && typeof(ztyh.val()) == "undefined" &&chaochu.val() == "";
				//一组必填，两个都不填写
				/*if(group1 && group2_2){
					alert("【定制化资费】请填写定制化资费");
					return false;
				}*/
				//两个同时填写
				if(!group1 && group2){
					alert("【定制化资费】通话资费和其余行不能同时填写");
					return false;
				}
				//校验group2是否全部填写
				//没填写group1
				if(group1 && group2_1 && group2){
					alert("【定制化资费】除了通话资费的其余行需要全部填写");
					return false;
				}


				var ivrsh = $("#field0081");
				var ivrct = $("#field0082");
				var zxsh = $("#field0083");
				var zxct = $("#field0084");
				var whsh = $("#field0085");
				var whct = $("#field0086");

				var check = group1 && group2_2;
				 check =  check && (!ivrsh.is(":checked") && !ivrct.is(":checked") && !zxsh.is(":checked") && !zxct.is(":checked") && !whsh.is(":checked") && !whct.is(":checked"));

				if (check) {
					alert("【定制化资费】选择话费资费变更，至少填写定制化资费里的一项");
					return false;
				}
			}
        }
        return true;
    };


/*    /!**
     *验证定制化资费，填写其中一个内容，必须全部全部填写（一组非必填）
     *!/
    BGLT.prototype.validate_dzhzf = function(){
        var thzf = $("#field0078");//通话资费
        var han = $("#field0088");//含多少分钟
        var yuan = $("#field0107");//含多少分钟
        var ztyh = $("input[name=field0079]:checked");//整体优惠 平均每坐席
        var chaochu = $("#field0080");//超出部分按照

        if(thzf.val() != "" || han.val() != "" || yuan.val() != "" || typeof(ztyh.val()) != "undefined" || chaochu.val() != ""){
            if(!(thzf.val() != "" && han.val() != ""&& yuan.val() != "" && typeof(ztyh.val()) != "undefined" && chaochu.val() != "")){
                alert("【定制化资费】定制化资费中如果填写一项，就得全部填写");
                thzf.focus();
                return false;
            }
        }
        return true;
    };

    /!**
     * 通话资费
     * @returns {boolean}
     *!/
    BGLT.prototype.validate_thzf = function(){
        var ivrsh = $("#field0081");
        var ivrct = $("#field0082");
        var zxsh = $("#field0083");
        var zxct = $("#field0084");
        var whsh = $("#field0085");
        var whct = $("#field0086");
        if(!ivrsh.is(":checked")&&!ivrct.is(":checked")&&!zxsh.is(":checked")&&!zxct.is(":checked")&&!whsh.is(":checked")&&!whct.is(":checked")){
            alert("【通话资费】至少选择一个");
            ivrsh.focus();
            return false;
        }
        return true;
    };*/

	/**
	 * 初始化客户名称
	 */
	BGLT.prototype.initName = function(){

		var check = $("#field0186").is(":checked");

		if(check){
			$("#field0009").attr("disabled",false);
			$("#field0009").css('background','#FCDD8B');
		}else{
			$("#field0009").attr("disabled",true);
			$("#field0009").css('background','');
			//$("#field0012").html("");
		}
	};
	/**
	 * 校验客户名称
	 */
	BGLT.prototype.validateName = function(){
		var check = $("#field0186").is(":checked");

		if(check){
			if($("#field0009").val() == ""){
				alert("【企业名称】请填写企业名称");
				$("#field0009").focus();
				return false;
			}
		}
		return true;
	};

	/**
	 * 初始化计费时间
	 */
	BGLT.prototype.initJFSj = function(){
		var check = $("#field0196").is(":checked");
		check = check || ($("#field0185_txt").val() !="");

		if(check){
			$("#field0104").attr("disabled",false);
			$("#field0104").css('background','#FCDD8B');
		}else{
			$("#field0104").attr("disabled",true);
			$("#field0104").css('background','');
		}
	};
	/**
	 * 校验计费时间
	 */
	BGLT.prototype.validateJFSj = function(){
		var check = $("#field0196").is(":checked");
		check = check || ($("#field0185_txt").val() !="");

		if(check){
			if($("#field0104").val() == ""){
				alert("【操作日期】请填写操作时间");
				return false;
			}else{
				var userTime = $("#field0104").val();
				if(!_bglt.until_valiTime(userTime)){
					alert("【操作日期】操作日期格式不正确");
					return false;
				}
				var arys= userTime.split('-');
				var month = arys[1]-1;
				var d = new Date(arys[0],month, arys[2]).format("yyyy-MM-dd");
				var curDate=new Date().format("yyyy-MM-dd");
				if(d < curDate){
					alert("【操作日期】操作日期不能小于当前日期");
					return false;
				}
			}
			return true;
		}
		return true;
	};

	/**
	 * 设置所有单选 点击选中再点击取消
	 */
	BGLT.prototype.radiocheck = function () {
		$(":radio").each(function () {
			/*if ($(this).val() != -5951425570627761360 && $(this).val() != 6193382351362802577
				&& $(this).val() != 7221839946071951327 && $(this).val() != 3288302870514713075
				&& $(this).val() != 8254392202341730514 && $(this).val() != -4305093821079142156
				&& $(this).val() != -7530274332352494683 && $(this).val() != -1122618658103079534
			) {*/
				$(this).attr('cs', false);

				$(this).click(function (arg1) {
					var _name = $(this).attr('name');

					if ($(this).attr('cs') == 'true') {
						$(this).attr('cs', 'false');
						$(this).attr('checked',false);
					} else {
						$("input[name=" + _name + "]").each(function () {
							$(this).attr('cs', 'false');
						});

						$(this).attr('checked', 'checked');
						$(this).attr('cs', 'true');
					}
				});
			//}

		});
	};

	/**
	 * 业务系统类型联动关系
	 * 选择其他 _后面不能填写
	 *
	 */
	BGLT.prototype.ywxt = function(){
		var value = $("input[name=field0034]:checked").attr("value");
		if(value == "3288302870514713075"){//其他
			$("#field0035").attr("disabled",false);
			$("#field0035").css('background','#FCDD8B');
		}else{
			$("#field0035").val("");
			$("#field0035").attr("disabled",true);
			$("#field0035").css('background','');
		}
	};

	/**
	 * 终端需求联动关系
	 * 有终端中 选择其他 _后面不能填写
	 */
	BGLT.prototype.zdxq = function(){
		var value = $("input[name=field0038]:checked").attr("value");
		if (value == "-1122618658103079534") {//其他
			$("#field0039").attr("disabled", false);
			$("#field0039").css('background','#FCDD8B');
		} else {
			$("#field0039").val("");
			$("#field0039").attr("disabled", true);
			$("#field0039").css('background','');
		}
		if( $("input[name=field0038]").is(":checked")){
            $("#field0036").attr("checked",true);
        }else{
            $("#field0036").attr("checked",false);
        }
	};

	BGLT.prototype.jfms = function(){
		var jf = $("input[name=field0077]:checked").attr("value");
		if(jf == "-1244957151022398219"){
			$("#field0078").attr("disabled",false);
			$("#field0107").attr("disabled",false);
			$("#field0088").attr("disabled",false);
			$("#field0080").attr("disabled",false);
			$("#field0081").attr("disabled",false);
			$("#field0082").attr("disabled",false);
			$("#field0083").attr("disabled",false);
			$("#field0084").attr("disabled",false);
			$("#field0085").attr("disabled",false);
			$("#field0086").attr("disabled",false);
			$("input[name=field0079]").attr("disabled",false);
		}else{
			$("#field0078").attr("disabled",true);
			$("#field0107").attr("disabled",true);
			$("#field0088").attr("disabled",true);
			$("#field0080").attr("disabled",true);
			$("#field0081").attr("disabled",true);
			$("#field0082").attr("disabled",true);
			$("#field0083").attr("disabled",true);
			$("#field0084").attr("disabled",true);
			$("#field0085").attr("disabled",true);
			$("#field0086").attr("disabled",true);
			$("input[name=field0079]").attr("disabled",true);
		}
	};

	BGLT.prototype.elements = {
		"field0004":{id : "field0004",	type : "text",		name : "要求完成时间",initDisable:true},
		"field0108":{id : "field0108",	type : "text",		name : "平台接入号增加",initDisable:true},
		"field0111":{id : "field0111",	type : "text",		name : "平台接入号减少",initDisable:true},
		"field0021_span":{id : "field0021_span",	type : "span",		name : "平台接入号附件",initDisable:true},
		"field0114":{id : "field0114",	type : "text",		name : "坐席电话增加",initDisable:true},
		"field0120":{id : "field0120",	type : "text",		name : "坐席电话减少",initDisable:true},
		"field0022_span":{id : "field0022_span",	type : "span",		name : "坐席电话上传附件",initDisable:true},
		"field0123":{id : "field0123",	type : "text",		name : "外显号增加",initDisable:true},
		"field0126":{id : "field0126",	type : "text",		name : "外显号减少",initDisable:true},
		"field0028_span":{id : "field0028_span",	type : "span",		name : "上传外显号附件",initDisable:true},
		"field0023":{id : "field0023",	type : "text",		name : "呼入市话",initDisable:true},
		"field0024":{id : "field0024",	type : "text",		name : "呼出市话",initDisable:true},
		"field0025":{id : "field0025",	type : "text",		name : "呼入长途",initDisable:true},
		"field0026":{id : "field0026",	type : "text",		name : "呼出长途",initDisable:true},
		"field0027":{id : "field0027",	type : "text",		name : "应用服务费",initDisable:true},
		"field0129":{id : "field0129",	type : "radio",		name : "IVR增加",initDisable:true},
		"field0129":{id : "field0129",	type : "radio",		name : "IVR减少",initDisable:true},
		"field0049":{id : "field0049",	type : "radio",		name : "IVR单个服务",initDisable:true},
		"field0049":{id : "field0049",	type : "radio",		name : "IVR服务合计",initDisable:true},
		"field0130":{id : "field0130",	type : "radio",		name : "TTS增加",initDisable:true},
		"field0130":{id : "field0130",	type : "radio",		name : "TTS减少",initDisable:true},
		"field0050":{id : "field0050",	type : "radio",		name : "TTS单个服务",initDisable:true},
		"field0050":{id : "field0050",	type : "radio",		name : "TTS服务合计",initDisable:true},
		"field0131":{id : "field0131",	type : "radio",		name : "自动外拨增加",initDisable:true},
		"field0131":{id : "field0131",	type : "radio",		name : "自动外拨减少",initDisable:true},
		"field0051":{id : "field0051",	type : "radio",		name : "自动外拨单个服务",initDisable:true},
		"field0051":{id : "field0051",	type : "radio",		name : "自动外拨服务合计",initDisable:true},
		"field0132":{id : "field0132",	type : "radio",		name : "有终端坐席增加",initDisable:true},
		"field0132":{id : "field0132",	type : "radio",		name : "有终端坐席减少",initDisable:true},
		"field0052":{id : "field0052",	type : "radio",		name : "有终端坐席单个服务",initDisable:true},
		"field0052":{id : "field0052",	type : "radio",		name : "有终端坐席服务合计",initDisable:true},
		"field0133":{id : "field0133",	type : "radio",		name : "统计分析增加",initDisable:true},
		"field0133":{id : "field0133",	type : "radio",		name : "统计分析减少",initDisable:true},
		"field0053":{id : "field0053",	type : "radio",		name : "统计分析单个服务",initDisable:true},
		"field0053":{id : "field0053",	type : "radio",		name : "统计分析服务合计",initDisable:true},
		"field0134":{id : "field0134",	type : "radio",		name : "坐席录音增加",initDisable:true},
		"field0134":{id : "field0134",	type : "radio",		name : "坐席录音减少",initDisable:true},
		"field0054":{id : "field0054",	type : "radio",		name : "坐席录音单个服务",initDisable:true},
		"field0054":{id : "field0054",	type : "radio",		name : "坐席录音服务合计",initDisable:true},
		"field0135":{id : "field0135",	type : "radio",		name : "无终端增加",initDisable:true},
		"field0135":{id : "field0135",	type : "radio",		name : "无终端减少",initDisable:true},
		"field0055":{id : "field0055",	type : "radio",		name : "无终端单个服务",initDisable:true},
		"field0055":{id : "field0055",	type : "radio",		name : "无终端服务合计",initDisable:true},
		"field0136":{id : "field0136",	type : "text",		name : "IVR变更数量",initDisable:true},
		"field0137":{id : "field0137",	type : "text",		name : "TTS变更数量",initDisable:true},
		"field0138":{id : "field0138",	type : "text",		name : "自动外拨变更数量",initDisable:true},
		"field0139":{id : "field0139",	type : "text",		name : "有终端坐席变更数量",initDisable:true},
		"field0140":{id : "field0140",	type : "text",		name : "统计分析变更数量",initDisable:true},
		"field0141":{id : "field0141",	type : "text",		name : "坐席录音变更数量",initDisable:true},
		"field0142":{id : "field0142",	type : "text",		name : "无终端变更数量",initDisable:true},
		"field0035":{id : "field0035",	type : "text",		name : "业务系统类型其他文本框",initDisable:true},
		"field0039":{id : "field0039",	type : "text",		name : "终端需求-其他文本框",initDisable:true},

		"field0057":{id : "field0057",	type : "text",		name : "IVR单价",initDisable:true},
		"field0058":{id : "field0058",	type : "text",		name : "TTS单价",initDisable:true},
		"field0059":{id : "field0059",	type : "text",		name : "自动外拨单价",initDisable:true},
		"field0061":{id : "field0061",	type : "text",		name : "有终端坐席单价",initDisable:true},
		"field0062":{id : "field0062",	type : "text",		name : "统计分析单价",initDisable:true},
		"field0063":{id : "field0063",	type : "text",		name : "坐席录音单价",initDisable:true},
		"field0064":{id : "field0064",	type : "text",		name : "无终端单价",initDisable:true},
		"field0034":{id : "field0034",	type : "radio",		name : "业务系统按钮"},
		"field0038":{id : "field0038",	type : "radio",		name : "终端需求"},
		"field0077":{id : "field0077",	type : "radio",		name : "计费模式"}
	};

	/*事件注册*/
	BGLT.prototype.events = {
		"field0034":{event:"click",func:"ywxt"},
		"field0038":{event:"click",func:"zdxq"},
		//"field0077":{event:"click",func:"jfms"}
	};

	/** **************工具函数********************** */
	BGLT.prototype.until_valiPhoneNum = function(tel) {
		var isPhoneNum = false;
		// 手机正则表达式
		var mp_reg = /^\d{5,16}$/;
		if (mp_reg.test(tel)) {
			isPhoneNum = true;
		}
		return isPhoneNum;
	};
	BGLT.prototype.until_valiJfNum = function(tel) { // 缴费号码
		var isPhoneNum = false;
		// 手机正则表达式
		var mp_reg = /^\d{10,14}$/;
		if (mp_reg.test(tel)) {
			isPhoneNum = true;
		}
		return isPhoneNum;
	};

	BGLT.prototype.until_valiTime = function(tel) {//校验时间格式
		var isTime = false;
		// 手机正则表达式
		var mp_reg = /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])$/;
		if (mp_reg.test(tel)) {
			isTime = true;
		}
		return isTime;
	};
}
