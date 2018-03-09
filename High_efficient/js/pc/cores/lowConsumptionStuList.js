/* 
 *综合能力强群体分析js文件
 *创建人：孟令超
 *创建日期:2017/02/14
 **/



$(function() {

	var Loading1 = new Loading(); // loadng 盒子初始化
	Loading1.init(); // 插入loading 盒子
	var Alert1 = new Alert(); //弹出盒子初始化
	var confirm1 = new Confirm(); // 确定取消盒子初始化
	//循环输出列表
	if (result.highStuList != null || result.highStuList.length != 0) {
		$(".nodata").hide();
		$("#words_title").show();
		$(".table ").show();
		$("#year").text(result.consumeDate);
		for (var i = 0; i < result.highStuList.length; i++) {
			if(result.highStuList[i].rownum==1){
				$("#tbody_id").prepend( '<tr class="gradeX">'+
				'<td><img src="images/pc/icon_10.png"></td>'+
				'<td>'+result.highStuList[i].userId+'</td>'+
				'<td>'+result.highStuList[i].lowAllCount+'</td>'+
				'<td>'+result.highStuList[i].lowAlltotalConsumeMoney+'</td>'+
				'<td>'+result.highStuList[i].lowAllAvgMoney+'</td>'+
				'<td>'+result.highStuList[i].lowEatsumeCount+'</td>'+
				'<td>'+result.highStuList[i].lowSpMarksumeCount+'</td>'+
				'<td>'+result.highStuList[i].lowEattotalConsumeMoney+'</td>'+
				'<td>'+result.highStuList[i].lowSpMarktotalConsumeMoney+'</td>'+
				'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highStuList[i].userId+'">详情</a></td>'+
			    '</tr>');
			}else if(result.highStuList[i].rownum==2){
				$("#tbody_id").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_11.png"></td>'+
						'<td>'+result.highStuList[i].userId+'</td>'+
						'<td>'+result.highStuList[i].lowAllCount+'</td>'+
						'<td>'+result.highStuList[i].lowAlltotalConsumeMoney+'</td>'+
						'<td>'+result.highStuList[i].lowAllAvgMoney+'</td>'+
						'<td>'+result.highStuList[i].lowEatsumeCount+'</td>'+
						'<td>'+result.highStuList[i].lowSpMarksumeCount+'</td>'+
						'<td>'+result.highStuList[i].lowEattotalConsumeMoney+'</td>'+
						'<td>'+result.highStuList[i].lowSpMarktotalConsumeMoney+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highStuList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else if(result.highStuList[i].rownum==3){
				$("#tbody_id").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_12.png"></td>'+
						'<td>'+result.highStuList[i].userId+'</td>'+
						'<td>'+result.highStuList[i].lowAllCount+'</td>'+
						'<td>'+result.highStuList[i].lowAlltotalConsumeMoney+'</td>'+
						'<td>'+result.highStuList[i].lowAllAvgMoney+'</td>'+
						'<td>'+result.highStuList[i].lowEatsumeCount+'</td>'+
						'<td>'+result.highStuList[i].lowSpMarksumeCount+'</td>'+
						'<td>'+result.highStuList[i].lowEattotalConsumeMoney+'</td>'+
						'<td>'+result.highStuList[i].lowSpMarktotalConsumeMoney+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highStuList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else{
				$("#tbody_id").append(
					'<tr class="gradeX">'+
					'<td>'+result.highStuList[i].rownum+'</td>'+
					'<td>'+result.highStuList[i].userId+'</td>'+
					'<td>'+result.highStuList[i].lowAllCount+'</td>'+
					'<td>'+result.highStuList[i].lowAlltotalConsumeMoney+'</td>'+
					'<td>'+result.highStuList[i].lowAllAvgMoney+'</td>'+
					'<td>'+result.highStuList[i].lowEatsumeCount+'</td>'+
					'<td>'+result.highStuList[i].lowSpMarksumeCount+'</td>'+
					'<td>'+result.highStuList[i].lowEattotalConsumeMoney+'</td>'+
					'<td>'+result.highStuList[i].lowSpMarktotalConsumeMoney+'</td>'+
					'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highStuList[i].userId+'">详情</a></td>'+
				    '</tr>');
			}
		}
	}else{
		$("#words_title").hide();
		$(".table ").hide();
		$(".form_bottom").append('<div class="nodata">暂无数据.....</div>');
	}
	//详情
	$(".save").on("click", function() {
		 overdue();
		Loading1.show();
		var userId = Number($(this).attr("data_id"));
		var url = encodeURIComponent('{"userId":"' + userId + '"}');
		location.href = 'getMyPortrait?jsonStr=' + url;
	});
	
	//模糊查询
	$("#month_average_search").click(function() {
		 overdue();
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
		var json = {
				"higorlowMark":2,
				"userId": deptname
		};
		json = JSON.stringify(json);
		Loading1.show();

		//执行异步提交表单
		$.ajax({
			type: 'post',
			url: 'getLowConsumptionListByIdOrTimeByPost',
			data: {
				'jsonStr': json
			},
			success: function(result) {
				Loading1.hide();
				result = JSON.parse(result);
				if (result.highStuList != null && result.highStuList.length != 0 && result.highStuList != undefined) {
					$(".nodata").hide();
					$("#words_title").show();
					$(".table ").show();
						$("#tbody_id").html("");
						//循环输出列表
						if (result.highStuList != null || result.highStuList.length != 0) {
							$("#year").text(result.highStuList[0].consumeDate);
							for (var i = 0; i < result.highStuList.length; i++) {
								if(result.highStuList[i].rownum==1){
									$("#tbody_id").prepend( '<tr class="gradeX">'+
									'<td><img src="images/pc/icon_10.png"></td>'+
									'<td>'+result.highStuList[i].userId+'</td>'+
									'<td>'+result.highStuList[i].lowAllCount+'</td>'+
									'<td>'+result.highStuList[i].lowAlltotalConsumeMoney+'</td>'+
									'<td>'+result.highStuList[i].lowAllAvgMoney+'</td>'+
									'<td>'+result.highStuList[i].lowEatsumeCount+'</td>'+
									'<td>'+result.highStuList[i].lowSpMarksumeCount+'</td>'+
									'<td>'+result.highStuList[i].lowEattotalConsumeMoney+'</td>'+
									'<td>'+result.highStuList[i].lowSpMarktotalConsumeMoney+'</td>'+
									'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highStuList[i].userId+'">详情</a></td>'+
								    '</tr>');
								}else if(result.highStuList[i].rownum==2){
									$("#tbody_id").append('<tr class="gradeX">'+
											'<td><img src="images/pc/icon_11.png"></td>'+
											'<td>'+result.highStuList[i].userId+'</td>'+
											'<td>'+result.highStuList[i].lowAllCount+'</td>'+
											'<td>'+result.highStuList[i].lowAlltotalConsumeMoney+'</td>'+
											'<td>'+result.highStuList[i].lowAllAvgMoney+'</td>'+
											'<td>'+result.highStuList[i].lowEatsumeCount+'</td>'+
											'<td>'+result.highStuList[i].lowSpMarksumeCount+'</td>'+
											'<td>'+result.highStuList[i].lowEattotalConsumeMoney+'</td>'+
											'<td>'+result.highStuList[i].lowSpMarktotalConsumeMoney+'</td>'+
											'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highStuList[i].userId+'">详情</a></td>'+
										    '</tr>');
								}else if(result.highStuList[i].rownum==3){
									$("#tbody_id").append('<tr class="gradeX">'+
											'<td><img src="images/pc/icon_12.png"></td>'+
											'<td>'+result.highStuList[i].userId+'</td>'+
											'<td>'+result.highStuList[i].lowAllCount+'</td>'+
											'<td>'+result.highStuList[i].lowAlltotalConsumeMoney+'</td>'+
											'<td>'+result.highStuList[i].lowAllAvgMoney+'</td>'+
											'<td>'+result.highStuList[i].lowEatsumeCount+'</td>'+
											'<td>'+result.highStuList[i].lowSpMarksumeCount+'</td>'+
											'<td>'+result.highStuList[i].lowEattotalConsumeMoney+'</td>'+
											'<td>'+result.highStuList[i].lowSpMarktotalConsumeMoney+'</td>'+
											'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highStuList[i].userId+'">详情</a></td>'+
										    '</tr>');
								}else{
									$("#tbody_id").append(
										'<tr class="gradeX">'+
										'<td>'+result.highStuList[i].rownum+'</td>'+
										'<td>'+result.highStuList[i].userId+'</td>'+
										'<td>'+result.highStuList[i].lowAllCount+'</td>'+
										'<td>'+result.highStuList[i].lowAlltotalConsumeMoney+'</td>'+
										'<td>'+result.highStuList[i].lowAllAvgMoney+'</td>'+
										'<td>'+result.highStuList[i].lowEatsumeCount+'</td>'+
										'<td>'+result.highStuList[i].lowSpMarksumeCount+'</td>'+
										'<td>'+result.highStuList[i].lowEattotalConsumeMoney+'</td>'+
										'<td>'+result.highStuList[i].lowSpMarktotalConsumeMoney+'</td>'+
										'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highStuList[i].userId+'">详情</a></td>'+
									    '</tr>');
								}
							}
							//详情
							$(".save").on("click", function() {
								Loading1.show();
								var userId = Number($(this).attr("data_id"));
								var url = encodeURIComponent('{"userId":"' + userId + '"}');
								location.href = 'getMyPortrait?jsonStr=' + url;
							});
							
						}
				} else {
					Alert1.content = "查询无结果";
					Alert1.init();
					Alert1.show();

				}
			},
			error: function() {
				Loading1.hide();
				Alert1.content = "提交失败！";
				Alert1.init();
				Alert1.show();
			}
		});
		
	});
});