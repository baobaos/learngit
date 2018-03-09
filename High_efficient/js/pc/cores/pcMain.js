

//添加年份选择插件
$('.form_date').datetimepicker({
	language: 'zh-CN',
	format: 'yyyy-mm',
	todayBtn: 0,
	startView: 4,
	minView: 3,
	autoclose: 1,
	forceParse: 0,
	viewSelect: 'decade'
});

$('.form_date1').datetimepicker({
	language: 'zh-CN',
	format: 'yyyy',
	todayBtn: 0,
	startView: 4,
	maxView: 1,
	autoclose: 1,
	forceParse: 0,
	viewSelect: 'decade'
});

//清空文本框
$(".glyphicon-remove").parents().click(function() {
	$(this).prev().val("");
});

var myChart = null; //雷达图

indicatorData = [{
	name: '成绩',
	max: 100
}, {
	name: '基本开销',
	max: 100
}, {
	name: '额外开销',
	max: 100
}, {
	name: '高档开销',
	max: 100
}, {
	name: '娱乐消费',
	max: 100
},

];
var lineStyle = {
	normal: {
		width: 1,
		opacity: 0.5
	}
};

option = {
	tooltip: {
		trigger: 'item'
	},
	radar: {
		center: ['50%', '50%'],
		indicator: indicatorData,
		radius: '80%',
		splitNumber: 5,
		name: {
			textStyle: {
				color: '#03fbdb',
				fontSize: 16
			}
		},
		splitLine: {
			lineStyle: {
				color: '#3bc688',
				opacity: 0.5
			}
		},
		splitArea: {
			show: true,
			areaStyle: {
				color: '#1a8077',
				opacity: 0.4
			}
		},
		axisLine: {
			show: true,
			lineStyle: {
				color: '#178270',
				opacity: 0.5
			}
		}
	},
	series: [{
		name: '学生整体画像',
		type: 'radar',
		data: [
			[0, 0, 0, 0, 0]
		],
		areaStyle: {
			normal: {
				color: '#1f9e7e',
				opacity: 0.5
			}
		}
	}],
	title: {
		text: "",
		textStyle: {
			color: "#fff",
			fontSize: 18
		},
		top: "center",
		left: "center"
	}
};


//数据加载

var $map = $("#consumption_ranking");

if (result.stuAvg == null) {
	$map.html("<div class='nodata'>暂无数据.....</div>");
} else {
	//柱状图加载
	option.series[0].data[0][0] = result.stuAvg.gardeAvgValues;
	option.series[0].data[0][1] = result.stuAvg.consumeAvgValues;
	option.series[0].data[0][2] = result.stuAvg.onlineAvgValues;
	option.series[0].data[0][3] = result.stuAvg.creditAvgValues;
	option.series[0].data[0][4] = result.stuAvg.readAvgValues;
	option.title.text = result.stuAvg.compreAvgValues + "分";
	myChart = new echarts_Template($map[0], option, "pie");
}
if (result.stuAvg != null) {
//	将字符串以—分割成单个字符，把年月分开展示
	var PrArr = result.stuAvg.dataDate.split("-");
	$("#py").text(PrArr[0] + "年" + PrArr[1] + "月全校学生整体画像");
}
var myChart1 = null; //折线图

var option1 = {
	legend: {
		data: ["学生综合能力变化"]
	},
	xAxis: [{
		data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
	}],
	series: [{
		name: "学生综合能力变化",
		type: "line",
		data: [],
		symbol: "circle",
		itemStyle: {
			normal: {
				borderWidth: 2,
				borderColor: "rgb(255, 255, 255)"
			},
			emphasis: {
				borderWidth: 1,
				label: {
					show: false
				}
			}
		},
		symbolSize: 6,
		yAxisIndex: 0
	}],
	title: {
		text: ""
	}
};

//数据转换方法
//option 后台数据字段数组

function consumeAbilityList(option) {
	if (option.totalAvg == undefined || option.totalAvg == null) {
		return null;
	} else if (option.totalAvg.length == 0) {
		return null;
	} else {
		//返回参数
		var json = {};
		//获取年份
		var year = option.totalAvg[0].year;
		//每月上网在线人数
		var totalConsume = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		//写入各数组                    
		for (var i = 0; i < option.totalAvg.length; i++) {
			var nowmonth = parseInt(option.totalAvg[i].month);
			totalConsume[nowmonth - 1] = option.totalAvg[i].compreAvgValues;
		}
		//拼接json
		json.year = year;
		json.totalConsume = totalConsume;
		return json;
	}
}

//动态加载数据    
var $map1 = $("#consumption_ranking1");
//调用consumeAbilityList进行数据转换    
var json1 = consumeAbilityList(result);
if (json1 == null) {
	$map1.html("<div class='nodata'>暂无数据.....</div>");
} else {
	option1.series[0].data = json1.totalConsume;
	option1.title.text = json1.year + "年全校学生综合能力变化";
	myChart1 = new echarts_Template($map1[0], option1);
}


/* 查询学生整体画像 */
var loading = new Loading();
loading.init();
var alert1 = new Alert();
$("#month_average_search").click(function() {
	//判断cookie是否过期
	overdue();
	$("#py").text("");
	var text = $("#month_average_text").val();
	if (text == "") {
		alert1.content = "请选择时间！";
		alert1.init();
		alert1.show();
	} else {
		loading.show();
		var jsonStr = {
			"searchYearMonth": text
		};
		$.ajax({
			type: "post",
			url: 'skipMainPost?jsonStr=' + JSON.stringify(jsonStr),
			success: function(result) {
				$("#month_average_text").val("");
				loading.hide();
				result = JSON.parse(result);
				if (result.stuAvg == null) {
					$map.html("<div class='nodata'>暂无数据.....</div>");
				} else {
					//柱状图加载
					option.series[0].data[0][0] = result.stuAvg.gardeAvgValues;
					option.series[0].data[0][1] = result.stuAvg.consumeAvgValues;
					option.series[0].data[0][2] = result.stuAvg.onlineAvgValues;
					option.series[0].data[0][3] = result.stuAvg.creditAvgValues;
					option.series[0].data[0][4] = result.stuAvg.readAvgValues;
					option.title.text = result.stuAvg.compreAvgValues + "分";
					myChart = new echarts_Template($map[0], option, "pie");
					var PrArr = result.stuAvg.dataDate.split("-");
					$("#py").text(PrArr[0] + "年" + PrArr[1] + "月全校学生整体画像");
				}
			},
			error: function() {
				loading.hide();
				alert1.content = "查询失败!";
				alert1.init();
				alert1.show();
			}
		});
	}
});


/* 综合能力查询 */

$("#month_average_search1").click(function() {

	//判断cookie是否过期
	overdue();
	var text = $("#month_average_text1").val();
	if (text == "") {
		alert1.content = "请选择时间！";
		alert1.init();
		alert1.show();
	} else {
		loading.show();
		var jsonStr = {
			"searchYear": text
		};
		$.ajax({
			type: "post",
			url: 'skipMainPost?jsonStr=' + JSON.stringify(jsonStr),
			success: function(result) {
				$("#month_average_text1").val("");
				loading.hide();
				result = JSON.parse(result);
				var json1 = consumeAbilityList(result);
				if (json1 == null) {
					$map1.html("<div class='nodata'>暂无数据.....</div>");
				} else {
					option1.series[0].data = json1.totalConsume;
					option1.title.text = json1.year + "年学生综合能力变化";
					myChart1 = new echarts_Template($map1[0], option1);

				}
			},
			error: function() {
				loading.hide();
				alert1.content = "查询失败!";
				alert1.init();
				alert1.show();
			}
		});
	}
});