// CCOD业务上线计费受理单
//srciptObj = document.createElement("script");
//srciptObj.language = "javaScript";
//srciptObj.type = "text/JavaScript";
//srciptObj.src = "../qn/ccod_sxjf.js";
//document.head.appendChild(srciptObj);
//
//srciptObj = document.createElement("script");
//srciptObj.language = "javaScript";
//srciptObj.type = "text/JavaScript";
//srciptObj.src = "../qn/ccod_sxjf_view.js";
//document.head.appendChild(srciptObj);
//
//// CCOD试用
//srciptObj = document.createElement("script");
//srciptObj.language = "javaScript";
//srciptObj.type = "text/JavaScript";
//srciptObj.src = "../qn/ccod_sysl.js";
//document.head.appendChild(srciptObj);
//
//// CCOD试用延期
//srciptObj = document.createElement("script");
//srciptObj.language = "javaScript";
//srciptObj.type = "text/JavaScript";
//srciptObj.src = "../qn/ccod_ywyq.js";
//document.head.appendChild(srciptObj);
//
//// CCOD平台迁移
//srciptObj = document.createElement("script");
//srciptObj.language = "javaScript";
//srciptObj.type = "text/JavaScript";
//srciptObj.src = "../qn/ccod_ptqy.js";
//document.head.appendChild(srciptObj);
//
//// CCOD业务状态变更受理单
//srciptObj = document.createElement("script");
//srciptObj.language = "javaScript";
//srciptObj.type = "text/JavaScript";
//srciptObj.src = "../qn/ccod_ywztbg.js";
//document.head.appendChild(srciptObj);

var qnObjs = {};

$(document).ready(function() {
	try {
		if ($("#_testbutton")) {
			$("#_testbutton").click(function() {
				qnValidate();
			});
		}
	} catch (e) {
	}
});
function qnValidate() {
	var valiResult = true;
	var title = $("#subject").val();

	if (title.indexOf("上线计费") != -1 && qnObjs.sxjf) {
		valiResult = qnObjs.sxjf.validate();
	} else if (title.indexOf("试用工单-直签") != -1 && qnObjs.syzq) {
		valiResult = qnObjs.syzq.validate();
	}else if(title.indexOf("试用工单-联通")!= -1 && qnObjs.sylt){
		valiResult = qnObjs.sylt.validate();
	}else if (title.indexOf("平台迁移单") != -1 && qnObjs.ptqy) {
		valiResult = qnObjs.ptqy.validate();
	} else if (title.indexOf("延期工单") != -1 && qnObjs.ywyq) {
		valiResult = qnObjs.ywyq.validate();
	} else if (title.indexOf("状态变更单") != -1 && qnObjs.ywztbg) {
		valiResult = qnObjs.ywztbg.validate();
	} else if (title.indexOf("业务变更单") != -1 && qnObjs.ywbg) {
		valiResult = qnObjs.ywbg.validate();
	} else if (title.indexOf("调账受理单") != -1 && qnObjs.tzsl) {
		valiResult = qnObjs.tzsl.validate();
	}else if (title.indexOf("成本支付申请单") != -1 && qnObjs.cbzf) {
		valiResult = qnObjs.cbzf.validate();
	}
	return valiResult;
}
