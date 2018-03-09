/*
 *@本js功能：学生熬夜上网分析
 *@本js作者：王昆宇
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

//清空文本框
$(".glyphicon-remove").parents().click(function(){
	$(this).prev().val("");
});

var myChart=null;//柱状图

var option={//柱状图数据
    grid: {
            x: 70,
            y: 30
        },   					
    xAxis: [
        {
            type: "category",
            data: ["23:00~00:00","00:00~01:00","01:00~02:00","02:00~03:00","03:00~04:00"],
            axisLabel:{               
                interval:0,
                textStyle:{
                    fontSize:12
                }
            }
        }
    ],
    yAxis: [
        {
            type: "value"	           
        }
    ],
    series: [{
	    	name:"熬夜上网数量",
	    	type:"bar",	  	
	    	data:[
	    		{
	    			name:"23:00~00:00",
                    value:0,
                    itemStyle:{
                        normal:{color:'#fbca7b'}
                    }
               },
               {
	    			name:"00:00~01:00",
                    value:0,
                    itemStyle:{
                        normal:{color:'#fdba51'}
                    }
               },
               {
	    			name:"01:00~02:00",
                    value:0,
                    itemStyle:{
                        normal:{color:'#ee9508'}
                    }
               },
               {
                    name:"02:00~03:00",
                    value:0,
                    itemStyle:{
                        normal:{color:'#ef8436'}
                    }
               },
               {
                    name:"03:00~04:00",
                    value:0,
                    itemStyle:{
                        normal:{color:'#c25d13'}
                    }
               }
	    	]			    	   	
	   	}				   	
   ] ,
   title:{
   	text:""
   }
};

var myChart1=null;//饼图

var option1={                 
            legend: {
                data: ["23:00~00:00","00:00~01:00","01:00~02:00","02:00~03:00","03:00~04:00"],
                orient:'horizontal',
                x: "left",
                y: "bottom"
            },         
            tooltip:{
                trigger:"item"                
            },     
            series: [               
                {
                    name:'熬夜人数比例',
                    type:'pie',
                    center:['50%','40%'],
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
                        {value:0, name:'23:00~00:00'},
                        {value:0, name:'00:00~01:00'},
                        {value:0, name:'01:00~02:00'},
                        {value:0, name:'02:00~03:00'},
                        {value:0, name:'03:00~04:00'}
                    ]
                }
            ],                                 
            title: {                    
                text: ""     
            },
            color: ["#fbca7b", "#fdba51", "#ee9508", "#ef8436", "#c25d13"]          
        }

//数据加载

var $map=$("#supermarket_money");
var $map1=$("#supermarket_money1");
if(result.onlineGroupStuMap==null)
{
	$map.html("<div class='nodata'>暂无数据.....</div>");
	$map1.html("<div class='nodata'>暂无数据.....</div>");	
}else {
	//柱状图加载
	option.series[0].data[0].value=result.onlineGroupStuMap.oneTimeStuCount;
	option.series[0].data[1].value=result.onlineGroupStuMap.TwoTimeStuCount;
	option.series[0].data[2].value=result.onlineGroupStuMap.ThreeTimeStuCount;
    option.series[0].data[3].value=result.onlineGroupStuMap.ForthTimeStuCount;
    option.series[0].data[4].value=result.onlineGroupStuMap.FiveTimeStuCount;
	option.title.text=result.onlineGroupStuMap.onlineData.split("-")[0]+"年"+result.onlineGroupStuMap.onlineData.split("-")[1]+"月熬夜上网全体数量及时间段";
	myChart=new echarts_Template($map[0],option);

	//饼图加载
	option1.series[0].data[0].value=result.onlineGroupStuMap.oneTimeStuCount;
	option1.series[0].data[1].value=result.onlineGroupStuMap.TwoTimeStuCount;
    option1.series[0].data[2].value=result.onlineGroupStuMap.ThreeTimeStuCount;
    option1.series[0].data[3].value=result.onlineGroupStuMap.ForthTimeStuCount;
    option1.series[0].data[4].value=result.onlineGroupStuMap.FiveTimeStuCount;
    option1.title.text=result.onlineGroupStuMap.onlineData.split("-")[0]+"年"+result.onlineGroupStuMap.onlineData.split("-")[1]+"月熬夜人数比例";
	myChart1=new echarts_Template($map1[0],option1,"pie");
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
			url: 'getOnlineGroupAnalysisByPost?jsonStr='+JSON.stringify(jsonStr),
	        success: function (result) {		            	
	        	$("#changes_ability_text").val("");		            	
	        	loading.hide();
	        	result = JSON.parse(result);
	        	if(result.onlineGroupStuMap==null)
                {
                    $map.html("<div class='nodata'>暂无数据.....</div>");
                    $map1.html("<div class='nodata'>暂无数据.....</div>");  
                }else {
                   //柱状图加载
                    option.series[0].data[0].value=result.onlineGroupStuMap.oneTimeStuCount;
                    option.series[0].data[1].value=result.onlineGroupStuMap.TwoTimeStuCount;
                    option.series[0].data[2].value=result.onlineGroupStuMap.ThreeTimeStuCount;
                    option.series[0].data[3].value=result.onlineGroupStuMap.ForthTimeStuCount;
                    option.series[0].data[4].value=result.onlineGroupStuMap.FiveTimeStuCount;
                    option.title.text=result.onlineGroupStuMap.onlineData.split("-")[0]+"年"+result.onlineGroupStuMap.onlineData.split("-")[1]+"月熬夜上网全体数量及时间段";
                    myChart=new echarts_Template($map[0],option);

                    //饼图加载
                    option1.series[0].data[0].value=result.onlineGroupStuMap.oneTimeStuCount;
                    option1.series[0].data[1].value=result.onlineGroupStuMap.TwoTimeStuCount;
                    option1.series[0].data[2].value=result.onlineGroupStuMap.ThreeTimeStuCount;
                    option1.series[0].data[3].value=result.onlineGroupStuMap.ForthTimeStuCount;
                    option1.series[0].data[4].value=result.onlineGroupStuMap.FiveTimeStuCount;
                    option1.title.text=result.onlineGroupStuMap.onlineData.split("-")[0]+"年"+result.onlineGroupStuMap.onlineData.split("-")[1]+"月熬夜人数比例";
                    myChart1=new echarts_Template($map1[0],option1,"pie");
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