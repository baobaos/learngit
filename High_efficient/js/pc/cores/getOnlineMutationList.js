/* 
 *上网时长突变查询页面js文件
 *创建人：白丹丹
 *创建日期:2017/02/14
 **/
$(function() {
	//添加年份选择插件
$('.form_date').datetimepicker({
    language:  'zh-CN',
    format: 'yyyy-mm',      
    todayBtn:  0,       
    startView: 4,
    minView: 3,
    autoclose:1,
    forceParse: 0,
    viewSelect:'decade'
});

	//清空文本框
	$(".glyphicon-remove").parents().click(function(){
		$(this).prev().val("");
	});
 
	//去文本框的值
	var pageOneuserId = result.pageOneuserId;
	var pageOnedataDate = result.pageOnedataDate;
	var pageTwouserId = result.pageTwouserId;
	var pageTwodataDate = result.pageTwodataDate;
	

	//1、循环输出列表
	if (result.onlineHighMutationList != null && result.onlineHighMutationList.length != 0)
	{
		$("#book_value1").val(pageOneuserId);
		$("#book_text1").val(pageOnedataDate);
		
		for (var i = 0; i < result.onlineHighMutationList.length; i++) 
		{
			if(result.onlineHighMutationList[i].rownum==1){
				$("#tbody_id").append( '<tr class="gradeX">'+
				'<td><img src="images/pc/icon_10.png"></td>'+
				'<td>'+result.onlineHighMutationList[i].userId+'</td>'+
				'<td>'+result.onlineHighMutationList[i].befonlineValues+'</td>'+
				'<td>'+result.onlineHighMutationList[i].nowonlineValues+'</td>'+
				'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineHighMutationList[i].userId+'">详情</a></td>'+
			    '</tr>');
			}else if(result.onlineHighMutationList[i].rownum==2){
				$("#tbody_id").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_11.png"></td>'+
						'<td>'+result.onlineHighMutationList[i].userId+'</td>'+
						'<td>'+result.onlineHighMutationList[i].befonlineValues+'</td>'+
						'<td>'+result.onlineHighMutationList[i].nowonlineValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineHighMutationList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else if(result.onlineHighMutationList[i].rownum==3){
				$("#tbody_id").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_12.png"></td>'+
						'<td>'+result.onlineHighMutationList[i].userId+'</td>'+
						'<td>'+result.onlineHighMutationList[i].befonlineValues+'</td>'+
						'<td>'+result.onlineHighMutationList[i].nowonlineValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineHighMutationList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else{
				$("#tbody_id").append(
					'<tr class="gradeX">'+
					'<td>'+result.onlineHighMutationList[i].rownum+'</td>'+
					'<td>'+result.onlineHighMutationList[i].userId+'</td>'+
					'<td>'+result.onlineHighMutationList[i].befonlineValues+'</td>'+
					'<td>'+result.onlineHighMutationList[i].nowonlineValues+'</td>'+
					'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineHighMutationList[i].userId+'">详情</a></td>'+
				    '</tr>');
			}
		}
	}else{
		$(".words_title1").hide();
		$(".table1").hide();
		$(".box1").append("<div class='nodata'>暂无数据.....</div>");
		}	
		//详情
		$(".save").on("click", function() {
			 overdue();
			Loading1.show();
			var userId = Number($(this).attr("data_id"));
			var url = encodeURIComponent('{"userId":"' + userId + '"}');
			location.href = 'getMyPortrait?jsonStr=' + url;
		});

	//2、循环输出列表
	if (result.onlineLowMutationList != null && result.onlineLowMutationList.length != 0)
	{
		$("#book_value2").val(pageTwouserId);
		$("#book_text2").val(result.pageTwodataDate);
		
		for (var i = 0; i < result.onlineLowMutationList.length; i++) 
		{
			if(result.onlineLowMutationList[i].rownum==1){
				$("#tbody_id2").append( '<tr class="gradeX">'+
				'<td><img src="images/pc/icon_10.png"></td>'+
				'<td>'+result.onlineLowMutationList[i].userId+'</td>'+
				'<td>'+result.onlineLowMutationList[i].befonlineValues+'</td>'+
				'<td>'+result.onlineLowMutationList[i].nowonlineValues+'</td>'+
				'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineLowMutationList[i].userId+'">详情</a></td>'+
			    '</tr>');
			}else if(result.onlineLowMutationList[i].rownum==2){
				$("#tbody_id2").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_11.png"></td>'+
						'<td>'+result.onlineLowMutationList[i].userId+'</td>'+
						'<td>'+result.onlineLowMutationList[i].befonlineValues+'</td>'+
						'<td>'+result.onlineLowMutationList[i].nowonlineValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineLowMutationList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else if(result.onlineLowMutationList[i].rownum==3){
				$("#tbody_id2").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_12.png"></td>'+
						'<td>'+result.onlineLowMutationList[i].userId+'</td>'+
						'<td>'+result.onlineLowMutationList[i].befonlineValues+'</td>'+
						'<td>'+result.onlineLowMutationList[i].nowonlineValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineLowMutationList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else{
				$("#tbody_id2").append(
					'<tr class="gradeX">'+
					'<td>'+result.onlineLowMutationList[i].rownum+'</td>'+
					'<td>'+result.onlineLowMutationList[i].userId+'</td>'+
					'<td>'+result.onlineLowMutationList[i].befonlineValues+'</td>'+
					'<td>'+result.onlineLowMutationList[i].nowonlineValues+'</td>'+
					'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineLowMutationList[i].userId+'">详情</a></td>'+
				    '</tr>');
				}
			}
		}
else{
			$(".words_title2").hide();
			$(".table2").hide();
			$(".box2").append("<div class='nodata'>暂无数据.....</div>");
		}
		//详情
		$(".save").on("click", function() {
			 overdue();
			Loading1.show();
			var userId = Number($(this).attr("data_id"));
			var url = encodeURIComponent('{"userId":"' + userId + '"}');
			location.href = 'getMyPortrait?jsonStr=' + url;
		});





	//第一块模糊查询
	$("#book_search").click(function() {
		 overdue();
		var userId = $("#book_value1").val();
		var oneDate = $("#book_text1").val();
		Loading1.show();
		var json = {
				"pageOneuserId":userId,"pageOnedataDate":oneDate
		};
		json = JSON.stringify(json);
		Loading1.show();

		//执行异步提交表单
		$.ajax({
			type: 'post',
			url: 'getOnlineMutationsStuListByPost',
			data: {
				'jsonStr': json
			},
			success: function(result) {
				Loading1.hide();
				result = JSON.parse(result);
				if(result== null || result== undefined){
					Alert1.content = "暂无数据";
				}
				else if (result!= null ) {
					$("#tbody_id").html("");
					$(".box1").find(".nodata").hide();
					pageOneuserId=result.pageOneuserId;
					pageOnedataDate=result.pageOnedataDate;
						//循环输出列表
						if (result.onlineHighMutationList != null && result.onlineHighMutationList.length != 0) {
								$(".words_title1").show();
								$(".table1").show();
								for (var i = 0; i < result.onlineHighMutationList.length; i++) 
								{
									if(result.onlineHighMutationList[i].rownum==1){
										$("#tbody_id").append( '<tr class="gradeX">'+
										'<td><img src="images/pc/icon_10.png"></td>'+
										'<td>'+result.onlineHighMutationList[i].userId+'</td>'+
										'<td>'+result.onlineHighMutationList[i].befonlineValues+'</td>'+
										'<td>'+result.onlineHighMutationList[i].nowonlineValues+'</td>'+
										'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineHighMutationList[i].userId+'">详情</a></td>'+
									    '</tr>');
									}else if(result.onlineHighMutationList[i].rownum==2){
										$("#tbody_id").append('<tr class="gradeX">'+
												'<td><img src="images/pc/icon_11.png"></td>'+
												'<td>'+result.onlineHighMutationList[i].userId+'</td>'+
												'<td>'+result.onlineHighMutationList[i].befonlineValues+'</td>'+
												'<td>'+result.onlineHighMutationList[i].nowonlineValues+'</td>'+
												'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineHighMutationList[i].userId+'">详情</a></td>'+
											    '</tr>');
									}else if(result.onlineHighMutationList[i].rownum==3){
										$("#tbody_id").append('<tr class="gradeX">'+
												'<td><img src="images/pc/icon_12.png"></td>'+
												'<td>'+result.onlineHighMutationList[i].userId+'</td>'+
												'<td>'+result.onlineHighMutationList[i].befonlineValues+'</td>'+
												'<td>'+result.onlineHighMutationList[i].nowonlineValues+'</td>'+
												'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineHighMutationList[i].userId+'">详情</a></td>'+
											    '</tr>');
									}else{
										$("#tbody_id").append(
											'<tr class="gradeX">'+
											'<td>'+result.onlineHighMutationList[i].rownum+'</td>'+
											'<td>'+result.onlineHighMutationList[i].userId+'</td>'+
											'<td>'+result.onlineHighMutationList[i].befonlineValues+'</td>'+
											'<td>'+result.onlineHighMutationList[i].nowonlineValues+'</td>'+
											'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineHighMutationList[i].userId+'">详情</a></td>'+
										    '</tr>');
									}
								}
						}else{
							$(".words_title1").hide();
							$(".table1").hide();
							$(".box1").append("<div class='nodata'>暂无数据.....</div>");
						}
						//详情
						$(".save").on("click", function() {
							Loading1.show();
							var userId = Number($(this).attr("data_id"));
							var url = encodeURIComponent('{"userId":"' + userId + '"}');
							location.href = 'getMyPortrait?jsonStr=' + url;
						});
				} else {
					if (result.errorMsg == "") {
						var Msg = "查询失败";
					} else {
						var Msg = result.errorMsg;
					}
					Alert1.content = Msg;
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

	//第二块模糊查询
	$("#book_search2").click(function() {
		 overdue();
		var userId = $("#book_value2").val();
		var oneDate = $("#book_text2").val();
		Loading1.show();
		var json = {
				"pageTwouserId":userId,"pageTwodataDate":oneDate
		};
		json = JSON.stringify(json);
		Loading1.show();

		//执行异步提交表单
		$.ajax({
			type: 'post',
			url: 'getOnlineMutationsStuListByPost',
			data: {
				'jsonStr': json
			},
			success: function(result) {
				Loading1.hide();
				result = JSON.parse(result);
				if(result== null || result== undefined){
					Alert1.content = "暂无数据";
				}
				else if (result!= null ) {
					$("#tbody_id2").html("");
					$(".box2").find(".nodata").hide();
					pageTwouserId=result.pageTwouserId;
					pageTwodataDate=result.pageTwodataDate;
						
						//循环输出列表
					if (result.onlineLowMutationList != null && result.onlineLowMutationList.length != 0)
					{
						$(".words_title2").show();
						$(".table2").show();
						$("#book_value2").val(pageTwouserId);
						$("#book_text2").val(pageTwodataDate);
						
						for (var i = 0; i < result.onlineLowMutationList.length; i++) 
						{
							if(result.onlineLowMutationList[i].rownum==1){
								$("#tbody_id2").append( '<tr class="gradeX">'+
								'<td><img src="images/pc/icon_10.png"></td>'+
								'<td>'+result.onlineLowMutationList[i].userId+'</td>'+
								'<td>'+result.onlineLowMutationList[i].befonlineValues+'</td>'+
								'<td>'+result.onlineLowMutationList[i].nowonlineValues+'</td>'+
								'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineLowMutationList[i].userId+'">详情</a></td>'+
							    '</tr>');
							}else if(result.onlineLowMutationList[i].rownum==2){
								$("#tbody_id2").append('<tr class="gradeX">'+
										'<td><img src="images/pc/icon_11.png"></td>'+
										'<td>'+result.onlineLowMutationList[i].userId+'</td>'+
										'<td>'+result.onlineLowMutationList[i].befonlineValues+'</td>'+
										'<td>'+result.onlineLowMutationList[i].nowonlineValues+'</td>'+
										'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineLowMutationList[i].userId+'">详情</a></td>'+
									    '</tr>');
							}else if(result.onlineLowMutationList[i].rownum==3){
								$("#tbody_id2").append('<tr class="gradeX">'+
										'<td><img src="images/pc/icon_12.png"></td>'+
										'<td>'+result.onlineLowMutationList[i].userId+'</td>'+
										'<td>'+result.onlineLowMutationList[i].befonlineValues+'</td>'+
										'<td>'+result.onlineLowMutationList[i].nowonlineValues+'</td>'+
										'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineLowMutationList[i].userId+'">详情</a></td>'+
									    '</tr>');
							}else{
								$("#tbody_id2").append(
									'<tr class="gradeX">'+
									'<td>'+result.onlineHighMutationList[i].rownum+'</td>'+
									'<td>'+result.onlineLowMutationList[i].userId+'</td>'+
									'<td>'+result.onlineLowMutationList[i].befonlineValues+'</td>'+
									'<td>'+result.onlineLowMutationList[i].nowonlineValues+'</td>'+
									'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineLowMutationList[i].userId+'">详情</a></td>'+
								    '</tr>');
								}
							}
						}
				else{
							$(".words_title2").hide();
							$(".table2").hide();
							$(".box2").append("<div class='nodata'>暂无数据.....</div>");
						}
					//详情
					$(".save").on("click", function() {
						Loading1.show();
						var userId = Number($(this).attr("data_id"));
						var url = encodeURIComponent('{"userId":"' + userId + '"}');
						location.href = 'getMyPortrait?jsonStr=' + url;
					});
				} else {
					if (result.errorMsg == "") {
						var Msg = "查询失败";
					} else {
						var Msg = result.errorMsg;
					}
					Alert1.content = Msg;
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

		//调用tab插件
		var arr=[function(){
		//动态加载数据				
		var json=result;					
			if(json==null)
			{
				$map.html("<div class='nodata'>暂无数据.....</div>");
			}else{		
					if (result.onlineHighMutationList != null && result.onlineHighMutationList.length != 0) {
						$("#tbody_id").html("");
						$("#book_value1").val(pageOneuserId);
						$("#book_text1").val(pageOnedataDate);
						for (var i = 0; i < result.onlineHighMutationList.length; i++) 
						{
							if(result.onlineHighMutationList[i].rownum==1){
								$("#tbody_id").append( '<tr class="gradeX">'+
								'<td><img src="images/pc/icon_10.png"></td>'+
								'<td>'+result.onlineHighMutationList[i].userId+'</td>'+
								'<td>'+result.onlineHighMutationList[i].befonlineValues+'</td>'+
								'<td>'+result.onlineHighMutationList[i].nowonlineValues+'</td>'+
								'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineHighMutationList[i].userId+'">详情</a></td>'+
							    '</tr>');
							}else if(result.onlineHighMutationList[i].rownum==2){
								$("#tbody_id").append('<tr class="gradeX">'+
										'<td><img src="images/pc/icon_11.png"></td>'+
										'<td>'+result.onlineHighMutationList[i].userId+'</td>'+
										'<td>'+result.onlineHighMutationList[i].befonlineValues+'</td>'+
										'<td>'+result.onlineHighMutationList[i].nowonlineValues+'</td>'+
										'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineHighMutationList[i].userId+'">详情</a></td>'+
									    '</tr>');
							}else if(result.onlineHighMutationList[i].rownum==3){
								$("#tbody_id").append('<tr class="gradeX">'+
										'<td><img src="images/pc/icon_12.png"></td>'+
										'<td>'+result.onlineHighMutationList[i].userId+'</td>'+
										'<td>'+result.onlineHighMutationList[i].befonlineValues+'</td>'+
										'<td>'+result.onlineHighMutationList[i].nowonlineValues+'</td>'+
										'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineHighMutationList[i].userId+'">详情</a></td>'+
									    '</tr>');
							}else{
								$("#tbody_id").append(
									'<tr class="gradeX">'+
									'<td>'+(i+1)*1+'</td>'+
									'<td>'+result.onlineHighMutationList[i].userId+'</td>'+
									'<td>'+result.onlineHighMutationList[i].befonlineValues+'</td>'+
									'<td>'+result.onlineHighMutationList[i].nowonlineValues+'</td>'+
									'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineHighMutationList[i].userId+'">详情</a></td>'+
								    '</tr>');
							}
						}
					}else{
						$(".words_title1").hide();
						$(".table1").hide();
						$(".box1").append("<div class='nodata'>暂无数据.....</div>");
					}
					//详情
					$(".save").on("click", function() {
						Loading1.show();
						var userId = Number($(this).attr("data_id"));
						var url = encodeURIComponent('{"userId":"' + userId + '"}');
						location.href = 'getMyPortrait?jsonStr=' + url;
					});
			}
	},function(){
		//动态加载数据			
		//调用SpendingPower进行数据转换
		var json2=result;							
			if(json2==null)
			{
				$map2.html("<div class='nodata'>暂无数据.....</div>");
			}else{	
						if (result.onlineLowMutationList != null && result.onlineLowMutationList.length != 0)
						{
							$("#book_value1").val(pageTwouserId);
							$("#book_text1").val(pageTwodataDate);
							$("#tbody_id2").html("");
		for (var i = 0; i < result.onlineLowMutationList.length; i++) 
		{
			if(result.onlineLowMutationList[i].rownum==1){
				$("#tbody_id2").append( '<tr class="gradeX">'+
				'<td><img src="images/pc/icon_10.png"></td>'+
				'<td>'+result.onlineLowMutationList[i].userId+'</td>'+
				'<td>'+result.onlineLowMutationList[i].befonlineValues+'</td>'+
				'<td>'+result.onlineLowMutationList[i].nowonlineValues+'</td>'+
				'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineLowMutationList[i].userId+'">详情</a></td>'+
			    '</tr>');
			}else if(result.onlineLowMutationList[i].rownum==2){
				$("#tbody_id2").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_11.png"></td>'+
						'<td>'+result.onlineLowMutationList[i].userId+'</td>'+
						'<td>'+result.onlineLowMutationList[i].befonlineValues+'</td>'+
						'<td>'+result.onlineLowMutationList[i].nowonlineValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineLowMutationList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else if(result.onlineLowMutationList[i].rownum==3){
				$("#tbody_id2").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_12.png"></td>'+
						'<td>'+result.onlineLowMutationList[i].userId+'</td>'+
						'<td>'+result.onlineLowMutationList[i].befonlineValues+'</td>'+
						'<td>'+result.onlineLowMutationList[i].nowonlineValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineLowMutationList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else{
				$("#tbody_id2").append(
					'<tr class="gradeX">'+
					'<td>'+result.onlineLowMutationList[i].rownum+'</td>'+
					'<td>'+result.onlineLowMutationList[i].userId+'</td>'+
					'<td>'+result.onlineLowMutationList[i].befonlineValues+'</td>'+
					'<td>'+result.onlineLowMutationList[i].nowonlineValues+'</td>'+
					'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.onlineLowMutationList[i].userId+'">详情</a></td>'+
				    '</tr>');
				}
			}
			
		}
		else{
			$(".words_title2").hide();
			$(".table2").hide();
			$(".box2").append("<div class='nodata'>暂无数据.....</div>");
		}
		//详情
		$(".save").on("click", function() {
			Loading1.show();
			var userId = Number($(this).attr("data_id"));
			var url = encodeURIComponent('{"userId":"' + userId + '"}');
			location.href = 'getMyPortrait?jsonStr=' + url;
		});
	}
	}];
	tab(arr);
});

