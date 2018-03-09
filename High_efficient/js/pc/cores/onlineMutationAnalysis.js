/* 
 *上网时长突变分析页面js文件
 *创建人：白丹丹
 *创建日期:2017/02/14
 **/
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
            name: '消费能力',
            max: 100
        }, {
            name: '阅读能力',
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
    	   data: ["本月上网时长群体突变能力值","上个月上网时长群体突变能力值"],
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
            center: ['50%', '48%'],
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
            name: '本月上网时长群体突变能力值',
            type: 'radar',           
            data:  [[0, 0, 0, 0]],
            areaStyle: {
                normal: {
                    color: '#1f9e7e',
                    opacity: 0.5
                }
            }
        },{
            name: '上个月上网时长群体突变能力值',
            type: 'radar',           
            data:  [[0, 0, 0, 0]],
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


//数据加载

var $map=$("#consumption_ranking");

if(result.onlineHighMutationMap==null)
{
	$map.html("<div class='nodata'>暂无数据.....</div>");	
	$(".high_box").hide();
	$(".py").html('');
}else {
	//消费突变上升赋值       
	$(".high_stu").html(result.mutaHighStuCount+'人');
	$(".high_ex").html(result.highStuCom*100+'%');
	//雷达图加载
	option.series[0].data[0][0]=result.onlineHighMutationMap.nowconsumeValues;
    option.series[0].data[0][1]=result.onlineHighMutationMap.nowreadValues;
    option.series[0].data[0][2]=result.onlineHighMutationMap.nowhealthValues;
    option.series[0].data[0][3]=result.onlineHighMutationMap.nowgardeValues;	
   
    option.series[1].data[0][0]=result.onlineHighMutationMap.befconsumeValues;
    option.series[1].data[0][1]=result.onlineHighMutationMap.befreadValues;
    option.series[1].data[0][2]=result.onlineHighMutationMap.befhealthValues;
    option.series[1].data[0][3]=result.onlineHighMutationMap.befgardeValues;
    
	myChart=new echarts_Template($map[0],option,"pie");	
	$(".high_box").show();
	//评语赋值
	$(".py").html('综合评语：'+result.highCommit);
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
					url: 'getOnlineMutationAnalysisByPost?jsonStr='+jsonStr,
		            success: function (result) {
		            	Loading1.hide();
		            	result = JSON.parse(result);
		            	var json=result.onlineHighMutationMap;
		            	if(json==null||json.length==0||json.nowconsumeValues==null)
						{
							$map.html("<div class='nodata'>暂无数据.....</div>");
							$(".high_box").hide();
							$(".py").html('');
						}else{	

							//雷达图加载
							option.series[0].data[0][0]=result.onlineHighMutationMap.nowconsumeValues;
						    option.series[0].data[0][1]=result.onlineHighMutationMap.nowreadValues;
						    option.series[0].data[0][2]=result.onlineHighMutationMap.nowhealthValues;
						    option.series[0].data[0][3]=result.onlineHighMutationMap.nowgardeValues;
						    
						    option.series[1].data[0][0]=result.onlineHighMutationMap.befconsumeValues;
						    option.series[1].data[0][1]=result.onlineHighMutationMap.befreadValues;
						    option.series[1].data[0][2]=result.onlineHighMutationMap.befhealthValues;
						    option.series[1].data[0][3]=result.onlineHighMutationMap.befgardeValues;
						    
							myChart=new echarts_Template($map[0],option,"pie");	
							$(".high_box").show();
							//评语赋值
							$(".py").html('综合评语：'+result.highCommit);
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
		if(result.onlineLowMutationMap==null)
		{
			$map1.html("<div class='nodata'>暂无数据.....</div>");
			$(".low_box").hide();
			$("lowpy").html('');
		}else {
			//消费突变下降赋值
			$(".low_stu").html(result.mutaLowStuCount+'人');
			$(".low_ex").html(result.lowStuCom*100+'%');
			//雷达图加载
			option.series[0].data[0][0]=result.onlineLowMutationMap.nowconsumeValues;
		    option.series[0].data[0][1]=result.onlineLowMutationMap.nowreadValues;
		    option.series[0].data[0][2]=result.onlineLowMutationMap.nowhealthValues;
		    option.series[0].data[0][3]=result.onlineLowMutationMap.nowgardeValues;
		    
		    option.series[1].data[0][0]=result.onlineLowMutationMap.befconsumeValues;
		    option.series[1].data[0][1]=result.onlineLowMutationMap.befreadValues;
		    option.series[1].data[0][2]=result.onlineLowMutationMap.befhealthValues;
		    option.series[1].data[0][3]=result.onlineLowMutationMap.befgardeValues;	
		    
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
							url: 'getOnlineMutationAnalysisByPost?jsonStr='+jsonStr,
				            success: function (result) {
				            	Loading1.hide();
				            	result = JSON.parse(result);
				            	var json=result.onlineLowMutationMap;
				            	if(json==null||json.length==0||json.nowconsumeValues==null)
								{
									$map1.html("<div class='nodata'>暂无数据.....</div>");
									$(".low_box").hide();
									$(".lowpy").html('');
								}else{	

									//雷达图加载
									option.series[0].data[0][0]=result.onlineLowMutationMap.nowconsumeValues;
								    option.series[0].data[0][1]=result.onlineLowMutationMap.nowreadValues;
								    option.series[0].data[0][2]=result.onlineLowMutationMap.nowhealthValues;
								    option.series[0].data[0][3]=result.onlineLowMutationMap.nowgardeValues;
								    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
								    
								    option.series[1].data[0][0]=result.onlineLowMutationMap.befconsumeValues;
								    option.series[1].data[0][1]=result.onlineLowMutationMap.befreadValues;
								    option.series[1].data[0][2]=result.onlineLowMutationMap.befhealthValues;
								    option.series[1].data[0][3]=result.onlineLowMutationMap.befgardeValues;
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
			if(result.onlineHighMutationMap==null)
			{
				$map.html("<div class='nodata'>暂无数据.....</div>");	
				$(".high_box").hide();
				$(".py").html('');
			}else {
				//消费突变上升赋值
				$(".high_stu").html(result.mutaHighStuCount+'人');
				$(".high_ex").html(result.highStuCom*100+'%');
				//雷达图加载
				option.series[0].data[0][0]=result.onlineHighMutationMap.nowconsumeValues;
			    option.series[0].data[0][1]=result.onlineHighMutationMap.nowreadValues;
			    option.series[0].data[0][2]=result.onlineHighMutationMap.nowhealthValues;
			    option.series[0].data[0][3]=result.onlineHighMutationMap.nowgardeValues;
			    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
			    
			    option.series[1].data[0][0]=result.onlineHighMutationMap.befconsumeValues;
			    option.series[1].data[0][1]=result.onlineHighMutationMap.befreadValues;
			    option.series[1].data[0][2]=result.onlineHighMutationMap.befhealthValues;
			    option.series[1].data[0][3]=result.onlineHighMutationMap.befgardeValues;
			    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
			    
				myChart=new echarts_Template($map[0],option,"pie");	
				$(".high_box").show();
				//评语赋值
				$(".py").html('综合评语：'+result.highCommit);
			}
		},function(){
			if(result.onlineLowMutationMap==null||result.onlineLowMutationMap.nowconsumeValues==null)
			{
				$map1.html("<div class='nodata'>暂无数据.....</div>");
				$(".low_box").hide();
				$(".lowpy").html('');
			}else {
				//消费突变下降赋值
				$(".low_stu").html(result.mutaLowStuCount+'人');
				$(".low_ex").html(result.lowStuCom*100+'%');
				//雷达图加载
				option.series[0].data[0][0]=result.onlineLowMutationMap.nowconsumeValues;
			    option.series[0].data[0][1]=result.onlineLowMutationMap.nowreadValues;
			    option.series[0].data[0][2]=result.onlineLowMutationMap.nowhealthValues;
			    option.series[0].data[0][3]=result.onlineLowMutationMap.nowgardeValues;
			    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
			    
			    option.series[1].data[0][0]=result.onlineLowMutationMap.befconsumeValues;
			    option.series[1].data[0][1]=result.onlineLowMutationMap.befreadValues;
			    option.series[1].data[0][2]=result.onlineLowMutationMap.befhealthValues;
			    option.series[1].data[0][3]=result.onlineLowMutationMap.befgardeValues;
			    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
			    
				myChart=new echarts_Template($map1[0],option,"pie");
				$(".low_box").show();
				//评语赋值
				$(".lowpy").html('综合评语：'+result.lowCommit);
			}
		}];
		tab(arr);
});