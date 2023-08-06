//格式化时间
export function formatDate(timer) {
	const year = timer.getFullYear()
	const month = timer.getMonth() + 1 // 由于月份从0开始，因此需加1
	const day = timer.getDate()
	const Time = `${year}-${month>9?month:'0'+month}-${day>9?day:'0'+day}`
	return Time

}
//获取请求的时间 ： 日 周 月 年
export function getTime() {

	return new Promise((resolve, reject) => {
		//天
		const today = getDate(0)
		const tomorrow = getDate(1)
		//周
		const weekStart = getMonday("s", 0)
		const weekEnd = getMonday("e", 0)
		//月
		const moonStart = getMonth("s", 0)
		const moonEnd = getMonth("e", 0)
		//年
		const yearStart = getYear("s", 0)
		const yearEnd = getYear("e", 0)

		const temp = {
			today,
			tomorrow,
			weekStart,
			weekEnd,
			moonStart,
			moonEnd,
			yearStart,
			yearEnd
		}
		resolve(temp)
	})



}

//type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表本天，-1代表上一个，1代表下一个

//获取当天时间
export function getDate(dates) {
	var dd = new Date();
	var n = dates || 0;
	dd.setDate(dd.getDate() + n);
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1;
	var d = dd.getDate();
	m = m < 10 ? "0" + m : m;
	d = d < 10 ? "0" + d : d;
	var day = y + "-" + m + "-" + d;
	return day;
};


//获取本周时间
export function getMonday(type, dates) {
	var now = new Date();
	var nowTime = now.getTime();
	var day = now.getDay();
	var longTime = 24 * 60 * 60 * 1000;
	var n = longTime * 7 * (dates || 0);
	if (type == "s") {
		var dd = nowTime - (day - 1) * longTime + n;
	};
	if (type == "e") {
		var dd = nowTime + (7 - day) * longTime + n;
	};
	dd = new Date(dd);
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1;
	var d = dd.getDate();
	m = m < 10 ? "0" + m : m;
	d = d < 10 ? "0" + d : d;
	var day = y + "-" + m + "-" + d;
	return day;
};

//获取本月
export function getMonth(type, months) {
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	if (Math.abs(months) > 12) {
		months = months % 12;
	};
	if (months != 0) {
		if (month + months > 12) {
			year++;
			month = (month + months) % 12;
		} else if (month + months < 1) {
			year--;
			month = 12 + month + months;
		} else {
			month = month + months;
		};
	};
	month = month < 10 ? "0" + month : month;
	var date = d.getDate();
	var firstday = year + "-" + month + "-" + "01";
	var lastday = "";
	if (month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month ==
		"12") {
		lastday = year + "-" + month + "-" + 31;
	} else if (month == "02") {
		if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
			lastday = year + "-" + month + "-" + 29;
		} else {
			lastday = year + "-" + month + "-" + 28;
		};
	} else {
		lastday = year + "-" + month + "-" + 30;
	};
	var day = "";
	if (type == "s") {
		day = firstday;
	} else {
		day = lastday;
	};
	return day;
};

//获取年
export function getYear(type, dates) {
	var dd = new Date();
	var n = dates || 0;
	var year = dd.getFullYear() + Number(n);
	if (type == "s") {
		var day = year + "-01-01";
	};
	if (type == "e") {
		var day = year + "-12-31";
	};
	if (!type) {
		var day = year + "-01-01/" + year + "-12-31";
	};
	return day;
};