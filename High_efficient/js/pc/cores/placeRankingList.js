
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

/* 超市消费排名 */

var myChart11=null;//柱状图
var myChart12=null;//金额饼图
var myChart13=null;//次数饼图

var option=[
	{//柱状图数据
		grid: {
	        y: 30
	    },
	    tooltip:{
	    	trigger: 'item',
	    	formatter:function (params) {//自定义提示内容
			    var res = "";			   		        
	            res+=params.data.name+"</br>";
	            res+="消费总次数："+params.data.consumeCount+"</br>"; 
	            res+="消费总金额："+params.data.value+"</br>";
	            res+="平均消费金额："+params.data.consumeAvg+"</br>";
	            return res;
			 }
	    },
	    xAxis: [
	        {
	            type: "value",
	            boundaryGap: [0, 0.01]
	        }
	    ],
	    yAxis: [
	        {
	            type: "category",
	            data: []
	        }
	    ],
	    series: [{
	    	name:"",
	    	type:"bar",
	    	data:[],
	    	markPoint:{
		    	symbol:"image://../images/pc/ico09.png",
		    	symbolSize:30,
		    	symbolOffset:['150%',0],	    	
		    	data : [],
		    	label:{
		    		normal:{
		    			show:true,
		    			formatter:'{c}'
		    		}
		    	}
	    	}
	   }],
	   title:{
	   	text:""
	   }    
	},
	{		
	    tooltip : {
	        trigger: 'item',
	        formatter: "消费总金额占比:{d}%"
	    },
	    series : [
	        {
	            type: 'pie',
	            radius : ['55%', '80%'],
	            label: {
	                normal: {
	                    position: 'center'
	                }  
	            },
	            data:[
	                {
	                    value:0,
	                    name:'金额占比',
	                    itemStyle: {
	                        normal: {
	                            color: '#d35556'
	                        }
	                    },
	                    label: {
	                        normal: {
	                            formatter: '{d}%',
	                            textStyle: {
	                                fontSize: 30,
	                                color:"#fff"
	                            }
	                        }
	                    }
	                },
	                {
	                    value:0, 
	                    name:'占位',
	                    tooltip: {
	                        show: false
	                    },
	                    itemStyle: {
	                        normal: {
	                            color: '#ffff99'
	                        }
	                    },
	                    label: {	                    	
	                        normal: {
	                        	position:'inside',
	                            formatter: ''
	                        }
	                    }
	                }
	            ]
	        }
	    ],
	   title:{
	   	text:""
	   }
	},
	{
	    tooltip : {
	        trigger: 'item',
	        formatter: "消费总次数占比:{d}%"
	    },
	    series : [
	        {
	            type: 'pie',
	            radius : ['55%', '80%'],
	            label: {
	                normal: {
	                    position: 'center'
	                }
	            },
	            data:[
	                {
	                    value:0, 
	                    name:'次数占比',
	                    label: {
	                        normal: {
	                            formatter: '{d}%',	                          
	                            textStyle: {
	                                fontSize: 30,
	                                color:"#fff"
	                            }
	                        }
	                    }
	                },
	                {
	                    value:0, 
	                    name:'占位',
	                    tooltip: {
	                        show: false
	                    },
	                    itemStyle: {
	                        normal: {
	                            color: '#ffff99'
	                        }
	                    },
	                    label: {
	                        normal: {
	                        	position:'inside',
	                            formatter: ''
	                        }
	                    }
	                }
	            ]
	        }
	    ],
	   title:{
	   	text:""
	   }  
	}
];

//超市排名算法
function supermarketRanking(option)
{
	var json={};
	var ydata=[];//柱状图y轴数据
	var sdata=[];//柱状图x轴数据
	var mdata=[];//柱状图martporit数据
	var month="";
	var year="";
	var piearr1=[];//饼图1数据
	var piearr2=[];//饼图2数据
	//饼图1计算
	var supermktMoney_sum=0;
	var supermktMoney_other=0;
	//饼图2计算
	var supermktCount_sum=0;
	var supermktCount_other=0;

	if(option.supermktPlaceList)//柱状图数据
	{
		if(option.supermktPlaceList.length!=0)
		{
			year=option.supermktPlaceList[0].year;
			month=option.supermktPlaceList[0].month;			
			for(var i=0;i<option.supermktPlaceList.length;i++)
			{				
				supermktMoney_sum+=option.supermktPlaceList[i].totalConsumeMoney;
				supermktCount_sum+=option.supermktPlaceList[i].consumeCount;
				var j={};
				var d={};
				var consumeAvg=option.supermktPlaceList[i].totalConsumeMoney/option.supermktPlaceList[i].consumeCount;
				j={
					value:option.supermktPlaceList[i].totalConsumeMoney,
					totalConsumeMoney:option.supermktPlaceList[i].totalConsumeMoney,
					addressCode:option.supermktPlaceList[i].addressCode,					
					consumeCount:option.supermktPlaceList[i].consumeCount,
					month:option.supermktPlaceList[i].month,
					year:option.supermktPlaceList[i].year,
					name:option.supermktPlaceList[i].pointCount,
					consumeAvg:consumeAvg.toFixed(2)
				};			
				d={
					coord: [option.supermktPlaceList[i].totalConsumeMoney, option.supermktPlaceList.length-1-i],
					//此处要修改
					value:i+1,
					totalConsumeMoney:option.supermktPlaceList[i].totalConsumeMoney,
					addressCode:option.supermktPlaceList[i].addressCode,					
					consumeCount:option.supermktPlaceList[i].consumeCount,
					month:option.supermktPlaceList[i].month,
					year:option.supermktPlaceList[i].year,
					name:option.supermktPlaceList[i].pointCount,
					consumeAvg:consumeAvg.toFixed(2)
				}
				ydata[i]=option.supermktPlaceList[i].pointCount;
				sdata[i]=j;	
				mdata[i]=d;					
			}
			//求其他金额
			var percentage=parseFloat(option.supermktMoneyPercent)/100;
			supermktMoney_other=supermktMoney_sum/percentage-supermktMoney_sum;
			piearr1[0]=	supermktMoney_sum;
			piearr1[1]=	supermktMoney_other;

			percentage=parseFloat(option.supermktCountPercent)/100;
			supermktCount_other=supermktCount_sum/percentage-supermktCount_sum;
			piearr2[0]=	supermktCount_sum;
			piearr2[1]=	supermktCount_other;
		}
	}


	//拼接json

	if(sdata.length==0)
	{
		return null;
	}else{
		json.ydata=ydata.reverse();
		json.sdata=sdata.reverse();
		json.mdata=mdata.reverse();
		json.month=month;
		json.year=year;
		json.piearr1=piearr1;
		json.piearr2=piearr2;
		return json;		
	}

}

//动态生成数据
//获取状图盒
var $map=$("#supermarketRanking");
//获取饼状图1盒
var $map1=$("#supermarket_money");
//获取饼状图2盒	
var $map2=$("#supermarket_count");
//调用consumeAbilityList进行数据转换
var json=supermarketRanking(result);					
if(json==null)
{
	$map.html("<div class='nodata'>暂无数据.....</div>");
	$map1.html("<div class='nodata'>暂无数据.....</div>");
	$map2.html("<div class='nodata'>暂无数据.....</div>");
	$(".message_box").hide();
}else{	
	//加载柱状图	
	option[0].yAxis[0].data=json.ydata;
	option[0].series[0].data=json.sdata;
	option[0].series[0].markPoint.data=json.mdata;	
	option[0].title.text=json.year+"年"+json.month+"月消费排名"				
	myChart11=new echarts_Template($map[0],option[0]);			
	//默认加载第一个人的信息
	$(".t1").next().text(option[0].series[0].data[option[0].series[0].data.length-1].name);
	$(".t2").next().text(option[0].series[0].data[option[0].series[0].data.length-1].totalConsumeMoney);
	$(".t3").next().text(option[0].series[0].data[option[0].series[0].data.length-1].consumeCount);
	$(".t4").next().text(option[0].series[0].data[option[0].series[0].data.length-1].consumeAvg);
	//绑定鼠标经过事件，显示该人员信息
	myChart11.on("mouseover",function(params){					
		$(".t1").next().text(params.data.name);
		$(".t2").next().text(params.data.totalConsumeMoney);
		$(".t3").next().text(params.data.consumeCount);
		$(".t4").next().text(params.data.consumeAvg);
	});	

	//加载饼图1
	option[1].series[0].data[0].value=json.piearr1[0];
	option[1].series[0].data[1].value=json.piearr1[1];
	option[1].title.text=json.year+"年"+json.month+"月超市消费总金额占比"	
	myChart11=new echarts_Template($map1[0],option[1],"pie");
	//加载饼图2
	option[2].series[0].data[0].value=json.piearr2[0];
	option[2].series[0].data[1].value=json.piearr2[1];
	option[2].title.text=json.year+"年"+json.month+"月超市消费总次数占比"
	myChart12=new echarts_Template($map2[0],option[2],"pie");
}

//查询功能
var loading=new Loading();
	loading.init();
	var alert1=new Alert();	
	$("#supermarketRanking_search").click(function(){	
		//判断cookie是否过期
		overdue();
		var text=$("#supermarketRanking_text").val();			
		if(text!="")//进行AJAX查询
			{	
				loading.show();	
				var jsonStr={
					"searchYear":text		
				};
				$.ajax({
		            type: "post",
					url: 'getPlaceRankingListPost?jsonStr='+JSON.stringify(jsonStr),
		            success: function (result) {		            	           	
		            	$("#supermarketRanking_text").val("");		            	
		            	loading.hide();
		            	result = JSON.parse(result);
		            	var json=supermarketRanking(result);					
						if(json==null)
						{
							$map.html("<div class='nodata'>暂无数据.....</div>");
							$map1.html("<div class='nodata'>暂无数据.....</div>");
							$map2.html("<div class='nodata'>暂无数据.....</div>");
							$(".message_box").hide();
						}else{	
							//加载柱状图	
							option[0].yAxis[0].data=json.ydata;
							option[0].series[0].data=json.sdata;
							option[0].series[0].markPoint.data=json.mdata;	
							option[0].title.text=json.year+"年"+json.month+"月超市消费排名"				
							myChart11=new echarts_Template($map[0],option[0]);			
							//默认加载第一个人的信息	
							$(".t1").next().text(option[0].series[0].data[option[0].series[0].data.length-1].name);
							$(".t2").next().text(option[0].series[0].data[option[0].series[0].data.length-1].totalConsumeMoney);
							$(".t3").next().text(option[0].series[0].data[option[0].series[0].data.length-1].consumeCount);
							$(".t4").next().text(option[0].series[0].data[option[0].series[0].data.length-1].consumeAvg);
							//绑定鼠标经过事件，显示该人员信息
							myChart11.on("mouseover",function(params){					
								$(".t1").next().text(params.data.name);
								$(".t2").next().text(params.data.totalConsumeMoney);
								$(".t3").next().text(params.data.consumeCount);
								$(".t4").next().text(params.data.consumeAvg);
							});	

							//加载饼图1
							option[1].series[0].data[0].value=json.piearr1[0];
							option[1].series[0].data[1].value=json.piearr1[1];
							option[1].title.text=json.year+"年"+json.month+"月超市消费总金额占比"	
							myChart11=new echarts_Template($map1[0],option[1],"pie");
							//加载饼图2
							option[2].series[0].data[0].value=json.piearr2[0];
							option[2].series[0].data[1].value=json.piearr2[1];
							option[2].title.text=json.year+"年"+json.month+"月超市消费总次数占比"
							myChart12=new echarts_Template($map2[0],option[2],"pie");
						}
		            },
					error: function() {	
						    loading.hide();
							alert1.content="查询失败!";
							alert1.init();
							alert1.show();
					}			
       			 });
			}else //提示输入信息
			{				
				alert1.content="请填写学号或请选择年份！";
				alert1.init();
				alert1.show();		
			}
	});
/* 食堂消费排名 */


//食堂排名算法
function messRanking(option)
{
	var json={};
	var ydata=[];//柱状图y轴数据
	var sdata=[];//柱状图x轴数据
	var mdata=[];//柱状图martporit数据
	var month="";
	var year="";
	var piearr1=[];//饼图1数据
	var piearr2=[];//饼图2数据
	//饼图1计算
	var supermktMoney_sum=0;
	var supermktMoney_other=0;
	//饼图2计算
	var supermktCount_sum=0;
	var supermktCount_other=0;

	if(option.messPlaceList)//柱状图数据
	{
		if(option.messPlaceList.length!=0)
		{
			year=option.messPlaceList[0].year;
			month=option.messPlaceList[0].month;			
			for(var i=0;i<option.messPlaceList.length;i++)
			{				
				supermktMoney_sum+=option.messPlaceList[i].totalConsumeMoney;
				supermktCount_sum+=option.messPlaceList[i].consumeCount;
				var j={};
				var d={};
				var consumeAvg=option.messPlaceList[i].totalConsumeMoney/option.messPlaceList[i].consumeCount;
				j={
					value:option.messPlaceList[i].totalConsumeMoney,
					totalConsumeMoney:option.messPlaceList[i].totalConsumeMoney,
					addressCode:option.messPlaceList[i].addressCode,					
					consumeCount:option.messPlaceList[i].consumeCount,
					month:option.messPlaceList[i].month,
					year:option.messPlaceList[i].year,
					name:option.messPlaceList[i].pointCount,
					consumeAvg:consumeAvg.toFixed(2)
				};			
				d={
					coord: [option.messPlaceList[i].totalConsumeMoney, option.messPlaceList.length-1-i],
					//此处要修改
					value:i+1,
					totalConsumeMoney:option.messPlaceList[i].totalConsumeMoney,
					addressCode:option.messPlaceList[i].addressCode,					
					consumeCount:option.messPlaceList[i].consumeCount,
					month:option.messPlaceList[i].month,
					year:option.messPlaceList[i].year,
					name:option.messPlaceList[i].pointCount,
					consumeAvg:consumeAvg.toFixed(2)
				}
				ydata[i]=option.messPlaceList[i].pointCount;
				sdata[i]=j;	
				mdata[i]=d;					
			}
			//求其他金额
			var percentage=parseFloat(option.messMoneyPercent)/100;
			supermktMoney_other=supermktMoney_sum/percentage-supermktMoney_sum;
			piearr1[0]=	supermktMoney_sum;
			piearr1[1]=	supermktMoney_other;

			percentage=parseFloat(option.messCountPercent)/100;
			supermktCount_other=supermktCount_sum/percentage-supermktCount_sum;
			piearr2[0]=	supermktCount_sum;
			piearr2[1]=	supermktCount_other;
		}
	}


	//拼接json

	if(sdata.length==0)
	{
		return null;
	}else{
		json.ydata=ydata.reverse();
		json.sdata=sdata.reverse();
		json.mdata=mdata.reverse();
		json.month=month;
		json.year=year;
		json.piearr1=piearr1;
		json.piearr2=piearr2;
		return json;		
	}
}

//动态生成数据
//获取状图盒
var $map11=$("#mess");
//获取饼状图1盒
var $map12=$("#mess_money");
//获取饼状图2盒	
var $map13=$("#mess_count");

//查询功能
var loading=new Loading();
	loading.init();
	var alert1=new Alert();	
	$("#mess_search").click(function(){		
		//判断cookie是否过期
		overdue();
		var text=$("#mess_text").val();			
		if(text!="")//进行AJAX查询
			{	
				loading.show();	
				var jsonStr={
					"searchYear":text		
				};
				$.ajax({
		            type: "post",
					url: 'getPlaceRankingListPost?jsonStr='+JSON.stringify(jsonStr),
		            success: function (result) {		            	
		            	$("#mess_text").val("");		            	
		            	loading.hide();
		            	result = JSON.parse(result);
		            	var json=messRanking(result);					
						if(json==null)
						{
							$map11.html("<div class='nodata'>暂无数据.....</div>");
							$map12.html("<div class='nodata'>暂无数据.....</div>");
							$map13.html("<div class='nodata'>暂无数据.....</div>");
							$(".message_box").hide();
						}else{	
							//加载柱状图	
							option[0].yAxis[0].data=json.ydata;
							option[0].series[0].data=json.sdata;
							option[0].series[0].markPoint.data=json.mdata;	
							option[0].title.text=json.year+"年"+json.month+"月超市消费排名";			
							myChart11=new echarts_Template($map11[0],option[0]);			
							//默认加载第一个人的信息	
							$(".t1").next().text(option[0].series[0].data[option[0].series[0].data.length-1].name);
							$(".t2").next().text(option[0].series[0].data[option[0].series[0].data.length-1].totalConsumeMoney);
							$(".t3").next().text(option[0].series[0].data[option[0].series[0].data.length-1].consumeCount);
							$(".t4").next().text(option[0].series[0].data[option[0].series[0].data.length-1].consumeAvg);
							//绑定鼠标经过事件，显示该人员信息
							myChart11.on("mouseover",function(params){					
								$(".t1").next().text(params.data.name);
								$(".t2").next().text(params.data.totalConsumeMoney);
								$(".t3").next().text(params.data.consumeCount);
								$(".t4").next().text(params.data.consumeAvg);
							});	

							//加载饼图1
							option[1].series[0].data[0].value=json.piearr1[0];
							option[1].series[0].data[1].value=json.piearr1[1];
							option[1].title.text=json.year+"年"+json.month+"月超市消费总金额占比";
							myChart11=new echarts_Template($map12[0],option[1],"pie");
							//加载饼图2
							option[2].series[0].data[0].value=json.piearr2[0];
							option[2].series[0].data[1].value=json.piearr2[1];
							option[2].title.text=json.year+"年"+json.month+"月超市消费总次数占比";
							myChart12=new echarts_Template($map13[0],option[2],"pie");
						}
		            },
					error: function() {	
						    loading.hide();
							alert1.content="查询失败!";
							alert1.init();
							alert1.show();
					}			
       			 });
			}else //提示输入信息
			{				
				alert1.content="请填写学号或请选择年份！";
				alert1.init();
				alert1.show();		
			}
	});
//选项卡插件
var arr=[function(){
var json=supermarketRanking(result);					
if(json==null)
{
	$map.html("<div class='nodata'>暂无数据.....</div>");
	$map1.html("<div class='nodata'>暂无数据.....</div>");
	$map2.html("<div class='nodata'>暂无数据.....</div>");
	$(".message_box").hide();
}else{	
	//加载柱状图	
	option[0].yAxis[0].data=json.ydata;
	option[0].series[0].data=json.sdata;
	option[0].series[0].markPoint.data=json.mdata;	
	option[0].title.text=json.year+"年"+json.month+"月超市消费排名"				
	myChart11=new echarts_Template($map[0],option[0]);			
	//默认加载第一个人的信息	
	$(".t1").next().text(option[0].series[0].data[option[0].series[0].data.length-1].name);
	$(".t2").next().text(option[0].series[0].data[option[0].series[0].data.length-1].totalConsumeMoney);
	$(".t3").next().text(option[0].series[0].data[option[0].series[0].data.length-1].consumeCount);
	$(".t4").next().text(option[0].series[0].data[option[0].series[0].data.length-1].consumeAvg);
	//绑定鼠标经过事件，显示该人员信息
	myChart11.on("mouseover",function(params){					
		$(".t1").next().text(params.data.name);
		$(".t2").next().text(params.data.totalConsumeMoney);
		$(".t3").next().text(params.data.consumeCount);
		$(".t4").next().text(params.data.consumeAvg);
	});	

	//加载饼图1
	option[1].series[0].data[0].value=json.piearr1[0];
	option[1].series[0].data[1].value=json.piearr1[1];
	option[1].title.text=json.year+"年"+json.month+"月超市消费总金额占比"	
	myChart11=new echarts_Template($map1[0],option[1],"pie");
	//加载饼图2
	option[2].series[0].data[0].value=json.piearr2[0];
	option[2].series[0].data[1].value=json.piearr2[1];
	option[2].title.text=json.year+"年"+json.month+"月超市消费总次数占比"
	myChart12=new echarts_Template($map2[0],option[2],"pie");
}
},function(){
	//调用consumeAbilityList进行数据转换
var json=messRanking(result);					
if(json==null)
{
	$map11.html("<div class='nodata'>暂无数据.....</div>");
	$map12.html("<div class='nodata'>暂无数据.....</div>");
	$map12.html("<div class='nodata'>暂无数据.....</div>");
	$(".message_box").hide();
}else{	
	//加载柱状图	
	option[0].yAxis[0].data=json.ydata;
	option[0].series[0].data=json.sdata;
	option[0].series[0].markPoint.data=json.mdata;	
	option[0].title.text=json.year+"年"+json.month+"月食堂消费排名"				
	myChart11=new echarts_Template($map11[0],option[0]);			
	//默认加载第一个人的信息	
	$(".t1").next().text(option[0].series[0].data[option[0].series[0].data.length-1].name);
	$(".t2").next().text(option[0].series[0].data[option[0].series[0].data.length-1].totalConsumeMoney);
	$(".t3").next().text(option[0].series[0].data[option[0].series[0].data.length-1].consumeCount);
	$(".t4").next().text(option[0].series[0].data[option[0].series[0].data.length-1].consumeAvg);
	//绑定鼠标经过事件，显示该人员信息
	myChart11.on("mouseover",function(params){					
		$(".t1").next().text(params.data.name);
		$(".t2").next().text(params.data.totalConsumeMoney);
		$(".t3").next().text(params.data.consumeCount);
		$(".t4").next().text(params.data.consumeAvg);
	});	

	//加载饼图1
	option[1].series[0].data[0].value=json.piearr1[0];
	option[1].series[0].data[1].value=json.piearr1[1];
	option[1].title.text=json.year+"年"+json.month+"月食堂消费总金额占比"	
	myChart11=new echarts_Template($map12[0],option[1],"pie");
	//加载饼图2
	option[2].series[0].data[0].value=json.piearr2[0];
	option[2].series[0].data[1].value=json.piearr2[1];
	option[2].title.text=json.year+"年"+json.month+"月食堂消费总次数占比"
	myChart12=new echarts_Template($map13[0],option[2],"pie");
}
}];
tab(arr,1);