	/*
 *@本js功能：消费突变群体查询页面代码
 *@本js作者：白丹丹
 *@编写时间：2017年1月20日
 */ 
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
	var pageOneUserId = result.pageOneUserId;
	var pageOnedataDate = result.pageOnedataDate;
	var pageTwoUserId = result.pageTwoUserId;
	var pageTwodataDate = result.pageTwodataDate;
	

	//1、循环输出列表
	if (result.consumptionHighMutationList != null && result.consumptionHighMutationList.length != 0)
	{
		$("#book_value1").val(pageOneUserId);
		$("#book_text1").val(pageOnedataDate);
		for (var i = 0; i < result.consumptionHighMutationList.length; i++) 
		{
			if(i==0){
				$("#tbody_id").append( '<tr class="gradeX">'+
				'<td><img src="images/pc/icon_10.png"></td>'+
				'<td>'+result.consumptionHighMutationList[i].userId+'</td>'+
				'<td>'+result.consumptionHighMutationList[i].befconsumeValues+'</td>'+
				'<td>'+result.consumptionHighMutationList[i].nowconsumeValues+'</td>'+
				'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionHighMutationList[i].userId+'">详情</a></td>'+
			    '</tr>');
			}else if(i==1){
				$("#tbody_id").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_11.png"></td>'+
						'<td>'+result.consumptionHighMutationList[i].userId+'</td>'+
						'<td>'+result.consumptionHighMutationList[i].befconsumeValues+'</td>'+
						'<td>'+result.consumptionHighMutationList[i].nowconsumeValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionHighMutationList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else if(i==2){
				$("#tbody_id").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_12.png"></td>'+
						'<td>'+result.consumptionHighMutationList[i].userId+'</td>'+
						'<td>'+result.consumptionHighMutationList[i].befconsumeValues+'</td>'+
						'<td>'+result.consumptionHighMutationList[i].nowconsumeValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionHighMutationList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else{
				$("#tbody_id").append(
					'<tr class="gradeX">'+
					'<td>'+(i+1)*1+'</td>'+
					'<td>'+result.consumptionHighMutationList[i].userId+'</td>'+
					'<td>'+result.consumptionHighMutationList[i].befconsumeValues+'</td>'+
					'<td>'+result.consumptionHighMutationList[i].nowconsumeValues+'</td>'+
					'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionHighMutationList[i].userId+'">详情</a></td>'+
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
	if (result.consumptionLowMutationList != null && result.consumptionLowMutationList.length != 0)
	{
		$("#book_value2").val(pageTwoUserId);
		$("#book_text2").val(result.pageTwodataDate);
		
		for (var i = 0; i < result.consumptionLowMutationList.length; i++) 
		{
			if(i==0){
				$("#tbody_id2").append( '<tr class="gradeX">'+
				'<td><img src="images/pc/icon_10.png"></td>'+
				'<td>'+result.consumptionLowMutationList[i].userId+'</td>'+
				'<td>'+result.consumptionLowMutationList[i].befconsumeValues+'</td>'+
				'<td>'+result.consumptionLowMutationList[i].nowconsumeValues+'</td>'+
				'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionLowMutationList[i].userId+'">详情</a></td>'+
			    '</tr>');
			}else if(i==1){
				$("#tbody_id2").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_11.png"></td>'+
						'<td>'+result.consumptionLowMutationList[i].userId+'</td>'+
						'<td>'+result.consumptionLowMutationList[i].befconsumeValues+'</td>'+
						'<td>'+result.consumptionLowMutationList[i].nowconsumeValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionLowMutationList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else if(i==2){
				$("#tbody_id2").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_12.png"></td>'+
						'<td>'+result.consumptionLowMutationList[i].userId+'</td>'+
						'<td>'+result.consumptionLowMutationList[i].befconsumeValues+'</td>'+
						'<td>'+result.consumptionLowMutationList[i].nowconsumeValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionLowMutationList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else{
				$("#tbody_id2").append(
					'<tr class="gradeX">'+
					'<td>'+(i+1)*1+'</td>'+
					'<td>'+result.consumptionLowMutationList[i].userId+'</td>'+
					'<td>'+result.consumptionLowMutationList[i].befconsumeValues+'</td>'+
					'<td>'+result.consumptionLowMutationList[i].nowconsumeValues+'</td>'+
					'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionLowMutationList[i].userId+'">详情</a></td>'+
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
		var userid = $("#book_value1").val();
		var oneDate = $("#book_text1").val();
		Loading1.show();
		var json = {
				"pageOneUserId":userid,"pageOnedataDate":oneDate
		};
		json = JSON.stringify(json);
		Loading1.show();

		//执行异步提交表单
		$.ajax({
			type: 'post',
			url: 'getConsumptionMutationsStuListByPost',
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
					pageOneUserId=result.pageOneUserId;
					pageOnedataDate=result.pageOnedataDate;
						//循环输出列表
						if (result.consumptionHighMutationList != null && result.consumptionHighMutationList.length != 0) {

								$(".words_title1").show();
								$(".table1").show();
								$(".box1").find(".nodata").hide();
								for (var i = 0; i < result.consumptionHighMutationList.length; i++) 
								{
									if(result.consumptionHighMutationList[i].rownum==1){
										$("#tbody_id").append( '<tr class="gradeX">'+
										'<td><img src="images/pc/icon_10.png"></td>'+
										'<td>'+result.consumptionHighMutationList[i].userId+'</td>'+
										'<td>'+result.consumptionHighMutationList[i].befconsumeValues+'</td>'+
										'<td>'+result.consumptionHighMutationList[i].nowconsumeValues+'</td>'+
										'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionHighMutationList[i].userId+'">详情</a></td>'+
									    '</tr>');
									}else if(result.consumptionHighMutationList[i].rownum==2){
										$("#tbody_id").append('<tr class="gradeX">'+
												'<td><img src="images/pc/icon_11.png"></td>'+
												'<td>'+result.consumptionHighMutationList[i].userId+'</td>'+
												'<td>'+result.consumptionHighMutationList[i].befconsumeValues+'</td>'+
												'<td>'+result.consumptionHighMutationList[i].nowconsumeValues+'</td>'+
												'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionHighMutationList[i].userId+'">详情</a></td>'+
											    '</tr>');
									}else if(result.consumptionHighMutationList[i].rownum==3){
										$("#tbody_id").append('<tr class="gradeX">'+
												'<td><img src="images/pc/icon_12.png"></td>'+
												'<td>'+result.consumptionHighMutationList[i].userId+'</td>'+
												'<td>'+result.consumptionHighMutationList[i].befconsumeValues+'</td>'+
												'<td>'+result.consumptionHighMutationList[i].nowconsumeValues+'</td>'+
												'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionHighMutationList[i].userId+'">详情</a></td>'+
											    '</tr>');
									}else{
										$("#tbody_id").append(
											'<tr class="gradeX">'+
											'<td>'+result.consumptionHighMutationList[i].rownum+'</td>'+
											'<td>'+result.consumptionHighMutationList[i].userId+'</td>'+
											'<td>'+result.consumptionHighMutationList[i].befconsumeValues+'</td>'+
											'<td>'+result.consumptionHighMutationList[i].nowconsumeValues+'</td>'+
											'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionHighMutationList[i].userId+'">详情</a></td>'+
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
		var userid = $("#book_value2").val();
		var oneDate = $("#book_text2").val();
		Loading1.show();
		var json = {
				"pageTwoUserId":userid,"pageTwodataDate":oneDate
		};
		json = JSON.stringify(json);
		Loading1.show();

		//执行异步提交表单
		$.ajax({
			type: 'post',
			url: 'getConsumptionMutationsStuListByPost',
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
					pageTwoUserId=result.pageTwoUserId;
					pageTwodataDate=result.pageTwodataDate;
						
						//循环输出列表
					if (result.consumptionLowMutationList != null && result.consumptionLowMutationList.length != 0)
					{
						$("#book_value2").val(pageTwoUserId);
						$("#book_text2").val(pageTwodataDate);
						$(".words_title2").show();
						$(".table2").show();
						for (var i = 0; i < result.consumptionLowMutationList.length; i++) 
						{
							if(result.consumptionHighMutationList[i].rownum==1){
								$("#tbody_id2").append( '<tr class="gradeX">'+
								'<td><img src="images/pc/icon_10.png"></td>'+
								'<td>'+result.consumptionLowMutationList[i].userId+'</td>'+
								'<td>'+result.consumptionLowMutationList[i].befconsumeValues+'</td>'+
								'<td>'+result.consumptionLowMutationList[i].nowconsumeValues+'</td>'+
								'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionLowMutationList[i].userId+'">详情</a></td>'+
							    '</tr>');
							}else if(result.consumptionHighMutationList[i].rownum==2){
								$("#tbody_id2").append('<tr class="gradeX">'+
										'<td><img src="images/pc/icon_11.png"></td>'+
										'<td>'+result.consumptionLowMutationList[i].userId+'</td>'+
										'<td>'+result.consumptionLowMutationList[i].befconsumeValues+'</td>'+
										'<td>'+result.consumptionLowMutationList[i].nowconsumeValues+'</td>'+
										'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionLowMutationList[i].userId+'">详情</a></td>'+
									    '</tr>');
							}else if(result.consumptionHighMutationList[i].rownum==3){
								$("#tbody_id2").append('<tr class="gradeX">'+
										'<td><img src="images/pc/icon_12.png"></td>'+
										'<td>'+result.consumptionLowMutationList[i].userId+'</td>'+
										'<td>'+result.consumptionLowMutationList[i].befconsumeValues+'</td>'+
										'<td>'+result.consumptionLowMutationList[i].nowconsumeValues+'</td>'+
										'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionLowMutationList[i].userId+'">详情</a></td>'+
									    '</tr>');
							}else{
								$("#tbody_id2").append(
									'<tr class="gradeX">'+
									'<td>'+result.consumptionHighMutationList[i].rownum+'</td>'+
									'<td>'+result.consumptionLowMutationList[i].userId+'</td>'+
									'<td>'+result.consumptionLowMutationList[i].befconsumeValues+'</td>'+
									'<td>'+result.consumptionLowMutationList[i].nowconsumeValues+'</td>'+
									'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionLowMutationList[i].userId+'">详情</a></td>'+
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
					if (result.consumptionHighMutationList != null && result.consumptionHighMutationList.length != 0) {
						$("#tbody_id").html("");
						$("#book_value1").val(pageOneUserId);
						$("#book_text1").val(pageOnedataDate);
						for (var i = 0; i < result.consumptionHighMutationList.length; i++) 
						{
							if(result.consumptionHighMutationList[i].rownum==1){
								$("#tbody_id").append( '<tr class="gradeX">'+
								'<td><img src="images/pc/icon_10.png"></td>'+
								'<td>'+result.consumptionHighMutationList[i].userId+'</td>'+
								'<td>'+result.consumptionHighMutationList[i].befconsumeValues+'</td>'+
								'<td>'+result.consumptionHighMutationList[i].nowconsumeValues+'</td>'+
								'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionHighMutationList[i].userId+'">详情</a></td>'+
							    '</tr>');
							}else if(result.consumptionHighMutationList[i].rownum==2){
								$("#tbody_id").append('<tr class="gradeX">'+
										'<td><img src="images/pc/icon_11.png"></td>'+
										'<td>'+result.consumptionHighMutationList[i].userId+'</td>'+
										'<td>'+result.consumptionHighMutationList[i].befconsumeValues+'</td>'+
										'<td>'+result.consumptionHighMutationList[i].nowconsumeValues+'</td>'+
										'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionHighMutationList[i].userId+'">详情</a></td>'+
									    '</tr>');
							}else if(result.consumptionHighMutationList[i].rownum==3){
								$("#tbody_id").append('<tr class="gradeX">'+
										'<td><img src="images/pc/icon_12.png"></td>'+
										'<td>'+result.consumptionHighMutationList[i].userId+'</td>'+
										'<td>'+result.consumptionHighMutationList[i].befconsumeValues+'</td>'+
										'<td>'+result.consumptionHighMutationList[i].nowconsumeValues+'</td>'+
										'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionHighMutationList[i].userId+'">详情</a></td>'+
									    '</tr>');
							}else{
								$("#tbody_id").append(
									'<tr class="gradeX">'+
									'<td>'+(i+1)*1+'</td>'+
									'<td>'+result.consumptionHighMutationList[i].userId+'</td>'+
									'<td>'+result.consumptionHighMutationList[i].befconsumeValues+'</td>'+
									'<td>'+result.consumptionHighMutationList[i].nowconsumeValues+'</td>'+
									'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionHighMutationList[i].userId+'">详情</a></td>'+
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
						if (result.consumptionLowMutationList != null && result.consumptionLowMutationList.length != 0)
						{
							$("#book_value1").val(pageTwoUserId);
							$("#book_text1").val(pageTwodataDate);
							$("#tbody_id2").html("");
		for (var i = 0; i < result.consumptionLowMutationList.length; i++) 
		{
			if(result.consumptionHighMutationList[i].rownum==1){
				$("#tbody_id2").append( '<tr class="gradeX">'+
				'<td><img src="images/pc/icon_10.png"></td>'+
				'<td>'+result.consumptionLowMutationList[i].userId+'</td>'+
				'<td>'+result.consumptionLowMutationList[i].befconsumeValues+'</td>'+
				'<td>'+result.consumptionLowMutationList[i].nowconsumeValues+'</td>'+
				'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionLowMutationList[i].userId+'">详情</a></td>'+
			    '</tr>');
			}else if(result.consumptionHighMutationList[i].rownum==2){
				$("#tbody_id2").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_11.png"></td>'+
						'<td>'+result.consumptionLowMutationList[i].userId+'</td>'+
						'<td>'+result.consumptionLowMutationList[i].befconsumeValues+'</td>'+
						'<td>'+result.consumptionLowMutationList[i].nowconsumeValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionLowMutationList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else if(result.consumptionHighMutationList[i].rownum==3){
				$("#tbody_id2").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_12.png"></td>'+
						'<td>'+result.consumptionLowMutationList[i].userId+'</td>'+
						'<td>'+result.consumptionLowMutationList[i].befconsumeValues+'</td>'+
						'<td>'+result.consumptionLowMutationList[i].nowconsumeValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionLowMutationList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else{
				$("#tbody_id2").append(
					'<tr class="gradeX">'+
					'<td>'+result.consumptionHighMutationList[i].rownum+'</td>'+
					'<td>'+result.consumptionLowMutationList[i].userId+'</td>'+
					'<td>'+result.consumptionLowMutationList[i].befconsumeValues+'</td>'+
					'<td>'+result.consumptionLowMutationList[i].nowconsumeValues+'</td>'+
					'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.consumptionLowMutationList[i].userId+'">详情</a></td>'+
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

