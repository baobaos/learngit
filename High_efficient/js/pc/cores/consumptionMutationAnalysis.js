	/*
 *@本js功能：消费突变群体分析页面代码
 *@本js作者：白丹丹
 *@编写时间：2017年1月20日
 */ 

$(function() {

	var Loading1 = new Loading(); // loadng 盒子初始化
	Loading1.init(); // 插入loading 盒子
	var Alert1 = new Alert(); //弹出盒子初始化
	var confirm1 = new Confirm(); // 确定取消盒子初始化
	
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
	
	var myChart=null;//雷达图

    indicatorData = [{
            name: '信用度',
            max: 100
        }, {
            name: '卫生程度',
            max: 100
        }, {
            name: '上网时长',
            max: 100
        }, {
            name: '健康程度',
            max: 100
        }, {
            name: '学习能力',
            max: 100
        },

    ];
    var lineStyle = {
        normal: {
            width: 1,
            opacity: 0.5
        }
    };

    option = {
       legend: {
    	   data: ["本月消费群体突变能力值","上个月消费群体突变能力值"],
    		        x: "center",
    		        y: "bottom",
    		        textStyle: {
    		            color: "rgb(4, 241, 213)",
    		            fontSize: 14,
    		            fontWeight: "bold"
    		},
            icon:'roundRect'
    	},
        tooltip:{
            trigger:'item'
        },
        radar: {
            center: ['50%', '50%'],
            indicator: indicatorData,
            radius: '80%',
            splitNumber: 5,
            name: {
                textStyle: {
                    color: '#03fbdb',
                    fontSize: 16
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#3bc688',
                    opacity: 0.5
                }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: '#1a8077',
                    opacity: 0.4
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#178270',
                    opacity: 0.5
                }
            }
        },
        series: [{
            name: '本月消费群体突变能力值',
            type: 'radar',           
            data:  [[0, 0, 0, 0, 0]],
            areaStyle: {
                normal: {
                    color: '#1f9e7e',
                    opacity: 0.5
                }
            }
        },{
            name: '上个月消费群体突变能力值',
            type: 'radar',           
            data:  [[0, 0, 0, 0, 0]],
            areaStyle: {
                normal: {
                    color: '#cdb648',
                    opacity: 0.3
                }
            }
        }],
        title:{
            text:"",
            textStyle:{
               color:"#fff",
               fontSize:18
            },
            top:"center",
            left:"center"
        }
    };


//第一个选项卡数据加载

var $map=$("#consumption_ranking");

if(result.consumptionHighMutationMap==null)
{
	$map.html("<div class='nodata'>暂无数据.....</div>");	
	$(".high_box").hide();
	$(".highpy").html('');
}else {
	//消费突变上升赋值
	$(".high_stu").html(result.mutaHighStuCount+'人');
	$(".high_ex").html(result.highStuCom*100+'%');
	//雷达图加载
	option.series[0].data[0][0]=result.consumptionHighMutationMap.nowcreditValues;
    option.series[0].data[0][1]=result.consumptionHighMutationMap.nowhygieneValues;
    option.series[0].data[0][2]=result.consumptionHighMutationMap.nowonlineValues;
    option.series[0].data[0][3]=result.consumptionHighMutationMap.nowhealthValues;
    option.series[0].data[0][4]=result.consumptionHighMutationMap.nowgardeValues;
    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
    
    option.series[1].data[0][0]=result.consumptionHighMutationMap.befcreditValues;
    option.series[1].data[0][1]=result.consumptionHighMutationMap.befhygieneValues;
    option.series[1].data[0][2]=result.consumptionHighMutationMap.befonlineValues;
    option.series[1].data[0][3]=result.consumptionHighMutationMap.befhealthValues;
    option.series[1].data[0][4]=result.consumptionHighMutationMap.befgardeValues;
    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
    
	myChart=new echarts_Template($map[0],option,"pie");	
	$(".high_box").show();
	//评语赋值
	$(".highpy").html('综合评语：'+result.highCommit);
}
   
	// 模糊查询
		Loading1.init();
		$("#relation_search").click(function(){
			overdue();
			var text=$("#month_average_text").val();
			if(text=="")
			{
				Alert1.content="请选择年份！";
				Alert1.init();
				Alert1.show();				
			}else 
			{
				Loading1.show();
				var jsonStr={"pageOnedataDate":text};
				jsonStr = JSON.stringify(jsonStr);
				$.ajax({
		            type: "post",
					url: 'getConsumptionMutationAnalysisByPost?jsonStr='+jsonStr,
		            success: function (result) {
		            	Loading1.hide();
		            	result = JSON.parse(result);
		            	var json=result.consumptionHighMutationMap;
		            	if(json==null||json.length==0)
						{
							$map.html("<div class='nodata'>暂无数据.....</div>");
							$(".high_box").hide();
							$(".highpy").html('');
						}else{	

							//雷达图加载
							option.series[0].data[0][0]=result.consumptionHighMutationMap.nowcreditValues;
						    option.series[0].data[0][1]=result.consumptionHighMutationMap.nowhygieneValues;
						    option.series[0].data[0][2]=result.consumptionHighMutationMap.nowonlineValues;
						    option.series[0].data[0][3]=result.consumptionHighMutationMap.nowhealthValues;
						    option.series[0].data[0][4]=result.consumptionHighMutationMap.nowgardeValues;
						    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
						    
						    option.series[1].data[0][0]=result.consumptionHighMutationMap.befcreditValues;
						    option.series[1].data[0][1]=result.consumptionHighMutationMap.befhygieneValues;
						    option.series[1].data[0][2]=result.consumptionHighMutationMap.befonlineValues;
						    option.series[1].data[0][3]=result.consumptionHighMutationMap.befhealthValues;
						    option.series[1].data[0][4]=result.consumptionHighMutationMap.befgardeValues;
						    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
						    
							myChart=new echarts_Template($map[0],option,"pie");
							$(".high_box").show();
							//评语赋值
							$(".highpy").html('综合评语：'+result.highCommit);
						}
		            },
					error: function() {	
							Loading1.hide();
							Alert1.content="查询失败!";
							Alert1.init();
							Alert1.show();
					}			
       			 });
			}			
		});
		
		//突变下降选项卡
		var $map1=$("#consumption_ranking1");
		if(result.consumptionLowMutationMap==null)
		{
			$map1.html("<div class='nodata'>暂无数据.....</div>");
			$(".low_box").hide();
			$(".lowpy").html('');
		}else {
			//消费突变下降赋值
			$(".low_stu").html(result.mutaLowStuCount+'人');
			$(".low_ex").html(result.lowStuCom*100+'%');
			//雷达图加载
			option.series[0].data[0][0]=result.consumptionLowMutationMap.nowcreditValues;
		    option.series[0].data[0][1]=result.consumptionLowMutationMap.nowhygieneValues;
		    option.series[0].data[0][2]=result.consumptionLowMutationMap.nowonlineValues;
		    option.series[0].data[0][3]=result.consumptionLowMutationMap.nowhealthValues;
		    option.series[0].data[0][4]=result.consumptionLowMutationMap.nowgardeValues;
		    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
		    
		    option.series[1].data[0][0]=result.consumptionLowMutationMap.befcreditValues;
		    option.series[1].data[0][1]=result.consumptionLowMutationMap.befhygieneValues;
		    option.series[1].data[0][2]=result.consumptionLowMutationMap.befonlineValues;
		    option.series[1].data[0][3]=result.consumptionLowMutationMap.befhealthValues;
		    option.series[1].data[0][4]=result.consumptionLowMutationMap.befgardeValues;
		    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
		    
			myChart=new echarts_Template($map1[0],option,"pie");
			$(".low_box").show();
			//评语赋值
			$(".lowpy").html('综合评语：'+result.lowCommit);
		}
		   
				// 模糊查询
				Loading1.init();
				$("#relation_search1").click(function(){
					overdue();
					var text=$("#month_average_text1").val();
					if(text=="")
					{
						Alert1.content="请选择年份！";
						Alert1.init();
						Alert1.show();				
					}else 
					{
						Loading1.show();
						var jsonStr={"pageTwodataDate":text};
						jsonStr = JSON.stringify(jsonStr);
						$.ajax({
				            type: "post",
							url: 'getConsumptionMutationAnalysisByPost?jsonStr='+jsonStr,
				            success: function (result) {
				            	Loading1.hide();
				            	result = JSON.parse(result);
				            	var json=result.consumptionLowMutationMap;
				            	if(json==null||json.length==0)
								{
									$map1.html("<div class='nodata'>暂无数据.....</div>");
									$(".low_box").hide();
									$(".lowpy").html('');
								}else{	

									//雷达图加载
									option.series[0].data[0][0]=result.consumptionLowMutationMap.nowcreditValues;
								    option.series[0].data[0][1]=result.consumptionLowMutationMap.nowhygieneValues;
								    option.series[0].data[0][2]=result.consumptionLowMutationMap.nowonlineValues;
								    option.series[0].data[0][3]=result.consumptionLowMutationMap.nowhealthValues;
								    option.series[0].data[0][4]=result.consumptionLowMutationMap.nowgardeValues;
								    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
								    
								    option.series[1].data[0][0]=result.consumptionLowMutationMap.befcreditValues;
								    option.series[1].data[0][1]=result.consumptionLowMutationMap.befhygieneValues;
								    option.series[1].data[0][2]=result.consumptionLowMutationMap.befonlineValues;
								    option.series[1].data[0][3]=result.consumptionLowMutationMap.befhealthValues;
								    option.series[1].data[0][4]=result.consumptionLowMutationMap.befgardeValues;
								    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
								    
									myChart=new echarts_Template($map1[0],option,"pie");
									$(".low_box").show();
									//评语赋值
									$(".lowpy").html('综合评语：'+result.lowCommit);
								}
				            },
							error: function() {	
									Loading1.hide();
									Alert1.content="查询失败!";
									Alert1.init();
									Alert1.show();
							}			
		       			 });
					}			
				});
		
		//调用tab插件
		var arr=[function(){
		//动态加载数据				
			if(result.consumptionHighMutationMap==null)
			{
				$map.html("<div class='nodata'>暂无数据.....</div>");
				$(".high_box").hide();
				$(".highpy").html('');
			}else {
				//消费突变上升赋值
				$(".high_stu").html(result.mutaLowStuCount+'人');
				$(".high_ex").html(result.lowStuCom*100+'%');
				//雷达图加载
				option.series[0].data[0][0]=result.consumptionHighMutationMap.nowcreditValues;
			    option.series[0].data[0][1]=result.consumptionHighMutationMap.nowhygieneValues;
			    option.series[0].data[0][2]=result.consumptionHighMutationMap.nowonlineValues;
			    option.series[0].data[0][3]=result.consumptionHighMutationMap.nowhealthValues;
			    option.series[0].data[0][4]=result.consumptionHighMutationMap.nowgardeValues;
			    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
			    
			    option.series[1].data[0][0]=result.consumptionHighMutationMap.befcreditValues;
			    option.series[1].data[0][1]=result.consumptionHighMutationMap.befhygieneValues;
			    option.series[1].data[0][2]=result.consumptionHighMutationMap.befonlineValues;
			    option.series[1].data[0][3]=result.consumptionHighMutationMap.befhealthValues;
			    option.series[1].data[0][4]=result.consumptionHighMutationMap.befgardeValues;
			    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
			    
				myChart=new echarts_Template($map[0],option,"pie");	
				$(".high_box").show();
				//评语赋值
				$(".highpy").html('综合评语：'+result.highCommit);
			}
		},function(){
			if(result.consumptionLowMutationMap==null)
			{
				$map.html("<div class='nodata'>暂无数据.....</div>");	
				$(".low_box").hide();
				$(".lowpy").html('');
			}else {
				//消费突变上升赋值
				$(".low_stu").html(result.mutaLowStuCount+'人');
				$(".low_ex").html(result.lowStuCom*100+'%');
				//雷达图加载
				option.series[0].data[0][0]=result.consumptionLowMutationMap.nowcreditValues;
			    option.series[0].data[0][1]=result.consumptionLowMutationMap.nowhygieneValues;
			    option.series[0].data[0][2]=result.consumptionLowMutationMap.nowonlineValues;
			    option.series[0].data[0][3]=result.consumptionLowMutationMap.nowhealthValues;
			    option.series[0].data[0][4]=result.consumptionLowMutationMap.nowgardeValues;
			    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
			    
			    option.series[1].data[0][0]=result.consumptionLowMutationMap.befcreditValues;
			    option.series[1].data[0][1]=result.consumptionLowMutationMap.befhygieneValues;
			    option.series[1].data[0][2]=result.consumptionLowMutationMap.befonlineValues;
			    option.series[1].data[0][3]=result.consumptionLowMutationMap.befhealthValues;
			    option.series[1].data[0][4]=result.consumptionLowMutationMap.befgardeValues;
			    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
			    
				myChart=new echarts_Template($map1[0],option,"pie");
				$(".low_box").show();
				//评语赋值
				$(".lowpy").html('综合评语：'+result.lowCommit);
			}
		}];
		tab(arr);
});