$(document).ready(function() {
	try {
		var title = $("#subject").val();
		if (title && title.indexOf("上线计费工单-直签") != -1) {
			var jfzq = new JFZQ();
			qnObjs.jfzq = jfzq;
			jfzq.initPage(jfzq);
		}
	} catch (e) {
	}
});

/**
 * 上线计费工单对象
 */
function JFZQ() {
	var _jfzq = this;
	
	// 初始化页面的方法
	JFZQ.prototype.initPage = function(pageType) {
		try{
			this.initTrObjs();
			this.initCss();
			this.initDisableComps();
			this.bindEvent();
			this.eventMouseSSPTTR();
			this.radiocheck();
		}catch(e){
		}
	};
	// 绑定事件
	JFZQ.prototype.bindEvent = function() {
		$.each(_jfzq.events,function(key,val){
			if(_jfzq.elements[key].type=="radio" || _jfzq.elements[key].type=="checkbox"){
				var elem = eval($('input[name='+key+']'));
				//var func = eval("_jfzq.constructor.prototype."+val.func);
				elem.each(function(){
					var func = eval("_jfzq.constructor.prototype."+val.func);
					$(this).bind(val.event,func);
				});
			}else{
				var elem = eval("$(\"#" + key + "\")");
				var func = eval("_jfzq.constructor.prototype."+val.func);
				elem.bind(val.event,func);
			}
		});
	};
	
	JFZQ.prototype.validate = function() {
		//平台类型
		if(!_jfzq.validate_ptlx()){
			return false;
		}
		//坐席电话
		if(!_jfzq.validateAgentTel()){
			return false;
		}
		//外显号码
		if(!_jfzq.validateOutNum()){
			return false;
		}
		//缴费号码
		if(!_jfzq.validate_JFnumber()){
			return false;
		}
		//终端需求校验
		if(!_jfzq.validateZD()){
			return false;
		}
		//选择其他之后的文本框校验
		if(!_jfzq.validateOtherText()){
			return false;
		}
		//服务资费
		if(!_jfzq.validate_fwzf()){
			return false;
		}
		//通话资费
		if(!_jfzq.validate_thzf()){
			return false;
		}
		//定制化资费
		if(!_jfzq.validate_dzhzf()){
			return false;
		}
		//联通上传邮件
		if(!_jfzq.validate_YQEmail()){
			return false;
		}

	};

	//所属平台行
	JFZQ.prototype.eventMouseSSPTTR = function(){
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
		});
		shptr.keypress(function(){
			if($("#field0016").text()=="未验收平台"){
				$("#field0017").attr("disabled",false);
			}else{
				$("#field0017").attr("disabled",true);
			}
		});

	};

	JFZQ.prototype.test = function(a) {
		
	};
	
	JFZQ.prototype.initTrObjs = function() {
		$("#field0155").css('background','#FCDD8B');//ivr现有数量
		$("#field0157").css('background','#FCDD8B');//自动外拨已有试用数量
		$("#field0161").css('background','#FCDD8B');//坐席(无终端)含录音及报表现有试用数量
		$("#field0069").css('background','#FCDD8B');//自动语音服务基本服务费折扣单价
		$("#field0073").css('background','#FCDD8B');//人工服务基本服务费折扣单价
		$("#field0145_span").parent().css('background','#FCDD8B');//sip电话
	};

	JFZQ.prototype.initCss = function() {
		$("#field0017").attr("disabled",true);
		var shptr = $("#field0017").parents("table");
		shptr.mouseover(function(){
			_jfzq.cssRela();
		});
		$("input[name=field0035]").click(function(){
			//选择其他的时候css的变化
			if(typeof ($("input[name=field0035]:checked").val()) !="undefined" && $("input[name=field0035]:checked").val() =="-5891212324087446913"){
				$("#field0036").css('background','#CCFFCC');
			}else{
				$("#field0036").css('background','');
			}
		});
		$("input[name=field0039]").click(function(){
			if(typeof ($("input[name=field0039]:checked").val()) !="undefined" && $("input[name=field0039]:checked").val() =="-1122618658103079534"){
				$("#field0040").css('background','#CCFFCC');
			}else{
				$("#field0040").css('background','');
			}
		});
	};
	
	//6096262930536024380 直签 -2308135508315779848 联通
	JFZQ.prototype.showFjDiv = function(){
	};
	
	JFZQ.prototype.initDisableComps = function() {
		$.each(_jfzq.elements, function(key, val) {
			if(val && val.initDisable){
				if(val.type =='radio'){
					var _radios = $("input[name="+key+"]");
					$.each(_radios,function(key,value){
						_jfzq.disableComp($(this), true);
					});
				}else{	
					var elem = $("#" + val.id);
					if(elem.length == 1){
						_jfzq.disableComp(elem, true);
					}
				}
			}
		});
	};
	JFZQ.prototype.disableComp = function(elem, val) {
		if (!elem || elem.length == 0) {
			return;
		}
		elem.attr("disabled", val);
	};

	/**
	 * 验证平台类型 选择未验收平台时，必须填写所属平台
	 * */
	JFZQ.prototype.validate_ptlx = function(e) {
		var shpt=$("#field0017").val(); //所属平台
		var ptlx=$("#field0016").text(); //平台类型

		if(ptlx=="未验收平台" && shpt ==""){
			alert("【所属平台】平台类型为未验收平台时,请填写所属平台！");
			$("#field0017").css('background','#FCDD8B');
			$("#field0017").focus();
			return false;
		}else{
			$("#field0017").css('background','#FFFFFF');
		}
		return true;
	};


	/**
	 * 坐席电话校验
	 */
	JFZQ.prototype.validateAgentTel = function(){
		if(!($("#field0145").is(":checked")||$("#field0146").is(":checked"))){
			alert("【坐席电话】必须选择坐席电话中一个选项");
			$("#field0145_span").parent().focus();
			return false;
		}
		//填写坐席号码不能超过70字符  与上传附件不能同时填写
		if($("#field0139").val() != "" && $("#field0139").val().length > 70 ){
			alert("【坐席电话】坐席号码不能超多70个字符");
			$("#field0139").focus();
			return false;
		}
		//坐席号码附件
		var agentTel = $("#field0023_span").children(":first").next();
		var agentTelChilds = agentTel.children();
		if(agentTelChilds.length !=0 && $("#field0139").val() != "" ){
			alert("【坐席电话】坐席电话和附件不能同时输入");
			$("#field0139").focus();
			return false;
		}
		return true;
	};

	/**
	 * 外显号码校验
	 */
	JFZQ.prototype.validateOutNum = function(){
		//外显文本框
		var outNum1 = $("#field0142");
		var outNum2 = $("#field0143");
		var outNum3 = $("#field0144");

		var yz_outNum1 = $("#field0142").val();
		var yz_outNum2 = $("#field0143").val();
		var yz_outNum3 = $("#field0144").val();


		var isPhoneNum = (yz_outNum1=='')?true:_jfzq.until_valiPhoneNum(yz_outNum1);
		isPhoneNum = isPhoneNum && ((yz_outNum2=='')?true:_jfzq.until_valiPhoneNum(yz_outNum2));
		isPhoneNum = isPhoneNum && ((yz_outNum3=='')?true:_jfzq.until_valiPhoneNum(yz_outNum3));

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
			$("#field0142").focus();
			return false;
		}
		if(outNum1.val() == '' && outNum2.val() == '' && outNum3.val() == '' && attachmentChilds.length==0){
			alert("【外显号码】外显号码及附件必须填写一项，请选择其中一项后再次上传！");
			$("#field0142").focus();
			return false;
		}
		return true;
	};

	/**
	 * 缴费号码
	 * @returns {boolean}
	 */
	JFZQ.prototype.validate_JFnumber = function() {
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

	//验证联通客户必选上传邮件
	//延期错误
	JFZQ.prototype.validate_YQEmail = function() {
		//var yhlx = $("#field0016").text();
		// 延期邮件
		var attachment = $("#field0033_span").children(":first").next();
		var attachmentChilds = attachment.children();
		var temp = attachmentChilds.length;

		if (temp == 0) {
			alert("联通用户必须上传【信息邮件】！");
			$("#field0033_span").focus();
			// $(":contains('延期邮件')").parents("td").css("color", "red");
			return false;
		}

		return true;
	};

	/**
	 * 终端需求中校验
	 * 二个必选其一
	 */
	JFZQ.prototype.validateZD = function(){
		if(!($("#field0037").is(":checked")||$("#field0038").is(":checked"))){
			alert("【终端需求】终端需求中必须选择一个终端类型");
			$("#field0037").focus();
			return false;
		}
		//如果选择有终端  后面的单选按钮也必须选择
		if($("#field0037").is(":checked")){
			if(typeof($("input[name=field0039]:checked").val()) == "undefined"){
				alert("【终端需求】请选择有终端分类");
				return false;
			}
		}
		return true;
	};

	/**
	 *校验所有的其他选择选项中的文本是否填写
	 */
	JFZQ.prototype.validateOtherText =function(){
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
	 * 通话资费
	 * @returns {boolean}
	 */
	JFZQ.prototype.validate_thzf = function(){
		var ivrsh = $("#field0094");
		var ivrct = $("#field0095");
		var zxsh = $("#field0096");
		var zxct = $("#field0097");
		var whsh = $("#field0098");
		var whct = $("#field0099");
		if(!ivrsh.is(":checked")&&!ivrct.is(":checked")&&!zxsh.is(":checked")&&!zxct.is(":checked")&&!whsh.is(":checked")&&!whct.is(":checked")){
			alert("【通话资费】至少选择一个");
			ivrsh.focus();
			return false;
		}
		return true;
	};

	/**
	 * 服务资费校验
	 */
	JFZQ.prototype.validate_fwzf = function(){
		//一些必填项
		if($("#field0155").val() == ""){
			alert("【服务资费】请填写IVR现有数量");
			$("#field0155").focus();
			return false;
		}
		if($("#field0157").val() == ""){
			alert("【服务资费】自动外拨已有试用数量");
			$("#field0157").focus();
			return false;
		}
		if($("#field0161").val() == ""){
			alert("【服务资费】坐席(无终端)含录音及报表现有试用数量");
			$("#field0161").focus();
			return false;
		}
		if($("#field0069").val() == ""){
			alert("【服务资费】自动语音服务基本服务费折扣单价");
			$("#field0069").focus();
			return false;
		}
		if($("#field0073").val() == ""){
			alert("【服务资费】人工服务基本服务费折扣单价");
			$("#field0073").focus();
			return false;
		}

		//一组必填校验（只要其中一个填写 这一组必须全部填写）
		if($("#field0052").val() != "" || typeof($("input[name=field0061]:checked").val()) !="undefined"
			|| $("#field0070").val() != ""){
			if(!($("#field0052").val() != "" && typeof($("input[name=field0061]:checked").val()) !="undefined"
				&& $("#field0070").val() != "")){
				alert("【服务资费】IVR需要全部填写");
				return false;
			}
		}

		//tts
		if($("#field0053").val() != "" || typeof($("input[name=field0062]:checked").val()) !="undefined"
			|| $("#field0071").val() != ""){
			if(!($("#field0053").val() != "" && typeof($("input[name=field0062]:checked").val()) !="undefined"
				&& $("#field0071").val() != "")){
				alert("【服务资费】TTS需要全部填写");
				$("#field0053").focus();
				return false;
			}
		}

		//自动外拨
		if($("#field0054").val() != "" || typeof($("input[name=field0063]:checked").val()) !="undefined"
			|| $("#field0072").val() != ""){
			if(!($("#field0054").val() != "" && typeof($("input[name=field0063]:checked").val()) !="undefined"
				&& $("#field0072").val() != "")){
				alert("【服务资费】自动外拨需要全部填写");
				$("#field0054").focus();
				return false;
			}
		}

		//有终端坐席
		if($("#field0056").val() != "" || typeof($("input[name=field0065]:checked").val()) !="undefined"
			|| $("#field0074").val() != ""){
			if(!($("#field0056").val() != "" && typeof($("input[name=field0065]:checked").val()) !="undefined"
				&& $("#field0074").val() != "")){
				alert("【服务资费】有终端坐席需要全部填写");
				$("#field0056").focus();
				return false;
			}
		}

		//统计分析
		if($("#field0057").val() != "" || typeof($("input[name=field0066]:checked").val()) !="undefined"
			|| $("#field0075").val() != ""){
			if(!($("#field0057").val() != "" && typeof($("input[name=field0066]:checked").val()) !="undefined"
				&& $("#field0075").val() != "")){
				alert("【服务资费】统计分析需要全部填写");
				$("#field0057").focus();
				return false;
			}
		}

		//坐席录音
		if($("#field0058").val() != "" || typeof($("input[name=field0067]:checked").val()) !="undefined"
			|| $("#field0076").val() != ""){
			if(!($("#field0058").val() != "" && typeof($("input[name=field0067]:checked").val()) !="undefined"
				&& $("#field0076").val() != "")){
				alert("【服务资费】坐席录音需要全部填写");
				$("#field0058").focus();
				return false;
			}
		}

		//坐席(无终端)含录音及报表最终计费总量
		if($("#field0059").val() != "" || typeof($("input[name=field0068]:checked").val()) !="undefined"
			|| $("#field0077").val() != ""){
			if(!($("#field0059").val() != "" && typeof($("input[name=field0068]:checked").val()) !="undefined"
				&& $("#field0077").val() != "")){
				alert("【服务资费】坐席(无终端)含录音及报表需要全部填写");
				$("#field0059").focus();
				return false;
			}
		}

		return true;

	};

	/**
	 *验证定制化资费，填写其中一个内容，必须全部全部填写（一组非必填）
	 */
	JFZQ.prototype.validate_dzhzf = function(){
		var thzf = $("#field0091");//通话资费
		var han = $("#field0101");//含多少分钟
		var ztyh = $("input[name=field0092]:checked");//整体优惠 平均每坐席
		var chaochu = $("#field0093");//超出部分按照

		if(thzf.val() != "" || han.val() != "" || typeof(ztyh.val()) != "undefined" || chaochu.val() != ""){
			if(!(thzf.val() != "" && han.val() != "" && typeof(ztyh.val()) != "undefined" && chaochu.val() != "")){
				alert("【定制化资费】定制化资费中如果填写一项，就得全部填写");
				thzf.focus();
				return false;
			}
		}
		return true;
	};
	/**
	 * 一些具有css关联事件
	 * @type {{}}
	 */
	JFZQ.prototype.cssRela = function(){
		//ivr
		if($("#field0052").val() != "" || typeof($("input[name=field0061]:checked").val()) !="undefined"
			|| $("#field0070").val() != ""){
			$("#field0052").css('background','#FCDD8B');//ivr最终试用数量
			$.each($("input[name=field0061]"),function(key,value){
				$(this).parent().css('background','#FCDD8B');//ivr折扣单价
			});
			$("#field0070").css('background','#FCDD8B');//ivr折扣单价
		}else{
			$("#field0052").css('background','');//ivr最终试用数量
			$.each($("input[name=field0061]"),function(key,value){
				$(this).parent().css('background','');//ivr折扣单价
			});
			$("#field0070").css('background','');//ivr折扣单价
		}

		//tts
		if($("#field0053").val() != "" || typeof($("input[name=field0062]:checked").val()) !="undefined"
			|| $("#field0071").val() != ""){
			$("#field0053").css('background','#FCDD8B');//ivr最终试用数量
			$.each($("input[name=field0062]"),function(key,value){
				$(this).parent().css('background','#FCDD8B');//ivr折扣单价
			});
			$("#field0071").css('background','#FCDD8B');//ivr折扣单价
		}else{
			$("#field0053").css('background','');//ivr最终试用数量
			$.each($("input[name=field0062]"),function(key,value){
				$(this).parent().css('background','');//ivr折扣单价
			});
			$("#field0071").css('background','');//ivr折扣单价
		}

		//自动外拨
		if($("#field0054").val() != "" || typeof($("input[name=field0063]:checked").val()) !="undefined"
			|| $("#field0072").val() != ""){
			$("#field0054").css('background','#FCDD8B');//ivr最终试用数量
			$.each($("input[name=field0063]"),function(key,value){
				$(this).parent().css('background','#FCDD8B');//ivr折扣单价
			});
			$("#field0072").css('background','#FCDD8B');//ivr折扣单价
		}else{
			$("#field0054").css('background','');//ivr最终试用数量
			$.each($("input[name=field0063]"),function(key,value){
				$(this).parent().css('background','');//ivr折扣单价
			});
			$("#field0072").css('background','');//ivr折扣单价
		}

		//有终端坐席
		if($("#field0056").val() != "" || typeof($("input[name=field0065]:checked").val()) !="undefined"
			|| $("#field0074").val() != ""){
			$("#field0056").css('background','#FCDD8B');//ivr最终试用数量
			$.each($("input[name=field0065]"),function(key,value){
				$(this).parent().css('background','#FCDD8B');//ivr折扣单价
			});
			$("#field0074").css('background','#FCDD8B');//ivr折扣单价
		}else{
			$("#field0056").css('background','');//ivr最终试用数量
			$.each($("input[name=field0065]"),function(key,value){
				$(this).parent().css('background','');//ivr折扣单价
			});
			$("#field0074").css('background','');//ivr折扣单价
		}

		//统计分析
		if($("#field0057").val() != "" || typeof($("input[name=field0066]:checked").val()) !="undefined"
			|| $("#field0075").val() != ""){
			$("#field0057").css('background','#FCDD8B');//ivr最终试用数量
			$.each($("input[name=field0066]"),function(key,value){
				$(this).parent().css('background','#FCDD8B');//ivr折扣单价
			});
			$("#field0075").css('background','#FCDD8B');//ivr折扣单价
		}else{
			$("#field0057").css('background','');//ivr最终试用数量
			$.each($("input[name=field0066]"),function(key,value){
				$(this).parent().css('background','');//ivr折扣单价
			});
			$("#field0075").css('background','');//ivr折扣单价
		}

		//坐席录音
		if($("#field0058").val() != "" || typeof($("input[name=field0067]:checked").val()) !="undefined"
			|| $("#field0076").val() != ""){
			$("#field0058").css('background','#FCDD8B');//ivr最终试用数量
			$.each($("input[name=field0067]"),function(key,value){
				$(this).parent().css('background','#FCDD8B');//ivr折扣单价
			});
			$("#field0076").css('background','#FCDD8B');//ivr折扣单价
		}else{
			$("#field0058").css('background','');//ivr最终试用数量
			$.each($("input[name=field0067]"),function(key,value){
				$(this).parent().css('background','');//ivr折扣单价
			});
			$("#field0076").css('background','');//ivr折扣单价
		}

		//坐席(无终端)含录音及报表最终计费总量
		if($("#field0059").val() != "" || typeof($("input[name=field0068]:checked").val()) !="undefined"
			|| $("#field0077").val() != ""){
			$("#field0059").css('background','#FCDD8B');//ivr最终试用数量
			$.each($("input[name=field0068]"),function(key,value){
				$(this).parent().css('background','#FCDD8B');//ivr折扣单价
			});
			$("#field0077").css('background','#FCDD8B');//ivr折扣单价
		}else{
			$("#field0059").css('background','');//ivr最终试用数量
			$.each($("input[name=field0068]"),function(key,value){
				$(this).parent().css('background','');//ivr折扣单价
			});
			$("#field0077").css('background','');//ivr折扣单价
		}
	};

	/**
	 * 设置所有单选 点击选中再点击取消
	 */
	JFZQ.prototype.radiocheck = function (){
		$(":radio").each(function (){
			if($(this).val()!=6404582267989804173 && $(this).val()!=9013198972058747339
				&& $(this).val()!=-6362243583782008383 && $(this).val()!=-5891212324087446913){
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
	 * 业务系统类型联动关系
	 * 选择其他 _后面不能填写
	 *
	 */
	JFZQ.prototype.ywxt = function(){
		var value = $("input[name=field0035]:checked").attr("value");
		if(value == "-5891212324087446913"){//其他
			$("#field0036").attr("disabled",false);
		}else{
			$("#field0036").val("");
			$("#field0036").attr("disabled",true);
		}
	};
	/**
	 * 终端需求联动关系
	 * 有终端中 选择其他 _后面不能填写
	 */
	JFZQ.prototype.zdxq = function(){
		var value = $("input[name=field0039]:checked").attr("value");
			if (value == "-1122618658103079534") {//其他
				$("#field0040").attr("disabled", false);
			} else {
				$("#field0040").val("");
				$("#field0040").attr("disabled", true);
			}
	};

	/**
	 * 选择有终端默认选择一个单选按钮
	 */
	JFZQ.prototype.yzd = function(){
		var zdxq = $("input[name=field0039]");
		$.each(zdxq,function (key,value) {
			var radioVal = $(value).val();
			if(radioVal == '8254392202341730514'){
				$(this).attr("checked",true);
			}
		});
	};


	/*表单上组件的基本信息*/	
	JFZQ.prototype.elements = {
		"field0004":{id : "field0004",	type : "text",		name : "要求完成时间",initDisable:true},
		"field0006":{id : "field0006",	type : "span",		name : "客户经理"},
		"field0008":{id : "field0008",	type : "text",		name : "客户结算接口人"},
		"field0009":{id : "field0009",	type : "text",		name : "企业ID"},
		"field0010":{id : "field0010",	type : "text",		name : "企业名称"},
		"field0011":{id : "field0011",	type : "text",		name : "合同编号"},
		"field0012":{id : "field0012",	type : "text",		name : "项目编号"},
		"field0013":{id : "field0013",	type : "text",		name : "项目名称"},

		"field0015":{id : "field0015",	type : "span",		name : "企业属地"},
		"field0016":{id : "field0016",	type : "text",		name : "平台类型"},
		"field0017":{id : "field0017",	type : "text",		name : "所属平台"},
		"field0020":{id : "field0020",	type : "select",		name : "客户发展渠道"},
		"field0020_txt":{id : "field0020_txt",	type : "select",		name : "客户发展渠道"},

		"field0170":{id : "field0163",	type : "checkbox",name : "文本/IM坐席",initDisable:true},
		"field0171":{id : "field0164",	type : "checkbox",name : "坐席语音",initDisable:true},
		"field0172":{id : "field0165",	type : "checkbox",name : "视频坐席",initDisable:true},

		"field0145":{id : "field0145",	type : "checkbox",	name : "SIP电话复选"},
		"field0146":{id : "field0146",	type : "checkbox",	name : "PSTN电话"},
		"field0173":{id : "field0146",	type : "checkbox",	name : "BUTEL"},

		"field0139":{id : "field0139",	type : "text",		name : "坐席电话1"},
		"field0142":{id : "field0142",	type : "text",		name : "外显号码1"},
		"field0143":{id : "field0143",	type : "text",		name : "外显号码2"},
		"field0144":{id : "field0144",	type : "text",		name : "外显号码3"},
		"field0123_span":{id : "field0123_span",	type : "text",		name : "外显反馈结果"},

		"field0024":{id : "field0024",	type : "text",		name : "缴费号码 "},

		"field0035":{id : "field0035",	type : "radio",		name : "客服通", 	value:"6404582267989804173"},
		"field0035":{id : "field0035",	type : "radio",		name : "电销通",		value:"9013198972058747339"},
		"field0035":{id : "field0035",	type : "radio",		name : "不配置",		value:"-6362243583782008383"},
		"field0035":{id : "field0035",	type : "radio",		name : "其他",		value:"-5891212324087446913"},
		"field0036":{id : "field0036",	type : "text",		name : "业务系统类型其他文本框",initDisable:true},
		"field0037":{id : "field0037",	type : "checkbox",	name : "有终端"},
		"field0038":{id : "field0038",	type : "checkbox",	name : "无终端"},
		"field0039":{id : "field0039",	type : "radio",		name : "CCEA",	value:"8254392202341730514",initDisable:true},
		"field0039":{id : "field0039",	type : "radio",		name : "ADT",	value:"-4305093821079142156",initDisable:true},
		"field0039":{id : "field0039",	type : "radio",		name : "OXC",	value:"-7530274332352494683",initDisable:true},
		"field0039":{id : "field0039",	type : "radio",		name : "其他",	value:"-1122618658103079534",initDisable:true},
		"field0040":{id : "field0040",	type : "text",		name : "终端需求-其他文本框",initDisable:true},
};   
/*事件注册*/
	JFZQ.prototype.events = {
	"field0035":{event:"click",func:"ywxt"},
	"field0037":{event:"click",func:"yzd"},
	"field0039":{event:"click",func:"zdxq"},
};

	JFZQ.prototype.trs={};

/** **************工具函数********************** */
	 JFZQ.prototype.until_valiPhoneNum = function(tel) {
		var isPhoneNum = false;
		// 手机正则表达式
		var mp_reg = /^(\(\d{3,4}\)|\d{3,4}|\s)?\d{5,16}$/;
		if (mp_reg.test(tel)) {
			isPhoneNum = true;
		}
		return isPhoneNum;
	};
	 JFZQ.prototype.until_valiJfNum = function(tel) { // 缴费号码
		var isPhoneNum = false;
		// 手机正则表达式
		var mp_reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{10,14}$/;
		if (mp_reg.test(tel)) {
			isPhoneNum = true;
		}
		return isPhoneNum;
	};
}
