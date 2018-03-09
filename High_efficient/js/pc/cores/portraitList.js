/* 
 *综合能力强群体分析js文件
 *创建人：孟令超
 *创建日期:2017/02/14
 *修改日期:2017/03/10 修改人：邢智欣  修改内容：更换学生类型图片，更换雷达图下面文字
 *@修改人：xzx     @修改时间：2017.4.27    @修改原因：frame框架跳转登陆页面跳转不出去    @修改位置或名称：交互事件添加cookie判断
 **/



$(function() {

	var Loading1 = new Loading(); // loadng 盒子初始化
	Loading1.init(); // 插入loading 盒子
	var Alert1 = new Alert(); //弹出盒子初始化
	var confirm1 = new Confirm(); // 确定取消盒子初始化
	if (result.allPortraitList.length != "0" && result.allPortraitList != null) {//====> 判断当前页面是否有数据
		// 详情赋值
		$("#getMyPortraitDetail").attr('data_id', result.allPortraitList[0].userId);
		//学号赋值
		$("#userId").text("学号：" + result.allPortraitList[0].userId);
		//姓名赋值
		$("#studensName").text("姓名：" + result.allPortraitList[0].studensName);
		//性别赋值
		if (result.allPortraitList[0].studensSex == "1") {
			$("#studensSex").text("性别：女");
		} else if (result.allPortraitList[0].studensSex == "2") {
			$("#studensSex").text("姓名：男");
		}
		// 专业赋值
		$("#studensProfess").text("专业：" + result.allPortraitList[0].studensClass);
		// 班级赋值
		$("#studensClass").text("班级：" + result.allPortraitList[0].studensClass);
		// 学院赋值
		$("#studensCollege").text("学院：" + result.allPortraitList[0].collegeValue);
		if (result.allPortraitList[0].studenClassCode == "1") {
			$("#studenClassCode").text("学生类型：学习优秀");
		} else if (result.allPortraitList[0].studenClassCode == "2") {
			$("#studenClassCode").text("学生类型：上网沉迷");
		} else if (result.allPortraitList[0].studenClassCode == "3") {
			$("#studenClassCode").text("学生类型：喜欢阅读");
		} else if (result.allPortraitList[0].studenClassCode == "4") {
			$("#studenClassCode").text("学生类型：普通");
		}
	} else {//===> 当值不存在时 隐藏所有内容 输出暂无数据
		$("#people_icon").hide();
		$(".words_title1").hide();
		$(".responsive").hide();
		$(".form_bottom").append("<div class='nodata'>暂无数据.....</div>");
	}
	if (result.allPortraitList.length != "0" && result.allPortraitList != null) {//====> 防止无数据先判断下

		if (result.allPortraitList[0].gradStuFlag != undefined && result.allPortraitList[0].gradStuFlag != null) {
			$("#people_icon").show();
			$("#jy").css("display", "block");
			//====>  判断个个字段 确定个人肖像图片
			if (result.allPortraitList[0].gradStuFlag == "0") { // 高新
				if (result.allPortraitList[0].studensSex == "1") { //女
					$("#people_icon").attr("src", "../images/pc/icon_people_04.png");
				} else if (result.allPortraitList[0].studensSex == "2") { // 男
					$("#people_icon").attr("src", "../images/pc/icon_people_03.png");
				}
			} else if (result.allPortraitList[0].gradStuFlag == "1") { //考研
				if (result.allPortraitList[0].studensSex == "1") { //女
					$("#people_icon").attr("src", "../images/pc/icon_people_06.png");
				} else if (result.allPortraitList[0].studensSex == "2") { // 男
					$("#people_icon").attr("src", "../images/pc/icon_people_05.png");
				}
			} else if (result.allPortraitList[0].gradStuFlag == "2") { //毕业

				if (result.allPortraitList[0].studensSex == "1") { //女
					$("#people_icon").attr("src", "../images/pc/icon_people_02.png");
				} else if (result.allPortraitList[0].studensSex == "2") { // 男
					$("#people_icon").attr("src", "../images/pc/icon_people_01.png");
				}
			}
		} else {
			$("#people_icon").show();
			if (result.allPortraitList[0].studenClassCode == "1") { // 学习
				if (result.allPortraitList[0].studensSex == "1") { //女
					$("#people_icon").attr("src", "../images/pc/icon_people_12.png");
				} else if (result.allPortraitList[0].studensSex == "2") { // 男
					$("#people_icon").attr("src", "../images/pc/icon_people_11.png");
				}
			} else if (result.allPortraitList[0].studenClassCode == "2") { //上网沉迷
				if (result.allPortraitList[0].studensSex == "1") { //女
					$("#people_icon").attr("src", "../images/pc/icon_people_10.png");
				} else if (result.allPortraitList[0].studensSex == "2") { // 男
					$("#people_icon").attr("src", "../images/pc/icon_people_09.png");
				}
			} else if (result.allPortraitList[0].studenClassCode == "3") { // 阅读
				if (result.allPortraitList[0].studensSex == "1") { //女;
					$("#people_icon").attr("src", "../images/pc/icon_people_12.png");
				} else if (result.allPortraitList[0].studensSex == "2") { // 男
					$("#people_icon").attr("src", "../images/pc/icon_people_11.png");
				}
			} else if (result.allPortraitList[0].studenClassCode == "4") { // 普通
				if (result.allPortraitList[0].studensSex == "1") { //女
					$("#people_icon").attr("src", "../images/pc/icon_people_08.png");
				} else if (result.allPortraitList[0].studensSex == "2") { // 男
					$("#people_icon").attr("src", "../images/pc/icon_people_07.png");
				}
			}

		}


		//搜索赋值
		$("#s_userId").val(result.userId);
		$("#s_collegeValue").val(result.collegeValue);
		$("#s_professValue").val(result.professValue);
		$("#s_studensClass").val(result.studensClass);

		var myChart = null; //雷达图

		indicatorData = [{  //====> 定义雷达图 每个顶点元素名称
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
			name: '娱乐开销',
			max: 100
		}];
		
		var lineStyle = {  //====> 定义雷达图整体边框 和透明度
			normal: {
				width: 1,
				opacity: 0.6
			}
		};

		option = {
			legend: {  //====> 定义图例
				data: ["本月综合能力值", "全校综合能力平均值"],
				x: "center",
				y: "bottom",
				textStyle: {
					color: "rgb(4, 241, 213)",
					fontSize: 14,
					fontWeight: "bold"
				},
				icon: 'roundRect'
			},
			tooltip: {
				trigger: 'item'
			},
			radar: { //====> 定义每个元素的各类参数
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
			series: [{  //====> 定义数据
				name: '本月综合能力值',
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
			}, {
				name: '全校综合能力平均值',
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
			title: {  //====> 定义标题
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

		if (result.allPortraitList[0] == null) {
			$map.html("<div class='nodata'>暂无数据.....</div>");
		} else {
/* name: '成绩',
            max: 100
        }, {
            name: '消费',
            max: 100
        }, {
            name: '上网',
            max: 100
        }, {
            name: '信用',
            max: 100
        }, {
            name: '阅读',
            max: 100
        },*/
			//柱状图加载
			option.series[0].data[0][0] = result.allPortraitList[0].gardeValues;
			option.series[0].data[0][1] = result.allPortraitList[0].consumeValues;
			option.series[0].data[0][2] = result.allPortraitList[0].onlineValues;
			option.series[0].data[0][3] = result.allPortraitList[0].creditValues;
			option.series[0].data[0][4] = result.allPortraitList[0].readValues;
			option.title.text = result.allPortraitList[0].compreValues + "分";

			option.series[1].data[0][0] = result.allPortraitList[0].gardeAvgValues;
			option.series[1].data[0][1] = result.allPortraitList[0].consumeAvgValues;
			option.series[1].data[0][2] = result.allPortraitList[0].onlineAvgValues;
			option.series[1].data[0][3] = result.allPortraitList[0].creditAvgValues;
			option.series[1].data[0][4] = result.allPortraitList[0].readAvgValues;
			option.title.text = result.allPortraitList[0].compreValues + "分";

			myChart = new echarts_Template($map[0], option, "pie");
		}
		//画像时间
		$("#dataDate").text("画像时间：" + result.allPortraitList[0].dataDate);
		//评语
		$("#py").text("评语：" + result.allPortraitList[0].remarkMsg);

		//循环输出列表
		if (result.allPortraitList.length != "0" && result.allPortraitList != null) {
			for (var i = 0; i < result.allPortraitList.length; i++) {
				$("#tbody_box").append('<tr class="gradeX">' + '<td>' + result.allPortraitList[i].userId + '</td>' + //id
				'<td style="padding-left: 0px;text-align: left;">' + result.allPortraitList[i].collegeValue + '</td>' + //学院
				' <td style="padding-left: 0px;text-align: left;">' + result.allPortraitList[i].professValue + '</td>' + //专业
				' <td style="padding-left: 0px;text-align: left;">' + result.allPortraitList[i].studensClass + '</td>' + //班级
				' <td style="padding-left: 0px;text-align: left;">' + result.allPortraitList[i].compreValues + '</td>' + //综合成绩
				' <td style="padding-left: 0px;text-align: left;">' + result.allPortraitList[i].gardeValuesLable + '</td>' + //学习成绩
				' <td style="padding-left: 0px;text-align: left;">' + result.allPortraitList[i].consumeValuesLabel + '</td>' + //消费能力
				' <td style="padding-left: 0px;text-align: left;">' + result.allPortraitList[i].readValuesLabel + '</td>' + //阅读程度
				'<td style="padding-left: 0px;text-align: left;">' + result.allPortraitList[i].onlineValuesLabel + '</td>' + //上网程度
				'<td style="padding-left: 0px;text-align: left;">' + result.allPortraitList[i].studenClassName + '</td>' + //学习类型
				' <td><a href="javascript:void(0)" class="btn btn-success save" data_id="' + result.allPortraitList[i].userId + '">详情</a></td>' + '</tr>');
			}
		}

		//详情
		$(".save").on("click", function() {
			Loading1.show();
			var userId = Number($(this).attr("data_id"));
			var url = encodeURIComponent('{"userId":"' + userId + '"}');
			location.href = 'getMyPortrait?jsonStr=' + url;
		});

		//分页
		var sumpage = result.totalPage; //总页数
		var nowpage = result.pageNow; //当前页数
		var pagenumber = result.pageSize; //每页显示数量
		//分页加载
		$(".tcdPageCode").createPage({
			pageCount: sumpage,
			//总页数
			current: nowpage,
			//当前页数
			pageNumber: pagenumber,
			//每页显示数量
			backFn: function(p) {
				nowpage = p;
				if (nowpage >= sumpage) {
					nowpage = sumpage;
				}
				var json = {
					totalPage: sumpage,
					pageNow: nowpage,
					pageSize: pagenumber,
					userId: $("#s_userId").val(),
					collegeValue: $("#s_collegeValue").val(),
					professValue: $("#s_professValue").val(),
					studensClass: $("#s_studensClass").val()
				};
				
				
				json = JSON.stringify(json);
				window.location.href = 'getPortraitList?jsonStr=' + json;
			}
		});
	}
	//搜索
	//学生查询
	$("#search").click(function() {
		var deptname = $("#month_average_text_id").val();
		var arr = [];
		if (deptname != "") {
			arr.push(deptname);
		}
		Verification.character.Arr = arr;
		var istrue = Verification.character.Method();
		if (istrue) {
			Alert1.content = "不能输入/\@$#'“等特殊符号";
			Alert1.init();
			Alert1.show();
			return;
		}
		Loading1.show();
		var url = encodeURIComponent('{"userId":"' + deptname + '"}');
		location.href = 'getMyPortrait?jsonStr=' + url;

	});
	//列表模糊查询
	$("#month_average_search").click(function() {
		
		
		Loading1.show();
		var json = {
			pageNow: 1,
			pageSize: 10,
			collegeValue: $("#s_collegeValue").val(),
			professValue: $("#s_professValue").val(),
			studensClass: $("#s_studensClass").val()
		};
		json = JSON.stringify(json);
		//执行异步提交表单
		location.href = 'getPortraitList?jsonStr=' + json;
	});
});