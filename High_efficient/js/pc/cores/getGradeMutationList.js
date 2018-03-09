/* 
 *成绩突变群体查询js文件
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


	//1、循环输出列表
	if (result.allBookList != null && result.allBookList.length != 0)
	{
		$("#book_value").val(searchTypeOne);
		// $("#year").text(result.allBookList[0].dataDate);
		for (var i = 0; i < result.allBookList.length; i++) 
		{
			if(result.pageNowOne==1){
					if(i <= 2){
						$("#tbody_id").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_1'+i+'.png"></td>'+
						'<td>'+result.allBookList[i].borrowCount+'</td>'+
						'<td>'+result.allBookList[i].bookName+'</td>'+
						'<td>'+result.allBookList[i].type+'</td>'+
						'<td>'+result.allBookList[i].authorName+'</td>'+
							'</tr>');
					}else{
						$("#tbody_id").append('<tr class="gradeX">'+
						'<td>'+result.allBookList[i].rownum+'</td>'+
						'<td>'+result.allBookList[i].borrowCount+'</td>'+
						'<td>'+result.allBookList[i].bookName+'</td>'+
						'<td>'+result.allBookList[i].type+'</td>'+
						'<td>'+result.allBookList[i].authorName+'</td>'+
						'</tr>');
				}
			}
			else
			{
				$("#tbody_id").append('<tr class="gradeX">'+
				'<td>'+result.allBookList[i].rownum+'</td>'+
				'<td>'+result.allBookList[i].borrowCount+'</td>'+
				'<td>'+result.allBookList[i].bookName+'</td>'+
				'<td>'+result.allBookList[i].type+'</td>'+
				'<td>'+result.allBookList[i].authorName+'</td>'+
				'</tr>');
			}
		}
	}else{
			$(".words_title1").hide();
			$(".table1").hide();
			$(".page1").hide();
			$(".box1").append("<div class='nodata'>暂无数据.....</div>");
		}	




	//第一块模糊查询
	$("#book_search").click(function() {
		var searchTypeOne = $("#book_value").val();
		Loading1.show();
		var json = {
				"searchTypeOne":searchTypeOne,"pageNowOne":1,"pageSizeOne":10,"pageSizeTwo":10,"pageNowTwo":1,"searchTypeTwo":0
		};
		json = JSON.stringify(json);
		Loading1.show();

		//执行异步提交表单
		$.ajax({
			type: 'post',
			url: 'getBookRankPost',
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
						//分页
				 sumpage = result.totalPageOne; //总页数
				 nowpage = result.pageNowOne; //当前页数

				 finddep = result.pageSizeOne;
				 pageSizeTwo = result.pageSizeTwo;
				 searchTypeOne=result.searchTypeOne;
						$("#tbody_id").html("");
						$(".page1").show();
						$(".box1").find(".nodata").hide();
						//循环输出列表
						if (result.allBookList != null && result.allBookList.length != 0) {
							$(".words_title1").show();
							$(".table1").show();
							
							for (var i = 0; i < result.allBookList.length; i++) {
								if(i <= 2){
										$("#tbody_id").append('<tr class="gradeX">'+
										'<td><img src="images/pc/icon_1'+i+'.png"></td>'+
										'<td>'+result.allBookList[i].borrowCount+'</td>'+
										'<td>'+result.allBookList[i].bookName+'</td>'+
										'<td>'+result.allBookList[i].type+'</td>'+
										'<td>'+result.allBookList[i].authorName+'</td>'+
											'</tr>');
									}else{
										$("#tbody_id").append('<tr class="gradeX">'+
										'<td>'+(i+1)*1+'</td>'+
										'<td>'+result.allBookList[i].borrowCount+'</td>'+
										'<td>'+result.allBookList[i].bookName+'</td>'+
										'<td>'+result.allBookList[i].type+'</td>'+
										'<td>'+result.allBookList[i].authorName+'</td>'+
											'</tr>');
								}
							}
							$("#book_value").val(result.searchTypeOne);
							searchTypeOne=result.searchTypeOne;
							var json = {
										pageNowOne: nowpage,
										pageNowTwo: pageNowTwo,
										pageSizeOne: finddep,
										pageSizeTwo: pageSizeTwo,
										searchTypeOne: result.searchTypeOne,
										searchTypeTwo:0
									};
									alert("1:pnow:"+nowpage+"2:pnow:"+pageNowTwo)

							subPage("tcdPageCode1",sumpage,nowpage,json,"getBookRank");
						}else{
							$(".words_title1").hide();
							$(".table1").hide();
							$(".page1").hide();
							$(".box1").append("<div class='nodata'>暂无数据.....</div>");
						}
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
		var searchTypeTwo = $("#book_value2").val();
		var searchYear=$("#book_text2").val();
		if(searchTypeTwo=='' && searchYear==''){
				Alert1.content = "请输入查询条件！";
				Alert1.init();
				Alert1.show();
				return ;
		}

		Loading1.show();
		var json = {
				"searchTypeTwo":searchTypeTwo,"pageNowOne":nowpage,"pageSizeOne":10,"pageSizeTwo":10,"pageNowTwo":1,"searchTypeOne":0,"searchYear":searchYear
		};
		json = JSON.stringify(json);
		Loading1.show();

		//执行异步提交表单
		$.ajax({
			type: 'post',
			url: 'getBookRankPost',
			data: {
				'jsonStr': json
			},
			success: function(result) {
				Loading1.hide();
				// alert(result);
				result = JSON.parse(result);
				if (result!= null ) {
						//分页
				 sumpage = result.totalPageOne; //总页数
				 nowpage = result.pageNowOne; //当前页数
				 finddep = result.pageSizeOne;
				 totalPageTwo = result.totalPageTwo;
				 pageSizeTwo = result.pageSizeTwo;
				 pageNowTwo = result.pageNowTwo;
				 searchTypeOne=result.searchTypeOne;
				 searchTypeTwo = result.searchTypeTwo;
				 searchYear = result.searchYear;
						$(".box2").find(".nodata").hide();
						//循环输出列表
						if (result.monthBookList != null && result.monthBookList.length != 0) {
							$(".words_title2").show();
							$(".table2").show();
							for (var i = 0; i < result.monthBookList.length; i++) {
								if(i <= 2){
										$("#tbody_id2").append('<tr class="gradeX">'+
										'<td><img src="images/pc/icon_1'+i+'.png"></td>'+
										'<td>'+result.monthBookList[i].bookCount+'</td>'+
										'<td>'+result.monthBookList[i].bookName+'</td>'+
										'<td>'+result.monthBookList[i].type+'</td>'+
										'<td>'+result.monthBookList[i].authorName+'</td>'+
											'</tr>');
									}else{
										$("#tbody_id2").append('<tr class="gradeX">'+
										'<td>'+(i+1)*1+'</td>'+
										'<td>'+result.monthBookList[i].bookCount+'</td>'+
										'<td>'+result.monthBookList[i].bookName+'</td>'+
										'<td>'+result.monthBookList[i].type+'</td>'+
										'<td>'+result.monthBookList[i].authorName+'</td>'+
											'</tr>');
								}
							}
							$("#book_value2").val(result.searchTypeTwo);
							var json = {
										pageNowOne: nowpage,
										pageNowTwo: pageNowTwo,
										pageSizeOne: 10,
										pageSizeTwo: pageSizeTwo,
										searchTypeOne: 0,
										searchTypeTwo:result.searchTypeTwo,
										searchYear:result.searchYear
									};
									// alert("1:"+nowpage+" 2:"+pageNowTwo);
							subPage("tcdPageCode2",totalPageTwo,pageNowTwo,json,"getBookRank");
						}else{
							$(".words_title2").hide();
							$(".table2").hide();
							$(".page2").hide();
							$(".box2").append("<div class='nodata'>暂无数据.....</div>");
						}
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

	//1分页加载
	var json = {
				pageNowOne: nowpage,
				pageNowTwo: pageNowTwo,
				pageSizeOne: finddep,
				pageSizeTwo: pageSizeTwo,
				searchTypeOne: result.searchTypeOne,
				searchTypeTwo:0
			};

var json1 = {
				pageNowOne: nowpage,
				pageNowTwo: pageNowTwo,
				pageSizeOne: 10,
				pageSizeTwo: pageSizeTwo,
				searchTypeOne: 0,
				searchTypeTwo:searchTypeTwo,
				searchYear:searchYear
			};



		//调用tab插件
		var arr=[function(){
		//动态加载数据				
		var json=result;					
			if(json==null)
			{
				$map.html("<div class='nodata'>暂无数据.....</div>");
			}else{		
					if (result.allBookList != null && result.allBookList.length != 0) {
						$("#tbody_id").html("");
						$("#book_value").val(result.searchTypeOne);
							for (var i = 0; i < result.allBookList.length; i++) 
							{
								if(result.pageNowOne==1){
										if(i <= 2){
										$("#tbody_id").append('<tr class="gradeX">'+
										'<td><img src="images/pc/icon_1'+i+'.png"></td>'+
										'<td>'+result.allBookList[i].borrowCount+'</td>'+
										'<td>'+result.allBookList[i].bookName+'</td>'+
										'<td>'+result.allBookList[i].type+'</td>'+
										'<td>'+result.allBookList[i].authorName+'</td>'+
											'</tr>');
									}else{
										$("#tbody_id").append('<tr class="gradeX">'+
												'<td>'+result.allBookList[i].rownum+'</td>'+
											// '<td>'+result.allBookList[i].rownum+'</td>'+
										'<td>'+result.allBookList[i].borrowCount+'</td>'+
										'<td>'+result.allBookList[i].bookName+'</td>'+
										'<td>'+result.allBookList[i].type+'</td>'+
										'<td>'+result.allBookList[i].authorName+'</td>'+
											'</tr>');
									}
								}
								else{
									$("#tbody_id").append('<tr class="gradeX">'+
											'<td>'+result.allBookList[i].rownum+'</td>'+
										// '<td>'+result.allBookList[i].rownum+'</td>'+
									'<td>'+result.allBookList[i].borrowCount+'</td>'+
									'<td>'+result.allBookList[i].bookName+'</td>'+
									'<td>'+result.allBookList[i].type+'</td>'+
									'<td>'+result.allBookList[i].authorName+'</td>'+
										'</tr>');
								}
							}

	var json = {
				pageNowOne: nowpage,
				pageNowTwo: pageNowTwo,
				pageSizeOne: finddep,
				pageSizeTwo: pageSizeTwo,
				searchTypeOne: result.searchTypeOne,
				searchTypeTwo:0
			};
			// alert("1p:"+nowpage+" 2p:"+pageNowTwo)
	subPage("tcdPageCode1",sumpage,nowpage,json,"getBookRank");

						}else{
							$(".words_title1").hide();
							$(".table1").hide();
							$(".page1").hide();
							$(".box1").append("<div class='nodata'>暂无数据.....</div>");
						}
			}
	},function(){
		//动态加载数据			
		//调用SpendingPower进行数据转换
		var json2=result;							
			if(json2==null)
			{
				$map2.html("<div class='nodata'>暂无数据.....</div>");
			}else{	
						if (result.monthBookList != null && result.monthBookList.length != 0)
	{
		$("#book_value2").val(searchTypeTwo);
		$("#book_text2").val(result.monthBookList[0].borrowDate);
		$("#tbody_id2").html("");
		for (var i = 0; i < result.monthBookList.length; i++) 
		{
			if(result.pageNowTwo==1){
					if(i <= 2){
						$("#tbody_id2").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_1'+i+'.png"></td>'+
						'<td>'+result.monthBookList[i].bookCount+'</td>'+
						'<td>'+result.monthBookList[i].bookName+'</td>'+
						'<td>'+result.monthBookList[i].type+'</td>'+
						'<td>'+result.monthBookList[i].authorName+'</td>'+
							'</tr>');
					}else{
						$("#tbody_id2").append('<tr class="gradeX">'+
						'<td>'+result.monthBookList[i].rownum+'</td>'+
						'<td>'+result.monthBookList[i].bookCount+'</td>'+
						'<td>'+result.monthBookList[i].bookName+'</td>'+
						'<td>'+result.monthBookList[i].type+'</td>'+
						'<td>'+result.monthBookList[i].authorName+'</td>'+
						'</tr>');
				}
			}
			else
			{
				$("#tbody_id2").append('<tr class="gradeX">'+
				'<td>'+result.monthBookList[i].rownum+'</td>'+
				'<td>'+result.monthBookList[i].bookCount+'</td>'+
				'<td>'+result.monthBookList[i].bookName+'</td>'+
				'<td>'+result.monthBookList[i].type+'</td>'+
				'<td>'+result.monthBookList[i].authorName+'</td>'+
				'</tr>');
			}
		}
			var json = {
				pageNowOne: nowpage,
				pageNowTwo: pageNowTwo,
				pageSizeOne: 10,
				pageSizeTwo: pageSizeTwo,
				searchTypeOne: 0,
				searchTypeTwo:searchTypeTwo,
				searchYear:searchYear
			};
	subPage("tcdPageCode2",totalPageTwo,pageNowTwo,json,"getBookRank");
	}
else{
			$(".words_title2").hide();
			$(".table2").hide();
			$(".page2").hide();
			$(".box2").append("<div class='nodata'>暂无数据.....</div>");
		}
			}
	}];
	tab(arr);
});

