// 登录验证

$(function(){
	
	//登录验证
	var c_start=document.cookie.indexOf("user"); 
	if(c_start == -1){
		top.location.href='beforeLogin';
	}
	
	
 });

function overdue(){
	//登录验证
	var c_start=document.cookie.indexOf("user");
	if(c_start == -1){
		top.location.href='beforeLogin';
	}
}