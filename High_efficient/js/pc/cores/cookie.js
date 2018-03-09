

/*判断cookie是否存在*/
if($.cookie('userName')==undefined){
	top.location.href = 'beforeLogin?jsonStr={}';
}else{
	var cookietime = new Date();
	cookietime.setTime(cookietime.getTime()+((30*60*1000)));
	$.cookie("userName",$.cookie('userName'),{expires:cookietime});
}
/*添加首页返回*/
$(function(){
	//登录验证
	var c_start=document.cookie.indexOf("user");
	if(c_start == -1){
		top.location.href='beforeLogin';
	}
	$(".subnav a").eq(0).attr("href","skipMain");
	
	$(".subnav a").click(function(){
		var c_start=document.cookie.indexOf("user");
		if(c_start == -1){
			top.location.href='beforeLogin';
		}
	});
});