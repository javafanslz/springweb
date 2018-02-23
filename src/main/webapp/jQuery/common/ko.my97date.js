/**
 * (C) Channelsoft.com File : ko.my97date.js Desc : Date : 2014年12月18日 Author :
 * mengchen
 */
ko.bindingHandlers.my97date = {
	init : function(element, valueAccessor, allBindings ) {
		
		var dateLt = allBindings.get("dateLt");
		var dateGt = allBindings.get("dateGt");
		
		var initParam = {
			dateFmt : 'yyyy-MM-dd HH:mm:ss',
			skin : 'twoer'
		};
		
		if (dateLt) {
			initParam.maxDate = "#F{$dp.$D('" + dateLt + "')}";
		}
		
		if (dateGt) {
			initParam.minDate = "#F{$dp.$D('" + dateGt + "')}";
		}
		
		$(element).bind("click", function() {
			WdatePicker(initParam);
		});
	},

	update : function(element, valueAccessor, allBindings) {
		var value = ko.unwrap(valueAccessor());
		$(element).val(value);
		$(element).bind("blur", function() {
			var value = $(this).val();
			valueAccessor()(value);
		});
	}
};