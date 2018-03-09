/*
 *@本js功能：学生阅读能力分析页面
 *@本js作者：白丹丹
 *@编写时间：2017年2月8日
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
/* 图书馆借还书高峰期分析图表 */
		var myChart=null;
		//配置参数
		var option={		   
		    legend: {
		        data: ["学生阅读能力值"]
		    },

		    xAxis: [
		        {			            
		            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
		        }
	    	],
		    series: [		        
		        {
		            name: "学生阅读能力值",
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
		function LibBorrowReturnBook(option)
		{
			// alert(option.myAbilityList.length);
			if(option.myAbilityList.length==0||option.myAbilityList==null)
			{
				 return null;		
			}else{
				var arrData= [
	                       {"value":0,"borrowTime":0,"borrowCount":0},
	                       {"value":0,"borrowTime":0,"borrowCount":0},
	                       {"value":0,"borrowTime":0,"borrowCount":0},
	                       {"value":0,"borrowTime":0,"borrowCount":0},
	                       {"value":0,"borrowTime":0,"borrowCount":0},
	                       {"value":0,"borrowTime":0,"borrowCount":0},
	                       {"value":0,"borrowTime":0,"borrowCount":0},
	                       {"value":0,"borrowTime":0,"borrowCount":0},
	                       {"value":0,"borrowTime":0,"borrowCount":0},
	                       {"value":0,"borrowTime":0,"borrowCount":0},
	                       {"value":0,"borrowTime":0,"borrowCount":0},
	                       {"value":0,"borrowTime":0,"borrowCount":0}];
		   for (var i = 0; i < option.myAbilityList.length; i++) {
			   var value_A=option.myAbilityList[i].month-1;
		   	arrData[value_A]=({"value":option.myAbilityList[i].readValues,"borrowTime":option.myAbilityList[i].borrowTime,"borrowCount":option.myAbilityList[i].borrowCount})
		   };
		   return arrData;	
			}
		   		
		}

		var $map=$("#myReadAbility");

		var json=LibBorrowReturnBook(result);	
		if(json==null)
		{
			$map.html("<div class='nodata'>暂无数据.....</div>");
		}else{
			option.series[0].data=json;

			option.title.text=result.myAbilityList[0].year+"年阅读能力分析";
			myChart=new echarts_Template($map[0],option);
			//默认加载第一个人的信息

			var sex = (result.myAbilityList[result.myAbilityList.length-1].studensSex=="1") ? "女":"男";

			$(".Modular_color").next().text(result.userId+"("+sex+")");
			$(".Modular_color_01").next().text(result.myAbilityList[result.myAbilityList.length-1].readValues);
			$(".Modular_color_02").next().text(result.myAbilityList[result.myAbilityList.length-1].borrowTime+"小时");
			$(".Modular_color_03").next().text(result.myAbilityList[result.myAbilityList.length-1].borrowCount+"本");
	
			//绑定鼠标经过事件，显示该人员信息
			myChart.on("mouseover",function(params){
				$(".Modular_color").next().text(result.userId+"("+sex+")");
				$(".Modular_color_01").next().text(params.data.value);
				$(".Modular_color_02").next().text(params.data.borrowTime+"小时");
				$(".Modular_color_03").next().text(params.data.borrowCount+"本");
			});
		}

		/* 查询学生阅读能力变化 */
		var loading=new Loading();
		loading.init();
		var alert1=new Alert();	
		$("#lib_BorrowReturn_search").click(function(){
			//判断cookie是否过期
			overdue();
			var text=$("#borrowreturn_text").val();
			if(text=="")
			{
				alert1.content="请选择年份！";
				alert1.init();
				alert1.show();
			}else 
			{
				loading.show();
				var jsonStr={"searchYear":text,"userId":result.userId};
				$.ajax({
		            type: "post",
					url: 'getMyReadAbilityPost?jsonStr='+JSON.stringify(jsonStr),
		            success: function (result) {
		            	 
		            	$(".search2").show();
		            	$("#borrowreturn_text").val("");		            	
		            	loading.hide();
		            	result = JSON.parse(result);
		            	var json=LibBorrowReturnBook(result);

		            	if(json==null||json.length==0)
						{
							$(".search2").hide();
							option.title.text="";
							$map.html("<div class='nodata'>暂无数据.....</div>");

						}else{
							// alert("????????")
							$(".search2").show();
							option.series[0].data=json;
							option.title.text=result.myAbilityList[0].year+"年阅读能力分析";			
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