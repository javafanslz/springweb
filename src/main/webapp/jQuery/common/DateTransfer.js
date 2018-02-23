/** 转换时间的格式 */
function setFullTime(dateStart, dateEnd) {
	startMonth = dateStart.getMonth() + 1;
	endMonth = dateEnd.getMonth() + 1;
	startDate = dateStart.getDate();
	endDate = dateEnd.getDate();
	if (startMonth < 10) {
		startMonthString = '0' + startMonth;
	} else {
		startMonthString = startMonth;
	}
	if (endMonth < 10) {
		endMonthString = '0' + endMonth;
	} else {
		endMonthString = endMonth;
	}
	if (startDate < 10) {
		startDateString = '0' + startDate;
	} else {
		startDateString = startDate;
	}
	if (endDate < 10) {
		endDateString = '0' + endDate;
	} else {
		endDateString = endDate;
	}
	/*document.getElementById("d1").value = dateStart.getFullYear() + '-'
			+ startMonthString + '-' + startDateString + ' 00:00:00';
	document.getElementById("d2").value = dateEnd.getFullYear() + '-'
			+ endMonthString + '-' + endDateString + ' 00:00:00';*/
	return {
		start : dateStart.getFullYear() + '-' + startMonthString + '-' + startDateString + ' 00:00:00',
		end : dateEnd.getFullYear() + '-' + endMonthString + '-' + endDateString + ' 00:00:00'
	};
}
function dateTrunc(dateObj, scale) {
	var scales = {
		minute : 'minute',
		hour : 'hour',
		day : 'day',
		week : 'week',
		month : 'month',
		year : 'year'
	};
	var d;

	if (!(dateObj instanceof Date)) {
		return dateObj;
	}

	d = new Date(dateObj.setMilliseconds(0));

	if (scale == scales.minute) {
		return new Date(d.setSeconds(0));
	}
	d = new Date(d.setSeconds(0));
	if (scale == scales.hour) {
		return new Date(d.setMinutes(0));
	}
	d = new Date(d.setMinutes(0));
	if (scale == scales.day) {
		return new Date(d.setHours(0));
	}
	d = new Date(d.setHours(0));
	if (scale == scales.week) {
		var day_of_month = d.getDate();
		var day_of_week = d.getDay();
		/* day of month starts from 1, day of week starts from 0 */
		return new Date(d.setDate(day_of_month - day_of_week));
	}
	if (scale == scales.month) {
		return new Date(d.setDate(1));
	}
	d = new Date(d.setDate(1));
	if (scale == scales.year) {
		return new Date(d.setMonth(0));
	}
	return dateObj;
}

function dateAdd(dateObj, scale, amount) {
	var scales = {
		minute : 'minute',
		hour : 'hour',
		day : 'day',
		week : 'week',
		month : 'month',
		year : 'year'
	};
	var d;

	if (!(dateObj instanceof Date)) {
		return dateObj;
	}

	/* d is the milliseconds since 1970/1/1 */
	d = dateObj.getTime();

	if (scale == scales.minute) {
		return new Date(d + amount * 60 * 1000);
	} else if (scale == scales.hour) {
		return new Date(d + amount * 60 * 60 * 1000);
	} else if (scale == scales.day) {
		return new Date(d + amount * 24 * 60 * 60 * 1000);
	} else if (scale == scales.week) {
		return new Date(d + amount * 7 * 24 * 60 * 60 * 1000);
	} else if (scale == scales.month) {
		var m = dateObj.getMonth() + amount;
		var y = 0;
		while (m < 0) {
			m = m + 12;
			y = y - 1;
		}
		while (m > 11) {
			m = m - 12;
			y = y + 1;
		}
		y = dateObj.getFullYear() + y;
		return new Date(y, m, dateObj.getDate(), dateObj.getHours(), dateObj
				.getMinutes(), dateObj.getSeconds(), dateObj.getMilliseconds());
	} else if (scale == scales.year) {
		return new Date(dateObj.getFullYear() + amount, dateObj.getMonth(),
				dateObj.getDate(), dateObj.getHours(), dateObj.getMinutes(),
				dateObj.getSeconds(), dateObj.getMilliseconds());
	}
	return dateObj;
}

/** 快捷键 */
function onShortKey(shortKey) {
	var now = new Date();
	if (shortKey == 'yesterday') {
		dateEnd = dateTrunc(now, 'day');
		dateStart = dateAdd(dateEnd, 'day', -1);
		return setFullTime(dateStart, dateEnd);
	}
	if (shortKey == 'lastWeek') {
		dateEnd = dateTrunc(now, 'week');
		dateStart = dateAdd(dateEnd, 'week', -1);
		return setFullTime(dateStart, dateEnd);
	}
	if (shortKey == 'lastMonth') {
		dateEnd = dateTrunc(now, 'month');
		dateStart = dateAdd(dateEnd, 'month', -1);
		return setFullTime(dateStart, dateEnd);
	}
	if (shortKey == 'lastYear') {
		dateEnd = dateTrunc(now, 'year');
		dateStart = dateAdd(dateEnd, 'year', -1);
		return setFullTime(dateStart, dateEnd);
	}
	if (shortKey == 'today') {
		dateStart = dateTrunc(now, 'day');
		dateEnd = dateAdd(dateStart, 'day', 1);
		return setFullTime(dateStart, dateEnd);
	}
	if (shortKey == 'thisWeek') {
		dateStart = dateTrunc(now, 'week');
		dateEnd = dateAdd(dateStart, 'week', 1);
		return setFullTime(dateStart, dateEnd);
	}
	if (shortKey == 'thisMonth') {
		dateStart = dateTrunc(now, 'month');
		dateEnd = dateAdd(dateStart, 'month', 1);
		return setFullTime(dateStart, dateEnd);
	}
	if (shortKey == 'thisYear') {
		dateStart = dateTrunc(now, 'year');
		dateEnd = dateAdd(dateStart, 'year', 1);
		return setFullTime(dateStart, dateEnd);
	}
}

