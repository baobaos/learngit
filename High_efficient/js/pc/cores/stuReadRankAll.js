/* 
 *学生阅读量总排名js文件
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
 
	
	//分页
	var sumpage = result.totalPageOne; //1块总页数
	var nowpage = result.pageNowOne; //1块当前页数
	var finddep = result.pageSizeOne;//1块每页多少条
	var userId=result.userId;//1块查询条件

		//1、循环输出列表
	if (result.stuReadList != null && result.stuReadList.length != 0)
	{
		for (var i = 0; i < result.stuReadList.length; i++) 
		{
			if(result.pageNowOne==1){
					if(result.stuReadList[i].rownum <= 3){
						$("#tbody_id").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_1'+(result.stuReadList[i].rownum*1-1)+'.png"></td>'+
						'<td>'+result.stuReadList[i].userId+'</td>'+
						'<td>'+result.stuReadList[i].borrowCount+'</td>'+
						'<td>'+result.stuReadList[i].borrowTime+'</td>'+
							'</tr>');
					}else{
						$("#tbody_id").append('<tr class="gradeX">'+
						'<td>'+result.stuReadList[i].rownum+'</td>'+
						'<td>'+result.stuReadList[i].userId+'</td>'+
						'<td>'+result.stuReadList[i].borrowCount+'</td>'+
						'<td>'+result.stuReadList[i].borrowTime+'</td>'+
						'</tr>');
				}
			}
			else
			{
				$("#tbody_id").append('<tr class="gradeX">'+
				'<td>'+result.stuReadList[i].rownum+'</td>'+
				'<td>'+result.stuReadList[i].userId+'</td>'+
				'<td>'+result.stuReadList[i].borrowCount+'</td>'+
				'<td>'+result.stuReadList[i].borrowTime+'</td>'+
				'</tr>');
			}
		}
	}else{
			$(".words_title1").hide();
			$(".table1").hide();
			$(".page1").hide();
			$(".box1").append("<div class='nodata'>暂无数据.....</div>");
		}	
// 模糊查询
	$("#book_search").click(function() {
		//判断cookie是否过期
		overdue();
		var userId = $("#book_value").val();
		Loading1.show();
		var json = {
				"userId":userId,"pageNowOne":1,"pageSizeOne":10
		};
		json = JSON.stringify(json);
		Loading1.show();
		window.location.href='getStuReadRankAll?jsonStr='+json;
		
	});

//1分页加载
	$(".tcdPageCode1").createPage({
		pageCount: sumpage,
		//总页数
		current: nowpage,
		//每页显示数量
		backFn: function(p) {
			nowpage = p;
			if (nowpage >= sumpage) {
				nowpage = sumpage;
			}
			var json = {
				pageNowOne: nowpage,
				pageSizeOne: finddep,
				userId: result.userId
			};
			//判断cookie是否过期
			overdue();
			json = JSON.stringify(json);
			window.location.href = 'getStuReadRankAll?jsonStr=' + json;
		}
	
	});
});

