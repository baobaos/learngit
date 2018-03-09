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
	if (result.stucomList != null || result.stucomList.length != 0) {//===> 如果当前页面存在数据
		$(".nodata").hide();
		$("#words_title").show();
		$(".table ").show();
		$("#year").text(result.stucomList[0].dataDate);  //===>  输出年月日
		for (var i = 0; i < result.stucomList.length; i++) { //===> 循环输出列表并判断前三名 
			if(result.stucomList[i].rownum==1){
				$("#tbody_id").append('<tr class="gradeX">'+
					'<td><img src="../images/pc/icon_10.png"></td>'+
					'<td>'+result.stucomList[i].userId+'</td>'+
					'<td>'+result.stucomList[i].compreValues+'</td>'+
					'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.stucomList[i].userId+'">详情</a></td>'+
					'</tr>');
			}else if(result.stucomList[i].rownum==2){
				$("#tbody_id").append('<tr class="gradeX">'+
						'<td><img src="../images/pc/icon_11.png"></td>'+
						'<td>'+result.stucomList[i].userId+'</td>'+
						'<td>'+result.stucomList[i].compreValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.stucomList[i].userId+'">详情</a></td>'+
						'</tr>');
			}else if(result.stucomList[i].rownum==3){
				$("#tbody_id").append('<tr class="gradeX">'+
						'<td><img src="../images/pc/icon_12.png"></td>'+
						'<td>'+result.stucomList[i].userId+'</td>'+
						'<td>'+result.stucomList[i].compreValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.stucomList[i].userId+'">详情</a></td>'+
						'</tr>');
			}else{
				$("#tbody_id").append('<tr class="gradeX">'+
						'<td>'+result.stucomList[i].rownum+'</td>'+
						'<td>'+result.stucomList[i].userId+'</td>'+
						'<td>'+result.stucomList[i].compreValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.stucomList[i].userId+'">详情</a></td>'+
						'</tr>');
			}
		}
	}else{ //===>  如果无数据时 隐藏元素 输出暂无数据
		$("#words_title").hide();
		$(".table ").hide();
		$(".form_bottom").append('<div class="nodata">暂无数据.....</div>');
	}
	//详情
	$(".save").on("click", function() {
		Loading1.show(); //===>  弹出 loading
		var userId = Number($(this).attr("data_id"));
		var url = encodeURIComponent('{"userId":"' + userId + '"}');
		location.href = 'getMyPortrait?jsonStr=' + url;
	});
	
	//模糊查询
	$("#month_average_search").click(function() {
		
		var deptname = $("#month_average_text_id").val(); //===>  获取文本框的值
		var arr = [];
		if (deptname != "") {
			arr.push(deptname);
		}
		Verification.character.Arr = arr;  
		var istrue = Verification.character.Method();
		if (istrue) {  //===>  调用验证类 验证是否包含特殊字符
			Alert1.content = "不能输入/\@$#'“等特殊符号";
			Alert1.init();
			Alert1.show();
			return;
		}
		Loading1.show();
		var json = {//===>  拼接 json
				"higorlowMark":1,
				"userId": deptname
		};
		json = JSON.stringify(json);
		Loading1.show(); //===>  弹出loading

		//执行异步提交表单
		$.ajax({
			type: 'post',
			url: 'getStuComAnalysisListByPost',
			data: {
				'jsonStr': json
			},
			success: function(result) {//===> 异步成功 
				Loading1.hide();  //===>  隐藏loading
				result = JSON.parse(result); //===>  将后台传回的字符串 转换成JSON
				if (result.stucomList != null && result.stucomList.length != 0&&result.stucomList !=undefined) { //===>  判断是否返回数据
					$(".nodata").hide();
					$(".table,#words_title").show();
						$("#tbody_id").html("");
						//循环输出列表
						if (result.stucomList != null || result.stucomList.length != 0) {
							$("#year").text(result.stucomList[0].dataDate);
							for (var i = 0; i < result.stucomList.length; i++) { //===>  循环输出列表 并判断前三名 输出不同的图片
								if(result.stucomList[i].rownum==1){
									$("#tbody_id").append('<tr class="gradeX">'+
										'<td><img src="../images/pc/icon_10.png"></td>'+
										'<td>'+result.stucomList[i].userId+'</td>'+
										'<td>'+result.stucomList[i].compreValues+'</td>'+
										'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.stucomList[i].userId+'">详情</a></td>'+
										'</tr>');
								}else if(result.stucomList[i].rownum==2){
									$("#tbody_id").append('<tr class="gradeX">'+
											'<td><img src="../images/pc/icon_11.png"></td>'+
											'<td>'+result.stucomList[i].userId+'</td>'+
											'<td>'+result.stucomList[i].compreValues+'</td>'+
											'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.stucomList[i].userId+'">详情</a></td>'+
											'</tr>');
								}else if(result.stucomList[i].rownum==3){
									$("#tbody_id").append('<tr class="gradeX">'+
											'<td><img src="../images/pc/icon_12.png"></td>'+
											'<td>'+result.stucomList[i].userId+'</td>'+
											'<td>'+result.stucomList[i].compreValues+'</td>'+
											'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.stucomList[i].userId+'">详情</a></td>'+
											'</tr>');
								}else{
									$("#tbody_id").append('<tr class="gradeX">'+
											'<td>'+result.stucomList[i].rownum+'</td>'+
											'<td>'+result.stucomList[i].userId+'</td>'+
											'<td>'+result.stucomList[i].compreValues+'</td>'+
											'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.stucomList[i].userId+'">详情</a></td>'+
											'</tr>');
								}
							}
							//循环输出后绑定  详情按钮的点击事件
							$(".save").on("click", function() {
								Loading1.show();
								var userId = Number($(this).attr("data_id"));
								var url = encodeURIComponent('{"userId":"' + userId + '"}');
								location.href = 'getMyPortrait?jsonStr=' + url;
							});
						}
					

				} else { //===> 异步失败
					Alert1.content = "查询无结果";
					Alert1.init();
					Alert1.show();

				}
			},
			error: function() {  //===> Ajax 出现错误  配置error
				Loading1.hide();
				Alert1.content = "提交失败！";
				Alert1.init();
				Alert1.show();
			}
		});
		
	});
});