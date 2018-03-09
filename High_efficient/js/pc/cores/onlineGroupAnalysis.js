/*
 *@本js功能：学生上网群体分析
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
            x: 70
        },   					
    xAxis: [
        {
            type: "category",
            data: ["06:00~15:00","15:00~23:00","23:00~06:00"]	           
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
	    			name:"06:00~15:00",
                    value:0,
                    itemStyle:{
                        normal:{color:'#22a186'}
                    }
               },
               {
	    			name:"15:00~23:00",
                    value:0,
                    itemStyle:{
                        normal:{color:'#d35556'}
                    }
               },
               {
	    			name:"23:00~06:00",
                    value:0,
                    itemStyle:{
                        normal:{color:'#415379'}
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
                data: ["06:00~15:00","15:00~23:00","23:00~06:00"],
                orient:'vertical',
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
                        {value:0, name:'06:00~15:00'},
                        {value:0, name:'15:00~23:00'},
                        {value:0, name:'23:00~06:00'},
                    ]
                }
            ],                                 
            title: {                    
                text: ""     
            }          
        }

//数据加载

var $map=$("#supermarket_money");
var $map1=$("#supermarket_money1");
if(result.onlineGroupTwoStuMap==null)
{
	$map.html("<div class='nodata'>暂无数据.....</div>");
	$map1.html("<div class='nodata'>暂无数据.....</div>");	
}else {
	//柱状图加载
	option.series[0].data[0].value=result.onlineGroupTwoStuMap.oneTimeStuCount;
	option.series[0].data[1].value=result.onlineGroupTwoStuMap.TwoTimeStuCount;
	option.series[0].data[2].value=result.onlineGroupTwoStuMap.ThreeTimeStuCount;
	option.title.text=result.onlineGroupTwoStuMap.onlineData.split("-")[0]+"年"+result.onlineGroupTwoStuMap.onlineData.split("-")[1]+"月不同时间段累计上网人数";
	myChart=new echarts_Template($map[0],option);

	//饼图加载
	option1.series[0].data[0].value=result.onlineGroupTwoStuMap.oneTimeStuCount;
	option1.series[0].data[1].value=result.onlineGroupTwoStuMap.TwoTimeStuCount;
    option1.series[0].data[2].value=result.onlineGroupTwoStuMap.ThreeTimeStuCount;
    option1.title.text=result.onlineGroupTwoStuMap.onlineData.split("-")[0]+"年"+result.onlineGroupTwoStuMap.onlineData.split("-")[1]+"月不同时间段上网比例";
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
			url: 'getOnlineGroupTwoAnalysisByPost?jsonStr='+JSON.stringify(jsonStr),
	        success: function (result) {		            	
	        	$("#changes_ability_text").val("");		            	
	        	loading.hide();
	        	result = JSON.parse(result);
	        	if(result.onlineGroupTwoStuMap==null)
                {
                    $map.html("<div class='nodata'>暂无数据.....</div>");
                    $map1.html("<div class='nodata'>暂无数据.....</div>");  
                }else {
                    //柱状图加载
                    option.series[0].data[0].value=result.onlineGroupTwoStuMap.oneTimeStuCount;
                    option.series[0].data[1].value=result.onlineGroupTwoStuMap.TwoTimeStuCount;
                    option.series[0].data[2].value=result.onlineGroupTwoStuMap.ThreeTimeStuCount;
                    option.title.text=result.onlineGroupTwoStuMap.onlineData.split("-")[0]+"年"+result.onlineGroupTwoStuMap.onlineData.split("-")[1]+"月不同时间段累计上网人数";
                    myChart=new echarts_Template($map[0],option);

                    //饼图加载
                    option1.series[0].data[0].value=result.onlineGroupTwoStuMap.oneTimeStuCount;
                    option1.series[0].data[1].value=result.onlineGroupTwoStuMap.TwoTimeStuCount;
                    option1.series[0].data[2].value=result.onlineGroupTwoStuMap.ThreeTimeStuCount;
                    option1.title.text=result.onlineGroupTwoStuMap.onlineData.split("-")[0]+"年"+result.onlineGroupTwoStuMap.onlineData.split("-")[1]+"月不同时间段上网比例";
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