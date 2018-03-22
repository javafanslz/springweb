$(document).ready(function() {
	try {
		var title = $("#subject").val();
		if (title.indexOf("平台迁移单-直签") != -1) {
			var qyzq = new QYZQ();
			qnObjs.qyzq = qyzq;
			qyzq.initPage(qyzq);
		}
	} catch (e) {
	}
});

/**
 * CCOD平台迁移
 */

function QYZQ() {
	var _qyzq = this;
	
	// 初始化页面的方法
	QYZQ.prototype.initPage = function(pageType) {
		try {
			this.initTrObjs();
			this.disableObj();
			this.eventMouseSSPTTR();
		} catch (e) {
		}
	};

	QYZQ.prototype.initTrObjs = function() {
		$("#field0040").css('background','#CCFFCC');//平台接入号
		$("#field0043_span").css('background','#CCFFCC');//接入号邮件
	};

	QYZQ.prototype.disableObj = function() {
		$.each(_qyzq.elements, function(key, val) {
			if (val && val.initDisable) {
				if (val.type == 'radio') {
					var _radios = $("input[name=" + key + "]");
					$.each(_radios, function(key, value) {
						_qyzq.disableComment($(this), true);
					});
				} else {
					var elem = $("#"+val.id);
					if (elem.length == 1) {
						_qyzq.disableComment(elem, true);
					}
				}
			}
		});
	};

	QYZQ.prototype.disableComment = function(elem, val) {
		if (!elem || elem.length == 0) {
			return;
		}
		elem.attr("disabled", val);
	};

	/**
	 * 所属平台和各个控件之间的关系
	 * 当平台类型为未验收的时候所属平台可以输入
	 * 当所属平台是ccod4.5平台的  坐席功能变为可选否则不可选
	 * 试用数量中不可选择变为选择
	 * 校验关系添加一个 直签工单只能选择直签的企业  联通的工单只能选择联通的企业
	 */
	QYZQ.prototype.eventMouseSSPTTR = function(){
		var shptr = $("#field0039").parents("table");
		shptr.mouseover(function(){
			//获取平台类型
			var ptType = $("#field0038").html();
			if(ptType == "未验收平台"){
				$("#field0039").attr("disabled",false);
			}else{
				$("#field0039").attr("disabled",true);
			}
			//ccod4.5平台
			var pingtai = $("#field0039").val();
			if(pingtai.indexOf("CCOD4.5平台") != -1){
			/*	//原平台客+ 文本机器人
				$("#field0068").attr("disabled",false);
				$("#field0069").attr("disabled",false);
				//原平台坐席无终端
				$("#field0031").attr("disabled",true);*/
				//新平台客+ 文本机器人
				$("#field0070").attr("disabled",false);
				$("#field0071").attr("disabled",false);
				//新平台坐席无终端
				$("#field0054").attr("disabled",true);
			}else{
			/*	//原平台客+ 文本机器人
				$("#field0068").attr("disabled",true);
				$("#field0069").attr("disabled",true);*/
				//新平台客+ 文本机器人
				$("#field0070").attr("disabled",true);
				$("#field0071").attr("disabled",true);
				/*////原平台坐席无终端
				$("#field0031").attr("disabled",false);*/
				//新平台坐席无终端
				$("#field0054").attr("disabled",false);
			}
			//校验选择的企业和工单类型是否匹配
			_qyzq.validatePlatform();
		});
	};

	QYZQ.prototype.validate = function() {
		if (!_qyzq.validate_CbChange()) {
			return false;
		}
		if (!_qyzq.validate_NewJFNumber()) {
			return false;
		}
		//联通工单只能选择联通企业  直签工单只能选择直签企业
		if(!_qyzq.validatePlatform()){
			return false;
		}
		return true;
	};
	
	QYZQ.prototype.validate_NewJFNumber =function(){
		var hrsh1 =$("#field0044").val();
		
		var isPhoneNum = (hrsh1=='')?true:_qyzq.until_valiJfNum(hrsh1);
		
		if(!isPhoneNum){
			alert("【新平台信息缴费号码】电话格式不正确，请重新填写。");
			$(":contains('缴费号码')").parents("td").css("color","red");
			$("#field0044").focus();
			return false;
		}
		$(":contains('缴费号码')").parents("td").css("color","black");
		return true;
	};

	/**
	 * 校验联通工单中不能选择非联通企业，直签不能选择非直签企业
	 */
	QYZQ.prototype.validatePlatform =function(){
		//field0017
		var platForm = $("#field0017").html();
		var title = $("#subject").val();
		if(platForm != "" && typeof(platForm)!="undefined"){
			if(title.indexOf("直签")!= -1){
				if(platForm.indexOf("联通合作客户") !=-1){
					alert("直签工单不能选择联通合作客户");
					return false;
				}
			}
			if(title.indexOf("联通")!= -1){
				if(platForm.indexOf("联通合作客户") ==-1){
					alert("联通工单只能选择联通合作客户");
					return false;
				}
			}
		}
		return true;
	};

	/**
	 * 成本变化校验
	 * 选择有变化 八项为必填项
	 * @returns {boolean}
	 */
	QYZQ.prototype.validate_CbChange =function(){
		var chanceButton = $("input[name=field0057]:checked").attr("value");
		if(chanceButton == null){
			alert("【成本变化】请选择成本变化！");
			return false;
		}
		if(chanceButton == '-22918577135007537'){
			if($("#field0058").val() == ''){
				alert("【成本变化情况】请填写原平台其他");
				return false;
			}
			if($("#field0059").val() == ''){
				alert("【成本变化情况】请填写新平台其他");
				return false;
			}
			if($("#field0060").val() == ''){
				alert("【成本变化情况】请填写原平台运营商分成");
				return false;
			}
			if($("#field0061").val() == ''){
				alert("【成本变化情况】请填写原平台话费支出");
				return false;
			}
			if($("#field0062").val() == ''){
				alert("【成本变化情况】请填写原平台中继线路");
				return false;
			}
			if($("#field0063").val() == ''){
				alert("【成本变化情况】请填写新平台运营商分成");
				return false;
			}
			if($("#field0064").val() == ''){
				alert("【成本变化情况】请填写新平台话费支出");
				return false;
			}
			if($("#field0065").val() == ''){
				alert("【成本变化情况】请填写新平台中继线路");
				return false;
			}
		}
		return true;
	};

	QYZQ.prototype.elements = {
		"field0004" : {id : "field0004",type : "text",name : "要求完成时间",initDisable : true},
		"field0039" : {id : "field0039",type : "text",name : "所属平台",initDisable:true},
		"field0068" : {id : "field0068",type : "text",name : "原平台客+",initDisable : true},
		"field0069" : {id : "field0069",type : "text",name : "原平台文本机器人",initDisable:true},
		"field0070" : {id : "field0070",type : "text",name : "新平台客+",initDisable : true},
		"field0071" : {id : "field0071",type : "text",name : "新平台文本机器人",initDisable:true}
	};
	QYZQ.prototype.trs = {};
	
	/** **************工具函数********************** */
	QYZQ.prototype.until_valiPhoneNum = function (tel) {
		var isPhoneNum = false;
		// 手机正则表达式
		var mp_reg = /^\d{5,16}$/;
		if (mp_reg.test(tel)) {
			isPhoneNum = true;
		}
		return isPhoneNum;
	}
	QYZQ.prototype.until_valiJfNum = function(tel) {  //缴费号码
		var isPhoneNum = false;
		// 手机正则表达式
		var mp_reg = /^\d{10,14}$/;
		if (mp_reg.test(tel)) {
			isPhoneNum = true;
		}
		return isPhoneNum;
	}
}