/**
 * qn.pagination.js
 * bootstrap分页组件
 * 依赖：jQuery、bootstrap、knockoutjs
 * @param qn
 */
(function(qn) {
	qn.pagination = function(id, requestParam, reader, successCallback) {

		var container = document.getElementById(id);

		/**
		 * 绘制分页栏
		 */
		(function(container) {
			var html = "";
			html += ("<ul class=\"pagination\" style=\"margin: 0;\" data-bind=\"visible: total() > 0\">");
			html += ("		<li>&nbsp;</li>");
			html += ("		<li><a href=\"#\" data-bind=\"click: firstPage\">首页</a></li>");
			html += ("");
			html += ("		<!-- ko if: 1 != currentPage() -->");
			html += ("		<li><a href=\"#\" data-bind=\"click: prevPage\">上一页</a></li>");
			html += ("		<!-- /ko -->");
			html += ("");
			html += ("		<!-- ko if: 1 == currentPage() -->");
			html += ("		<li class=\"disabled\"><span>上一页</span></li>");
			html += ("		<!-- /ko -->");
			html += ("");
			html += ("		<!-- ko foreach: pages -->");
			html += ("		<li data-bind=\"css: {\'active\': $data == $parent.currentPage()}\">");
			html += ("			<!-- ko if: $data != \'...\' -->");
			html += ("			<a href=\"#\" data-bind=\"text: $data, click: $parent.gotoPage\"></a>");
			html += ("			<!-- /ko -->");
			html += ("			<!-- ko if: $data == \'...\' -->");
			html += ("			<a>...</a>");
			html += ("			<!-- /ko -->");
			html += ("		</li>");
			html += ("		<!-- /ko -->");
			html += ("");
			html += ("		<!-- ko if: totalPage() != currentPage() -->");
			html += ("		<li><a href=\"#\" data-bind=\"click: nextPage\">下一页</a></li>");
			html += ("		<!-- /ko -->");
			html += ("");
			html += ("		<!-- ko if: totalPage() == currentPage() -->");
			html += ("		<li class=\"disabled\"><span>下一页</span></li>");
			html += ("		<!-- /ko -->");
			html += ("		");
			html += ("		<li><a href=\"#\" data-bind=\"click: lastPage\">末页</a></li>");
			html += ("		");
			html += ("		<li class=\"form-inline text-muted\" style=\"height: 34px; line-height: 34px;\">&nbsp;&nbsp;");
			html += ("			共<!-- ko text: totalPage --><!-- /ko -->页，<!-- ko text: total --><!-- /ko -->条记录");
			html += ("		</li>");
			html += ("		");
			html += ("		<li class=\"form-inline text-muted\" style=\"height: 34px; line-height: 34px;\">&nbsp;&nbsp;");
			html += ("			到第<form style=\"display: inline;\" data-bind=\"submit: setPage, css:{\'has-error\': currentPageTempError()}\">");
			html += ("				<input type=\"number\" class=\"form-control input-sm\" style=\"width: 60px;\" data-bind=\"textInput: currentPageTemp, attr:{min:1, max:totalPage}\">");
			html += ("			页 <button type=\"submit\" class=\"btn btn-default btn-sm\">确定</button></form>");
			html += ("		</li>");
			html += ("		");
			html += ("	</ul>");
			
			$(container).html(html);
		})(container);

		var pageSize = requestParam.pageSize;
		
		/**
		 * 发起ajax请求
		 */
		var doAjax = function(currentPage, totalSetter) {
			var url = requestParam.url;
			var data = requestParam.data;
			var pageSizeParam = requestParam.pageSizeParam;
			var pageParam = requestParam.pageParam;
			if (!data) {
				data = {};
			}
			if (typeof data == "function") {
				data = data.apply(null, []);
			}
			data[pageParam] = currentPage;
			data[pageSizeParam] = pageSize;

			var totalFunc = reader.total;
			$.ajax({
				url : url,
				data : data,
				type : "get",
				dataType : "json",
				cache : false,
				success : function(data) {
					var total = totalFunc.apply(null, [ data ]);
					totalSetter(total);
					successCallback.apply(null, [ data ]);
				}
			});
		};
		
		var ViewModel = function() {

			/**
			 * 每页数据条数
			 */
			this.pageSize = ko.observable(pageSize || 5);
			
			/**
			 * 总记录数
			 */
			this.total = ko.observable(0);
			
			/**
			 * 当前页码
			 */
			this.currentPage = ko.observable(1);
			
			/**
			 * 当前输入页码
			 */
			this.currentPageTemp = ko.observable(1);
			
			/**
			 * 总页数
			 */
			this.totalPage = ko.computed(function() {
				return this.total() % this.pageSize() == 0 ? this.total() / this.pageSize() : parseInt(this.total() / this.pageSize()) + 1;
			}, this);
			
			/**
			 * 页码列表
			 */
			this.pages = ko.computed(function() {
				var pages = [];
				
				if (this.totalPage() > 0) {
					
					// 显示当前页左右相邻2页
					var min = this.currentPage() - 2;
					var max = this.currentPage() + 2;
					
					// 第一页及省略号
					if (min <= 1) {
						min = 1;
					} else {
						pages.push(1);
						if (min > 2) {
							pages.push("...");
						}
					}
					if (max >= this.totalPage()) {
						max = this.totalPage();
					}
					
					// 当前页相邻页
					for (var i = min; i <= max; i++) {
						pages.push(i);
					}
					
					// 省略号
					if (max < this.totalPage() - 1) {
						pages.push("...");
					}
					
					// 最后一页
					if (max < this.totalPage()) {
						pages.push(this.totalPage());
					}
				}
				
				return pages;
			}, this);

			/**
			 * 点击页码跳转
			 */
			this.gotoPage = function(page) {
				if (page != this.currentPage()) {
					this.currentPage(page);
					this.currentPageTemp(page);
					doAjax(this.currentPage(), this.total);
				}
			}.bind(this);

			/**
			 * 输入页码跳转
			 */
			this.setPage = function() {
				if (this.currentPageTemp() && !this.currentPageTempError()) {
					if (this.currentPage() != parseInt(this.currentPageTemp())) {
						this.currentPage(parseInt(this.currentPageTemp()));
						doAjax(this.currentPage(), this.total);
					}
				}
				return false;
			}.bind(this);
			
			/**
			 * 页码输入框校验
			 */
			this.currentPageTempError = ko.computed(function() {
				var tempPage = this.currentPageTemp();
				if (tempPage) {
					return isNaN(tempPage) || parseInt(tempPage) < 1 || parseInt(tempPage) > this.totalPage();
				}
				return false;
			}, this);
			
			/**
			 * 下一页
			 */
			this.nextPage = function() {
				this.currentPage(this.currentPage() + 1);
				this.currentPageTemp(this.currentPage());
				doAjax(this.currentPage(), this.total);
			}.bind(this);

			/**
			 * 上一页
			 */
			this.prevPage = function() {
				this.currentPage(this.currentPage() - 1);
				this.currentPageTemp(this.currentPage());
				doAjax(this.currentPage(), this.total);
			}.bind(this);
			
			/**
			 * 首页
			 */
			this.firstPage = function() {
				if (1 != this.currentPage()) {
					this.currentPage(1);
					this.currentPageTemp(this.currentPage());
					doAjax(this.currentPage(), this.total);
				}
			}.bind(this);
			
			/**
			 * 末页
			 */
			this.lastPage = function() {
				if (this.currentPage() != this.totalPage()) {
					this.currentPage(this.totalPage());
					this.currentPageTemp(this.currentPage());
					doAjax(this.currentPage(), this.total);
				}
			}.bind(this);

			/**
			 * 重新加载当前页数据
			 */
			this.load = function() {
				doAjax(this.currentPage(), this.total);
			}.bind(this);
			
			/**
			 * 重新加载第一页数据
			 */
			this.reload = function() {
				this.currentPage(1);
				this.currentPageTemp(1);
				this.load();
			}.bind(this);
		};

		var vm = new ViewModel();
		ko.applyBindings(vm, container);
		vm.load();

		return {
			load : function() { vm.load(); },
			reload : function() { vm.reload(); }
		};
	};
	
	window.qn = qn;
})(window.qn || {});
