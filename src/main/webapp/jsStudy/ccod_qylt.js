$(document).ready(function() {
	try {
		var title = $("#subject").val();
		if (title.indexOf("平台迁移单-联通") != -1) {
			var qylt = new QYLT();
			qnObjs.qylt = qylt;
			qylt.initPage(qylt);
		}
	} catch (e) {
	}
});

/**
 * CCOD平台迁移
 */

function QYLT() {
	var _qylt = this;
	
	// 初始化页面的方法
	QYLT.prototype.initPage = function(pageType) {
		try {
			this.disableObj();
			this.eventMouseSSPTTR();
		} catch (e) {
		}
	};

	QYLT.prototype.disableObj = function() {
		$.each(_qylt.elements, function(key, val) {
			if (val && val.initDisable) {
				if (val.type == 'radio') {
					var _radios = $("input[name=" + key + "]");
					$.each(_radios, function(key, value) {
						_qylt.disableComment($(this), true);
					});
				} else {
					var elem = $("#"+val.id);
					if (elem.length == 1) {
						_qylt.disableComment(elem, true);
					}
				}
			}
		});
	};

	QYLT.prototype.disableComment = function(elem, val) {
		if (!elem || elem.length == 0) {
			return;
		}
		elem.attr("disabled", val);
	};

	QYLT.prototype.validate = function() {
		if (!_qylt.validate_QYReason()) {
			return false;
		}
		if (!_qylt.validate_NewptjrNumber()) {
			return false;
		}
		if (!_qylt.validate_NewJFNumber()) {
			return false;
		}
		return true;
	};
	
	QYLT.prototype.validate_NewptjrNumber = function(){
		var attachment = $("#field0043_span").children(":first").next();
		var attachmentChilds = attachment.children();//附件
		
		//新平台接入号
		var NewPTnumber1 = $("#field0040").val();
		
		var isPhoneNum = (NewPTnumber1=='')?true:_qylt.until_valiPhoneNum(NewPTnumber1);
		if(!isPhoneNum){
			alert("【新平台接入号】电话格式不正确，请重新填写。");
			$("#field0040").focus();
			return false;
		}
		
		if(NewPTnumber1!=""){
			if(attachmentChilds.length!= 0){
				alert("已填写平台接入号，不要选择附件！");
				return false;
			}				
		}else if(attachmentChilds.length!= 0){
			if(NewPTnumber1!=""){
				alert("已选择附件，请清空平台接入号！");
				$("#field0040").focus();
				return false;
			}
		}else{
			alert("请填写【接入号】，或上传【接入号附件】");
			$("#field0040").focus();
			return false;
		}
		return true;
	};
	
	//联通用户必填邮件
	//延期错误
	QYLT.prototype.validate_YQEmail = function(){
		//延期邮件
		var attachment = $("#field0043_span").children(":first").next();
		var attachmentChilds = attachment.children();
		var temp =attachmentChilds.length;
		if(temp==0){
				alert("联通用户必须上传【延期邮件】！");
				$(":contains('延期邮件')").parents("td").css("color","red");
				return false;
		}
		$(":contains('延期邮件')").parents("td").css("color","black");
		return true;
	};

	/**
	 * 所属平台和各个控件之间的关系
	 * 当平台类型为未验收的时候所属平台可以输入
	 */
	QYLT.prototype.eventMouseSSPTTR = function(){
		var shptr = $("#field0039").parents("table");
		shptr.mouseover(function(){
			//获取平台类型
			var ptType = $("#field0038").html();
			if(ptType == "未验收平台"){
				$("#field0039").attr("disabled",false);
			}else{
				$("#field0039").attr("disabled",true);
			}
		});
	};
	
	
	QYLT.prototype.validate_NewJFNumber =function(){
		var hrsh1 =$("#field0044").val();
		var hrct1 =$("#field0045").val();
		var hrsh2 =$("#field0046").val();
		var hrct2 =$("#field0047").val();
		var yyfwf =$("#field0048").val();
		
		var isPhoneNum = (hrsh1=='')?true:_qylt.until_valiJfNum(hrsh1);
		isPhoneNum = isPhoneNum && ((hrct1=='')?true:_qylt.until_valiJfNum(hrct1));
		isPhoneNum = isPhoneNum && ((hrsh2=='')?true:_qylt.until_valiJfNum(hrsh2));
		isPhoneNum = isPhoneNum && ((hrct2=='')?true:_qylt.until_valiJfNum(hrct2));
		isPhoneNum = isPhoneNum && ((yyfwf=='')?true:_qylt.until_valiJfNum(yyfwf));
		
		if(!isPhoneNum){
			alert("【缴费号码】电话格式不正确，请重新填写。");
			$(":contains('缴费号码')").parents("td").css("color","red");
			$("#field0044").focus();
			return false;
		}
		$(":contains('缴费号码')").parents("td").css("color","black");
		return true;
	}
	
	//平台迁移原因是否填写
	QYLT.prototype.validate_QYReason =function(){
		var qyreason =$("#field0036").val();
		if(qyreason==""){
			alert("【迁移原因】必须填写!");
			$("#field0036").focus();
			$(":contains('迁移原因')").parents("td").css("color","red");
			return false;
		}
		$(":contains('迁移原因')").parents("td").css("color","black");
		return true;
	}
	QYLT.prototype.elements = {
		"field0004" : {id : "field0004",type : "text",name : "要求完成时间",initDisable : true},
		"field0039" : {id : "field0039",type : "text",name : "所属平台",initDisable:true}
	}
	QYLT.prototype.trs = {};
	
	/** **************工具函数********************** */
	QYLT.prototype.until_valiPhoneNum = function (tel) {
		var isPhoneNum = false;
		// 手机正则表达式
		var mp_reg = /^(\(\d{3,4}\)|\d{3,4}|\s)?\d{5,16}$/;
		if (mp_reg.test(tel)) {
			isPhoneNum = true;
		}
		return isPhoneNum;
	}
	QYLT.prototype.until_valiJfNum = function(tel) {  //缴费号码
		var isPhoneNum = false;
		// 手机正则表达式
		var mp_reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{10,14}$/;
		if (mp_reg.test(tel)) {
			isPhoneNum = true;
		}
		return isPhoneNum;
	}
}