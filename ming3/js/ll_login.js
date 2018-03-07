var user=document.forms[0].user;
var pass=document.forms[0].pass;

var nextspan=user.nextElementSibling||user.nextSibling;
var next1span=pass.nextElementSibling||pass.nextSibling;
//获取焦点，不获取user首次获取的是空；
user.onblur=exam_user;
pass.onblur=exam_pass;
//判断用户名
function exam_user(){
//判断user的value值;获取表单元素用value属性，不要用innerText
var reg=/^[a-zA-Z0-9-_]{11}$/;
	if(reg.test(user.value)){
		nextspan.innerText="";
		return true;
	}else{
		nextspan.innerText="用户名错误";
		nextspan.style.color='red';
		return false;
	}
}
//判断密码
function exam_pass(){
	var reg1=/^[a-zA-Z0-9-_]{6}$/;
	if(reg1.test(pass.value)){
		next1span.innerText="";
		return true;
	}else{
		next1span.innerText="密码是六位";
		next1span.style.color='red';
		return false;
		}
	}
function exam(){
	if(exam_user()&&exam_pass()){
		return true;
		location.href="../view/login.html";
	}else{
		return false;
		}
	}
// 获取焦点
user.onfocus=show1;
pass.onfocus=show2;
function show1(){
	if(this.placeholder=="请输入用户名"){
		this.placeholder="";
	}
}
function show2(){
	if(this.placeholder=="请输入密码"){
		this.placeholder="";
	}
}
// ...............数据库登录
var sessionGet;
$('.dl').click(function(){
		var name=$('.sjhm').val();
		var pass=$('.pass').val();
		console.log(pass)
		if(name==''||pass==''){
			$('.ll_blank').html('不能为空');
		}else{
			$.ajax({
				url:"php/login.php",
				type:"post",
				data:{name:name,pass:pass},
				success:function(data){
					console.log(data)
					var info=eval('('+data+')');
					console.log(info)
					if(info.code==1){
						sessionStorage.id=info.id;
						sessionStorage.name=info.name;
						setInterval(function(){
							location.href="index1.html";
						},1000)
					}else if(info.code==2){
						$('.ll_blank').html('密码错误');
						setInterval(function(){
							location.href="Verification.html";
						},1000)
					}else{
						$('.ll_blank').html('用户名不存在');
						setInterval(function(){
							location.href="ll_register.html";
						},1000)				
					}
			
			}
		});
		}
		
	})
