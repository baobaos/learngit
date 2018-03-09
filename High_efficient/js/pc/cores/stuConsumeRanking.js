/*
 *@本js功能：学生消费能力排名页面
 *@本js作者：王昆宇
 *@编写时间：2017年2月8日
 *@修改人：xzx     @修改时间：2017.4.27    @修改原因：frame框架跳转登陆页面跳转不出去    @修改位置或名称：交互事件添加cookie判断
 */ 

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


/* 学生个人消费能力排名图标 */
var myChart=null;

//默认配置
var option={	
    grid: {
        y: 30
    },
    tooltip:{
    	trigger: 'item',
    	formatter:function (params) {//自定义提示内容    		
		    var res = "";
		    var sex="";
		    if(params.data.studensSex==1)
		    {
		    	sex="女";
		    }else {
		    	sex="男";
		    }			        
            res+=params.data.name+"("+sex+")"+"</br>";
            res+="消费能力值："+params.data.consumeValues+"</br>"; 
            res+="消费总金额："+params.data.totalConsumeMoney+"</br>"; 
            res+="消费总次数："+params.data.consumeCount+"</br>"; 
            res+="平均消费金额："+params.data.consumeAvg+"</br>"; 
            res+="点击图标查看个人消费分析";
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
};

//学生个人消费能力排名数据转换
function ConsumptionRanking(option){
	var json={};
	var ydata=[];
	var sdata=[];
	var mdata=[];
	var month="";
	var year="";	
	if(option.consumeRankingList)
	{
		if(option.consumeRankingList.length!=0)
		{
			month=option.consumeRankingList[0].month;
			year=option.consumeRankingList[0].year;
			for(var i=0;i<option.consumeRankingList.length;i++)
			{
				var j={};
				var d={};
				j={
					value:option.consumeRankingList[i].consumeValues,
					consumeValues:option.consumeRankingList[i].consumeValues,
					userId:option.consumeRankingList[i].userId,
					studensSex:option.consumeRankingList[i].studensSex,
					totalConsumeMoney:option.consumeRankingList[i].totalConsumeMoney,
					consumeCount:option.consumeRankingList[i].consumeCount,
					month:option.consumeRankingList[i].month,
					year:option.consumeRankingList[i].year,
					consumeAvg:option.consumeRankingList[i].consumeAvg,
					name:option.consumeRankingList[i].studensName
				};			
				d={
					coord: [option.consumeRankingList[i].consumeValues, option.consumeRankingList.length-1-i],
					value:option.consumeRankingList[i].rownum,
					consumeValues:option.consumeRankingList[i].consumeValues,
					userId:option.consumeRankingList[i].userId,
					studensSex:option.consumeRankingList[i].studensSex,
					totalConsumeMoney:option.consumeRankingList[i].totalConsumeMoney,
					consumeCount:option.consumeRankingList[i].consumeCount,
					month:option.consumeRankingList[i].month,
					year:option.consumeRankingList[i].year,
					consumeAvg:option.consumeRankingList[i].consumeAvg,
					name:option.consumeRankingList[i].studensName
				}
				ydata[i]=option.consumeRankingList[i].studensName;
				sdata[i]=j;	
				mdata[i]=d;			
			}
		}
	}
	
	if(ydata.length==0)
	{
		return null;
	}else {
		json.ydata=ydata.reverse();
		json.sdata=sdata.reverse();
		json.mdata=mdata.reverse();	
		json.month=month;
		json.year=year;	
		return json;
	}
}

//动态生成数据
	var $map=$("#consumption_ranking");	
	//调用consumeAbilityList进行数据转换
	var json=ConsumptionRanking(result);					
		if(json==null)
		{
			$map.html("<div class='nodata'>暂无数据.....</div>");
			$(".message_box").hide();
		}else{		
			option.yAxis[0].data=json.ydata;
			option.series[0].data=json.sdata;
			option.series[0].markPoint.data=json.mdata;	
			option.title.text=json.year+"年"+json.month+"月学生个人消费能力排名"				
			myChart=new echarts_Template($map[0],option);			
			//默认加载第一个人的信息
			$(".t1").next().text(option.series[0].data[option.series[0].data.length-1].value);
			$(".t2").next().text(option.series[0].data[option.series[0].data.length-1].totalConsumeMoney);
			$(".t3").next().text(option.series[0].data[option.series[0].data.length-1].consumeCount);
			$(".t4").next().text(option.series[0].data[option.series[0].data.length-1].consumeAvg);
			//绑定鼠标经过事件，显示该人员信息
			myChart.on("mouseover",function(params){				
				$(".t1").next().text(params.data.value);
				$(".t2").next().text(params.data.totalConsumeMoney);
				$(".t3").next().text(params.data.consumeCount);
				$(".t4").next().text(params.data.consumeAvg);
			});
			//绑定鼠标点击事件，进入个人消费分析页面
			myChart.on("click",function(params){
				//判断cookie是否过期
				overdue();
				window.location='getConsumeById?jsonStr={"userId":'+params.data.userId+'}';
			});
		}

	//搜索功能
	var loading=new Loading();
		loading.init();
	var alert1=new Alert();	
	$("#month_average_search").click(function(){
		//判断cookie是否过期
		overdue();
		var text=$("#month_average_text").val();
		var userId=$("#month_average_text_id").val();		
		if(text!=""||userId!="")//进行AJAX查询
			{				
				loading.show();	
				var jsonStr={
					"searchYear":text,
					"userId":userId
				};
				$.ajax({
		            type: "post",
					url: 'getStuConsumeRankingPost?jsonStr='+JSON.stringify(jsonStr),
		            success: function (result) {		            	
		            	$("#month_average_text").val("");		            	
		            	loading.hide();
		            	result = JSON.parse(result);		            	
		            	var json=ConsumptionRanking(result);		            	
		            	if(json==null)
						{
							$map.html("<div class='nodata'>暂无数据.....</div>");
							$(".message_box").hide();
						}else{	
							$(".message_box").show();	
							option.yAxis[0].data=json.ydata;
							option.series[0].data=json.sdata;
							option.series[0].markPoint.data=json.mdata;	
							option.title.text=json.year+"年"+json.month+"月学生个人消费能力排名";			
							myChart=new echarts_Template($map[0],option);			
							//默认加载第一个人的信息
							$(".t1").next().text(option.series[0].data[option.series[0].data.length-1].value);
							$(".t2").next().text(option.series[0].data[option.series[0].data.length-1].totalConsumeMoney);
							$(".t3").next().text(option.series[0].data[option.series[0].data.length-1].consumeCount);
							$(".t4").next().text(option.series[0].data[option.series[0].data.length-1].consumeAvg);
							//绑定鼠标经过事件，显示该人员信息
							myChart.on("mouseover",function(params){				
								$(".t1").next().text(params.data.value);
								$(".t2").next().text(params.data.totalConsumeMoney);
								$(".t3").next().text(params.data.consumeCount);
								$(".t4").next().text(params.data.consumeAvg);
							});
							//绑定鼠标点击事件，进入个人消费分析页面
							myChart.on("click",function(params){
								//判断cookie是否过期
								overdue();
								window.location='getConsumeById?jsonStr={"userId":'+params.data.userId+'}';
							});
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