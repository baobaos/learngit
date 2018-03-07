var user=document.forms[0].user;
var pass=document.forms[0].pass;
var pass1=document.forms[0].pass1;
var nextspan=user.nextElementSibling||user.nextSibling;
var next1span=pass.nextElementSibling||pass.nextSibling;
//获取焦点，不获取user首次获取的是空；
user.onblur=aa;
pass.onblur=bb;
//判断用户名
function aa(){
//判断user的value值;获取表单元素用value属性，不要用innerText
var reg=/^1[0-9]{10}$/;
	if(reg.test(user.value)){
		nextspan.innerText="";
		var vlu=$('#name1').val();
		var pass=$('#pass1').val();
//		$.ajax({
//		   	url:'php/register.php',
//			data:{name:vlu,pass:pass},
//			type:'post',//请求的方式
//			success:function (data) {
//				// console.log(data);
//				if(data=="用户已存在"){
//					nextspan.innerText="用户已存在";
//					nextspan.style.color='red';
//					setInterval(function(){
//						location.href="ll_register.html";
//					},1000)
//				}else{
//					
//		   		}
//		   	}
//	   	});
	   	return true;
	}else{
		nextspan.innerText="用户名格式不正确";
		nextspan.style.color='red';
		return false;
	}
}
//判断密码
function bb(){
	var reg1=/^[a-zA-Z0-9-_]{6}$/;
	if(reg1.test(pass.value)){
		next1span.innerText="";
		return true;
	}else{
		next1span.innerText="密码不能为空";
		next1span.style.color='red';
		return false;
		}
	}
function yz(){
	if(aa()&&bb()){
		return true;
	}else{
		return false;
		}
	}
// 获取焦点
user.onfocus=show1;
pass.onfocus=show2;
pass1.onfocus=show3;
function show1(){
	if(this.placeholder=="请输入11位手机号"){
		this.placeholder="";
	}
}
function show2(){
	if(this.placeholder=="请输入6位密码"){
		this.placeholder="";
	}
}
function show3(){
	if(this.placeholder=="获取验证码"){
		this.placeholder="";
	}
}
// ........................


$('.sub1').on('click',function(){
	// console.log(777)
	var vlu=$('#name1').val();
	var pass=$('#pass1').val();
	var IsBy = $.idcode.validateCode();
	if(vlu=='' || pass=='' || !IsBy){
		$('.register_blank').html('信息不完整');
			setInterval(function(){
				location.href="ll_register.html";
			},1000)
	}else{
		$.ajax({
		   	url:'php/register.php',
			data:{name:vlu,pass:pass},
			type:'post',//请求的方式
			success:function (data) {
//				console.log(data);
				if(data=="用户已存在"){
					$('.register_blank').html('用户已存在');
					setInterval(function(){
						location.href="ll_register.html";
					},1000)
				}else{
					$('.register_blank').html('注册成功');
					setInterval(function(){
						console.log(5)
						location.href="Verification.html";
						},1000)
					}
		   		}
	   	})
	}
	
})
// ......................注册

