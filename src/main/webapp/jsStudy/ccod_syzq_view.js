$(document).ready(function() {
	try {
		var title = $("font[size=5]").html();
		if (title.indexOf("CCOD业务试用受理单-直签") != -1) {
			title = $("#subject").val();
			if (!title) {
				var syzq_view = new SYZQ_VIEW();
				syzq_view.initView();
			}
		}
	} catch (e) {
	}
});

/**
 * 直签试用
 */
function SYZQ_VIEW() {
	var _syzq_view = this;

	SYSL_VIEW.prototype.initView = function() {
		this.initTrObjs();
		this.hideTrObjs();
		this.showFjDiv();
		
		// 业务系统类型 其他
		if ($("input[name=field0035]:checked").attr("value") == 3288302870514713075) {
			$("#field0036").attr("disabled", false);
		}
		// 终端需求其他
		if ($("input[name=field0039]:checked").attr("value") == -1122618658103079534) {
			$("#field0040").attr("disabled", false);
		}
		if($('#field0146').is(':checked')){
			$.each(_syzq_view.PSTN.field0146,function(key,value){
				var obj = $("#"+key);
				var attrs = obj.attrs;
				$.each(attrs,function(attrKey,attrValue){
					obj.attr(attrKey, attrValue);
				});
			});
		}
	};
	SYSL_VIEW.prototype.PSTN = {
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
	SYSL_VIEW.prototype.showFjDiv = function(){
		var khfzqd = $("#field0020");
		var khfzqd_num = khfzqd.text();
		var pltName = $("#field0017").text();
		
		//外显文本框
		var outNum1 = $("#field0142");
		var outNum2 = $("#field0143");
		var outNum3 = $("#field0144");
		
		var yz_outNum1 = $("#field0142").text();
		var yz_outNum2 = $("#field0143").text();
		var yz_outNum3 = $("#field0144").text();
		
		//外显附件
		var attachment = $("#field0029_span").children(":first").next();
		var attachmentChilds = attachment.children();
		
		if (khfzqd_num.indexOf("联通")!=-1){
			_syzq_view.trs.zhfkjg_txt.hide();
			_syzq_view.trs.zhfkjg_fj.hide();
			
			_syzq_view.trs.hmgszm_txt.hide();
			_syzq_view.trs.hmgszm_fj.hide();
			_syzq_view.trs.wxhmzqs_txt.hide();
			_syzq_view.trs.wxhmzqs_fj.hide();
			
			_syzq_view.trs.scxxyj_txt.show();
			_syzq_view.trs.scxxyj_fj.show();
		}else{
			_syzq_view.trs.scxxyj_txt.hide();
			_syzq_view.trs.scxxyj_fj.hide();
		}
		
		if(yz_outNum1=='' && yz_outNum2 == '' && yz_outNum3=='' && attachmentChilds.length==0){
			_syzq_view.trs.zhfkjg_txt.hide();
			_syzq_view.trs.zhfkjg_fj.hide();
			
			_syzq_view.trs.hmgszm_txt.hide();
			_syzq_view.trs.hmgszm_fj.hide();
			_syzq_view.trs.wxhmzqs_txt.hide();
			_syzq_view.trs.wxhmzqs_fj.hide();
			
			return ;
		}
		
		if(khfzqd_num==""){
			_syzq_view.trs.zhfkjg_txt.hide();
			_syzq_view.trs.zhfkjg_fj.hide();
			
			_syzq_view.trs.hmgszm_txt.hide();
			_syzq_view.trs.hmgszm_fj.hide();
			_syzq_view.trs.wxhmzqs_txt.hide();
			_syzq_view.trs.wxhmzqs_fj.hide();
			
			return;
		}
		//-373091421883121058联通客户 | "8141723194883722334"直签客户
		if (khfzqd_num == "直签客户" && pltName.indexOf("江苏电信") != -1) {  //江苏电信
			_syzq_view.trs.zhfkjg_txt.show();
			_syzq_view.trs.zhfkjg_fj.show();
			
			_syzq_view.trs.hmgszm_txt.hide();
			_syzq_view.trs.hmgszm_fj.hide();
			_syzq_view.trs.wxhmzqs_txt.hide();
			_syzq_view.trs.wxhmzqs_fj.hide();
			
		}else if (khfzqd_num == "直签客户" && pltName.indexOf("江苏电信") == -1){//不是江苏电信
			_syzq_view.trs.zhfkjg_txt.hide();
			_syzq_view.trs.zhfkjg_fj.hide();
			
			_syzq_view.trs.hmgszm_txt.show();
			_syzq_view.trs.hmgszm_fj.show();
			_syzq_view.trs.wxhmzqs_txt.show();
			_syzq_view.trs.wxhmzqs_fj.show();
			

		}else{
			_syzq_view.trs.zhfkjg_txt.hide();
			_syzq_view.trs.zhfkjg_fj.hide();
			
			_syzq_view.trs.hmgszm_txt.hide();
			_syzq_view.trs.hmgszm_fj.hide();
			_syzq_view.trs.wxhmzqs_txt.hide();
			_syzq_view.trs.wxhmzqs_fj.hide();
		}
	};
	SYSL_VIEW.prototype.hideTrObjs = function() {
		$.each(_syzq_view.trs,function(key,val){
			if(val){
				val.hide();
			}
		});
	};
	SYSL_VIEW.prototype.trs={};
	SYSL_VIEW.prototype.initTrObjs = function() {

	}
}