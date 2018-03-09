

//tab：echarts展示元素，option：json格式echarts option参数,type图标类型 值table表格（不填写默认为table）、pie饼图

function echarts_Template(tab, option, type) {
	var myChart = echarts.init(tab);
	var json = {
		tooltip: {
			trigger: "axis",
			fontSize: 15,
		},
		legend: {
			x: "center",
			y: "bottom",
			textStyle: {
				color: "rgb(6, 215, 191)",
				fontSize: 14,
				fontWeight: "bold"
			}
		},
		series: [],
		color: ["#00bdda", "transparent", "#d35556", "#088df4", "#d68f23", "#098a6f", "#0078c2", "#526897"],
		title: {
			textStyle: {
				color: "rgb(204, 216, 214)",
				fontSize: 16
			},
			x: "center",
			textAlign: "left",
			backgroundColor: "rgba(0,0,0,0)"
		}
	};
	if (!type || type == "table") {
		json.xAxis = [{
			type: "category",
			splitLine: {
				show: true,
				lineStyle: {
					width: 1,
					color: "rgba(255, 255, 255, 0.2)"
				}
			},
			splitArea: {
				show: false
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: "rgba(255, 255, 255, 0.2)",
					width: 1
				}
			},
			axisTick: {
				show: false,
				inside: false
			},
			position: "bottom",
			axisLabel: {
				textStyle: {
					color: "rgb(4, 241, 213)",
					fontSize: 14,
					fontWeight: "bold"
				}
			}
		}];

		json.yAxis = [{
			type: "value",
			splitLine: {
				show: true,
				lineStyle: {
					width: 1,
					color: "rgba(255, 255, 255, 0.2)"
				}
			},
			splitArea: {
				show: false
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: "rgba(255, 255, 255, 0.2)",
					width: 1
				}
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: "rgb(4, 241, 213)",
					fontSize: 14,
					fontWeight: "bold"
				}
			}
		}];
	}
	$.extend(true, json, option);
	console.log(json);
	myChart.setOption(json);
	return myChart;
}