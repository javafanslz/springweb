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

    if (title.indexOf("上线计费工单-联通") != -1 && qnObjs.jflt) {
        valiResult = qnObjs.jflt.validate();
    } else if (title.indexOf("上线计费工单-直签") != -1 && qnObjs.jfzq) {
        valiResult = qnObjs.jfzq.validate();
    } else if (title.indexOf("试用工单-直签") != -1 && qnObjs.syzq) {
        valiResult = qnObjs.syzq.validate();
    }else if(title.indexOf("试用工单-联通")!= -1 && qnObjs.sylt){
        valiResult = qnObjs.sylt.validate();
    }else if (title.indexOf("平台迁移单-直签") != -1 && qnObjs.qyzq) {
        valiResult = qnObjs.qyzq.validate();
    } else if (title.indexOf("平台迁移单-联通") != -1 && qnObjs.qylt) {
        valiResult = qnObjs.qylt.validate();
    } else if (title.indexOf("延期工单-直签") != -1 && qnObjs.yqzq) {
        valiResult = qnObjs.yqzq.validate();
    }else if (title.indexOf("延期工单-联通") != -1 && qnObjs.yqlt) {
        valiResult = qnObjs.yqlt.validate();
    }  else if (title.indexOf("业务变更单-联通") != -1 && qnObjs.bglt) {
        valiResult = qnObjs.bglt.validate();
    } else if (title.indexOf("业务变更单-直签") != -1 && qnObjs.bgzq) {
        valiResult = qnObjs.bgzq.validate();
    }else if (title.indexOf("调账受理单") != -1 && qnObjs.tzsl) {
        valiResult = qnObjs.tzsl.validate();
    }else if (title.indexOf("成本支付申请单") != -1 && qnObjs.cbzf) {
        valiResult = qnObjs.cbzf.validate();
    }else if(title.indexOf("临时结算规则") != -1 &&qnObjs.lsjs){
    	valiResult = qnObjs.lsjs.validate();
	}
    return valiResult;
}
