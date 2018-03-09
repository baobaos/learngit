/* 
 *部门列表js文件
 *创建人：孟令超
 *创建日期:2017/02/14
 *@修改人：xzx     @修改时间：2017.4.27    @修改原因：frame框架跳转登陆页面跳转不出去    @修改位置或名称：交互事件添加cookie判断
 **/



$(function() {

	var Loading1 = new Loading(); // loadng 盒子初始化
	Loading1.init(); // 插入loading 盒子
	var Alert1 = new Alert(); //弹出盒子初始化
	var confirm1 = new Confirm(); // 确定取消盒子初始化
	// 循环添加角色选项
	if(result.roleList.length!=0){
		for(var i=0;i<result.roleList.length;i++){
			$("#roleId").append('<option value="'+result.roleList[i].roleId+'">'+result.roleList[i].roleName+'</option> ')
		}
	}
	
	if($('#savepwd').val() == 1){
		$('.showhide').hide();
	}else{
		$('.showhide').show();
	}
	
	$('#savepwd').change(function(){
		if($('#savepwd').val() == 1){
			$('.showhide').hide();
		}else{
			$('.showhide').show();
		}
	});
	
	// 提交开始
	$("#subimt").click(function(){
		//判断cookie是否过期
		overdue();
		var userName = $("#userName").val();
		var arr = [];
		if (userName != "") {
			arr.push(userName);
		}else{
			Alert1.content = "用户名字不能为空";
			Alert1.init();
			Alert1.show();
			return;
		}
		Verification.character.Arr = arr;
		var istrue = Verification.character.Method();
		if (istrue) {
			Alert1.content = "用户名字不能输入/\@$#'“等特殊符号";
			Alert1.init();
			Alert1.show();
			return;
		}
		
		if($("#department").val()==""){
			Alert1.content = "所属部门不能为空";
			Alert1.init();
			Alert1.show();
			return;
		}
		

		if($("#telephoneNum").val()==""){
			Alert1.content = "电话号码不能为空";
			Alert1.init();
			Alert1.show();
			return;
		}
		if($("#telephoneNum").val().length!="11"){
			Alert1.content = "请输入正确的电话号码格式";
			Alert1.init();
			Alert1.show();
			return;
		}
		var loginName = $("#loginName").val();
		var arr1 = [];
		if (loginName != "") {
			arr1.push(loginName);
		}else{
			Alert1.content = "登录名字不能为空";
			Alert1.init();
			Alert1.show();
			return;
		}
		Verification.character.Arr = arr1;
		var istrue1 = Verification.character.Method();
		if (istrue1) {
			Alert1.content = "用户名字不能输入/\@$#'“等特殊符号";
			Alert1.init();
			Alert1.show();
			return;
		}
		if($('#savepwd').val() == 2){
			if($("#passWordOne").val()==""){
				Alert1.content = "登录密码不能为空";
				Alert1.init();
				Alert1.show();
				return;
			}
			if($("#passWordOne").val().length<6){
				Alert1.content = "登录密码不能小于6位";
				Alert1.init();
				Alert1.show();
				return;
			}
			
			if($("#passWordOne").val()!=$("#passWordTwo").val()){
				Alert1.content = "两次密码输入不一致！请重新输入";
				Alert1.init();
				Alert1.show();
				return;
			}
		}
		
		// 创建传递参数格式
		var json = {
				userNum:"",
				userName: "",
				userSex: "",
				depId:"",
				telephoneNum:"",
				loginName:"",
				password:"",
				roleId:"",
				savepwdMark:""
			};
		json.userNum=result.user.userNum;
		json.userName=$("#userName").val();
		json.userSex=$("#userSex").val();
		json.depId=$("#department").attr("sid");
		json.telephoneNum=$("#telephoneNum").val();
		json.loginName=$("#loginName").val();
		json.password=$("#passWordOne").val();
		json.roleId=$("#roleId").val();
		json.savepwdMark= $('#savepwd').val();
		json = JSON.stringify(json);
		Loading1.show();
		$.ajax({
			type: 'post',
			url: 'saveMember',
			data: {
				'jsonStr': json
			},
			success: function(result) {
				result = JSON.parse(result);
				if (result.result == "success") {
					Alert1.content = "修改成功！";
					Alert1.success = function() {
						window.location.href = 'getMemberList?jsonStr={"pageNow":1,"pageSize":10}';
					};
					Alert1.init();
					Alert1.show();
				} else {
					if (result.errorMsg == "") {
						var Msg = "修改失败";
					} else {
						var Msg = result.errorMsg;
					}
					Alert1.content = Msg;
					Alert1.success = function() {
						window.location.href = 'getMemberList?jsonStr={"pageNow":1,"pageSize":10}';
					};
					Alert1.init();
					Alert1.show();
				}
			},
			error: function() {
				Loading1.hide();
				Alert1.content = "修改失败请联系管理员！";
				Alert1.init();
				Alert1.show();
			}
		});
	});

	
});