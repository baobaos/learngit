	/*
 *@本js功能：学生个人消费
 *@本js作者：王昆宇
 *@编写时间：2017年2月13日
 *@修改人：xzx     @修改时间：2017.4.27    @修改原因：frame框架跳转登陆页面跳转不出去    @修改位置或名称：交互事件添加cookie判断
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

	//清空文本框
	$(".glyphicon-remove").parents().click(function(){
		$(this).prev().val("");
	});

	/*学生月消费金额情况*/
	var myChart=null;
	//默认配置
	var option={
	    legend: {
	        data: ["食堂消费金额", "超市消费金额", "消费总金额"]			       
	    },
	    xAxis: [
	        {			            
	            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
	        }
	    ],			   
	    series: [
	        {
	            name: "食堂消费金额",
	            type: "bar",
	            data: []
	        },
	        {
	            name: "超市消费金额",
	            type: "bar",
	            data: []
	        },
	         {
		            name: "消费总金额",
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
		            markLine : {
		                data : [
		                    {type : 'average', name : '消费平均金额'}
		                ]
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
	function personalConsumption(option){
		var json={};
		var messMoneyList=[0,0,0,0,0,0,0,0,0,0,0,0];
		var supermktMoneyList=[0,0,0,0,0,0,0,0,0,0,0,0];
		var totalMoneyList=[0,0,0,0,0,0,0,0,0,0,0,0];
		var userId="";
		var year="";
		if(option.userId)
		{
			userId=option.userId;
		}
		if(option.messMoneyList)
		{
			if(option.messMoneyList.length!=0)
			{
				year=option.messMoneyList[0].year;
				for(var i=0;i<option.messMoneyList.length;i++)
				{
					messMoneyList[option.messMoneyList[i].month-1]=option.messMoneyList[i].totalConsumeMoney;
				}
			}
		}

		if(option.supermktMoneyList)
		{
			if(option.supermktMoneyList.length!=0)
			{
				year=option.supermktMoneyList[0].year;
				for(var i=0;i<option.supermktMoneyList.length;i++)
				{
					supermktMoneyList[option.supermktMoneyList[i].month-1]=option.supermktMoneyList[i].totalConsumeMoney;
				}
			}
		}

		if(option.totalMoneyList)
		{
			if(option.totalMoneyList.length!=0)
			{
				year=option.totalMoneyList[0].year;
				for(var i=0;i<option.totalMoneyList.length;i++)
				{
					totalMoneyList[option.totalMoneyList[i].month-1]=option.totalMoneyList[i].totalConsumeMoney;
				}
			}
		}

		if(year=="")
		{
			return null;
		}else {
			//拼接json
			json.userId=userId;
			json.year=year;			
			json.messMoneyList=messMoneyList;
			json.supermktMoneyList=supermktMoneyList;
			json.totalMoneyList=totalMoneyList;
			return json;
		}	
		
	}


	//动态加载数据	
	var $map=$("#changes_ability");	
	//调用consumeAbilityList进行数据转换
	var json=personalConsumption(result);					
		if(json==null)
		{
			$map.html("<div class='nodata'>暂无数据.....</div>");
		}else{		
			option.series[0].data=json.messMoneyList;
			option.series[1].data=json.supermktMoneyList;
			option.series[2].data=json.totalMoneyList;
			option.title.text=json.userId+"号学生"+json.year+"消费情况";			
			myChart=new echarts_Template($map[0],option);
		}

		/* 查询学生消费能力变化 */
		var loading=new Loading();
		loading.init();
		var alert1=new Alert();		
		$("#changes_ability_search").click(function(){
			//判断cookie是否过期
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
				var jsonStr={"searchYear":text,"userId":json.userId};
				$.ajax({
		            type: "post",
					url: 'getConsumeByIdPost?jsonStr='+JSON.stringify(jsonStr),
		            success: function (result) {		            	
		            	$("#changes_ability_text").val("");		            	
		            	loading.hide();
		            	result = JSON.parse(result);
		            	var json=personalConsumption(result);
		            	if(json==null)
						{
							$map.html("<div class='nodata'>暂无数据.....</div>");
						}else{		
							option.series[0].data=json.messMoneyList;
							option.series[1].data=json.supermktMoneyList;
							option.series[2].data=json.totalMoneyList;
							option.title.text=json.userId+"号学生"+json.year+"消费情况";			
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

		/* 学生月消费次数及能力 */

		var myChart1=null;
		//默认配置
		var option1={
		    legend: {
		        data: ["食堂消费次数", "超市消费次数", "消费能力值"]			       
		    },
		    xAxis: [
		        {			            
		            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
		        }
		    ],			   
		    series: [
		        {
		            name: "食堂消费次数",
		            type: "bar",
		            stack: '消费次数',
		            data: []
		        },
		        {
		            name: "超市消费次数",
		            type: "bar",
		            stack: '消费次数',
		            data: []
		        },
		        {
		            name: "消费能力值",
		            type: "bar",
		            data: [],
			    }			         
		    ],			    			   
		    title: {			        
		        text: ""	 
		    }
		}

		//数据转换方法
		//option 后台数据字段数组
		function personalNumber(option){			
			var json={};
			var messCountList=[0,0,0,0,0,0,0,0,0,0,0,0];
			var supermktCountList=[0,0,0,0,0,0,0,0,0,0,0,0];
			var abilityList=[0,0,0,0,0,0,0,0,0,0,0,0];
			var userId="";
			var year="";
			if(option.userId)
			{
				userId=option.userId;
			}
			if(option.messCountList)
			{
				if(option.messCountList.length!=0)
				{
					year=option.messCountList[0].year;				
					for(var i=0;i<option.messCountList.length;i++)
					{
						messCountList[option.messCountList[i].month-1]=option.messCountList[i].consumeCount;
					}
				}				
			}

			if(option.supermktCountList)
			{
				if(option.supermktCountList.length!=0)
				{
					year=option.supermktCountList[0].year;
					for(var i=0;i<option.supermktCountList.length;i++)
					{
						supermktCountList[option.supermktCountList[i].month-1]=option.supermktCountList[i].consumeCount;
					}
				}
			}

			if(option.abilityList)
			{
				if(option.abilityList.length!=0)
				{
					year=option.abilityList[0].year;
					for(var i=0;i<option.abilityList.length;i++)
					{
						abilityList[option.abilityList[i].month-1]=option.abilityList[i].consumeValues;
					}
				}
			}

			if(year=="")
			{
				return null;
			}else {
				//拼接json
				json.userId=userId;
				json.year=year;			
				json.messCountList=messCountList;
				json.supermktCountList=supermktCountList;
				json.abilityList=abilityList;				
				return json;
			}	
			
		}


		//动态加载数据	
		var $map1=$("#month_average");		
		
		/* 查询学生消费能力变化 */
		var loading=new Loading();
		loading.init();
		var alert1=new Alert();		
		$("#month_average_search").click(function(){
			//判断cookie是否过期
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
				var jsonStr={"searchYear":text,"userId":json.userId};
				$.ajax({
		            type: "post",
					url: 'getConsumeByIdPost?jsonStr='+JSON.stringify(jsonStr),
		            success: function (result) {
		            	console.log(result)
		            	$("#month_average_text").val("");		            	
		            	loading.hide();
		            	result = JSON.parse(result);
		            	var json=personalNumber(result);
		            	if(json==null)
						{
							$map1.html("<div class='nodata'>暂无数据.....</div>");
						}else{		
							option1.series[0].data=json.messCountList;
							option1.series[1].data=json.supermktCountList;
							option1.series[2].data=json.abilityList;
							option1.title.text=json.userId+"号学生"+json.year+"消费情况";			
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

		var arr = [function(){			
			var json=personalConsumption(result);					
				if(json==null)
				{
					$map.html("<div class='nodata'>暂无数据.....</div>");
				}else{		
					option.series[0].data=json.messMoneyList;
					option.series[1].data=json.supermktMoneyList;
					option.series[2].data=json.totalMoneyList;
					option.title.text=json.userId+"号学生"+json.year+"消费情况";			
					myChart=new echarts_Template($map[0],option);
				}
		},function(){
			var json=personalNumber(result);
            	if(json==null)
				{
					$map1.html("<div class='nodata'>暂无数据.....</div>");
				}else{		
					option1.series[0].data=json.messCountList;
					option1.series[1].data=json.supermktCountList;
					option1.series[2].data=json.abilityList;
					option1.title.text=json.userId+"号学生"+json.year+"消费情况";			
					myChart1=new echarts_Template($map1[0],option1);
				}
		}];
		tab(arr);

		