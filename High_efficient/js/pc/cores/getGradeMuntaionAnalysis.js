	/*
 *@本js功能：学生消费页面代码
 *@本js作者：王昆宇
 *@编写时间：2017年1月20日
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
            name: '上网时长',
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
    	   data: ["上学期成绩","本学期成绩"],
    		        x: "center",
    		        y: "bottom",
    		        textStyle: {
    		            color: "rgb(4, 241, 213)",
    		            fontSize: 14,
    		            fontWeight: "bold"
    		}
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
            name: '上学期各标签值',
            type: 'radar',           
            data:  [[0, 0, 0, 0]],
            areaStyle: {
                normal: {
                    color: '#1f9e7e',
                    opacity: 0.5
                }
            }
        },{
            name: '本学期各标签值',
            type: 'radar',           
            data:  [[0, 0, 0, 0]],
            areaStyle: {
                normal: {
                    color: '#1f9e7e',
                    opacity: 0.5
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


//第一块数据加载

var $map=$("#consumption_ranking");

if(result.portraitMsg==null)
{   
    $(".high_box").hide();
	$map.html("<div class='nodata'>暂无数据.....</div>");	

}else {
	//柱状图加载
	option.series[0].data[0][0]=result.portraitMsg.gardeValues;
    option.series[0].data[0][1]=result.portraitMsg.consumeValues;
    option.series[0].data[0][2]=result.portraitMsg.onlineValues;
    option.series[0].data[0][3]=result.portraitMsg.creditValues;	
    
    option.series[1].data[0][0]=result.portraitMsg.gardeAvgValues;
    option.series[1].data[0][1]=result.portraitMsg.consumeAvgValues;
    option.series[1].data[0][2]=result.portraitMsg.onlineAvgValues;
    option.series[1].data[0][3]=result.portraitMsg.creditAvgValues;
    
	myChart=new echarts_Template($map[0],option,"pie");	
}

//第二块数据加载

var $map=$("#consumption_ranking2");

if(result.portraitMsg==null)
{   
    $(".low_box").hide();
    $map.html("<div class='nodata'>暂无数据.....</div>");   

}else {
    //柱状图加载
    option.series[0].data[0][0]=result.portraitMsg.gardeValues;
    option.series[0].data[0][1]=result.portraitMsg.consumeValues;
    option.series[0].data[0][2]=result.portraitMsg.onlineValues;
    option.series[0].data[0][3]=result.portraitMsg.creditValues;    
    
    option.series[1].data[0][0]=result.portraitMsg.gardeAvgValues;
    option.series[1].data[0][1]=result.portraitMsg.consumeAvgValues;
    option.series[1].data[0][2]=result.portraitMsg.onlineAvgValues;
    option.series[1].data[0][3]=result.portraitMsg.creditAvgValues;
    
    myChart=new echarts_Template($map[0],option,"pie"); 
}	
/* 第一块查询学生 */
var loading=new Loading();
loading.init();
var alert1=new Alert();		
$("#month_average_search").click(function(){
	var text=$("#month_average_text").val();
	if(text=="")
	{
		alert1.content="请选择时间！";
		alert1.init();
		alert1.show();				
	}else 
	{
		loading.show();
		var jsonStr={"searchYearMonth":text};
		$.ajax({
	        type: "post",
			url: 'skipMainPost?jsonStr='+JSON.stringify(jsonStr),
	        success: function (result) {		            	
	        	$("#month_average_text").val("");		            	
	        	loading.hide();
	        	result = JSON.parse(result);
	        	if(result.stuAvg==null)
                {   
                    $(".high_box").hide();
                    $map.html("<div class='nodata'>暂无数据.....</div>");       
                }else {
                    //柱状图加载
							option.series[0].data[0][0]=result.portraitMsg.gardeValues;
						    option.series[0].data[0][1]=result.portraitMsg.consumeValues;
						    option.series[0].data[0][2]=result.portraitMsg.onlineValues;
						    option.series[0].data[0][3]=result.portraitMsg.creditValues;
						    // option.series[0].data[0][4]=result.portraitMsg.readValues;
						    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
						    
						    option.series[1].data[0][0]=result.portraitMsg.gardeAvgValues;
						    option.series[1].data[0][1]=result.portraitMsg.consumeAvgValues;
						    option.series[1].data[0][2]=result.portraitMsg.onlineAvgValues;
						    option.series[1].data[0][3]=result.portraitMsg.creditAvgValues;
						    // option.series[1].data[0][4]=result.portraitMsg.readAvgValues;
						    //option.title.text=result.portraitMsg.compreAvgValues+"分";	
						    
							myChart=new echarts_Template($map[0],option,"pie");	
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
/* 第二块查询学生 */
var loading=new Loading();
loading.init();
var alert1=new Alert();     
$("#month_average_search1").click(function(){
    var text=$("#month_average_text1").val();
    if(text=="")
    {
        alert1.content="请选择时间！";
        alert1.init();
        alert1.show();              
    }else 
    {
        loading.show();
        var jsonStr={"searchYearMonth":text};
        $.ajax({
            type: "post",
            url: 'skipMainPost?jsonStr='+JSON.stringify(jsonStr),
            success: function (result) {                        
                $("#month_average_text").val("");                       
                loading.hide();
                result = JSON.parse(result);
                if(result.stuAvg==null)
                {   
                    $(".high_box").hide();
                    $map.html("<div class='nodata'>暂无数据.....</div>");       
                }else {
                    //柱状图加载
                            option.series[0].data[0][0]=result.portraitMsg.gardeValues;
                            option.series[0].data[0][1]=result.portraitMsg.consumeValues;
                            option.series[0].data[0][2]=result.portraitMsg.onlineValues;
                            option.series[0].data[0][3]=result.portraitMsg.creditValues;
                            // option.series[0].data[0][4]=result.portraitMsg.readValues;
                            //option.title.text=result.portraitMsg.compreAvgValues+"分"; 
                            
                            option.series[1].data[0][0]=result.portraitMsg.gardeAvgValues;
                            option.series[1].data[0][1]=result.portraitMsg.consumeAvgValues;
                            option.series[1].data[0][2]=result.portraitMsg.onlineAvgValues;
                            option.series[1].data[0][3]=result.portraitMsg.creditAvgValues;
                            // option.series[1].data[0][4]=result.portraitMsg.readAvgValues;
                            //option.title.text=result.portraitMsg.compreAvgValues+"分"; 
                            
                            myChart=new echarts_Template($map[0],option,"pie"); 
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

		//调用tab插件
		var arr=[function(){
		//动态加载数据				
		//调用consumeAbilityList进行数据转换
if(result.portraitMsg==null)
{
    $(".high_box").hide();
    $map.html("<div class='nodata'>暂无数据.....</div>");       
}else {
        
    //柱状图加载
    option.series[0].data[0][0]=result.portraitMsg.gardeValues;
    option.series[0].data[0][1]=result.portraitMsg.consumeValues;
    option.series[0].data[0][2]=result.portraitMsg.onlineValues;
    option.series[0].data[0][3]=result.portraitMsg.creditValues;
    
    option.series[1].data[0][0]=result.portraitMsg.gardeAvgValues;
    option.series[1].data[0][1]=result.portraitMsg.consumeAvgValues;
    option.series[1].data[0][2]=result.portraitMsg.onlineAvgValues;
    option.series[1].data[0][3]=result.portraitMsg.creditAvgValues;
    
    myChart=new echarts_Template($map[0],option,"pie"); 
}
	},function(){
		//动态加载数据			
		//调用SpendingPower进行数据转换
		if(result.portraitMsg==null)
{
    $map.html("<div class='nodata'>暂无数据.....</div>"); 

}else {
   
    //柱状图加载
    option.series[0].data[0][0]=result.portraitMsg.gardeValues;
    option.series[0].data[0][1]=result.portraitMsg.consumeValues;
    option.series[0].data[0][2]=result.portraitMsg.onlineValues;
    option.series[0].data[0][3]=result.portraitMsg.creditValues;
    
    option.series[1].data[0][0]=result.portraitMsg.gardeAvgValues;
    option.series[1].data[0][1]=result.portraitMsg.consumeAvgValues;
    option.series[1].data[0][2]=result.portraitMsg.onlineAvgValues;
    option.series[1].data[0][3]=result.portraitMsg.creditAvgValues;
    
    myChart=new echarts_Template($map[0],option,"pie"); 
}
	}];
	tab(arr);