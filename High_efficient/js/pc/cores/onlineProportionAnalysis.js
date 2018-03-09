/*
 *@本js功能：学生上网比例分析
 *@本js作者：王昆宇
 *@编写时间：2017年2月18日
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

var myChart=null;//柱状图

var option={//柱状图数据
				tooltip:{
					formatter:"{b}:{c}"
				},				
			    xAxis: [
			        {
			            type: "category",
			            data: ["沉迷群体上网平均时间","女生上网平均时间","男生上网平均时间"]	           
			        }
			    ],
			    yAxis: [
			        {
			            type: "value"	           
			        }
			    ],
			    series: [{
				    	name:"-",
				    	type:"bar",
				    	barWidth:52,
				    	data:[
				    		{
				    			name:"沉迷群体上网平均时间",
			                    value:0,
			                    itemStyle:{
			                        normal:{color:'#22a186'}
			                    }
			               },
			               {
				    			name:"女生上网平均时间",
			                    value:0,
			                    itemStyle:{
			                        normal:{color:'#d35556'}
			                    }
			               },
			               {
				    			name:"男生上网平均时间",
			                    value:0,
			                    itemStyle:{
			                        normal:{color:'#415379'}
			                    }
			               }
				    	],
		               markLine : {
			                data : [
			                    {name : '全体学生平均上网时间',yAxis:0}
			                ]
		            	}			    	   	
				   	}				   	
			   ] ,
			   title:{
			   	text:""
			   }
			};

var myChart1=null;//饼图

var option1={	
	 tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {       
        data: ['男性','女性']
    },
    series : [
        {
            name: '上网比例',
            type: 'pie',
            radius : '80%',
            center: ['50%', '50%'],
            data:[
                {value:0, name:'男性'},
                {value:0, name:'女性'}             
            ],
            label:{
            	normal:{
            		position:'inside',
            		textStyle:{
            			color:"#fff",
            			fontSize:16
            		}
            	}
            }
        }
    ],
    color:["#22b6f2","#fa9023"]
};

//象形柱图
var myChart2=null;
var option2 = {
	tooltip: {
		show:false
	},
    xAxis: {
        max: 100,
        splitLine: {show: false},
        offset: 10,
        axisLine: {
            lineStyle: {
                color: '#999'
            }
        },
        show:false,
        axisLabel: {
            margin: 10
        }
    },
    yAxis: {
        data: ['女性'],
        inverse: true,
        show:true,
        axisTick: {show: false},
        axisLine: {show: false},
        axisLabel: {
            margin: 10,
            textStyle: {
                color: '#999',
                fontSize: 16
            }
        }
    },
    grid: {
        top: 'center',      
        left: 0 ,
        right:100      
    },
    series: [{
        // current data
        type: 'pictorialBar',
        symbol: "image://images/pc/ioc11.png",
        symbolRepeat: 'fixed',
        symbolMargin: '20%',
        symbolClip: true,
        symbolSize: ['12', '30'],
        symbolBoundingData: 100,
        data: [0],
        z: 10
    }, {
        // full data
        type: 'pictorialBar',
        itemStyle: {
            normal: {
                opacity: 0.2
            }
        },
        animationDuration: 0,
        symbolRepeat: 'fixed',
        symbolMargin: '20%',
        symbol: "image://images/pc/ioc11.png",
        symbolSize: ['12', '30'],
        symbolBoundingData: 100,
        data: [0],
        z: 5
    }]
};

//象形柱图
var myChart3=null;
var option3 = {
	tooltip: {
		show:false
	},
    xAxis: {
        max: 100,
        splitLine: {show: false},
        offset: 10,
        axisLine: {
            lineStyle: {
                color: '#999'
            }
        },
        show:false,
        axisLabel: {
            margin: 10
        }
    },
    yAxis: {
        data: ['男性'],
        inverse: true,
        show:true,
        axisTick: {show: false},
        axisLine: {show: false},
        axisLabel: {
            margin: 10,
            textStyle: {
                color: '#999',
                fontSize: 16
            }
        }
    },
    grid: {
        top: 'center',
        height: 200,
        left: 0,
        right:100       
    },
    series: [{
        // current data
        type: 'pictorialBar',
        symbol: "image://images/pc/ioc12.png",
        symbolRepeat: 'fixed',
        symbolMargin: '20%',
        symbolClip: true,
        symbolSize: ['12', '30'],
        symbolBoundingData: 100,
        data: [0],
        z: 10
    }, {
        // full data
        type: 'pictorialBar',
        itemStyle: {
            normal: {
                opacity: 0.2
            }
        },
        animationDuration: 0,
        symbolRepeat: 'fixed',
        symbolMargin: '20%',
        symbol: "image://images/pc/ioc12.png",
        symbolSize: ['12', '30'],
        symbolBoundingData: 100,
        data: [0],
        z: 5
    }]
};

//数据加载

var $map=$("#supermarket_money");
var $map1=$("#supermarket_count");
var $map2=$("#sumpermarket_proportion");
var $map3=$("#sumpermarket_graphical");
var $map4=$("#sumpermarket_graphical1");
if(result.onlineProAnalyMap==null)
{
	$map.html("<div class='nodata'>暂无数据.....</div>");
	$map1.html("<div class='nodata'>暂无数据.....</div>");
	$map2.hide();
	$map3.hide();
	$map4.hide();
}else {
	//柱状图加载
	option.series[0].data[0].value=result.onlineProAnalyMap.avgHighOnlinetime;
	option.series[0].data[1].value=result.onlineProAnalyMap.vagGirlOnlinetime;
	option.series[0].data[2].value=result.onlineProAnalyMap.vagBoyOnlinetime;
	option.series[0].markLine.data[0].yAxis=result.onlineProAnalyMap.vagAllOnlinetime;
	option.title.text=result.onlineProAnalyMap.onlineDate.split("-")[0]+"年"+result.onlineProAnalyMap.onlineDate.split("-")[1]+"月上网时间分析";
	myChart=new echarts_Template($map[0],option);

	//饼图加载
	option1.series[0].data[0].value=result.onlineStuMap.boyCount;
	option1.series[0].data[1].value=result.onlineStuMap.girlCount;
	myChart1=new echarts_Template($map1[0],option1,"pie");

	//比例加载
	$('.woman').children('span').text(result.girlPro*100);
	$('.man').children('span').text(result.boyPro*100);

	//象形柱图加载
	option2.series[0].data[0]=result.girlPro*100;
	option2.series[1].data[0]=result.girlPro*100;
	myChart2=new echarts_Template($map3[0],option2,"pie");

	option3.series[0].data[0]=result.boyPro*100;
	option3.series[1].data[0]=result.boyPro*100;
	myChart3=new echarts_Template($map4[0],option3,"pie");
}

/* 查询学生上网比例 */
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
		var jsonStr={"onlineDate":text};
		$.ajax({
	        type: "post",
			url: 'getOnlineProportionAnalysisByPost?jsonStr='+JSON.stringify(jsonStr),
	        success: function (result) {		            	
	        	$("#changes_ability_text").val("");		            	
	        	loading.hide();
	        	result = JSON.parse(result);
	        	if(result.onlineProAnalyMap!=null&&result.onlineStuMap.boyCount!=null&&result.girlPro!=0&&result.boyPro!=0){
	        		var json=result;
					//柱状图加载
					option.series[0].data[0].value=result.onlineProAnalyMap.avgHighOnlinetime;
					option.series[0].data[1].value=result.onlineProAnalyMap.vagGirlOnlinetime;
					option.series[0].data[2].value=result.onlineProAnalyMap.vagBoyOnlinetime;
					option.series[0].markLine.data[0].yAxis=result.onlineProAnalyMap.vagAllOnlinetime;
					option.title.text=result.onlineProAnalyMap.onlineDate.split("-")[0]+"年"+result.onlineProAnalyMap.onlineDate.split("-")[1]+"月上网时间分析";
					myChart=new echarts_Template($map[0],option);

					//饼图加载
					option1.series[0].data[0].value=result.onlineStuMap.boyCount;
					option1.series[0].data[1].value=result.onlineStuMap.girlCount;
					myChart1=new echarts_Template($map1[0],option1,"pie");

					//比例加载
					$('.woman').children('span').text(result.girlPro*100);
					$('.man').children('span').text(result.boyPro*100);

					//象形柱图加载
					option2.series[0].data[0]=result.girlPro*100;
					option2.series[1].data[0]=result.girlPro*100;
					myChart2=new echarts_Template($map3[0],option2,"pie");

					option3.series[0].data[0]=result.boyPro*100;
					option3.series[1].data[0]=result.boyPro*100;
					myChart3=new echarts_Template($map4[0],option3,"pie");
				}else
				{
					$map.html("<div class='nodata'>暂无数据.....</div>");
					$map1.html("<div class='nodata'>暂无数据.....</div>");
					$map2.hide();
					$map3.hide();
					$map4.hide();
				
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