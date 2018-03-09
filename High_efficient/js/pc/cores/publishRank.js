/* 
 *热点出版社排名js文件
 *创建人：白丹丹
 *创建日期:2017/02/14
 *@修改人：xzx     @修改时间：2017.4.27    @修改原因：frame框架跳转登陆页面跳转不出去    @修改位置或名称：交互事件添加cookie判断
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
	if (result.publishList != null && result.publishList.length != 0)
	{
		// $("#book_value").val(result.publishName);
		$("#publish_title").html(result.publishList[0].year+"年"+result.publishList[0].month+"月热点出版社排名");
		// $("#author_value").val(result.authorName);

		for (var i = 0; i < result.publishList.length; i++) 
		{
			
					if(i <= 2){
						$("#tbody_id2").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_1'+i+'.png"></td>'+
						'<td>'+result.publishList[i].borrowCount+'</td>'+
						
						'<td class="bookPublishRank bookRank">'+result.publishList[i].publish+'</td>'+
							'</tr>');
					}else{
						$("#tbody_id2").append('<tr class="gradeX">'+
						'<td>'+result.publishList[i].rownum+'</td>'+
						'<td>'+result.publishList[i].borrowCount+'</td>'+
						
						'<td class="bookPublishRank bookRank">'+result.publishList[i].publish+'</td>'+
						'</tr>');
				}
			
		}
	}	




	//第一块模糊查询
	$("#book_search").click(function() {
		//判断cookie是否过期
		overdue();
		var searchYear = $("#month_average_text").val();
		var publishName= $("#book_value").val();
		Loading1.show();
		var json = {
				"searchYear":searchYear,"publishName":publishName
		};
		json = JSON.stringify(json);
		Loading1.show();

		//执行异步提交表单
		$.ajax({
			type: 'post',
			url: 'getPublishRankPost',
			data: {
				'jsonStr': json
			},
			success: function(result) {
				Loading1.hide();
				// alert(result);
				result = JSON.parse(result);
				if(result== null || result== undefined){
					Alert1.content = "暂无数据";
				}
				else if (result!= null ) {
						//分页
				$("#tbody_id2").html("");
				$(".box2").find(".nodata").hide();
				$(".words_title2").show();
				$(".table2").show();
						//循环输出列表
						if (result.publishList != null && result.publishList.length != 0) {		
						$("#publish_title").html(result.publishList[0].year+"年"+result.publishList[0].month+"月热点出版社排名");					
							for (var i = 0; i < result.publishList.length; i++) {
							// alert()						
								if(result.publishList[i].rownum <= 3){
										$("#tbody_id2").append('<tr class="gradeX">'+
										'<td><img src="images/pc/icon_1'+(result.publishList[i].rownum*1-1)+'.png"></td>'+
										'<td>'+result.publishList[i].borrowCount+'</td>'+
										'<td class="bookPublishRank bookRank">'+result.publishList[i].publish+'</td>'+
											'</tr>');
									}else{

										$("#tbody_id2").append('<tr class="gradeX">'+
										'<td>'+result.publishList[i].rownum+'</td>'+
										'<td>'+result.publishList[i].borrowCount+'</td>'+										
										'<td class="bookPublishRank bookRank">'+result.publishList[i].publish+'</td>'+
											'</tr>');
								}
							}		
							publishrownum=result.publishrownum;					
							publishName=result.publishName;
							
						}else{
							$(".words_title2").hide();
							$(".table2").hide();
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
});

	