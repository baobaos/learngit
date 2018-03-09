	/*
 *@本js功能：成绩突变群体分析页面代码
 *@本js作者：白丹丹
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

    indicatorData = [{ //====> 定义雷达图 顶点文字
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
    var lineStyle = { //====>  定义雷达图边框透明度
        normal: {
            width: 1,
            opacity: 0.5
        }
    };

    option = {
       legend: {
    	   data: ["上学期各标签值","本学期各标签值"], //====>  定义雷达图图例
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
        radar: { //====>  定义每个元素的颜色 与透明度
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
        series: [{  //====> 定义雷达图元素的每个参数
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
                    color: '#cdb648',
                    opacity: 0.3
                }
            }
        }],
        title:{  //====>  定义标题及位置
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

if(result.gradeHighMutationMap==null)
{   
    $(".high_box").hide();
    $(".py").html('');
	$map.html("<div class='nodata'>暂无数据.....</div>");	

}else {
    $(".high_stu").html(result.mutaHighStuCount+'人');
    $(".high_ex").html(result.highStuCom*100+'%');
	//雷达图元素加载 数据
	option.series[0].data[0][0]=result.gradeHighMutationMap.nowconsumeValues;
    option.series[0].data[0][1]=result.gradeHighMutationMap.nowreadValues;
    option.series[0].data[0][2]=result.gradeHighMutationMap.nowhealthValues;
    option.series[0].data[0][3]=result.gradeHighMutationMap.nowonlineValues;	
    
    option.series[1].data[0][0]=result.gradeHighMutationMap.befconsumeValues;
    option.series[1].data[0][1]=result.gradeHighMutationMap.befreadValues;
    option.series[1].data[0][2]=result.gradeHighMutationMap.befhealthValues;
    option.series[1].data[0][3]=result.gradeHighMutationMap.befonlineValues;
    
	myChart=new echarts_Template($map[0],option,"pie");	
    $(".high_box").show();
    $(".py").html('综合评语：'+result.highCommit);
}

//第二块数据加载

var $map2=$("#consumption_ranking2");

if(result.gradeLowMutationMap==null)
{   
    $(".low_box").hide();
    $("lowpy").html('');
    $map2.html("<div class='nodata'>暂无数据.....</div>");   

}else {
    $(".low_stu").html(result.mutaLowStuCount+'人');
    $(".low_ex").html(result.lowStuCom*100+'%');
    //雷达图元素加载  数据
    option.series[0].data[0][0]=result.gradeLowMutationMap.nowconsumeValues;
    option.series[0].data[0][1]=result.gradeLowMutationMap.nowreadValues;
    option.series[0].data[0][2]=result.gradeLowMutationMap.nowhealthValues;
    option.series[0].data[0][3]=result.gradeLowMutationMap.nowonlineValues;    
    
    option.series[1].data[0][0]=result.gradeLowMutationMap.befconsumeValues;
    option.series[1].data[0][1]=result.gradeLowMutationMap.befreadValues;
    option.series[1].data[0][2]=result.gradeLowMutationMap.befhealthValues;
    option.series[1].data[0][3]=result.gradeLowMutationMap.befonlineValues;
    
    myChart=new echarts_Template($map2[0],option,"pie"); 
    $(".low_box").show();
    //评语赋值
    $(".lowpy").html('综合评语：'+result.lowCommit);
}	
/* 第一块查询学生 */
var loading=new Loading();
loading.init();
var alert1=new Alert();		
$("#month_average_search").click(function(){
	
	var text=$("#month_average_text").val();
	if(text=="")
	{
		alert1.content="请选择学期！";
		alert1.init();
		alert1.show();				
	}else 
	{
		loading.show();
        if(text==0){
            text=null;
        }
		var jsonStr={"pageOneSemester":text};

        jsonStr=JSON.stringify(jsonStr);
		$.ajax({
	        type: "post",
			url: 'getGradeMutationAnalysisByPost?jsonStr='+jsonStr,
	        success: function (result) {
	        	loading.hide();
	        	result = JSON.parse(result);
	        	if(result.gradeHighMutationMap==null)
                {   
	        		
                    $(".high_box").hide();
                    $(".py").html('');
                    $map.html("<div class='nodata'>暂无数据.....</div>");   

                }else {
                    $(".high_box").show();
                    $(".high_stu").html(result.mutaHighStuCount+'人');
                    $(".high_ex").html(result.highStuCom*100+'%');
                    //柱状图加载
                    option.series[0].data[0][0]=result.gradeHighMutationMap.nowconsumeValues;
                    option.series[0].data[0][1]=result.gradeHighMutationMap.nowreadValues;
                    option.series[0].data[0][2]=result.gradeHighMutationMap.nowhealthValues;
                    option.series[0].data[0][3]=result.gradeHighMutationMap.nowonlineValues;    
                    
                    option.series[1].data[0][0]=result.gradeHighMutationMap.befconsumeValues;
                    option.series[1].data[0][1]=result.gradeHighMutationMap.befreadValues;
                    option.series[1].data[0][2]=result.gradeHighMutationMap.befhealthValues;
                    option.series[1].data[0][3]=result.gradeHighMutationMap.befonlineValues;
                    
                    myChart=new echarts_Template($map[0],option,"pie"); 
                    $(".high_box").show();
                    $(".py").html('综合评语：'+result.highCommit);
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
	
    var text=$("#month_average_text2").val();
    if(text=="")
    {
        alert1.content="请选择学期！";
        alert1.init();
        alert1.show();              
    }else 
    {
        loading.show();
        if(text==0){
            text=null;
        }
        var jsonStr={"pageTwoSemester":text};
        $.ajax({
            type: "post",
            url: 'getGradeMutationAnalysisByPost?jsonStr='+JSON.stringify(jsonStr),
            success: function (result) {                        
                $("#month_average_text1").val("");                       
                loading.hide();
                result = JSON.parse(result);
               if(result.gradeLowMutationMap==null)
                {   
                    $(".low_box").hide();
                    $(".lowpy").html('');
                    $map2.html("<div class='nodata'>暂无数据.....</div>");   

                }else {
                    $(".low_stu").html(result.mutaLowStuCount+'人');
                    $(".low_ex").html(result.lowStuCom*100+'%');
                    //柱状图加载
                    option.series[0].data[0][0]=result.gradeLowMutationMap.nowconsumeValues;
                    option.series[0].data[0][1]=result.gradeLowMutationMap.nowreadValues;
                    option.series[0].data[0][2]=result.gradeLowMutationMap.nowhealthValues;
                    option.series[0].data[0][3]=result.gradeLowMutationMap.nowonlineValues;    
                    
                    option.series[1].data[0][0]=result.gradeLowMutationMap.befconsumeValues;
                    option.series[1].data[0][1]=result.gradeLowMutationMap.befreadValues;
                    option.series[1].data[0][2]=result.gradeLowMutationMap.befhealthValues;
                    option.series[1].data[0][3]=result.gradeLowMutationMap.befonlineValues;
                    
                    myChart=new echarts_Template($map2[0],option,"pie"); 
                    $(".low_box").show();
                    //评语赋值
                    $(".lowpy").html('综合评语：'+result.lowCommit);
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
if(result.gradeHighMutationMap==null)
{   
    $(".high_box").hide();
     //评语赋值
    $(".py").html('');
    $map.html("<div class='nodata'>暂无数据.....</div>");   

}else {
    $(".high_box").show();
    $(".high_stu").html(result.mutaHighStuCount+'人');
    $(".high_ex").html(result.highStuCom*100+'%');
    //柱状图加载
    option.series[0].data[0][0]=result.gradeHighMutationMap.nowconsumeValues;
    option.series[0].data[0][1]=result.gradeHighMutationMap.nowreadValues;
    option.series[0].data[0][2]=result.gradeHighMutationMap.nowhealthValues;
    option.series[0].data[0][3]=result.gradeHighMutationMap.nowonlineValues;    
    
    option.series[1].data[0][0]=result.gradeHighMutationMap.befconsumeValues;
    option.series[1].data[0][1]=result.gradeHighMutationMap.befreadValues;
    option.series[1].data[0][2]=result.gradeHighMutationMap.befhealthValues;
    option.series[1].data[0][3]=result.gradeHighMutationMap.befonlineValues;
    $(".high_box").show();
    myChart=new echarts_Template($map[0],option,"pie"); 
    //评语赋值
    $(".py").html('综合评语：'+result.highCommit);
}

	},function(){
		//动态加载数据			
		//调用SpendingPower进行数据转换
		if(result.gradeLowMutationMap==null)
{   
    $(".low_box").hide();
    //评语赋值
    $(".lowpy").html('');
    $map.html("<div class='nodata'>暂无数据.....</div>");   

}else {
    $(".low_stu").html(result.mutaLowStuCount+'人');
    $(".low_ex").html(result.lowStuCom*100+'%');
    //柱状图加载
    option.series[0].data[0][0]=result.gradeLowMutationMap.nowconsumeValues;
    option.series[0].data[0][1]=result.gradeLowMutationMap.nowreadValues;
    option.series[0].data[0][2]=result.gradeLowMutationMap.nowhealthValues;
    option.series[0].data[0][3]=result.gradeLowMutationMap.nowonlineValues;    
    
    option.series[1].data[0][0]=result.gradeLowMutationMap.befconsumeValues;
    option.series[1].data[0][1]=result.gradeLowMutationMap.befreadValues;
    option.series[1].data[0][2]=result.gradeLowMutationMap.befhealthValues;
    option.series[1].data[0][3]=result.gradeLowMutationMap.befonlineValues;
    
    myChart=new echarts_Template($map2[0],option,"pie"); 
    $(".low_box").show();
    //评语赋值
    $(".lowpy").html('综合评语：'+result.lowCommit);
}   

	}];
	tab(arr);