	/*
	 *@本js功能：学生消费页面代码
	 *@本js作者：王昆宇
	 *@编写时间：2017年1月20日
	 *@修改人：xzx     @修改时间：2017.4.27    @修改原因：frame框架跳转登陆页面跳转不出去    @修改位置或名称：交互事件添加cookie判断
	 */

	//添加年份选择插件
	$('.form_date').datetimepicker({
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
    
	/* 学习综合能力变化 */
	var myChart = null;
	//配置参数
	var option = {
		legend: {
			data: ["综合能力"]
		},
		xAxis: [{
			data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
		}],
		series: [{
			name: "综合能力",
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

	function ConsumptionTimes(option) {
		var json = {};
		var year = "";
		//食堂月消费次数
		var messCountList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		if (option.totalValuesList) {
			if (option.totalValuesList.length != 0) {
				year = option.totalValuesList[0].year;
				for (var i = 0; i < option.totalValuesList.length; i++) {
					messCountList[option.totalValuesList[i].month - 1] = option.totalValuesList[i].compreValues;
				}
				json.year = year;
				json.messCountList = messCountList;
			}
		}
		if ($.isEmptyObject(json)) {
			return null;
		} else {
			return json;
		}
	}

	var $map = $("#consumption_times");
	json = ConsumptionTimes(result);
	if (json == null) {
		$map.html("<div class='nodata'>暂无数据.....</div>");
	} else {
		option.series[0].data = json.messCountList;
		option.title.text = json.year + "年学生综合能力值变化";
		myChart = new echarts_Template($map[0], option);
	}
	// 第一部分结束



	// 学习排名变化
	var myChart1 = null;
	//第二部分 cansh
	//配置参数
	var option1 = {
		legend: {
			data: ["学习排名"]
		},
		xAxis: [{
			data: []
		}],
		series: [{
			name: "学习排名",
			type: "bar",
			data: [],
			barWidth: 50,
			//柱图宽度
			symbol: "circle",
			itemStyle: {
				normal: {
					borderWidth: 1,
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

	function ConsumptionTimes1(option) {
		if (option.gradesList.length == "0" && option.gradesList.length == "0") {
			return null;
		} else {
			var jsonData = {
				data1: "",
				data2: ""
			}; //创建数组集合便于取值
			var comaAilAnHighList = new Array; // 创建全校平均值数组
			var comAvgStuList = new Array; // 创建个人平均值数组
			if (option.gradesList.length != "0") {
				for (var i = 0; i < option.gradesList.length; i++) {
					comaAilAnHighList.push(option.gradesList[i].totalGrade); //总分
					comAvgStuList.push("第" + option.gradesList[i].semester + "学期"); //学期
				}

				//合成数组
				jsonData.data1 = comaAilAnHighList;
				jsonData.data2 = comAvgStuList;
			}

			return jsonData;
		}
	}

	var $map1 = $("#consumption_times1");
	//总消费
	var myChart2 = null;
	var option2 = {
		legend: {
			data: ["总消费"]
		},
		xAxis: [{
			data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
		}],
		series: [{
			name: "总消费",
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

	function ConsumptionTimes2(option) {
		var json = {};
		var year = "";
		//食堂月消费次数
		var messCountList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		if (option.sumConsumeList) {
			if (option.sumConsumeList.length != 0) {
				year = option.sumConsumeList[0].year;
				for (var i = 0; i < option.sumConsumeList.length; i++) {
					messCountList[option.sumConsumeList[i].month - 1] = option.sumConsumeList[i].totalConsumeMoney;
				}
				json.year = year;
				json.messCountList = messCountList;
			}
		}
		if ($.isEmptyObject(json)) {
			return null;
		} else {
			return json;
		}
	}
	var $map2 = $("#consumption_times2");


	//阅读能力变化

	var myChart3 = null;
	var option3 = {
		legend: {
			data: ["阅读能力"]
		},
		xAxis: [{
			data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
		}],
		series: [{
			name: "阅读能力",
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

	function ConsumptionTimes3(option) {
		var json = {};
		var year = "";
		//食堂月消费次数
		var messCountList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		if (option.readValuesList) {
			if (option.readValuesList.length != 0) {
				year = option.readValuesList[0].year;
				for (var i = 0; i < option.readValuesList.length; i++) {
					messCountList[option.readValuesList[i].month - 1] = option.readValuesList[i].readValues;
				}
				json.year = year;
				json.messCountList = messCountList;
			}
		}
		if ($.isEmptyObject(json)) {
			return null;
		} else {
			return json;
		}
	}
	var $map3 = $("#consumption_times3");



	//上网时长变化

	var myChart4 = null;
	var option4 = {
		legend: {
			data: ["上网时长"]
		},
		xAxis: [{
			data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
		}],
		series: [{
			name: "上网时长",
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

	function ConsumptionTimes4(option) {
		var json = {};
		var year = "";
		//食堂月消费次数
		var messCountList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		if (option.onLineList) {
			if (option.onLineList.length != 0) {
				year = option.onLineList[0].year;
				for (var i = 0; i < option.onLineList.length; i++) {
					messCountList[option.onLineList[i].month - 1] = option.onLineList[i].onlineDuration;
				}
				json.year = year;
				json.messCountList = messCountList;
			}
		}
		if ($.isEmptyObject(json)) {
			return null;
		} else {
			return json;
		}
	}
	var $map4 = $("#consumption_times4");

	//调用tab插件
	var arr = [function() {
		//动态加载数据				
		//调用consumeAbilityList进行数据转换
		json = ConsumptionTimes(result);
		if (json == null) {
			$map.html("<div class='nodata'>暂无数据.....</div>");
		} else {
			option.series[0].data = json.messCountList;
			option.title.text = json.year + "年学生综合能力值变化";
			myChart = new echarts_Template($map[0], option);
		}
	}, function() {
		//动态加载数据			
		//调用monthAverageList进行数据转换
		var json1 = ConsumptionTimes1(result);

		if (json1 == null) {
			$map1.html("<div class='nodata'>暂无数据.....</div>");
		} else {
			option1.series[0].data = json1.data1;
			option1.xAxis[0].data = json1.data2;
			option1.title.text = result.userId + "学生的成绩";

			myChart1 = new echarts_Template($map1[0], option1);
		}
	}, function() {
		json2 = ConsumptionTimes2(result);
		if (json2 == null) {
			$map2.html("<div class='nodata'>暂无数据.....</div>");
		} else {
			option2.series[0].data = json2.messCountList;
			option2.title.text = json2.year + "年学生总消费能力值变化";
			myChart2 = new echarts_Template($map2[0], option2);
		}
	}, function() {
		json3 = ConsumptionTimes3(result);
		if (json3 == null) {
			$map3.html("<div class='nodata'>暂无数据.....</div>");
		} else {
			option3.series[0].data = json3.messCountList;
			option3.title.text = json3.year + "年学生阅读能力值变化";
			myChart3 = new echarts_Template($map3[0], option3);
		}
	}, function() {
		json4 = ConsumptionTimes4(result);
		if (json4 == null) {
			$map4.html("<div class='nodata'>暂无数据.....</div>");
		} else {
			option4.series[0].data = json4.messCountList;
			option4.title.text = json4.year + "年学生上网时长值变化";
			myChart4 = new echarts_Template($map4[0], option4);
		}
	}];
	tab(arr);
	
	
	/* 查询学生消费能力变化 */
	var loading=new Loading();
	loading.init();
	var alert1=new Alert();		
	$("#seach_0").click(function(){
		//判断cookie是否过期
		overdue();
		var text=$("#changes_ability_text").val();
		if(text=="")
		{
			alert1.content="请选择年份！";
			alert1.init();
			alert1.show();				
		}else 
		{
			loading.show();
			var jsonStr={"searchYearOne":text,"userId":result.userId};
			jsonStr = JSON.stringify(jsonStr);
			$.ajax({
				type: 'post',
				url: 'getMyPortraitDetailPost',
				data: {
					'jsonStr': jsonStr
				},
	            success: function (result) {
	            	$("#changes_ability_text").val("");		            	
	            	loading.hide();
	            	result = JSON.parse(result);
	            	var json = ConsumptionTimes(result);
	        		if (json == null) {
	        			$map.html("<div class='nodata'>暂无数据.....</div>");
	        		} else {
	        			option.series[0].data = json.messCountList;
	        			option.title.text = json.year + "年学生综合能力值变化";
	        			myChart = new echarts_Template($map[0], option);
	        		}
	            },
				error: function() {	
					    loading.hide();
						alert1.content="查询失败!";
						alert1.init();
						alert1.show();
				}			
   			 });
		}			
	});	
	
	
	$("#seach_2").click(function(){
		//判断cookie是否过期
		overdue();
		var text=$("#changes_ability_text2").val();
		if(text=="")
		{
			alert1.content="请选择年份！";
			alert1.init();
			alert1.show();				
		}else 
		{
			loading.show();
			var jsonStr={"searchYearThree":text,"userId":result.userId};
			jsonStr = JSON.stringify(jsonStr);
			$.ajax({
				type: 'post',
				url: 'getMyPortraitDetailPost',
				data: {
					'jsonStr': jsonStr
				},
	            success: function (result) {
	            	$("#changes_ability_text2").val("");		            	
	            	loading.hide();
	            	result = JSON.parse(result);
	            	var json2 = ConsumptionTimes2(result);
	        		if (json2 == null) {
	        			$map2.html("<div class='nodata'>暂无数据.....</div>");
	        		} else {
	        			option2.series[0].data = json2.messCountList;
	        			option2.title.text = json2.year + "年学生总消费能力值变化";
	        			myChart2 = new echarts_Template($map2[0], option2);
	        		}
	            },
				error: function() {	
					    loading.hide();
						alert1.content="查询失败!";
						alert1.init();
						alert1.show();
				}			
   			 });
		}			
	});	
	
	
	
	$("#seach_3").click(function(){
		//判断cookie是否过期
		overdue();
		var text=$("#changes_ability_text3").val();
		if(text=="")
		{
			alert1.content="请选择年份！";
			alert1.init();
			alert1.show();				
		}else 
		{
			loading.show();
			var jsonStr={"searchYearFour":text,"userId":result.userId};
			jsonStr = JSON.stringify(jsonStr);
			$.ajax({
				type: 'post',
				url: 'getMyPortraitDetailPost',
				data: {
					'jsonStr': jsonStr
				},
	            success: function (result) {
	            	$("#changes_ability_text3").val("");		            	
	            	loading.hide();
	            	result = JSON.parse(result);
	            	var json3 = ConsumptionTimes3(result);
	        		if (json3 == null) {
	        			$map3.html("<div class='nodata'>暂无数据.....</div>");
	        		} else {
	        			option3.series[0].data = json3.messCountList;
	        			option3.title.text = json3.year + "年学生阅读能力值变化";
	        			myChart3 = new echarts_Template($map3[0], option3);
	        		}
	            },
				error: function() {	
					    loading.hide();
						alert1.content="查询失败!";
						alert1.init();
						alert1.show();
				}			
   			 });
		}			
	});	
	
	$("#seach_4").click(function(){
		//判断cookie是否过期
		overdue();
		var text=$("#changes_ability_text4").val();
		if(text=="")
		{
			alert1.content="请选择年份！";
			alert1.init();
			alert1.show();				
		}else 
		{
			loading.show();
			var jsonStr={"searchYearFive":text,"userId":result.userId};
			jsonStr = JSON.stringify(jsonStr);
			$.ajax({
				type: 'post',
				url: 'getMyPortraitDetailPost',
				data: {
					'jsonStr': jsonStr
				},
	            success: function (result) {
	            	$("#changes_ability_text4").val("");		            	
	            	loading.hide();
	            	result = JSON.parse(result);
	            	var json4 = ConsumptionTimes4(result);
	        		if (json4 == null) {
	        			$map4.html("<div class='nodata'>暂无数据.....</div>");
	        		} else {
	        			option4.series[0].data = json4.messCountList;
	        			option4.title.text = json4.year + "年学生上网时长值变化";
	        			myChart4 = new echarts_Template($map4[0], option4);
	        		}
	            },
				error: function() {	
					    loading.hide();
						alert1.content="查询失败!";
						alert1.init();
						alert1.show();
				}			
   			 });
		}			
	});	
	
	