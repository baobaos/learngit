/*
 *@本js功能：图书馆借还书高峰期分析页面
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
		        data: ["每月借书数量", "每月还书数量"]
		    },
		    xAxis: [
		        {			            
		            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
		        }
	    	],
		    series: [		        
		        {
		            name: "每月借书数量",
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
		            name: "每月还书数量",
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
			var json={};
			var year="";
			var month="";
			// var month="";
			//借书集合
			var borrowList = [0,0,0,0,0,0,0,0,0,0,0,0];
			//还书集合
			var returnList = [0,0,0,0,0,0,0,0,0,0,0,0];

				console.log(result);
				console.log(option);
				
			if(option.borrowList)
			{
				if(option.borrowList.length!=0)
				{
					year=option.borrowList[0].year;

					for(var i=0;i<option.borrowList.length;i++)
					{
						borrowList[option.borrowList[i].month-1]=option.borrowList[i].borrowCount;
					}
					json.year=year;
					json.month=month;
					json.borrowList=borrowList;
				}
			}

			if(option.returnList)
			{
				if(option.returnList.length!=0)
				{
					year=option.returnList[0].year;
					for(var i=0;i<option.returnList.length;i++)
					{
						returnList[option.returnList[i].month-1]=option.returnList[i].bookCount;
					}
					json.year=year;
					json.month=month;
					json.returnList=returnList;
				}
			}
		//拼接json
		if(year=="")
		{
			json=null;
		}else{
			json.year=year;					
			json.borrowList=borrowList;
			json.returnList=returnList;		
		}
		return json;			
		}

		var $map=$("#libBorrowReturn");

		var json=LibBorrowReturnBook(result);	
		if(json==null)
		{
			$map.html("<div class='nodata'>暂无数据.....</div>");
		}else{
			option.series[0].data=json.borrowList;
			option.series[1].data=json.returnList;
			option.title.text=json.year+"年学生借还书次数";			
			myChart=new echarts_Template($map[0],option);
		}

		/* 查询学生借还书变化 */
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
				var jsonStr={"searchYear":text};
				$.ajax({
		            type: "post",
					url: 'libBorrowReturnMsgPost?jsonStr='+JSON.stringify(jsonStr),
		            success: function (result) {
		            	$("#borrowreturn_text").val("");		            	
		            	loading.hide();
		            	result = JSON.parse(result);		            	
		            	var json=LibBorrowReturnBook(result);		            	
		            	if(json==null)
						{
							$map.html("<div class='nodata'>暂无数据.....</div>");
						}else{
							option.series[0].data=json.borrowList;
							option.series[1].data=json.returnList;
							option.title.text=json.year+"年学生借还书次数";			
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