$(document).ready(function() {
    try {
        var title = $("#subject").val();
        if (title.indexOf("-延期工单-联通") != -1) {
            var yqlt = new YQLT();
            qnObjs.yqlt = yqlt;
            yqlt.initPage(yqlt);
        }
    } catch (e) {
    }
});

/**
 * 直签延期受理单
 */

function YQLT() {
    var _yqlt = this;

    // 初始化页面的方法
    YQLT.prototype.initPage = function(pageType) {
        try {
            this.initDisableComps();
            //$("#field0004").attr("disabled",true);
            //	$("#field0030")
            $(".xdLayout").bind("mouseover",function(){
                _yqlt.loadData();
            });
        } catch (e) {
        }
    };

    YQLT.prototype.initDisableComps = function() {
        $.each(_yqlt.elements, function(key, val) {
            if(val && val.initDisable){
                if(val.type =='radio'){
                    var _radios = $("input[name="+key+"]");
                    $.each(_radios,function(key,value){
                        _yqlt.disableComp($(this), true);
                    });
                }else{
                    var elem = $("#" + val.id);
                    if(elem.length == 1){
                        _yqlt.disableComp(elem, true);
                    }
                }
            }
        });
    };
    YQLT.prototype.disableComp = function(elem, val) {
        if (!elem || elem.length == 0) {
            return;
        }
        elem.attr("disabled", val);
    };
    YQLT.prototype.loadData = function(){
        // subID = "0000061388";
        // var st = "20160501";
        // var ed = "20160511";
        var _subID = $("#field0008").text();
        var _st = $("#field0018").text();
        var _ed = $("#field0030").val();

        $("#field0022").val('');
        $("#field0026").val('');
        $("#field0023").val('');
        $("#field0027").val('');

        $("#field0024").val('');
        $("#field0028").val('');
        $("#field0025").val('');
        $("#field0029").val('');

        $.ajax({
            type : "POST",
            async: false,
            url : "../callHistory.jsp",
            dataType : "text",
            data : {
                subID:_subID,
                st:_st, // 1代表添加，0代表不添加
                ed:_ed
            },
            success : function(data) {
                var newdata = data.replace(/\s/g,'').trim();
                //alert(newdata);
                newdata = jQuery.parseJSON(newdata);
                //alert(newdata.list.length);

                $("#field0022").val("");
                $("#field0026").val("");
                $("#field0023").val("");
                $("#field0027").val("");
                $("#field0024").val("");
                $("#field0028").val("");
                for(var _i=0;_i<newdata.list.length;_i++){
                    var obj = newdata.list[_i];
                    if(obj.serviceid=="beijing_ccod_num_ivr"){
                        $("#field0022").val(obj.nums);
                        $("#field0026").val(obj.min_unit);
                    }
                    if(obj.serviceid=="beijing_ccod_num_agent"){
                        $("#field0023").val(obj.nums);
                        $("#field0027").val(obj.min_unit);
                    }
                    if(obj.serviceid=="ccod_artificial_dialer_service"){
                        $("#field0024").val(obj.nums);
                        $("#field0028").val(obj.min_unit);
                    }
                }
            }
        });
    };

    YQLT.prototype.validate = function() {
        _yqlt.loadData();

        if(!_yqlt.validate_YQEmail()){
            return false;
        }
        return true;
    };

    //验证联通客户必选上传延期邮件
    //延期错误
    YQLT.prototype.validate_YQEmail = function() {
        //var yhlx = $("#field0016").text();
        // 延期邮件
        var attachment = $("#field0017_span").children(":first").next();
        var attachmentChilds = attachment.children();
        var temp = attachmentChilds.length;

        if (temp == 0) {
            alert("联通用户必须上传【延期邮件】！");
            // $(":contains('延期邮件')").parents("td").css("color", "red");
            return false;
        }

        return true;
    };

    YQLT.prototype.elements = {
        "field0004" : {id : "field0004",type : "text",name : "要求完成时间",initDisable : true},
        "field0030" : {id : "field0030",type : "text",name : "本次延期时间开始"},
        "field0031" : {id : "field0031",type : "text",name : "本次延期时间结束"},
        "field0032" : {id : "field0032",type : "textarea",name : "本次延期时间至"},
        "field0022" : {id : "field0022",type : "text",name : "IVR语音话单_呼入次数",initDisable : true},
        "field0023" : {id : "field0023",type : "text",name : "坐席接听话单_呼入次数",initDisable : true},
        "field0024" : {id : "field0024",type : "text",name : "手动坐席外呼话单_呼入次数",initDisable : true},
        "field0025" : {id : "field0025",type : "text",name : "自动坐席外呼话单_呼入次数",initDisable : true},
        "field0026" : {id : "field0026",type : "text",name : "IVR语音话单_通话计费时长",initDisable : true},
        "field0027" : {id : "field0027",type : "text",name : "坐席接听话单_通话计费时长",initDisable : true},
        "field0028" : {id : "field0028",type : "text",name : "手动坐席外呼话单_通话计费时长",initDisable : true},
        "field0029" : {id : "field0029",type : "text",name : "自动坐席外呼话单_通话计费时长",initDisable : true}
    };
}

