/*
 *@本js功能：高薪就业群体分析页面
 *@本js作者：孟令超
 *@编写时间：2017年2月22日
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



/* 学生个人消费能力排名图标 */
var myChart=null;

//默认配置
var option={
	    legend: {
	        data: ["考研录取群体平均值","全校学生平均值"],
	        x: "center",
	        y: "bottom",
	        textStyle: {
	            color: "rgb(4, 241, 213)",
	            fontSize: 14,
	            fontWeight: "bold"
	        }
	    },
	    xAxis: [
	        {
	            type: "category",
	            axisLine: {
	                onZero: false,
	                show: true,
	                lineStyle: {
	                    color: "rgba(255, 255, 255, 0.2)",
	                    width: 1
	                }
	            },
	            data: ["平均成绩", "平均消费", "阅读能力","上网时长","健康度","细心程度","信用度","卫生程度"],
	            position: "bottom",
	            axisLabel: {
	                textStyle: {
	                    color: "rgb(4, 241, 213)",
	                    fontSize: 12
	                }
	            },
	            splitLine: {
	                show: false
	            }
	        }
	    ],
	    grid: {
	        y: 70,
	        borderWidth: 0
	    },
	    yAxis: [
	            {
	                type: "value",
	                splitLine: {
	                    show: true
	                },
	                axisLabel: {
	                	textStyle: {
		                    fontSize: 14,
		                    color: "rgb(4, 241, 213)"
		                }
	                },
	                axisLine: {
	                	 lineStyle: {
	 	                    width: 1,
	 	                    color: "rgba(255, 255, 255, 0.2)"
	 	                },
	 	                show: true
	                }
	            }
	        ],
	    series: [
	        {
	            name: "考研录取群体平均值",
	            type: "bar",
	            data: [],
	            barWidth : 20,//柱图宽度
	        },
	        {
	            name: "全校学生平均值",
	            type: "bar",
	            data: [],
	            barWidth : 20,//柱图宽度
	            symbol: "circle",
	            itemStyle: {
	                emphasis: {
	                    borderWidth: 1,
	                    label: {
	                        show: false
	                    }
	                }
	            },
	            symbolSize: 10,
	            yAxisIndex: 0
	        }
	    ],
	    title:{
	       	text:"",
	        subtext:"",
	        subtextStyle: {
	            color: "rgb(250, 245, 79)"
	        }
	       }   
	};

//高薪就业群体分析页面数据转换
function ConsumptionRanking(option){
	if(option.length=="0" || option==null || option.sumGrade==null ||  option.sumGrade==undefined){
		return null;
	}else{//["平均成绩", "平均消费", "阅读能力","上网时长","健康度","细心程度"],
		var jsonData={data1:"",data2:""}; //创建数组集合便于取值
		var comaAilAnHighList=new Array; // 创建全校平均值数组
		var comAvgStuList=new Array;// 创建个人平均值数组

			// 个人数组拼值
			comaAilAnHighList.push(option.avgGrade);// 平均成绩
			comaAilAnHighList.push(option.highOnlineAvgMoney.toFixed(2));//平均消费
			comaAilAnHighList.push(option.readEmploymentAvg);//阅读能力
			comaAilAnHighList.push(option.onlineLowAvg);// 上网时长
			comaAilAnHighList.push(option.highEmploymenthealth);//健康度
			comaAilAnHighList.push(option.highEmploymentcareful);//细心程度
			comaAilAnHighList.push(option.highEmploymentcredit);//健康度
			comaAilAnHighList.push(option.highEmploymenthygiene);//细心程度
			//合成数组
			jsonData.data1=comaAilAnHighList;
		

			// 全校数组 拼值
			comAvgStuList.push(option.sumGrade);// 成绩
			comAvgStuList.push(option.allAvgMoney);//学生消费能力值
			comAvgStuList.push(option.readAllAvg);//阅读能力值
			comAvgStuList.push(option.onlineAllAvg);// 成绩
			comAvgStuList.push(option.allHeathy);//学生消费能力值
			comAvgStuList.push(option.allhCareful);//阅读能力值
			comAvgStuList.push(option.allCredit);//学生消费能力值
			comAvgStuList.push(option.allhYgiene);//阅读能力值
			//合成数组
			jsonData.data2=comAvgStuList;

		return jsonData;
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
			option.series[0].data=json.data1;
			option.series[1].data=json.data2;
			var newData =result.dataDate.split("-");
			option.title.text=newData[0]+"年"+newData[1]+"月学生考研录取群体分析";		
			myChart=new echarts_Template($map[0],option);			
			//默认加载第一个人的信息
			$(".Modular_color").next().text(result.highEmploymentStuCount+"人");
			$(".Modular_color_01").next().text((result.highEmploymentStuCount/result.sumStu*100).toFixed(2)+"%");
			$("#py").text(result.commit);
		}
	
		
		
		
		
		
		
		
		
		
		//搜索功能
		var loading=new Loading();
			loading.init();
		var alert1=new Alert();	
		$("#month_average_search").click(function(){
			 overdue();
			var text=$("#month_average_text").val();
			if(text!="")//进行AJAX查询
			{				
				loading.show();	
				var jsonStr={
					"dataDate":text,
					"higorlowMark":2
				};
				
				$.ajax({
		            type: "post",
					url: 'getEmploymentSituationByPost?jsonStr='+JSON.stringify(jsonStr),
		            success: function (result) {
		            	if(result.responseCode=="1"){
		            		    loading.hide();
								alert1.content="查询失败!";
								alert1.init();
								alert1.show();
		            	}else{
		            		$("#month_average_text").val("");		            	
			            	loading.hide();
			            	result = JSON.parse(result);
			            	if(result.highOnlineAvgMoney!=null&&result.readEmploymentAvg!=null&&result.onlineLowAvg!=null
			            			&&result.highEmploymenthealth!=null&&result.highEmploymentcareful!=null&&result.avgGrade!=null
			            			&&result.allAvgMoney!=null&&result.sumGrade!=null&&result.readAllAvg!=null
			            			&&result.onlineAllAvg!=null&&result.allHeathy!=null&&result.allhCareful!=null){
			            		var json=ConsumptionRanking(result);					
				        		if(json==null)
				        		{
				        			$map.html("<div class='nodata'>暂无数据.....</div>");
				        			$(".Modular").hide();
				        			$(".comment").hide();
				        		}else{		
				        			$(".Modular").show();
				        			$(".comment").show();
				        			option.series[0].data=json.data1;
				        			option.series[1].data=json.data2;
				        			
				        			var newData =result.dataDate.split("-");
				        			option.title.text=newData[0]+"年"+newData[1]+"月学生考研录取群体分析";			
				        				
				        			myChart=new echarts_Template($map[0],option);			
				        			//默认加载第一个人的信息
//				        			$(".Modular_color").next().text(result.highAvgMoney+"元");
//				        			$(".Modular_color_01").next().text(result.avgAllMoney+"元");
				        			$(".Modular_color").next().text(result.highEmploymentStuCount+"人");
				        			$(".Modular_color_01").next().text((result.highEmploymentStuCount/result.sumStu*100).toFixed(2)+"%");
				        			$("#py").text(result.commit);
				        		}
			            	}else{
			            		$map.html("<div class='nodata'>暂无数据.....</div>");
			            		$(".Modular").hide();
			        			$(".comment").hide();
			            	}
			            	
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
				alert1.content="请选择年份！";
				alert1.init();
				alert1.show();		
			}
		});