/* 
 *综合能力强群体分析js文件
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
	var pageSizeTwo = result.pageSizeTwo;//2块每页多少条
	var pageNowTwo = result.pageNowTwo;//2块当前页
	var totalPageTwo = result.totalPageTwo;//2块总页数
	// var userId = result.userId;//2块类型查询条件
	var searchYear = result.searchYear;//2块查询年月
	var userId=result.userId;

		//1、循环输出列表
	if (result.monthAbilityList != null && result.monthAbilityList.length != 0)
	{
		$("#book_year").html(result.monthAbilityList[0].year+"年"+result.monthAbilityList[0].month+"月学生阅读能力排名");
		for (var i = 0; i < result.monthAbilityList.length; i++) 
		{
			if(result.pageNowTwo==1){
					if(result.monthAbilityList[i].rownum <= 3){
						$("#tbody_id2").append('<tr class="gradeX">'+
						'<td><img src="images/pc/icon_1'+(result.monthAbilityList[i].rownum*1-1)+'.png"></td>'+
						'<td>'+result.monthAbilityList[i].userId+'</td>'+
						'<td>'+result.monthAbilityList[i].readValues+'</td>'+	
						'<td><a href="javascript:woid(0)" class="btn btn-success save" data_id="'+result.monthAbilityList[i].userId+'">详情</a></td>'+					
							'</tr>');
					}else{
						$("#tbody_id2").append('<tr class="gradeX">'+
						'<td>'+result.monthAbilityList[i].rownum+'</td>'+
						'<td>'+result.monthAbilityList[i].userId+'</td>'+
						'<td>'+result.monthAbilityList[i].readValues+'</td>'+
						'<td><a href="javascript:woid(0)" class="btn btn-success save" data_id="'+result.monthAbilityList[i].userId+'">详情</a></td>'+
						'</tr>');
				}
			}
			else
			{
				$("#tbody_id2").append('<tr class="gradeX">'+
				'<td>'+result.monthAbilityList[i].rownum+'</td>'+
				'<td>'+result.monthAbilityList[i].userId+'</td>'+
				'<td>'+result.monthAbilityList[i].readValues+'</td>'+
				'<td><a href="javascript:woid(0)" class="btn btn-success save" data_id="'+result.monthAbilityList[i].userId+'">详情</a></td>'+
				'</tr>');
			}
		}
	}else{
			$(".words_title2").hide();
			$(".table2").hide();
			$(".page2").hide();
			$(".box2").append("<div class='nodata'>暂无数据.....</div>");
			$("book_value2").val("");
		}	
	//详情
	$(".save").on("click", function() {
		//判断cookie是否过期
		overdue();
		Loading1.show();
		var userId = Number($(this).attr("data_id"));
		var url = encodeURIComponent('{"userId":"' + userId + '"}');
		var t = self.frameElement; 

		if(t && (t.tagName=="FRAME"||t.tagName=="IFRAME")){ 

		// 页面在iframe中时处理 

		window.parent.location = 'getMyReadAbility?jsonStr=' + url;

		}else{ 

		window.location = 'getMyReadAbility?jsonStr=' + url;

		} 
	});
// 模糊查询
	$("#book_search2").click(function() {
		//判断cookie是否过期
		overdue();
		var userId = $("#book_value2").val();
		var searchYear=$("#book_text2").val();
		if(userId=='' && searchYear==''){
				Alert1.content = "请输入查询条件！";
				Alert1.init();
				Alert1.show();
				return ;
		}
		Loading1.show();
		var json = {
				"userId":userId,"pageSizeTwo":10,"pageNowTwo":1,"searchYear":searchYear
		};
		json = JSON.stringify(json);
		// alert(json);

		Loading1.show();

		window.location.href='getStuReadAbilityRankMonth?jsonStr='+json;
		
	});

//1分页加载
	$(".tcdPageCode2").createPage({
		pageCount: totalPageTwo,
		//总页数
		current: pageNowTwo,
		//每页显示数量
		backFn: function(p) {
			pageNowTwo = p;
			if (pageNowTwo >= totalPageTwo) {
				pageNowTwo = totalPageTwo;
			}
			var json = {									
				pageNowTwo: pageNowTwo,		
				pageSizeTwo: pageSizeTwo,	
				userId:userId,
				searchYear:searchYear
			};
			//判断cookie是否过期
			overdue();
			json = JSON.stringify(json);
			window.location.href = 'getStuReadAbilityRankMonth?jsonStr=' + json;
		}
	
	});
});

