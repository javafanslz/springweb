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
		}
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
		}
	};


	/**
	 * 设置所有单选 点击选中再点击取消
	 */
	BGLT.prototype.radiocheck = function () {
		$(":radio").each(function () {
			if ($(this).val() != -5951425570627761360 && $(this).val() != 6193382351362802577
				&& $(this).val() != 7221839946071951327 && $(this).val() != 3288302870514713075
				&& $(this).val() != 8254392202341730514 && $(this).val() != -4305093821079142156
				&& $(this).val() != -7530274332352494683 && $(this).val() != -1122618658103079534
			) {
				$(this).attr('cs', false);

				$(this).click(function (arg1) {
					var _name = $(this).attr('name');

					if ($(this).attr('cs') == 'true') {
						$(this).attr('cs', 'false');
						$(this).removeAttr('checked');
					} else {
						$("input[name=" + _name + "]").each(function () {
							$(this).attr('cs', 'false');
						});

						$(this).attr('checked', 'checked');
						$(this).attr('cs', 'true');
					}
				});
			}

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
		"field0038":{id : "field0038",	type : "radio",		name : "终端需求"}
	};

	/*事件注册*/
	BGLT.prototype.events = {
		"field0034":{event:"click",func:"ywxt"},
		"field0038":{event:"click",func:"zdxq"}
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
}
