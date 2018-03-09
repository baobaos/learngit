/* 
 *图书类别排名页面js文件
 *创建人：白丹丹
 *创建日期:2017/02/24
 **@修改人：xzx     @修改时间：2017.4.27    @修改原因：frame框架跳转登陆页面跳转不出去    @修改位置或名称：交互事件添加cookie判断
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



	var loading=new Loading();
	loading.init();
	var alert1=new Alert();	
	
	if (result.bookTypeList != null && result.bookTypeList.length != 0)
	{
		for (var i = 0; i < result.bookTypeList.length; i++) 
		{
				$("#bookType").append('<div class="col-md-6 books" id="one">'+
					'<div class="books_img fl"><img src="images/pc/pic_type_0'+result.bookTypeList[i].typeCode+'.png"></div>'+
					'<div class="books_word">'+
						'<p>排名：<span class="rangk">'+result.bookTypeList[i].rownum+'</span></p>'+
						'<p>借阅次数：<span class="rangk">'+result.bookTypeList[i].borrowCount+'</span>次</p>'+
						'<p>图书类别：<span class="bookName">'+result.bookTypeList[i].type+'</span></p>'+
					'</div>'+
				'</div>');
		}
	}else{
			$(".box1").append("<div class='nodata'>暂无数据.....</div>");
		}

	$("#bookCategory_search").click(function(){
		//判断cookie是否过期
		overdue();
		var text=$("#bookCategory_text").val();
		if(text=="")
		{
			alert1.content="请选择年月！";
			alert1.init();
			alert1.show();
		}else 
		{
			loading.show();
			var jsonStr={"searchYear":text};
			$.ajax({
	            type: "post",
				url: 'getBookTypeRankPost?jsonStr='+JSON.stringify(jsonStr),
	            success: function (result) {
	            	$("#bookCategory_text").val("");	
	            	$("#bookType").html("");	            	
	            	loading.hide();
	            	result = JSON.parse(result);        	
	            	var json=result;			            	    	
	            	if(json==null)
					{
						$map.html("<div class='nodata'>暂无排名.....</div>");
					}else{
						$(".box1").find(".nodata").hide();
						if (result.bookTypeList != null && result.bookTypeList.length != 0)
	{
		for (var i = 0; i < result.bookTypeList.length; i++) 
		{
				$("#bookType").append('<div class="col-md-6 books" id="one">'+
					'<div class="books_img fl"><img src="images/pc/pic_type_0'+result.bookTypeList[i].typeCode+'.png"></div>'+
					'<div class="books_word">'+
						'<p>排名：<span class="rangk">'+result.bookTypeList[i].rownum+'</span></p>'+
						'<p>借阅次数：<span class="rangk">'+result.bookTypeList[i].borrowCount+'</span>次</p>'+
						'<p>图书类别：<span class="bookName">'+result.bookTypeList[i].type+'</span></p>'+
					'</div>'+
				'</div>');
		}
	}else{
			$(".box1").append("<div class='nodata'>暂无数据.....</div>");
		}
					}
	            },
				error: function() {	
					    loading.hide();
						alert1.content="查询失败!";
						alert1.init();
						alert1.show();
				}			
   			 });
		}			
	});		

});
