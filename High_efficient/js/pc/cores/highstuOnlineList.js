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
	if (result.highOnlineStuList != null || result.highOnlineStuList.length != 0) {
		$(".nodata").hide();
		$("#words_title").show();
		$(".table ").show();
		$("#year").text(result.highOnlineStuList[0].onlineDate);
		for (var i = 0; i < result.highOnlineStuList.length; i++) {
			if(result.highOnlineStuList[i].rownum==1){
				$("#tbody_id").append( '<tr class="gradeX">'+
				'<td><img src="images/pc/icon_10.png"></td>'+
				'<td>'+result.highOnlineStuList[i].userId+'</td>'+
				'<td>'+result.highOnlineStuList[i].sumtime+'</td>'+
				'<td>'+result.highOnlineStuList[i].stayedUpLateCount+'</td>'+
				'<td>'+result.highOnlineStuList[i].onlineDuration+'</td>'+
				'<td>'+result.highOnlineStuList[i].onlineDate+'</td>'+
				'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highOnlineStuList[i].userId+'">详情</a></td>'+
			    '</tr>');
			}else if(result.highOnlineStuList[i].rownum==2){
				$("#tbody_id").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_11.png"></td>'+
						'<td>'+result.highOnlineStuList[i].userId+'</td>'+
						'<td>'+result.highOnlineStuList[i].sumtime+'</td>'+
						'<td>'+result.highOnlineStuList[i].stayedUpLateCount+'</td>'+
						'<td>'+result.highOnlineStuList[i].onlineDuration+'</td>'+
						'<td>'+result.highOnlineStuList[i].onlineDate+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highOnlineStuList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else if(result.highOnlineStuList[i].rownum==3){
				$("#tbody_id").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_12.png"></td>'+
						'<td>'+result.highOnlineStuList[i].userId+'</td>'+
						'<td>'+result.highOnlineStuList[i].sumtime+'</td>'+
						'<td>'+result.highOnlineStuList[i].stayedUpLateCount+'</td>'+
						'<td>'+result.highOnlineStuList[i].onlineDuration+'</td>'+
						'<td>'+result.highOnlineStuList[i].onlineDate+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highOnlineStuList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else{
				$("#tbody_id").append(
					'<tr class="gradeX">'+
					'<td>'+result.highOnlineStuList[i].rownum+'</td>'+
					'<td>'+result.highOnlineStuList[i].userId+'</td>'+
					'<td>'+result.highOnlineStuList[i].sumtime+'</td>'+
					'<td>'+result.highOnlineStuList[i].stayedUpLateCount+'</td>'+
					'<td>'+result.highOnlineStuList[i].onlineDuration+'</td>'+
					'<td>'+result.highOnlineStuList[i].onlineDate+'</td>'+
					'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highOnlineStuList[i].userId+'">详情</a></td>'+
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
				"userId": deptname
		};
		json = JSON.stringify(json);
		Loading1.show();

		//执行异步提交表单
		$.ajax({
			type: 'post',
			url: 'getHighStuListByIdOrTimeByPost',
			data: {
				'jsonStr': json
			},
			success: function(result) {
				Loading1.hide();
				result = JSON.parse(result);
				if (result.highOnlineStuList != null && result.highOnlineStuList.length != 0 && result.highOnlineStuList != undefined) {
						$("#tbody_id").html("");
						//循环输出列表
						if (result.highOnlineStuList != null || result.highOnlineStuList.length != 0) {
							$(".nodata").hide();
							$("#words_title").show();
							$(".table ").show();
							$("#year").text(result.highOnlineStuList[0].onlineDate);
							for (var i = 0; i < result.highOnlineStuList.length; i++) {
								if(result.highOnlineStuList[i].rownum==1){
									$("#tbody_id").append( '<tr class="gradeX">'+
									'<td><img src="images/pc/icon_10.png"></td>'+
									'<td>'+result.highOnlineStuList[i].userId+'</td>'+
									'<td>'+result.highOnlineStuList[i].sumtime+'</td>'+
									'<td>'+result.highOnlineStuList[i].stayedUpLateCount+'</td>'+
									'<td>'+result.highOnlineStuList[i].onlineDuration+'</td>'+
									'<td>'+result.highOnlineStuList[i].onlineDate+'</td>'+
									'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highOnlineStuList[i].userId+'">详情</a></td>'+
								    '</tr>');
								}else if(result.highOnlineStuList[i].rownum==2){
									$("#tbody_id").append('<tr class="gradeX">'+
											'<td><img src="images/pc/icon_11.png"></td>'+
											'<td>'+result.highOnlineStuList[i].userId+'</td>'+
											'<td>'+result.highOnlineStuList[i].sumtime+'</td>'+
											'<td>'+result.highOnlineStuList[i].stayedUpLateCount+'</td>'+
											'<td>'+result.highOnlineStuList[i].onlineDuration+'</td>'+
											'<td>'+result.highOnlineStuList[i].onlineDate+'</td>'+
											'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highOnlineStuList[i].userId+'">详情</a></td>'+
										    '</tr>');
								}else if(result.highOnlineStuList[i].rownum==3){
									$("#tbody_id").append('<tr class="gradeX">'+
											'<td><img src="images/pc/icon_12.png"></td>'+
											'<td>'+result.highOnlineStuList[i].userId+'</td>'+
											'<td>'+result.highOnlineStuList[i].sumtime+'</td>'+
											'<td>'+result.highOnlineStuList[i].stayedUpLateCount+'</td>'+
											'<td>'+result.highOnlineStuList[i].onlineDuration+'</td>'+
											'<td>'+result.highOnlineStuList[i].onlineDate+'</td>'+
											'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highOnlineStuList[i].userId+'">详情</a></td>'+
										    '</tr>');
								}else{
									$("#tbody_id").append(
										'<tr class="gradeX">'+
										'<td>'+result.highOnlineStuList[i].rownum+'</td>'+
										'<td>'+result.highOnlineStuList[i].userId+'</td>'+
										'<td>'+result.highOnlineStuList[i].sumtime+'</td>'+
										'<td>'+result.highOnlineStuList[i].stayedUpLateCount+'</td>'+
										'<td>'+result.highOnlineStuList[i].onlineDuration+'</td>'+
										'<td>'+result.highOnlineStuList[i].onlineDate+'</td>'+
										'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highOnlineStuList[i].userId+'">详情</a></td>'+
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