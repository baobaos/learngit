/* 
 *添加部门js文件
 *创建人：孟令超
 *创建日期:2017/02/15
 *@修改人：xzx     @修改时间：2017.4.27    @修改原因：回车进行登录    @修改位置或名称：登录提交方法
 */

$(function() {
	var Loading1 = new Loading();
	Loading1.init();
	var Alert1 = new Alert();
	$("#subimt").click(function() {
		submitFunc();
	});
	
	//文本框回车提交
	$("#loginName,#password,#verficateCode").keydown(function(e){
		if(e.keyCode==13){
			submitFunc();
		 }
	   });
	
	function submitFunc(){
		if ($("#loginName").val() == "") {
			Alert1.content = "请输入用户名";
			Alert1.init();
			Alert1.show();
			return
		}
		if ($("#password").val() == "") {
			Alert1.content = "请输入密码";
			Alert1.init();
			Alert1.show();
			return
		}
		if ($("#verficateCode").val() == "") {
			Alert1.content = "请输入验证码";
			Alert1.init();
			Alert1.show();
			return
		}
		
		Alert1.content = "登陆成功";
		Alert1.success = function() {
			window.location.href = 'textmain.html';
		};
		Alert1.init();
		Alert1.show();
		
		/*var json = {
				loginName: "",
				password: "",
				verficateCode:""
		};
		json.loginName = $("#loginName").val();
		json.password = $("#password").val();
		json.verficateCode = $("#verficateCode").val();
		json = JSON.stringify(json);
		Loading1.show();
		$.ajax({
			type: 'post',
			url: 'login',
			data: {
				'jsonStr': json
			},
			success: function(result) {
				result = JSON.parse(result);
				if (result.result == "success") {
					var cookietime = new Date();
					cookietime.setTime(cookietime.getTime()+((30*60*1000)));
					$.cookie("userName",$("#loginName").val(),{expires:cookietime});
					
					window.location.href = 'skipMainTest?jsonStr={}';
				} else {
					if (result.errorMsg == "") {
						var Msg = "登录失败";
					} else {
						var Msg = result.errorMsg;
					}
					Alert1.content = Msg;
					Alert1.success = function() {
						window.location.href = 'beforeLogin?jsonStr={}';
					};
					Alert1.init();
					Alert1.show();
				}
			},
			error: function() {
				Loading1.hide();
				Alert1.content = "登录失败请联系管理员！";
				Alert1.init();
				Alert1.show();
			}
		});*/
		
	}
});