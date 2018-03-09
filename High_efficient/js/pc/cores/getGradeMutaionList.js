



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
	var pageOneSemester = result.pageOneSemester;
	var pageTwoSemester = result.pageTwoSemester;
	

	//1、循环输出列表
	if (result.highGradeMutationList != null && result.highGradeMutationList.length != 0)
	{
		$("#tbody_id").html("");
		$("#book_value1").val(pageOneSemester);
		for (var i = 0; i < result.highGradeMutationList.length; i++) //====> 循环输出列表 并判断前三名 输出不同的图片
		{
			if(i==0){
				$("#tbody_id").append( '<tr class="gradeX">'+
				'<td><img src="../images/pc/icon_10.png"></td>'+
				'<td>'+result.highGradeMutationList[i].userId+'</td>'+
				'<td>'+result.highGradeMutationList[i].befgardeValues+'</td>'+
				'<td>'+result.highGradeMutationList[i].nowgardeValues+'</td>'+
				'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highGradeMutationList[i].userId+'">详情</a></td>'+
			    '</tr>');
			}else if(i==1){
				$("#tbody_id").append('<tr class="gradeX">'+
						'<td><img src="../images/pc/icon_11.png"></td>'+
						'<td>'+result.highGradeMutationList[i].userId+'</td>'+
						'<td>'+result.highGradeMutationList[i].befgardeValues+'</td>'+
						'<td>'+result.highGradeMutationList[i].nowgardeValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highGradeMutationList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else if(i==2){
				$("#tbody_id").append('<tr class="gradeX">'+
						'<td><img src="../images/pc/icon_12.png"></td>'+
						'<td>'+result.highGradeMutationList[i].userId+'</td>'+
						'<td>'+result.highGradeMutationList[i].befgardeValues+'</td>'+
						'<td>'+result.highGradeMutationList[i].nowgardeValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highGradeMutationList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else{
				$("#tbody_id").append(
					'<tr class="gradeX">'+
					'<td>'+(i+1)*1+'</td>'+
					'<td>'+result.highGradeMutationList[i].userId+'</td>'+
					'<td>'+result.highGradeMutationList[i].befgardeValues+'</td>'+
					'<td>'+result.highGradeMutationList[i].nowgardeValues+'</td>'+
					'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highGradeMutationList[i].userId+'">详情</a></td>'+
				    '</tr>');
			}
		}
	}else{  //====> 当前页面无数据的时候 隐藏所有盒子 输出暂无数据
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

	//2、循环输出列表
	if (result.lowGradeMutationList != null && result.lowGradeMutationList.length != 0)
	{
		$("#book_value2").val(pageTwoSemester);
		$("#tbody_id2").html("");
		for (var i = 0; i < result.lowGradeMutationList.length; i++) //====> 循环输出列表 并判断前三名 输出不同的图片
		{
			if(i==0){
				$("#tbody_id2").append( '<tr class="gradeX">'+
				'<td><img src="../images/pc/icon_10.png"></td>'+
				'<td>'+result.lowGradeMutationList[i].userId+'</td>'+
				'<td>'+result.lowGradeMutationList[i].befgardeValues+'</td>'+
				'<td>'+result.lowGradeMutationList[i].nowgardeValues+'</td>'+
				'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.lowGradeMutationList[i].userId+'">详情</a></td>'+
			    '</tr>');
			}else if(i==1){
				$("#tbody_id2").append('<tr class="gradeX">'+
						'<td><img src="../images/pc/icon_11.png"></td>'+
						'<td>'+result.lowGradeMutationList[i].userId+'</td>'+
						'<td>'+result.lowGradeMutationList[i].befgardeValues+'</td>'+
						'<td>'+result.lowGradeMutationList[i].nowgardeValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.lowGradeMutationList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else if(i==2){
				$("#tbody_id2").append('<tr class="gradeX">'+
						'<td><img src="../images/pc/icon_12.png"></td>'+
						'<td>'+result.lowGradeMutationList[i].userId+'</td>'+
						'<td>'+result.lowGradeMutationList[i].befgardeValues+'</td>'+
						'<td>'+result.lowGradeMutationList[i].nowgardeValues+'</td>'+
						'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.lowGradeMutationList[i].userId+'">详情</a></td>'+
					    '</tr>');
			}else{
				$("#tbody_id2").append(
					'<tr class="gradeX">'+
					'<td>'+(i+1)*1+'</td>'+
					'<td>'+result.lowGradeMutationList[i].userId+'</td>'+
					'<td>'+result.lowGradeMutationList[i].befgardeValues+'</td>'+
					'<td>'+result.lowGradeMutationList[i].nowgardeValues+'</td>'+
					'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.lowGradeMutationList[i].userId+'">详情</a></td>'+
				    '</tr>');
				}
			}
		}
else{//====> 当前页面无数据的时候 隐藏所有盒子 输出暂无数据
			$(".words_title2").hide();
			$(".table2").hide();
			$(".box2").append("<div class='nodata'>暂无数据.....</div>");
		}
	
	//====>  详情按钮点击事件
	$(".save").on("click", function() {
		Loading1.show();
		var userId = Number($(this).attr("data_id"));
		var url = encodeURIComponent('{"userId":"' + userId + '"}');
		location.href = 'getMyPortrait?jsonStr=' + url;
	});




	//第一块模糊查询
	$("#book_search").click(function() {
		overdue();
		var userid = $("#book_value1").val();
		Loading1.show();
		var json = {
				"pageOneUserId":userid
		};
		json = JSON.stringify(json);
		Loading1.show();
		//执行异步提交表单
		$.ajax({
			type: 'post',
			url: 'getGradeMutationListByPost',
			data: {
				'jsonStr': json
			},
			success: function(result) {
				Loading1.hide();
				result = JSON.parse(result);
				if(result== null || result== undefined){//====> 判断返回后是否有数据
					Alert1.content = "暂无数据";
				}
				else if (result!= null ) {
					$("#tbody_id").html("");
					$(".box1").find(".nodata").hide();
					pageOneUserId=result.pageOneSemester;
						//循环输出列表
						if (result.highGradeMutationList != null && result.highGradeMutationList.length != 0) {
								$(".words_title1").show();
								$(".table1").show();
								for (var i = 0; i < result.highGradeMutationList.length; i++)  //====> 循环输出列表 判断前三
								{
									if(result.highGradeMutationList[i].rownum==1){
										$("#tbody_id").append( '<tr class="gradeX">'+
										'<td><img src="../images/pc/icon_10.png"></td>'+
										'<td>'+result.highGradeMutationList[i].userId+'</td>'+
										'<td>'+result.highGradeMutationList[i].befgardeValues+'</td>'+
										'<td>'+result.highGradeMutationList[i].nowgardeValues+'</td>'+
										'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highGradeMutationList[i].userId+'">详情</a></td>'+
									    '</tr>');
									}else if(result.highGradeMutationList[i].rownum==2){
										$("#tbody_id").append('<tr class="gradeX">'+
												'<td><img src="../images/pc/icon_11.png"></td>'+
												'<td>'+result.highGradeMutationList[i].userId+'</td>'+
												'<td>'+result.highGradeMutationList[i].befgardeValues+'</td>'+
												'<td>'+result.highGradeMutationList[i].nowgardeValues+'</td>'+
												'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highGradeMutationList[i].userId+'">详情</a></td>'+
											    '</tr>');
									}else if(result.highGradeMutationList[i].rownum==3){
										$("#tbody_id").append('<tr class="gradeX">'+
												'<td><img src="../images/pc/icon_12.png"></td>'+
												'<td>'+result.highGradeMutationList[i].userId+'</td>'+
												'<td>'+result.highGradeMutationList[i].befgardeValues+'</td>'+
												'<td>'+result.highGradeMutationList[i].nowgardeValues+'</td>'+
												'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highGradeMutationList[i].userId+'">详情</a></td>'+
											    '</tr>');
									}else{
										$("#tbody_id").append(
											'<tr class="gradeX">'+
											'<td>'+result.highGradeMutationList[i].rownum+'</td>'+
											'<td>'+result.highGradeMutationList[i].userId+'</td>'+
											'<td>'+result.highGradeMutationList[i].befgardeValues+'</td>'+
											'<td>'+result.highGradeMutationList[i].nowgardeValues+'</td>'+
											'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highGradeMutationList[i].userId+'">详情</a></td>'+
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
		Loading1.show();
		var json = {
				"pageTwoUserId":userid
		};
		json = JSON.stringify(json);
		Loading1.show();

		//执行异步提交表单
		$.ajax({
			type: 'post',
			url: 'getGradeMutationListByPost',
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
					pageTwoSemester=result.pageTwoSemester;
						//循环输出列表
					if (result.lowGradeMutationList != null && result.lowGradeMutationList.length != 0)//====> 循环输出列表 判断前三
					{
						$("#book_value2").val(pageTwoSemester);
						$(".words_title2").show();
						$(".table2").show();
						for (var i = 0; i < result.lowGradeMutationList.length; i++) 
						{
							if(result.lowGradeMutationList[i].rownum==1){
								$("#tbody_id2").append( '<tr class="gradeX">'+
								'<td><img src="../images/pc/icon_10.png"></td>'+
								'<td>'+result.lowGradeMutationList[i].userId+'</td>'+
								'<td>'+result.lowGradeMutationList[i].befgardeValues+'</td>'+
								'<td>'+result.lowGradeMutationList[i].nowgardeValues+'</td>'+
								'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.lowGradeMutationList[i].userId+'">详情</a></td>'+
							    '</tr>');
							}else if(result.lowGradeMutationList[i].rownum==2){
								$("#tbody_id2").append('<tr class="gradeX">'+
										'<td><img src="../images/pc/icon_11.png"></td>'+
										'<td>'+result.lowGradeMutationList[i].userId+'</td>'+
										'<td>'+result.lowGradeMutationList[i].befgardeValues+'</td>'+
										'<td>'+result.lowGradeMutationList[i].nowgardeValues+'</td>'+
										'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.lowGradeMutationList[i].userId+'">详情</a></td>'+
									    '</tr>');
							}else if(result.lowGradeMutationList[i].rownum==3){
								$("#tbody_id2").append('<tr class="gradeX">'+
										'<td><img src="../images/pc/icon_12.png"></td>'+
										'<td>'+result.lowGradeMutationList[i].userId+'</td>'+
										'<td>'+result.lowGradeMutationList[i].befgardeValues+'</td>'+
										'<td>'+result.lowGradeMutationList[i].nowgardeValues+'</td>'+
										'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.lowGradeMutationList[i].userId+'">详情</a></td>'+
									    '</tr>');
							}else{
								$("#tbody_id2").append(
									'<tr class="gradeX">'+
									'<td>'+result.lowGradeMutationList[i].rownum+'</td>'+
									'<td>'+result.lowGradeMutationList[i].userId+'</td>'+
									'<td>'+result.lowGradeMutationList[i].befgardeValues+'</td>'+
									'<td>'+result.lowGradeMutationList[i].nowgardeValues+'</td>'+
									'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.lowGradeMutationList[i].userId+'">详情</a></td>'+
								    '</tr>');
								}
							}
						}
				else{//====> 当输出不存在的时候 输出暂无数据
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
				$("#tbody_id").html("");
				if (result.highGradeMutationList != null && result.highGradeMutationList.length != 0) { //====> 算换输出列表 判断前三
					for (var i = 0; i < result.highGradeMutationList.length; i++) 
					{
						if(result.highGradeMutationList[i].rownum==1){
							$("#tbody_id").append( '<tr class="gradeX">'+
							'<td><img src="../images/pc/icon_10.png"></td>'+
							'<td>'+result.highGradeMutationList[i].userId+'</td>'+
							'<td>'+result.highGradeMutationList[i].befgardeValues+'</td>'+
							'<td>'+result.highGradeMutationList[i].nowgardeValues+'</td>'+
							'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highGradeMutationList[i].userId+'">详情</a></td>'+
						    '</tr>');
						}else if(result.highGradeMutationList[i].rownum==2){
							$("#tbody_id").append('<tr class="gradeX">'+
									'<td><img src="../images/pc/icon_11.png"></td>'+
									'<td>'+result.highGradeMutationList[i].userId+'</td>'+
									'<td>'+result.highGradeMutationList[i].befgardeValues+'</td>'+
									'<td>'+result.highGradeMutationList[i].nowgardeValues+'</td>'+
									'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highGradeMutationList[i].userId+'">详情</a></td>'+
								    '</tr>');
						}else if(result.highGradeMutationList[i].rownum==3){
							$("#tbody_id").append('<tr class="gradeX">'+
									'<td><img src="../images/pc/icon_12.png"></td>'+
									'<td>'+result.highGradeMutationList[i].userId+'</td>'+
									'<td>'+result.highGradeMutationList[i].befgardeValues+'</td>'+
									'<td>'+result.highGradeMutationList[i].nowgardeValues+'</td>'+
									'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highGradeMutationList[i].userId+'">详情</a></td>'+
								    '</tr>');
						}else{
							$("#tbody_id").append(
								'<tr class="gradeX">'+
								'<td>'+result.highGradeMutationList[i].rownum+'</td>'+
								'<td>'+result.highGradeMutationList[i].userId+'</td>'+
								'<td>'+result.highGradeMutationList[i].befgardeValues+'</td>'+
								'<td>'+result.highGradeMutationList[i].nowgardeValues+'</td>'+
								'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.highGradeMutationList[i].userId+'">详情</a></td>'+
							    '</tr>');
						}
					}
			}else{  //====> 当输出不存在的时候 输出暂无数据
				$(".words_title1").hide();
				$(".table1").hide();
				$(".box1").append("<div class='nodata'>暂无数据.....</div>");
			}
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
				$("#tbody_id2").html("")
				if (result.lowGradeMutationList != null && result.lowGradeMutationList.length != 0)
				{
					$("#book_value2").val(pageTwoSemester);
					
					for (var i = 0; i < result.lowGradeMutationList.length; i++)  //====> 算换输出列表 判断前三
					{
						if(result.lowGradeMutationList[i].rownum==1){
							$("#tbody_id2").append( '<tr class="gradeX">'+
							'<td><img src="../images/pc/icon_10.png"></td>'+
							'<td>'+result.lowGradeMutationList[i].userId+'</td>'+
							'<td>'+result.lowGradeMutationList[i].befgardeValues+'</td>'+
							'<td>'+result.lowGradeMutationList[i].nowgardeValues+'</td>'+
							'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.lowGradeMutationList[i].userId+'">详情</a></td>'+
						    '</tr>');
						}else if(result.lowGradeMutationList[i].rownum==2){
							$("#tbody_id2").append('<tr class="gradeX">'+
									'<td><img src="../images/pc/icon_11.png"></td>'+
									'<td>'+result.lowGradeMutationList[i].userId+'</td>'+
									'<td>'+result.lowGradeMutationList[i].befgardeValues+'</td>'+
									'<td>'+result.lowGradeMutationList[i].nowgardeValues+'</td>'+
									'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.lowGradeMutationList[i].userId+'">详情</a></td>'+
								    '</tr>');
						}else if(result.lowGradeMutationList[i].rownum==3){
							$("#tbody_id2").append('<tr class="gradeX">'+
									'<td><img src="../images/pc/icon_12.png"></td>'+
									'<td>'+result.lowGradeMutationList[i].userId+'</td>'+
									'<td>'+result.lowGradeMutationList[i].befgardeValues+'</td>'+
									'<td>'+result.lowGradeMutationList[i].nowgardeValues+'</td>'+
									'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.lowGradeMutationList[i].userId+'">详情</a></td>'+
								    '</tr>');
						}else{
							$("#tbody_id2").append(
								'<tr class="gradeX">'+
								'<td>'+result.lowGradeMutationList[i].rownum+'</td>'+
								'<td>'+result.lowGradeMutationList[i].userId+'</td>'+
								'<td>'+result.lowGradeMutationList[i].befgardeValues+'</td>'+
								'<td>'+result.lowGradeMutationList[i].nowgardeValues+'</td>'+
								'<td><a href="javascript:void(0)" class="btn btn-success save" data_id="'+result.lowGradeMutationList[i].userId+'">详情</a></td>'+
							    '</tr>');
							}
						}
					}
			else{//====> 当输出不存在的时候 输出暂无数据
						$(".words_title2").hide();
						$(".table2").hide();
						$(".box2").append("<div class='nodata'>暂无数据.....</div>");
					}
				//====> 绑定编辑点击事件 
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

