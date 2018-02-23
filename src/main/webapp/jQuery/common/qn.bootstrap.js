/**
 * 基于Bootstrap封装的功能
 * 弹出框（包括确认框，输入框，提示信息）
 */
(function(window, $, APP) {
	"use strict";
	
	/**
	 * 设置ajax请求超时的处理
	 */
	(function ($) {
		$.ajaxSetup({
		    contentType : "application/x-www-form-urlencoded;charset=utf-8",
		    complete : function(xhr, textStatus) {  
		        // session超时
		        if (xhr.status == 911) {  
		        	top.location = APP.ctx;
		        	return;  
		        }  
		    }  
		}); 
	})($);
	
	var qn = {
		modal : function(message, title, okButton, option, callback, isInput, initValue, isConfirm, validateFunc) {
			var $modal = $(".qn-modal");
			option = option || {};
			if (!$modal.get(0)) {
				$modal = this.createModal();
			} 
			if (!title) {
				$modal.find(".modal-header").remove();
			} else {
				var $titleDiv = $modal.find(".modal-header");
				if (!$titleDiv.get(0)) {
					$modal.find(".modal-content").prepend("<div class=\"modal-header\"></div>");
					$titleDiv = $modal.find(".modal-header");
				}
				$titleDiv.html("<h4>" + title + "</h4>");
			}
			if (okButton) {
				var	okTitle = option.okTitle ? option.okTitle : "确定";
				var okClass = option.okClass ? option.okClass : "btn-primary";
				var $okButton = $modal.find(".modal-footer button." + okClass);
				
				// 如果找不到okClass的button，则创建一个
				if (!$okButton.get(0)) {
					$modal.find(".modal-footer").html("<button class=\"btn " + okClass + "\">" + okTitle + "</button>");
					$okButton = $modal.find(".modal-footer button." + okClass);
				} else {
					// 否则修改其样式及文字
					$okButton.removeClass().addClass("btn").addClass(okClass).text(okTitle);;
				}
				$okButton.unbind("click");
				$okButton.bind("click", function() {
					
					if (isInput) {
						var $input = $modal.find(".modal-body input");
						// 校验
						if (typeof validateFunc === "function") {
							//var validateResult = validateFunc.apply($input.val());
							var validateResult = validateFunc.apply(null, [$input.val()]);
							if (!validateResult) {
								$input.parent().addClass("has-error");
								return;
							} else {
								callback && callback($input.val());
							}
						} else {
							if (callback) {
								// 单输入框值返回
								if ($input.length == 1) {
									callback($input.val());
								} else if ($input.length > 1) {		// 多输入框值返回
									var values = [];
									$input.each(function() {
										values.push($(this).val());
									});
									callback(values);
								}
							}
							
						}
					} else if (isConfirm) {		// 确认框
						callback && callback(true); 
					} else {
						callback && callback(); 
					}
					
					$modal.modal('hide');
				});
			} else {
				$modal.find(".modal-footer button.btn-primary").remove();
			}
			
			// 取消按钮
			if (option.cancelButton) {
				var $cancelButton = $modal.find(".modal-footer button.btn-default");
				if (!$cancelButton.get(0)) {
					$modal.find(".modal-footer").append("<button class=\"btn btn-default\" data-dismiss=\"modal\">取消</button>");
				}
			} else {
				$modal.find(".modal-footer button.btn-default").remove();
			}
			$modal.find(".modal-body").html(message);
			if (initValue) {
				$modal.find(".modal-body input").val(initValue);
			}
			if (option.size) {
				var size = option.size;
				var addClass = "";
				if (size == "L") {
					addClass = "modal-lg";
				} else if (size == "S") {
					addClass = "modal-sm";
				}
				$modal.find(".modal-dialog").removeClass().addClass("modal-dialog");
				if (addClass) {
					$modal.find(".modal-dialog").addClass(addClass);
				}
			} else {
				$modal.find(".modal-dialog").removeClass().addClass("modal-dialog");
			}
			
			$modal.modal();
		},
		
		/**
		 * 输入框
		 */
		modalInput : function(title, tip, initValue, callback, validateFunc) {
			var body = "<p><input type='text' class='form-control' autofocus><label class='control-label text-muted'>" + tip + "</label></p>";
			this.modal(body, title, true, {size:'S', cancelButton:true}, callback, true, initValue, false, validateFunc);
		},
		
		/**
		 * 插入超链接弹出框
		 */
		createLink : function(callback) {
			var body = "<p><input class=\"form-control\" placeholder=\"链接文字\"></p>";
			body += "<p><input class=\"form-control\" placeholder=\"链接地址\"></p>";
			this.modal(body, "插入超链接", true, {size:'S', cancelButton:true}, callback, true, "", false, null);
		},
		
		/**
		 * 确认框
		 */
		confirm : function(message, option, callback) {
			option = option || {};
			this.modal(message, "确认", true, {
				size : 'S', 
				cancelButton : true, 
				okTitle : option.okTitle || "删除", 
				okClass : option.okClass || "btn-danger"
			}, callback, false, null, true);
		},
		
		/**
		 * 页面顶部提示消息
		 */
		tip : function(message, level) {
			var $tip = $("#qn-tip-div");
			if (!$tip.get(0)) {
				$tip = this.createTip();
			}
			$tip.text(message);
			$tip.removeClass("qn-tip-success qn-tip-danger qn-tip-warning");
			level = level || "success";
			$tip.addClass("qn-tip-" + level);
			var tipLeft = ($(window).width() - $tip.width()) / 2;
			$tip.css("left", tipLeft + "px");
			$tip.animate({top: 0}, 500, function() {
				setTimeout(function() {
					$tip.animate({top: -40}, 500);
				}, 2000);
			});
		},
		
		/**
		 * ajax提交模态框展示（正在执行/成功/失败）
		 * 
		 * param.url —— ajax提交URL
		 * param.data —— ajax提交参数
		 * param.successCondition —— 成功返回的条件，如 function(data) {return data.code == 0}
		 * param.successRedirectUrl —— 成功后的跳转URL
		 * param.loadingTitle —— 加载中提示内容
		 * param.successTitle —— 成功后提示内容
		 * param.failureTitle —— 失败后提示内容
		 */
		ajaxSubmit : function(param) {
			
			if (!$("#qn-processing-modal").get(0)) {
				this.createLoadingModal();
			}
			
			var url = param.url;
			var data = param.data;
			var successCondition = param.successCondition;
			var successRedirectUrl = param.successRedirectUrl;
			var loadingTitle = param.loadingTitle || "正在提交...";
			var successTitle = param.successTitle || "成功";
			var failureTitle = param.failureTitle || "失败";
			var autoRedirect = (typeof param.autoRedirect == "undefined") ? true : param.autoRedirect;
			
			$("#qn-loading-refresh-title").text(loadingTitle);
			$("#qn-loading-success-title").text(successTitle);
			$("#qn-loading-failure-title").text(failureTitle);
			$("#qn-loading-success-href").attr("href", successRedirectUrl);
			
			$("#qn-processing-modal").modal({backdrop: 'static'});
			
			$.ajax({
				url : url,
				type : "post",
				dataType : "json",
				data : data,
				success : function(data) {
					if (typeof successCondition == "function") {
						if (successCondition.apply(null, [data])) {
							
							// 成功1.5秒后提示成功
							setTimeout(function() {
								$("#qn-processing-modal").modal("hide");
								$("#qn-success-modal").modal({backdrop: 'static'});
							}, 1500);
							
							if (autoRedirect) {
								// 成功4秒后跳转
								setTimeout(function() {
									window.location.href = successRedirectUrl;
								}, 4000);
							}
							
						} else {
							setTimeout(function() {
								$("#qn-processing-modal").modal("hide");
								$("#qn-fail-modal").modal({backdrop: 'static'});
							}, 1000);
						}
					}
				},
				error : function() {
					setTimeout(function() {
						$("#qn-processing-modal").modal("hide");
						$("#qn-fail-modal").modal({backdrop: 'static'});
					}, 1000);
				}
			});
		},
		
		createModal : function() {
			var html = "";
			html += ("<div class=\"qn-modal modal fade\" role=\"dialog\" aria-hidden=\"true\">");
			html += ("	<div class=\"modal-dialog\">");
			html += ("		<div class=\"modal-content\">");
			html += ("			<div class=\"modal-header\"></div>");
			html += ("			<div class=\"modal-body\"></div>");
			html += ("			<div class=\"modal-footer\"></div>");
			html += ("		</div>");
			html += ("	</div>");
			html += ("</div>");
			$(document.body).append(html);
			return $(".qn-modal");
		},
		
		createTip : function() {
			var html = "<div id=\"qn-tip-div\" class=\"qn-tip\"></div>";
			$(document.body).append(html);
			return $("#qn-tip-div");
		},
		
		createLoadingModal : function() {
			var html = "";
			html += ("<div class=\"modal\" id=\"qn-success-modal\">");
			html += ("		<div class=\"modal-dialog\">");
			html += ("			<div class=\"modal-content\">");
			html += ("				<div class=\"modal-body\">");
			html += ("					<h3 class=\"text-center\" id=\"qn-loading-success\">");
			html += ("						<span class=\"glyphicon glyphicon-ok\"></span>&nbsp;&nbsp;");
			html += ("						<span id=\"qn-loading-success-title\"></span>");
			html += ("					</h3>");
			html += ("				</div>");
			html += ("				<div class=\"modal-footer\">");
			html += ("					<p class=\"text-muted text-center\">3秒后页面将跳转&nbsp;&nbsp;<a id=\"qn-loading-success-href\" href=\"#\">立即跳转</a></p>");
			html += ("				</div>");
			html += ("			</div>");
			html += ("		</div>");
			html += ("	</div>");
			html += ("	");
			html += ("	<div class=\"modal\" id=\"qn-fail-modal\">");
			html += ("		<div class=\"modal-dialog\">");
			html += ("			<div class=\"modal-content\">");
			html += ("				<div class=\"modal-body\">");
			html += ("					<h3 class=\"text-center\" id=\"qn-loading-failure\">");
			html += ("						<span class=\"glyphicon glyphicon-remove\"></span>&nbsp;&nbsp;");
			html += ("						<span id=\"qn-loading-failure-title\"></span>");
			html += ("					</h3>");
			html += ("				</div>");
			html += ("				<div class=\"modal-footer\">");
			html += ("					<p class=\"text-muted text-center\">请联系相关技术人员&nbsp;&nbsp;<a href=\"#\" data-dismiss=\"modal\">返回</a></p>");
			html += ("				</div>");
			html += ("			</div>");
			html += ("		</div>");
			html += ("	</div>");
			html += ("");
			html += ("	<div class=\"modal\" id=\"qn-processing-modal\">");
			html += ("		<div class=\"modal-dialog\">");
			html += ("			<div class=\"modal-content\">");
			html += ("				<div class=\"modal-body\">");
			html += ("					<h3 class=\"text-center text-muted\">");
			html += ("						<span class=\"glyphicon glyphicon-refresh\" id=\"qn-loading-refresh-icon\"></span>&nbsp;&nbsp;");
			html += ("						<span id=\"qn-loading-refresh-title\"></span></h3>");
			html += ("				</div>");
			html += ("				<div class=\"modal-footer\">");
			html += ("					<p class=\"text-muted text-center\">请稍后</p>");
			html += ("				</div>");
			html += ("			</div>");
			html += ("		</div>");
			html += ("	</div>");
			$(document.body).append(html);
		},
		
		log : function(msg) {
			if (window.console && window.console.log) {
				console.log(msg);
			}
		},
		
		// 格式化日期时间
		formatDate : function(date, format) {
			if (!format) {
				format = "yyyy-MM-dd hh:mm:ss";
			}
			
			var o = {
				"M+" : date.getMonth() + 1,
				"d+" : date.getDate(),
				"h+" : date.getHours(),
				"m+" : date.getMinutes(),
				"s+" : date.getSeconds(),
				"q+" : Math.floor((date.getMonth() + 3) / 3),
				"S" : date.getMilliseconds()
			}

			if (/(y+)/.test(format)) {
				format = format.replace(RegExp.$1, (date.getFullYear() + "")
						.substr(4 - RegExp.$1.length));
			}

			for (var k in o) {
				if (new RegExp("(" + k + ")").test(format)) {
					format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
							: ("00" + o[k]).substr(("" + o[k]).length));
				}
			}
			return format;
		}
	};
	
	window.qn = qn;
	
})(window, window.$, window.APP);