 /*
 * @JS说明:用于分页查询
 * @作者：白丹丹
 * @创建日期：2017年2月23日
 * @功能说明：code:分页类名，sumpage总页数,nowpage当前页,json传参,action   action名
 * @修改人：xzx     @修改时间：2017.4.27    @修改原因：frame框架跳转登陆页面跳转不出去    @修改位置或名称：交互事件添加cookie判断
 */
var subPage = function(code,sumpage,nowpage,json1,action) {
	//判断cookie是否过期
	overdue();
			//分页加载
	$("."+code).createPage({
		pageCount: sumpage,
		//总页数
		current: nowpage,
		//每页显示数量
		backFn: function(p) {
			nowpage = p;
			if (nowpage >= sumpage) {
				nowpage = sumpage;
			}
			if(code == "tcdPageCode2"){
				json1.pageNowTwo=nowpage;
			}else{
				json1.pageNowOne=nowpage;
			}		
			
			var json = json1;
			json = JSON.stringify(json);
			 // alert("json="+json)
			 // alert("code:"+code)
			//window.location.href = action + '?jsonStr=' + json;


			Loading1.show();
		
		// alert(json);
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
				 	if(code == "tcdPageCode1"){
						//分页
				 sumpage = result.totalPageOne; //总页数
				 nowpage = result.pageNowOne; //当前页数

				 finddep = result.pageSizeOne;
				 pageSizeTwo = result.pageSizeTwo;
				 searchTypeOne=result.searchTypeOne;
						$("#tbody_id").html("");

						$("#tbody_id1").html("");
						$(".words_title1").show();
						$(".table1").show();
						$(".page1").show();
						$(".box1").find(".nodata").hide();
						//循环输出列表
						if (result.allBookList != null && result.allBookList.length != 0) {
							
							for (var i = 0; i < result.allBookList.length; i++) {
								if(nowpage == 1){
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
									

							subPage("tcdPageCode1",sumpage,nowpage,json,"getBookRank");
						}else{
							$(".words_title1").hide();
							$(".table1").hide();
							$(".page1").hide();
							$(".box1").append("<div class='nodata'>暂无数据.....</div>");
						}
				}else{
					sumpage = result.totalPageOne; //总页数
					 nowpage = result.pageNowOne; //当前页数
					 finddep = result.pageSizeOne;
					 totalPageTwo = result.totalPageTwo;
					 pageSizeTwo = result.pageSizeTwo;
					 pageNowTwo = result.pageNowTwo;
					 searchTypeOne=result.searchTypeOne;
					 searchTypeTwo = result.searchTypeTwo;
					 searchYear = result.searchYear;



							$("#tbody_id2").html("");
							$(".words_title2").show();
							$(".table2").show();
							$(".page2").show();
							$(".box2").find(".nodata").hide();
							$("#book_text2").val("");

							//循环输出列表
							if (result.monthBookList != null && result.monthBookList.length != 0) {
								$("#book_year").html(result.monthBookList[0].year+"年"+result.monthBookList[0].month+"月图书排名");
								for (var i = 0; i < result.monthBookList.length; i++) {
									// alert("name:"+result.monthBookList[i].bookName)
									if(pageNowTwo == 1){
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
					
					
					
				} 
			}else {
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






		}
	});
};

