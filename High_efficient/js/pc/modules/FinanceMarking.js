	
/*
 * @JS说明:用于财务流程审批页面
 * @作者：孟令超
 * @创建日期：2016年11月4日
 * @功能说明：
 */
 
 
 $(function(){
	 	 //封装弹出盒子
	 var Alert1 = new Alert();
	 function alertDisplay(value){
		 
		 Alert1.content=value;
		 Alert1.init();
		 Alert1.show();
		 }
	//初始化验证
	$(".form-horizontal").Validform({
		tiptype:function(msg){
			alertDisplay(msg);
		},
		tipSweep:true,
		ajaxPost:true
	});
	//给大写的文本框赋值
	$("#bill_money").blur(function(){
		if($("#bill_money").val()!=""){
	    	$("#bigwrite").val(convertCurrency($("#bill_money").val()));
		}
		
	});
	//选择报销类型 点击事件	 
	$(".checkbox").click(function(){
		$(".checkbox").removeClass("truea");
		$(this).addClass("truea");
		})	
	//报销明细添加事件
	$(".add_detailed_btn").click(function(){
		$("#add_detailed").append('<div class="title width51"><input type="text" class="bga" maxlength="200" placeholder="请填写发票报销内容" datatype="*" nullmsg="请选择上传发票！"></div><div class="title width51"><input type="text" class="bga" maxlength="9" placeholder="请填写金额" datatype="*" nullmsg="请填写金额"></div><div class="clear"></div>');
		})
	 })