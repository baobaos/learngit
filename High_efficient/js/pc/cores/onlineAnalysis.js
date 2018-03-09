	/*
 *@本js功能：学生消费页面代码
 *@本js作者：王昆宇
 *@编写时间：2017年1月20日
 */ 	

	//添加年份选择插件
	$('.form_date').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy',      
        todayBtn:  0,		
		startView: 4,
		maxView: 1,
		autoclose:1,
		forceParse: 0,
		viewSelect:'decade'
    });

    $('.form_date1').datetimepicker({
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



	/*学生消费能力变化代码*/
	var myChart=null;
	//默认配置
	var option={
	    legend: {
	        data: ["每月上网在线人数"]			       
	    },
	    xAxis: [
	        {			            
	            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
	        }
	    ],			   
	    series: [
	        {
	            name: "每月上网在线人数",
	            type: "line",
	            data: [],
	             symbol: "circle",
		            itemStyle: {
		                normal: {
		                    borderWidth: 2,
		                    borderColor: "rgb(255, 255, 255)"
		                },
		                emphasis: {
		                    borderWidth: 1,
		                    label: {
		                        show: false
		                    }
		                }
		            },
		            symbolSize: 6,
		            yAxisIndex: 0
	        }
	    ],			    			   
	    title: {			        
	        text: ""	 
	    }
	};

	//数据转换方法
	//option 后台数据字段数组
	function consumeAbilityList(option){
		if(option.onlineAnalyList==undefined||option.onlineAnalyList==null)
		{
			return null;
		}else if(option.onlineAnalyList.length==0)
		{
			return null;
		}else {
			//返回参数
			var json={};
			//获取年份
			var year=option.onlineAnalyList[0].onlineYearMonth.split('-')[0];			
			//每月上网在线人数
			var totalConsume=[0,0,0,0,0,0,0,0,0,0,0,0];			
			//写入各数组			
			for(var i=0;i<option.onlineAnalyList.length;i++)
			{	
				var nowmonth=parseInt(option.onlineAnalyList[i].onlineYearMonth.split('-')[1]);			   			
				totalConsume[nowmonth-1]=option.onlineAnalyList[i].stuCount;	
			}
			//拼接json
			json.year=year;				
			json.totalConsume=totalConsume;			
			return json;
		}
	}


	//动态加载数据	
	var $map=$("#changes_ability");	
	//调用consumeAbilityList进行数据转换	
	var json=consumeAbilityList(result);					
		if(json==null)
		{
			$map.html("<div class='nodata'>暂无数据.....</div>");
		}else{
			option.series[0].data=json.totalConsume;			
			option.title.text=json.year+"年月上网在线人数";			
			myChart=new echarts_Template($map[0],option);
		}

		/* 查询学生消费能力变化 */
		var loading=new Loading();
		loading.init();
		var alert1=new Alert();		
		$("#changes_ability_search").click(function(){
			 overdue();
			var text=$("#changes_ability_text").val();
			if(text=="")
			{
				alert1.content="请选择年份！";
				alert1.init();
				alert1.show();				
			}else 
			{
				loading.show();
				var jsonStr={"pageOneonlineDate":text};
				$.ajax({
		            type: "post",
					url: 'getOnlineAnalysisByPost?jsonStr='+JSON.stringify(jsonStr),
		            success: function (result) {
		            	console.log(result)
		            	$("#changes_ability_text").val("");		            	
		            	loading.hide();
		            	result = JSON.parse(result);
		            	var json=consumeAbilityList(result);
		            	if(json==null)
						{
							$map.html("<div class='nodata'>暂无数据.....</div>");
						}else{
							option.series[0].data=json.totalConsume;			
							option.title.text=json.year+"年月上网在线人数";			
							myChart=new echarts_Template($map[0],option);
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


		/*学生按月消费金额和平均消费金额代码*/
		var myChart1=null;	
		//配置参数
		var option1={
		    legend: {
		        data: ["每小时上网在线人数"]			       
		    },
		    xAxis: [
		        {			            
		            data: ["0时", "1时", "2时", "3时", "4时", "5时", "6时","7时", "8时", "9时", "10时", "11时","12时", "13时", "14时", "15时", "16时", "17时", "18时","19时", "20时", "21时", "22时", "23时"]
		        }
		    ],			   
		    series: [
		        {
		            name: "每小时上网在线人数",
		            type: "line",
		            data: [],
		             symbol: "circle",
			            itemStyle: {
			                normal: {
			                    borderWidth: 2,
			                    borderColor: "rgb(255, 255, 255)"
			                },
			                emphasis: {
			                    borderWidth: 1,
			                    label: {
			                        show: false
			                    }
			                }
			            },
			            symbolSize: 6,
			            yAxisIndex: 0
		        }
		    ],			    			   
		    title: {			        
		        text: ""	 
		    }
		}
	//数据转换方法
	//option 后台数据字段数组
	function monthAverageList(option){
		if(option.onlineAnalyMap==undefined||option.onlineAnalyMap==null)
		{
			return null;
		}else {
			//返回参数
			var json={};
			//获取年份
			var year=option.onlineAnalyMap.onlineDate.split('-')[0];
			var month=option.onlineAnalyMap.onlineDate.split('-')[1];				
			//每月上网在线人数
			var totalConsume=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];			
			//写入各数组			
			jQuery.each(option.onlineAnalyMap, function(key, val) { 
			    var i=parseInt(key.substr(4,key.length-9));
			    totalConsume[i]=val;			   
			});  
			//拼接json
			json.year=year;	
			json.month=month;		
			json.totalConsume=totalConsume;			
			return json;
		}
	}
	
		var $map1=$("#month_average");
		/* 查询学生消费能力变化 */
		$("#month_average_search").click(function(){
			 overdue();
			var text=$("#month_average_text").val();
			if(text=="")
			{
				alert1.content="请选择年份！";
				alert1.init();
				alert1.show();
			}else 
			{
				loading.show();
				var jsonStr={"pageTwoonlineDate":text};
				$.ajax({
		            type: "post",
					url: 'getOnlineAnalysisByPost?jsonStr='+JSON.stringify(jsonStr),
		            	success: function (result) {
		            	console.log(result)
		            	$("#month_average_text").val("");		            	
		            	loading.hide();
		            	result = JSON.parse(result);		            	
		            	var json=monthAverageList(result);					
						if(json==null)
						{
							$map1.html("<div class='nodata'>暂无数据.....</div>");
						}else{
							option1.series[0].data=json.totalConsume;			
							option1.title.text=json.year+"年"+json.month+"月每小时在线人数";			
							myChart1=new echarts_Template($map1[0],option1);
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

		
		//调用tab插件
		var arr=[function(){
		//动态加载数据				
		//调用consumeAbilityList进行数据转换
		var json=consumeAbilityList(result);					
		if(json==null)
		{
			$map.html("<div class='nodata'>暂无数据.....</div>");
		}else{
			option.series[0].data=json.totalConsume;			
			option.title.text=json.year+"年月上网在线人数";			
			myChart=new echarts_Template($map[0],option);
		}
		},function(){
			//动态加载数据			
			//调用monthAverageList进行数据转换
			var json=monthAverageList(result);					
			if(json==null)
			{
				$map1.html("<div class='nodata'>暂无数据.....</div>");
			}else{
				option1.series[0].data=json.totalConsume;			
				option1.title.text=json.year+"年"+json.month+"月每小时在线人数";			
				myChart1=new echarts_Template($map1[0],option1);
			}
		}];
		tab(arr);