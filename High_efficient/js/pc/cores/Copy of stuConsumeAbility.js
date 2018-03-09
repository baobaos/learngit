	/*
 *@本js功能：学生消费页面代码
 *@本js作者：
 *@编写时间：2017年10月20日
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

	/*学生消费能力变化代码*/
	var myChart=null;
	//默认配置
	var option={
	    legend: {
	        data: ["男生", "", "女生"]			       
	    },
	    xAxis: [
	        {			            
	            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
	        }
	    ],			   
	    series: [
	        {
	            name: "男生",
	            type: "bar",
	            data: []
	        },
	        {
	            name: "",
	            type: "bar",
	            data: []
	        },
	        {
	            type: "bar",
	            name: "女生",
	            data: []
	        }
	    ],			    			   
	    title: {			        
	        text: ""	 
	    }
	}

	//数据转换方法
	//option 后台数据字段数组
	function consumeAbilityList(option){				
		if(option==undefined||option==null)
		{
			return null;
		}else if(option.length==0)
		{
			return null;
		}else {
			//返回参数
			var json={};
			//获取年份
			var year=option[0].year;
			//整体消费能力
			var totalConsume=[0,0,0,0,0,0,0,0,0,0,0,0];
			//食堂消费能力
			var messConsume=[0,0,0,0,0,0,0,0,0,0,0,0];
			//超市消费能力
			var supermktConsume=[0,0,0,0,0,0,0,0,0,0,0,0];
			//写入各数组			
			for(var i=0;i<option.length;i++)
			{				   			
				totalConsume[option[i].month-1]=option[i].totalConsume;				
				messConsume[option[i].month-1]=option[i].messConsume;
				supermktConsume[option[i].month-1]=option[i].supermktConsume;
			}
			//拼接json
			json.year=year;			
			json.totalConsume=totalConsume;
			json.messConsume=messConsume;
			json.supermktConsume=supermktConsume;
			return json;
		}
	}


	//动态加载数据	
	var $map=$("#changes_ability");	
	//调用consumeAbilityList进行数据转换	
	var json=consumeAbilityList(result.consumeAbilityList);					
		if(json==null)
		{
			$map.html("<div class='nodata'>暂无数据.....</div>");
		}else{		
			option.series[0].data=json.totalConsume;
			option.series[1].data=json.messConsume;
			option.series[2].data=json.supermktConsume;
			option.title.text=json.year+"年学生消费能力值变化";			
			myChart=new echarts_Template($map[0],option);
		}

		/* 查询学生消费能力变化 */
		var loading=new Loading();
		loading.init();
		var alert1=new Alert();		
		$("#changes_ability_search").click(function(){
			var text=$("#changes_ability_text").val();
			if(text=="")
			{
				alert1.content="请选择年份！";
				alert1.init();
				alert1.show();				
			}else 
			{
				loading.show();
				var jsonStr={"searchYear":text};
				$.ajax({
		            type: "post",
					url: 'skipStuConsumeAbilityPost?jsonStr='+JSON.stringify(jsonStr),
		            success: function (result) {
		            	$("#changes_ability_text").val("");		            	
		            	loading.hide();
		            	result = JSON.parse(result);
		            	var json=consumeAbilityList(result.consumeAbilityList);
		            	if(json==null)
						{
							$map.html("<div class='nodata'>暂无数据.....</div>");
						}else{		
							option.series[0].data=json.totalConsume;
							option.series[1].data=json.messConsume;
							option.series[2].data=json.supermktConsume;
							option.title.text=json.year+"年学生消费能力值变化";							
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
		        data: ["月消费总额", "食堂月消费总额", "超市月消费总额", "食堂平均金额", "超市平均金额"]
		    },
		    xAxis: [
		        {			            
		            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
		        }
	    	],
		    series: [		        
		        {
		            name: "月消费总额",
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
		        },
		        {
		            name: "食堂月消费总额",
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
		                    {type : 'average', name : '食堂平均金额'}
		                ]
            		},
		            symbolSize: 6,
		            yAxisIndex: 0
		        },
		        {
		            name: "超市月消费总额",
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
		                    {type : 'average', name : '超市平均金额'}
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
	function monthAverageList(option){
		//返回参数
		var json={};
		//获取年份
		var year="";

		//月消费总额
		var consumeAllList=[0,0,0,0,0,0,0,0,0,0,0,0];
		//食堂月消费总额
		var messMoneyList=[0,0,0,0,0,0,0,0,0,0,0,0];
		//超市月消费总额
		var superMktMoneyList=[0,0,0,0,0,0,0,0,0,0,0,0];		
		if(option.consumeAllList)
		{
			if(option.consumeAllList.length!=0)
			{
				year=option.consumeAllList[0].year;
				for(var i=0;i<option.consumeAllList.length;i++)
				{				   			
					consumeAllList[option.consumeAllList[i].month-1]=option.consumeAllList[i].totalConsumeMoney;	
				}
			}
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
		if(option.superMktMoneyList)
		{
			if(option.superMktMoneyList.length!=0)
			{
				year=option.superMktMoneyList[0].year;
				for(var i=0;i<option.superMktMoneyList.length;i++)
				{				   			
					superMktMoneyList[option.superMktMoneyList[i].month-1]=option.superMktMoneyList[i].totalConsumeMoney;	
				}
			}
		}

		//拼接json
		if(year=="")
		{
			json=null;
		}else{
			json.year=year;					
			json.consumeAllList=consumeAllList;
			json.messMoneyList=messMoneyList;
			json.superMktMoneyList=superMktMoneyList;			
		}
		return json;		
	}
	
		var $map1=$("#month_average");
		/* 查询学生消费能力变化 */
		$("#month_average_search").click(function(){
			var text=$("#month_average_text").val();
			if(text=="")
			{
				alert1.content="请选择年份！";
				alert1.init();
				alert1.show();
			}else 
			{
				loading.show();
				var jsonStr={"searchYear":text};
				$.ajax({
		            type: "post",
					url: 'skipStuConsumeAbilityPost?jsonStr='+JSON.stringify(jsonStr),
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
							option1.series[0].data=json.consumeAllList;
							option1.series[1].data=json.messMoneyList;
							option1.series[2].data=json.superMktMoneyList;								
							option1.title.text=json.year+"年学生按月消费金额和平均消费金额";			
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

		/* 学生消费次数 */
		var myChart2=null;
		//配置参数
		var option2={		   
		    legend: {
		        data: ["食堂月消费次数", "超市月消费次数"]
		    },
		    xAxis: [
		        {			            
		            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
		        }
	    	],
		    series: [		        
		        {
		            name: "食堂月消费次数",
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
		        },
		        {
		            name: "超市月消费次数",
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
		function ConsumptionTimes(option)
		{
			var json={};
			var year="";
			//食堂月消费次数
			var messCountList = [0,0,0,0,0,0,0,0,0,0,0,0];
			//超市月消费次数
			var superMktCountList = [0,0,0,0,0,0,0,0,0,0,0,0];
			if(option.messCountList)
			{
				if(option.messCountList.length!=0)
				{
					year=option.messCountList[0].year;
					for(var i=0;i<option.messCountList.length;i++)
					{
						messCountList[option.messCountList[i].month-1]=option.messCountList[i].consumeCount;
					}
					json.year=year;
					json.messCountList=messCountList;
				}
			}
			if(option.superMktCountList)
			{
				if(option.superMktCountList.length!=0)
				{
					year=option.superMktCountList[0].year;
					for(var i=0;i<option.superMktCountList.length;i++)
					{
						superMktCountList[option.superMktCountList[i].month-1]=option.superMktCountList[i].consumeCount;
					}
					json.year=year;
					json.superMktCountList=superMktCountList;
				}
			}
			if($.isEmptyObject(json))
			{
				return null;
			}else {
				return json;
			}		
		}

		var $map2=$("#consumption_times");
		/* 查询学生消费能力变化 */
		$("#consumption_times_search").click(function(){
			var text=$("#consumption_times_text").val();
			if(text=="")
			{
				alert1.content="请选择年份！";
				alert1.init();
				alert1.show();
			}else 
			{
				loading.show();
				var jsonStr={"searchYear":text};
				$.ajax({
		            type: "post",
					url: 'skipStuConsumeAbilityPost?jsonStr='+JSON.stringify(jsonStr),
		            success: function (result) {
		            	$("#consumption_times_text").val("");		            	
		            	loading.hide();
		            	result = JSON.parse(result);		            	
		            	var json=ConsumptionTimes(result);		            	
		            	if(json==null)
						{
							$map2.html("<div class='nodata'>暂无数据.....</div>");
						}else{
							option2.series[0].data=json.messCountList;
							option2.series[1].data=json.superMktCountList;
							option2.title.text=json.year+"年学生消费次数";			
							myChart2=new echarts_Template($map2[0],option2);
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

		/* 学生消费能力变化 */
		var myChart3=null;
		//配置参数
		var option3={		   
		    legend: {
		        data: ["高消费学生", "中档消费学生","低消费学生"],
		        orient:'vertical',
		        x: "right",
			    y: "top"
		    },		   
		    tooltip:{
		    	trigger:"item",
		    	formatter: '{b0}: {c0}({d0}%)'
		    },	   
		    series: [		        
		        {
		            name:'学生消费能力',
		            type:'pie',
		            radius: ['40%', '55%'],
		            label:{
		            	normal:{
		            		textStyle:{
		            			fontSize:18,
		            			color:"#fff"
		            		}
		            	}
		            },
		            data:[
		                {value:0, name:'高消费学生'},
		                {value:0, name:'中档消费学生'},
		                {value:0, name:'低消费学生'},
		            ]
		        }
		    ],		  		    			   
		    title: {			        
		        text: ""	 
		    }		   
		}

		//数据转换方法
		function SpendingPower(option)
		{
			var json={};			
			//高消费学生
			var heightpie = {
				value:0				
			};
			//中档消费学生
			var midepie = {
				value:0				
			};
			//低消费学生
			var lowpie = {
				value:0
			};			
			if(option.consumeLevelList)
			{
				if(option.consumeLevelList.length!=0)
				{					
					heightpie.value=option.consumeLevelList[0].highNum;					
					midepie.value=option.consumeLevelList[1].highNum;					
					lowpie.value=option.consumeLevelList[2].highNum;					
					json.heightpie=heightpie;
					json.midepie=midepie;
					json.lowpie=lowpie;
				}				
			}
			if($.isEmptyObject(json))
			{
				return null;
			}else {
				return json;
			}		
		}

		var $map3=$("#spending_power");

		//调用tab插件
		var arr=[function(){
		//动态加载数据				
		//调用consumeAbilityList进行数据转换
		var json=consumeAbilityList(result.consumeAbilityList);					
			if(json==null)
			{
				$map.html("<div class='nodata'>暂无数据.....</div>");
			}else{		
				option.series[0].data=json.totalConsume;
				option.series[1].data=json.messConsume;
				option.series[2].data=json.supermktConsume;
				option.title.text=json.year+"年学生消费能力值变化";			
				myChart=new echarts_Template($map[0],option);
			}
	},function(){
		//动态加载数据			
		//调用monthAverageList进行数据转换
		var json1=monthAverageList(result);					
			if(json1==null)
			{
				$map1.html("<div class='nodata'>暂无数据.....</div>");
			}else{	
				option1.series[0].data=json1.consumeAllList;
				option1.series[1].data=json1.messMoneyList;
				option1.series[2].data=json1.superMktMoneyList;					
				option1.title.text=json1.year+"年学生按月消费金额和平均消费金额";			
				myChart1=new echarts_Template($map1[0],option1);
			}
	},function(){		
		//动态加载数据			
		//调用ConsumptionTimes进行数据转换
		var json2=ConsumptionTimes(result);					
			if(json2==null)
			{
				$map2.html("<div class='nodata'>暂无数据.....</div>");
			}else{	
				option2.series[0].data=json2.messCountList;
				option2.series[1].data=json2.superMktCountList;
				option2.title.text=json2.year+"年学生消费次数";			
				myChart2=new echarts_Template($map2[0],option2);
			}
	},function(){
		//动态加载数据			
		//调用SpendingPower进行数据转换
		var json3=SpendingPower(result);							
			if(json3==null)
			{
				$map3.html("<div class='nodata'>暂无数据.....</div>");
			}else{	
				option3.series[0].data[0].value=json3.heightpie.value;				
				option3.series[0].data[1].value=json3.midepie.value;				
				option3.series[0].data[2].value=json3.lowpie.value;				
				myChart3=new echarts_Template($map3[0],option3,"pie");
			}
	}];
	tab(arr);