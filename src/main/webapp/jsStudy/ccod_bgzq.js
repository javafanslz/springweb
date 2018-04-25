/*
 * 业务延期
 * 
 * */
$(document).ready(function() {
	try {
		var title = $("#subject").val();
		if (title && title.indexOf("业务变更单-直签") != -1) {
			var bgzq = new BGZQ();
			qnObjs.bgzq = bgzq;
			bgzq.initPage(bgzq);
		}
	} catch (e) {
	}
});
/**
 * CCOD业务延期受理单
 */

function BGZQ() {

	var _bgzq = this;
	var trs={};
	// 初始化页面的方法
	BGZQ.prototype.initPage = function(pageType) {
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
	BGZQ.prototype.initDisableComps = function() {
		$.each(_bgzq.elements, function(key, val) {
			if(val && val.initDisable){
				if(val.type =='radio'){
					var _radios = $("input[name="+key+"]");
					$.each(_radios,function(key,value){
						_bgzq.disableComp($(this), true);
					});
				}else{
					var elem = $("#" + val.id);
					if(elem.length == 1){
						_bgzq.disableComp(elem, true);
					}
				}
			}
			if(val && val.readOnly){
				if(val.type =='radio'){
					var _radios = $("input[name="+key+"]");
					$.each(_radios,function(key,value){
						_bgzq.readOnly($(this), true);
					});
				}else{
					var elem = $("#" + val.id);
					if(elem.length == 1){
						_bgzq.readOnly(elem, true);
					}
				}
			}
		});
	};
	BGZQ.prototype.disableComp = function(elem, val) {
		if (!elem || elem.length == 0) {
			return;
		}
		elem.attr("disabled", val);
	};

	BGZQ.prototype.readOnly = function(elem,val){
		if (!elem || elem.length == 0) {
			return;
		}
		elem.attr("readonly", val);
	};

	/**
	 * 鼠标移入事件
	 */
	BGZQ.prototype.eventMouseSSPTTR = function(){
		var shptr = $("#field0017").parents("table");
		shptr.mouseover(function(){
			_bgzq.cssRelations();
		});
	};

	/**
	 * 绑定事件
	 */
	BGZQ.prototype.bindEvent = function() {
		$.each(_bgzq.events,function(key,val){
			if(_bgzq.elements[key].type=="radio" || _bgzq.elements[key].type=="checkbox"){
				var elem = eval($('input[name='+key+']'));
				var func = eval("_bgzq.constructor.prototype."+val.func);
				elem.each(function(){
					var func = eval("_bgzq.constructor.prototype."+val.func);
					$(this).bind(val.event,func);
				});
			}else {
				var elem = $("#" + key);
				var func = eval("_bgzq.constructor.prototype."+val.func);
				elem.bind(val.event,func);
			}
		});
	};

	/**
	 * 当选择编程多选框的时候 对应更改项的css关联
	 */
	BGZQ.prototype.cssRelations = function(){
		_bgzq.initJFHM();
		_bgzq.initAgentNum();
		_bgzq.initOutNum();
		_bgzq.initFWZFNum();
		_bgzq.initFWZFType();
        _bgzq.initHFZF();
		_bgzq.initDZH();
		_bgzq.initJFSj();
		_bgzq.initHT();
		_bgzq.initName();
	};
    /**
     * 校验
     */
	BGZQ.prototype.validate = function(){
		if(!_bgzq.validatePT()){
			return false;
		}
		if(!_bgzq.validateFZQD()){
			return false;
		}
        if(!_bgzq.validateState()){
            return false;
        }
        if(!_bgzq.validateJFHM()){
            return false;
        }
        if(!_bgzq.validateAgentNum()){
            return false;
        }
        if(!_bgzq.validateOutNum()){
            return false;
        }
        if(!_bgzq.validateNum()){
            return false;
        }
        if(!_bgzq.validateType()){
            return false;
        }
        if(!_bgzq.validateZdxq()){
            return false;
        }
        if(!_bgzq.validateHFZF()){
            return false;
        }
        if(!_bgzq.validateDZH()){
			return false;
		}
		if(!_bgzq.validateJFSj()){
			return false;
		}
		if(!_bgzq.validateHT()){
			return false;
		}
		if(!_bgzq.validateName()){
			return false;
		}
        return true;
    };

	/**
	 * 平台校验
	 * @returns {boolean}
	 */
	BGZQ.prototype.validatePT =function(){
		var ptType = $("#field0014").html();
		if(ptType != "" &&ptType.indexOf('合作') != -1){
			alert("【平台类型】直签变更工单不能选择联通合作平台");
			return false;
		}
		return true;
	};

	/**
	 * 平台校验
	 * @returns {boolean}
	 */
	BGZQ.prototype.validateFZQD =function(){
		var qudao = $("#field0017").html();
		if(qudao!= "" && qudao.indexOf('联通合作客户') != -1){
			alert("【发展渠道】直签工单只能选择直签发展客户");
			return false;
		}
		return true;
	};

    /**
     * 校验企业当前状态
     * 业务终止：不允许发起任何类别的工单。仅在发起人处进行校验。
     * 业务恢复：允许任何变更，无需校验
     */
    BGZQ.prototype.validateState = function(){
        var state = $("#field0131").text();
        var selectState = $("#field0127_txt").val();
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
            if(selectState != ''){
                if(selectState.indexOf("业务恢复")!=-1){
                    alert("【状态变更】第一次提交状态变更不予许提交恢复工单");
                    return false;
                }
            }
        }
        //计费时间
		/*var timeCheck = selectState == "业务暂停"|| selectState == "业务恢复"||selectState == "业务终止";
		if(timeCheck){
			if($("#field0078").val() == ""){
				alert("【计费需求】请填写计费时间");
				return false;
			}
		}*/
        return true;
    };


	/**
	 * 当选择缴费变更的时候
	 * 缴费号码变背景色  设置disabled为 false
	 * 否则相反
	 *
	 */
	BGZQ.prototype.initJFHM = function(){
		if($("#field0137").is(":checked")){
			$("#field0019").attr("disabled",false);

		}else{
			$("#field0019").attr("disabled",true);
		}
	};

	/**
	 * 校验缴费号码
	 */
	BGZQ.prototype.validateJFHM = function(){

		if($("#field0137").is(":checked")){
			var hrsh1 =$("#field0019").val();

			var isPhoneNum = (hrsh1=='')?true:this.until_valiJfNum(hrsh1);
			console.log(isPhoneNum);
			console.log(hrsh1);
			if(!isPhoneNum){
				alert("【缴费号码】缴费号码应为10-14为数字，请重新填写。");
				$("#field0019").focus();
				return false;
			}
			return true;
		}
		return true;
	};


	/**
	 * 坐席电话
	 */
	BGZQ.prototype.initAgentNum = function(){
		var pingtai = $("#field0015").val();
		if($("#field0132").is(":checked")){
			$("#field0082").attr("disabled",false);
			$("#field0083").attr("disabled",false);
			$("#field0018_span").attr("disabled",false);
			$("#field0082").css('background','#FCDD8B');
			$("#field0083").css('background','#FCDD8B');
			$("#field0018_span").css('background','#FCDD8B');
			if(pingtai.indexOf("CCOD4.5平台") != -1){
				$("#field0141").attr("disabled",false);
				$("#field0142").attr("disabled",false);
				$("#field0143").attr("disabled",false);
			}
		}else{
			$("#field0082").attr("disabled",true);
			$("#field0083").attr("disabled",true);
			$("#field0018_span").attr("disabled",true);
			$("#field0082").css('background','');
			$("#field0083").css('background','');
			$("#field0018_span").css('background','');

			$("#field0082").val('');
			$("#field0083").val('');
			$("#field0018_span").val('');
			if(pingtai.indexOf("CCOD4.5平台") != -1){
				$("#field0141").attr("disabled",true);
				$("#field0142").attr("disabled",true);
				$("#field0143").attr("disabled",true);
			}
		}
	};

	/**
	 * 校验坐席电话
	 */
	BGZQ.prototype.validateAgentNum = function(){
		if($("#field0132").is(":checked")){
			if(!($("#field0079").is(":checked")||$("#field0080").is(":checked")||$("#field0144").is(":checked"))){
				alert("【坐席电话】必须选择坐席电话中一个选项");
				return false;
			}
			var addAgentNum = $("#field0082").val();
			var delAgentNum = $("#field0083").val();
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
			var agentTel = $("#field0018_span").children(":first").next();
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
	BGZQ.prototype.initOutNum = function(){
		if($("#field0133").is(":checked")){
			$("#field0084").attr("disabled",false);
			$("#field0085").attr("disabled",false);
			$("#field0020_span").attr("disabled",false);
			$("#field0170_span").attr("disabled",false);
			$("#field0084").css('background','#FCDD8B');
			$("#field0085").css('background','#FCDD8B');
			$("#field0020_span").css('background','#FCDD8B');
			$("#field0170_span").css('background','#FCDD8B');
		}else{
			$("#field0084").attr("disabled",true);
			$("#field0085").attr("disabled",true);
			$("#field0020_span").attr("disabled",true);
			$("#field0170_span").attr("disabled",true);
			$("#field0084").css('background','');
			$("#field0085").css('background','');
			$("#field0020_span").css('background','');
			$("#field0170_span").css('background','');

			$("#field0084").val('');
			$("#field0085").val('');
			$("#field0020_span").val('');
			$("#field0170_span").val('');
		}
	};
	/**
	 * 校验外显号码
	 */
	BGZQ.prototype.validateOutNum = function(){
		if($("#field0133").is(":checked")){
			//外显文本框
			var addOutNum = $("#field0084").val();
			var delOutNum = $("#field0085").val();


			var isPhoneNum = (addOutNum=='')?true:_bgzq.until_valiPhoneNum(addOutNum);
			isPhoneNum = isPhoneNum && ((delOutNum=='')?true:_bgzq.until_valiPhoneNum(delOutNum));

			if(!isPhoneNum){
				alert("【外显号码】电话格式不正确，请重新填写。");
				$("#field0126").focus();
				return false;
			}
			//坐席号码附件
			var addAgentTel = $("#field0020_span").children(":first").next();
			var addAgentTelChilds = addAgentTel.children();

			var delAgentTel = $("#field0170_span").children(":first").next();
			var delAgentTelChilds = delAgentTel.children();
			if(addAgentTelChilds.length !=0 && addAgentNum != ""){
				alert("【坐席电话】添加坐席电话和附件不能同时输入");
				return false;
			}
			if(delAgentTelChilds.length !=0 && delAgentNum != ""){
				alert("【坐席电话】减少坐席电话和附件不能同时输入");
				return false;
			}
		}
		return true;
	};

	/**
	 * 服务资费中的数量变更
	 */
	BGZQ.prototype.initFWZFNum = function(){
		if($("#field0130").is(":checked")){
			$("input[name=field0086]").attr("disabled",false);
			$("input[name=field0087]").attr("disabled",false);
			$("input[name=field0088]").attr("disabled",false);
			$("input[name=field0089]").attr("disabled",false);
			$("input[name=field0090]").attr("disabled",false);
			$("input[name=field0091]").attr("disabled",false);
			$("input[name=field0092]").attr("disabled",false);
			$("input[name=field0146]").attr("disabled",false);
			$("input[name=field0154]").attr("disabled",false);
			$("#field0093").attr("disabled",false);
			$("#field0094").attr("disabled",false);
			$("#field0095").attr("disabled",false);
			$("#field0096").attr("disabled",false);
			$("#field0097").attr("disabled",false);
			$("#field0098").attr("disabled",false);
			$("#field0099").attr("disabled",false);
			$("#field0148").attr("disabled",false);
			$("#field0156").attr("disabled",false);

			$("#field0093").css('background','#FCDD8B');
			$("#field0094").css('background','#FCDD8B');
			$("#field0095").css('background','#FCDD8B');
			$("#field0096").css('background','#FCDD8B');
			$("#field0097").css('background','#FCDD8B');
			$("#field0098").css('background','#FCDD8B');
			$("#field0099").css('background','#FCDD8B');
			$("#field0148").css('background','#FCDD8B');
			$("#field0156").css('background','#FCDD8B');
		}else{
			$("input[name=field0086]").attr("disabled",true);
			$("input[name=field0087]").attr("disabled",true);
			$("input[name=field0088]").attr("disabled",true);
			$("input[name=field0089]").attr("disabled",true);
			$("input[name=field0090]").attr("disabled",true);
			$("input[name=field0091]").attr("disabled",true);
			$("input[name=field0092]").attr("disabled",true);
			$("input[name=field0146]").attr("disabled",true);
			$("input[name=field0154]").attr("disabled",true);
			$("#field0093").attr("disabled",true);
			$("#field0094").attr("disabled",true);
			$("#field0095").attr("disabled",true);
			$("#field0096").attr("disabled",true);
			$("#field0097").attr("disabled",true);
			$("#field0098").attr("disabled",true);
			$("#field0099").attr("disabled",true);
			$("#field0148").attr("disabled",true);
			$("#field0156").attr("disabled",true);

			$("#field0093").css('background','');
			$("#field0094").css('background','');
			$("#field0095").css('background','');
			$("#field0096").css('background','');
			$("#field0097").css('background','');
			$("#field0098").css('background','');
			$("#field0099").css('background','');
			$("#field0148").css('background','');
			$("#field0156").css('background','');

			$("#field0093").val("");
			$("#field0094").val("");
			$("#field0095").val("");
			$("#field0096").val("");
			$("#field0097").val("");
			$("#field0098").val("");
			$("#field0099").val("");
			$("#field0148").val("");
			$("#field0156").val("");
		}
	};

	/**
	 * 数量校验  所有的数量一组必填（勾选了数量变更）
	 *
	 */
	BGZQ.prototype.validateNum = function(){
		if($("#field0130").is(":checked")){
			var ivr =  $("input[name=field0086]").is(":checked");
			var tts =  $("input[name=field0087]").is(":checked");
			var zdwb = $("input[name=field0088]").is(":checked");
			var yzd =  $("input[name=field0089]").is(":checked");
			var tjfx = $("input[name=field0090]").is(":checked");
			var zxly = $("input[name=field0091]").is(":checked");
			var wzd =  $("input[name=field0092]").is(":checked");
			var kejia= $("input[name=field0146]").is(":checked");
			var wbjqr= $("input[name=field0154]").is(":checked");

			var ivrVal =  $("#field0093").val();
			var ttsVal =  $("#field0094").val();
			var zdwbVal = $("#field0095").val();
			var yzdVal =  $("#field0096").val();
			var tjfxVal = $("#field0097").val();
			var zxlyVal = $("#field0098").val();
			var wzdVal =  $("#field0099").val();
			var kejiaVal =$("#field0148").val();
			var wbjqrVal= $("#field0156").val();

			if(!(ivr||tts||zdwb||yzd||tjfx||zxly||wzd||kejia||wbjqr)){
				alert("【服务资费信息】变动类型单选框最少填写一个");
				return false;
			}

			if(ivrVal == "" &&ttsVal == "" &&zdwbVal == "" &&yzdVal == ""
				&&tjfxVal == "" &&zxlyVal == "" &&wzdVal== ""&kejiaVal== ""&&wbjqrVal== ""){
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
			var kejiaTest = (kejia&& kejiaVal !="") || (!kejia&&kejiaVal == "");
			var wbjqrTest = (wbjqr&& wbjqrVal !="") || (!wbjqr&&wbjqrVal == "");
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
			if(!kejiaTest){
				alert("【服务资费信息】选择客+变动类型和填写变更数量必须同时填写或同时不填写");
				return false;
			}
			if(!wbjqrTest){
				alert("【服务资费信息】选择文本机器人变动类型和填写变更数量必须同时填写或同时不填写");
				return false;
			}
			return true;
		}
		return true;
	};


	/**
	 * 服务资费中的服务类型和单价
	 */
	BGZQ.prototype.initFWZFType = function(){
		if($("#field0134").is(":checked")){

			$("#field0041").attr("disabled",false);
			$("#field0042").attr("disabled",false);
			$("#field0043").attr("disabled",false);
			$("#field0044").attr("disabled",false);
			$("#field0045").attr("disabled",false);
			$("#field0046").attr("disabled",false);
			$("#field0047").attr("disabled",false);
			$("#field0152").attr("disabled",false);
			$("#field0160").attr("disabled",false);

			$("#field0041").css('background','#FCDD8B');
			$("#field0042").css('background','#FCDD8B');
			$("#field0043").css('background','#FCDD8B');
			$("#field0044").css('background','#FCDD8B');
			$("#field0045").css('background','#FCDD8B');
			$("#field0046").css('background','#FCDD8B');
			$("#field0047").css('background','#FCDD8B');
			$("#field0152").css('background','#FCDD8B');
			$("#field0160").css('background','#FCDD8B');
		}else{
			$("#field0041").attr("disabled",true);
			$("#field0042").attr("disabled",true);
			$("#field0043").attr("disabled",true);
			$("#field0044").attr("disabled",true);
			$("#field0045").attr("disabled",true);
			$("#field0046").attr("disabled",true);
			$("#field0047").attr("disabled",true);
			$("#field0152").attr("disabled",true);
			$("#field0160").attr("disabled",true);

			$("#field0041").css('background','');
			$("#field0042").css('background','');
			$("#field0043").css('background','');
			$("#field0044").css('background','');
			$("#field0045").css('background','');
			$("#field0046").css('background','');
			$("#field0047").css('background','');
			$("#field0152").css('background','');
			$("#field0160").css('background','');

			$("#field0041").val('');
			$("#field0042").val('');
			$("#field0043").val('');
			$("#field0044").val('');
			$("#field0045").val('');
			$("#field0046").val('');
			$("#field0047").val('');
			$("#field0152").val('');
			$("#field0160").val('');
		}
	};

	/**
	 * 校验服务资费中的服务类型和单价
	 */
	BGZQ.prototype.validateType = function(){
		if($("#field0134").is(":checked")){

			var ivrVal=   $("#field0041").val();
			var ttsVal=   $("#field0042").val();
			var zdwbVal = $("#field0043").val();
			var yzdVal=   $("#field0044").val();
			var tjfxVal = $("#field0045").val();
			var zxlyVal = $("#field0046").val();
			var wzdVal =  $("#field0047").val();
			var kejiaVal =$("#field0152").val();
			var wbjqrVal= $("#field0160").val();

			if(ivrVal == "" &&ttsVal == "" &&zdwbVal == "" &&yzdVal == ""
				&&tjfxVal == "" &&zxlyVal == "" &&wzdVal== ""&&kejiaVal== ""&&wbjqrVal== ""){
				alert("【服务资费信息】变更数量列最少填写一个");
				return false;
			}
			return true;
		}
		return true;
	};

    /**
     *校验所有的其他选择选项中的文本是否填写
     */
    BGZQ.prototype.validateOtherText =function(){
        var value = $("input[name=field0022]:checked").attr("value");
        if(value != null){
            if(value == "-2683795712946518790"){//其他
                if($("#field0023").val() == ""){
                    alert("【业务系统】请填写业务系统类型中的其他");
                    return false;
                }
            }
        }
        //有终端其它
        var value1 = $("input[name=field0026]:checked").attr("value");
        if(value1 != null){
            if (value1 == "5567501390920437337") {//其他
                if($("#field0027").val() == ""){
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
    BGZQ.prototype.validateZdxq = function(){
		var zdxq = $("input[name=field0026]:checked").val();
        if($("#field0024").is(":checked")){
            if(typeof (zdxq) == "undefined" || zdxq == ""){
                alert("【终端需求】选择了有终端，必须选择有终端的具体选项");
                return false;
            }
            return true;
        }
      return true;
    };

    /**
     * 计费需求变更
     */
    BGZQ.prototype.initDZH = function(){

        if($("#field0138").is(":checked")){
            $("#field0058").attr("disabled",false);
            $("#field0081").attr("disabled",false);
            $("#field0068").attr("disabled",false);
			$("#field0059_txt").attr("disabled",false);
			$("#field0060").attr("disabled",false);

            $("#field0061").attr("disabled",false);
            $("#field0062").attr("disabled",false);
            $("#field0063").attr("disabled",false);
            $("#field0064").attr("disabled",false);
            $("#field0065").attr("disabled",false);
            $("#field0066").attr("disabled",false);

            $("#field0058").css('background','#FCDD8B');
            $("#field0081").css('background','#FCDD8B');
            $("#field0068").css('background','#FCDD8B');
            $("#field0059_txt").css('background','#FCDD8B');
			$("#field0060").css('background','#FCDD8B');
        }else{
			$("#field0058").attr("disabled",true);
			$("#field0081").attr("disabled",true);
			$("#field0068").attr("disabled",true);
			$("#field0059_txt").attr("disabled",true);
			$("#field0060").attr("disabled",true);

			$("#field0061").attr("disabled",true);
			$("#field0062").attr("disabled",true);
			$("#field0063").attr("disabled",true);
			$("#field0064").attr("disabled",true);
			$("#field0065").attr("disabled",true);
			$("#field0066").attr("disabled",true);

			$("#field0058").css('background','');
			$("#field0081").css('background','');
			$("#field0068").css('background','');
			$("#field0059_txt").css('background','');
			$("#field0060").css('background','');

			$("#field0058").val('');
			$("#field0081").val('');
			$("#field0068").val('');
			$("#field0059_txt").val('');
			$("#field0060").val('');
        }
    };

    /**
     * 计费需求变更
     */
    BGZQ.prototype.validateDZH = function(){
        if($("#field0138").is(":checked")){
            var thzf = $("#field0058");//通话资费
            var han = $("#field0081");//含多少分钟
            var yuan = $("#field0068");//含多少分钟
            var ztyh = $("#field0059_txt");//整体优惠 平均每坐席
            var chaochu = $("#field0060");//超出部分按照

			var group1 = thzf.val() == "";
			//有一个不为空
			var group2 = han.val() != "" || yuan.val() != ""||ztyh.val() != "" ||chaochu.val() != "";
			//有一个为空
			var group2_1= han.val() == "" || yuan.val() == ""||ztyh.val() == "" ||chaochu.val() == "";
			//全部为空
			var group2_2 = han.val() == ""&& yuan.val() == "" && ztyh.val() == "" &&chaochu.val() == "";
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

			//填写了group2但是没有填写完
			if(group1 && group2_1 && group2){
				alert("【定制化资费】除了通话资费的其余行需要全部填写");
				return false;
			}

			var ivrsh = $("#field0061");
            var ivrct = $("#field0062");
            var zxsh =  $("#field0063");
            var zxct =  $("#field0064");
            var whsh =  $("#field0065");
            var whct =  $("#field0066");

			var check = group1 && group2_2;
            check = check && (!ivrsh.is(":checked")&&!ivrct.is(":checked")&&!zxsh.is(":checked")&&!zxct.is(":checked")&&!whsh.is(":checked")&&!whct.is(":checked"));

            if(check){
                alert("【定制化资费】选择定制化资费变更，至少填写定制化资费里的一项");
                return false;
            }
        }
        return true;
    };

	/**
	 * 话费资费变更
	 */
	BGZQ.prototype.initHFZF = function(){
		if($("#field0140").is(":checked")){
			$("input[name=field0028]").attr("disabled",false);
			$("input[name=field0030]").attr("disabled",false);
		/*	$("input[name=field0056]").attr("disabled",false);
			$("input[name=field0057]").attr("disabled",false);
			var jf = $("input[name=field0057]:checked").attr("value");*/
			/*if(typeof (jf) !="undefined" && jf!=""&&jf=="-1244957151022398219"){

				$("#field0071").attr("disabled",false);
				$("#field0072").attr("disabled",false);
				$("#field0073").attr("disabled",false);
				$("#field0074").attr("disabled",false);
				$("#field0075").attr("disabled",false);
				$("#field0076").attr("disabled",false);

				$("#field0071").css("background","#FCDD8B");
				$("#field0072").css("background","#FCDD8B");
				$("#field0073").css("background","#FCDD8B");
				$("#field0074").css("background","#FCDD8B");
				$("#field0075").css("background","#FCDD8B");
				$("#field0076").css("background","#FCDD8B");
			}else {
				$("#field0071").attr("disabled", true);
				$("#field0072").attr("disabled", true);
				$("#field0073").attr("disabled", true);
				$("#field0074").attr("disabled", true);
				$("#field0075").attr("disabled", true);
				$("#field0076").attr("disabled", true);

				$("#field0071").css("background", "");
				$("#field0072").css("background", "");
				$("#field0073").css("background", "");
				$("#field0074").css("background", "");
				$("#field0075").css("background", "");
				$("#field0076").css("background", "");

				$("#field0071").val("");
				$("#field0072").val("");
				$("#field0073").val("");
				$("#field0074").val("");
				$("#field0075").val("");
				$("#field0076").val("");
			}*/
		}else{
			$("input[name=field0028]").attr("disabled",true);
			$("input[name=field0030]").attr("disabled",true);
			/*$("input[name=field0056]").attr("disabled", true);
			$("input[name=field0057]").attr("disabled", true);*/
		}
	};
	/**
	 * 校验计费需求
	 */
	BGZQ.prototype.validateHFZF = function(){
		if($("#field0140").is(":checked")){
			/*var jf = $("input[name=field0057]:checked").attr("value");
			if(typeof (jf) !="undefined" && jf!=""&&jf=="-1244957151022398219") {
				var check = $("input[name=field0056]").is(":checked");
				check = check || $("input[name=field0057]").is(":checked");
				check = check || $("#field0071").val() != "" || $("#field0072").val() != "" || $("#field0073").val() != ""
					|| $("#field0074").val() != "" || $("#field0075").val() != "" || $("#field0076").val() != "";
*/
			var check = $("input[name=field0028]").is(":checked");
			check = check ||$("input[name=field0030]").is(":checked");
				if (!check) {
					alert("【计费需求】选择计费需求变更就必须选中一个单项按钮");
					return false;
				}
			return true;
		}
		return true;
	};

	/**
	 * 初始化计费时间
	 */
	BGZQ.prototype.initJFSj = function(){
		var check = $("#field0130").is(":checked");
		check = check || $("#field0134").is(":checked");
		check = check || $("#field0138").is(":checked");
		check = check || $("#field0140").is(":checked");

		if(check){
			$("#field0078").attr("disabled",false);
			$("#field0078").css('background','#FCDD8B');
		}else{
			$("#field0078").attr("disabled",true);
			$("#field0078").css('background','');
		}
	};
	/**
	 * 校验计费时间
	 */
	BGZQ.prototype.validateJFSj = function(){
		var check = $("#field0130").is(":checked");
		check = check || $("#field0134").is(":checked");
		check = check || $("#field0138").is(":checked");
		check = check || $("#field0139").is(":checked");
		check = check || $("#field0140").is(":checked");
		check = check || $("#field0128").is(":checked");
		check = check || ($("#field0127_txt").val() !="");

		if(check){
			if($("#field0078").val() == ""){
				alert("【计费需求】请填写计费需求中的计费时间");
				return false;
			}else{
				var userTime = $("#field0078").val();
				if(!_bgzq.until_valiTime(userTime)){
					alert("【操作日期】操作日期格式不正确");
					return false;
				}
				var arys= userTime.split('-');
				var month =  arys[1] -1;
				var d = new Date(arys[0], month, arys[2]).format("yyyy-MM-dd");
				var curDate=new Date().format("yyyy-MM-dd");
				if(d < curDate){
					alert("【操作日期】操作日期不能小于当前日期");
					return false;
				}
			}

		}
		return true;
	};

	/**
	 * 初始化合同
	 */
	BGZQ.prototype.initHT = function(){

		var check = $("#field0139").is(":checked");

		if(check){
			$("#field0010").attr("disabled",false);
			$("#field0010").css('background','#FCDD8B');
		}else{
			$("#field0010").attr("disabled",true);
			$("#field0010").val("");
		}
	};
	/**
	 * 校验合同
	 */
	BGZQ.prototype.validateHT = function(){
		var check = $("#field0139").is(":checked");

		if(check){
			if($("#field0010").val() == ""){
				alert("【合同变更】请填写合同编号");
				$("#field0010").focus();
				return false;
			}
		}
		return true;
	};

	/**
	 * 初始化客户名称
	 */
	BGZQ.prototype.initName = function(){

		var check = $("#field0128").is(":checked");

		if(check){
			$("#field0009").attr("disabled",false);
			$("#field0009").css('background','#FCDD8B');
		}else{
			$("#field0009").attr("disabled",true);
			//$("#field0009").val("");
		}
	};
	/**
	 * 校验客户名称
	 */
	BGZQ.prototype.validateName = function(){
		var check = $("#field0128").is(":checked");

		if(check){
			if($("#field0009").val() == ""){
				alert("【合同变更】请填写合同编号");
				$("#field0009").focus();
				return false;
			}
		}
		return true;
	};

	/**
	 * 设置所有单选 点击选中再点击取消
	 */
	BGZQ.prototype.radiocheck = function () {
		$(":radio").each(function () {
			if (/*$(this).val() != 8035373081964597131 && $(this).val() != -8429465311877512806
				&& $(this).val() != -9150741835358384558 && $(this).val() != 8136235184967075191
				&& $(this).val() != -2683795712946518790 &&*/ $(this).val() != 3911880719776501017
				&& $(this).val() != 1883269994569024117 && $(this).val() != -5010749408830733596
				&& $(this).val() != -567094536524971470 && $(this).val() != 5567501390920437337
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
	BGZQ.prototype.ywxt = function(){
		var value = $("input[name=field0022]:checked").attr("value");
		if(value == "-2683795712946518790"){//其他
			$("#field0023").attr("disabled",false);
			$("#field0023").css('background','#FCDD8B');
		}else{
			$("#field0023").val("");
			$("#field0023").attr("disabled",true);
			$("#field0023").css('background','');
		}

		if(value == "8035373081964597131"){//客+
			var pingtai = $("#field0015").val();
			if(pingtai.indexOf("CCOD4.5平台") == -1){//不是ccod4.5平台 不能选择客+
				alert("【业务系统类型】不是4.5平台不能选择客+");
			}
			$.each($("input[name=field0026]"),function(key,val){
				if(val.value == "3911880719776501017"){
					$(this).attr("checked",true);
				}
			});
		}
		if(value == "-8429465311877512806" || value == "-9150741835358384558"){ //选择客服通或电销通
			$.each($("input[name=field0026]"),function(key,val){
				if(val.value == "-5010749408830733596"){
					$(this).attr("checked",true);
				}
			});
		}
	};

	/**
	 * 终端需求联动关系
	 * 有终端中 选择其他 _后面不能填写
	 */
	BGZQ.prototype.zdxq = function(){
		var value = $("input[name=field0026]:checked").attr("value");
		if (value == "5567501390920437337") {//其他
			$("#field0027").attr("disabled", false);
			$("#field0027").css('background','#FCDD8B');
		} else {
			$("#field0027").val("");
			$("#field0027").attr("disabled", true);
			$("#field0027").css('background','');
		}
		if( $("input[name=field0026]").is(":checked")){
            $("#field0024").attr("checked",true);
        }else{
            $("#field0024").attr("checked",false);
        }


	};
	/**
	 * 有终端联动
	 */
	BGZQ.prototype.yzd = function(){
		var isCheck = $("#field0024").is(":checked");
		if(!isCheck){
			$("input[name=field0026]").each(function(key,val){
				$(this).attr("checked",false);
			});
		}
	};


	BGZQ.prototype.elements = {
		"field0004":{id : "field0004",	type : "text",		name : "要求完成时间",initDisable:true},
		"field0009":{id : "field0009",	type : "text",		name : "企业名称",initDisable:true},
		"field0010":{id : "field0010",	type : "text",		name : "合同编号",initDisable:true},


		"field0082":{id : "field0082",	type : "text",		name : "坐席电话增加",initDisable:true},
		"field0083":{id : "field0083",	type : "text",		name : "坐席电话减少",initDisable:true},
		"field0018_span":{id : "field0018_span",	type : "span",		name : "坐席电话上传附件",initDisable:true},

		"field0084":{id : "field0084",	type : "text",		name : "外显号增加",initDisable:true},
		"field0085":{id : "field0085",	type : "text",		name : "外显号减少",initDisable:true},
		"field0020_span":{id : "field0020_span",	type : "span",		name : "上传外显号增加附件",initDisable:true},
		"field0170_span":{id : "field0170_span",	type : "span",		name : "上传外显号增加附件",initDisable:true},
		"field0077_span":{id : "field0077_span",	type : "span",		name : "外显反馈结果"},

		"field0019":{id : "field0019",	type : "text",		name : "缴费号码",initDisable:true},

		"field0141":{id : "field0141",	type : "checkbox",name : "文本/IM坐席",initDisable:true},
		"field0142":{id : "field0142",	type : "checkbox",name : "坐席语音",initDisable:true},
		"field0143":{id : "field0143",	type : "checkbox",name : "视频坐席",initDisable:true},


		"field0028":{id : "field0028",	type : "radio",		name : "计费方式授权"},
		"field0028":{id : "field0028",	type : "radio",		name : "计费方式分机"},
		"field0028":{id : "field0028",	type : "radio",		name : "计费方式其他"},
		"field0029":{id : "field0029",	type : "text",		name : "计费方式其他文本框"},


		"field0030":{id : "field0030",	type : "radio",		name : "计费模式全月、半月、天"},
		"field0030":{id : "field0030",	type : "radio",		name : "计费模式全月、半月"},
		"field0030":{id : "field0030",	type : "radio",		name : "计费模式天"},
		"field0078":{id : "field0078",	type : "text",		name : "计费时间"},

		"field0146":{id : "field0146",	type : "radio",		name : "客+增加",initDisable:true},
		"field0146":{id : "field0146",	type : "radio",		name : "客+减少",initDisable:true},

		"field0086":{id : "field0086",	type : "radio",		name : "IVR增加",initDisable:true},
		"field0086":{id : "field0086",	type : "radio",		name : "IVR减少",initDisable:true},

		"field0087":{id : "field0087",	type : "radio",		name : "TTS增加",initDisable:true},
		"field0087":{id : "field0087",	type : "radio",		name : "TTS减少",initDisable:true},

		"field0088":{id : "field0088",	type : "radio",		name : "自动外拨增加",initDisable:true},
		"field0088":{id : "field0088",	type : "radio",		name : "自动外拨减少",initDisable:true},

		"field0154":{id : "field0154",	type : "radio",		name : "文本机器人增加",initDisable:true},
		"field0154":{id : "field0154",	type : "radio",		name : "文本机器人减少",initDisable:true},

		"field0089":{id : "field0089",	type : "radio",		name : "有终端坐席增加",initDisable:true},
		"field0089":{id : "field0089",	type : "radio",		name : "有终端坐席减少",initDisable:true},


		"field0090":{id : "field0090",	type : "radio",		name : "统计分析增加",initDisable:true},
		"field0090":{id : "field0090",	type : "radio",		name : "统计分析减少",initDisable:true},

		"field0091":{id : "field0091",	type : "radio",		name : "坐席录音增加",initDisable:true},
		"field0091":{id : "field0091",	type : "radio",		name : "坐席录音减少",initDisable:true},

		"field0092":{id : "field0092",	type : "radio",		name : "无终端增加",initDisable:true},
		"field0092":{id : "field0092",	type : "radio",		name : "无终端减少",initDisable:true},

		"field0093":{id : "field0093",	type : "text",		name : "IVR变更数量",initDisable:true},
		"field0094":{id : "field0094",	type : "text",		name : "TTS变更数量",initDisable:true},
		"field0095":{id : "field0095",	type : "text",		name : "自动外拨变更数量",initDisable:true},
		"field0096":{id : "field0096",	type : "text",		name : "有终端坐席变更数量",initDisable:true},
		"field0097":{id : "field0097",	type : "text",		name : "统计分析变更数量",initDisable:true},
		"field0098":{id : "field0098",	type : "text",		name : "坐席录音变更数量",initDisable:true},
		"field0099":{id : "field0099",	type : "text",		name : "无终端变更数量",initDisable:true},
		"field0148":{id : "field0148",	type : "text",		name : "客+变更数量",initDisable:true},
		"field0156":{id : "field0156",	type : "text",		name : "文本机器人变更数量",initDisable:true},


		"field0041":{id : "field0041",	type : "text",		name : "IVR单价",initDisable:true},
		"field0042":{id : "field0042",	type : "text",		name : "TTS单价",initDisable:true},
		"field0043":{id : "field0043",	type : "text",		name : "自动外拨单价",initDisable:true},
		"field0044":{id : "field0044",	type : "text",		name : "有终端坐席单价",initDisable:true},
		"field0045":{id : "field0045",	type : "text",		name : "统计分析单价",initDisable:true},
		"field0046":{id : "field0046",	type : "text",		name : "坐席录音单价",initDisable:true},
		"field0047":{id : "field0047",	type : "text",		name : "无终端单价",initDisable:true},
		"field0152":{id : "field0152",	type : "text",		name : "客+单价",initDisable:true},
		"field0160":{id : "field0160",	type : "text",		name : "文本机器人单价",initDisable:true},

		"field0023":{id : "field0023",	type : "text",		name : "业务系统其他",initDisable:true},
		"field0027":{id : "field0027",	type : "text",		name : "终端需求其他",initDisable:true},

		"field0022":{id : "field0034",	type : "radio",		name : "业务系统按钮"},
		"field0026":{id : "field0038",	type : "radio",		name : "终端需求"},
		"field0024":{id : "field0024",	type : "checkbox",		name : "有终端"}
	};

	/*事件注册*/
	BGZQ.prototype.events = {
		"field0022":{event:"click",func:"ywxt"},
		"field0026":{event:"click",func:"zdxq"},
		"field0024":{event:"click",func:"yzd"}
	};

	/** **************工具函数********************** */
	BGZQ.prototype.until_valiPhoneNum = function(tel) {
		var isPhoneNum = false;
		// 手机正则表达式
		var mp_reg = /^\d{5,16}$/;
		if (mp_reg.test(tel)) {
			isPhoneNum = true;
		}
		return isPhoneNum;
	};
	BGZQ.prototype.until_valiJfNum = function(tel) { // 缴费号码
		var isPhoneNum = false;
		// 手机正则表达式
		var mp_reg = /^\d{10,14}$/;
		if (mp_reg.test(tel)) {
			isPhoneNum = true;
		}
		return isPhoneNum;
	};

		BGZQ.prototype.until_valiTime = function(tel) {//校验时间格式
			var isTime = false;
			// 手机正则表达式
			var mp_reg = /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])$/;
			if (mp_reg.test(tel)) {
				isTime = true;
			}
			return isTime;
		};
}
