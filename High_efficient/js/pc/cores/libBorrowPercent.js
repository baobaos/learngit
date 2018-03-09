/*
 *@本js功能：图书馆借书学生占比页面
 *@本js作者：白丹丹
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
//第一个饼图---男生占借阅男性的比例
var myChart1=null;//男生占借阅男性的比例
var option1= {  
        title : {
            text: '阅读男性占全校男性比例1',
            x:'center'
        },     
        tooltip : {
            trigger: 'item',
            formatter: "阅读男性占全校男性比例:{d}%"
        },
        series : [
            {
                type: 'pie',
                radius : ['40%', '80%'],
                label: {
                    normal: {
                        position: 'center'
                    }  
                },
                data:[
                    {
                        value:0,
                        name:'阅读男性占全校男性比例',
                        itemStyle: {
                            normal: {
                                color: '#24a086'
                            }
                        },
                        label: {
                            normal: {
                                formatter: '{d}%',
                                textStyle: {
                                    fontSize: 30,
                                    color:"#fff"
                                }
                            }
                        }
                    },
                    {
                        value:0, 
                        name:'占位',
                        tooltip: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: '#407481'
                            }
                        },
                        label: {                            
                            normal: {
                                position:'inside',
                                formatter: ''
                            }
                        }
                    }
                ]
            }
        ],
       title:{
        text:""
       }
    };

//第二个饼图---女生占借阅女性的比例
var myChart2=null;//女生占借阅女性的比例
var option2= { 
        title : {
            text: '阅读女性占全校女性比例',
            x:'center'
        },      
        tooltip : {
            trigger: 'item',
            formatter: "阅读女性占全校女性比例:{d}%"
        },
        series : [
            {
                type: 'pie',
                radius : ['55%', '80%'],
                label: {
                    normal: {
                        position: 'center'
                    }  
                },
                data:[
                    {
                        value:0,
                        name:'阅读女性占全校女性比例',
                        itemStyle: {
                            normal: {
                                color: '#f5ca6f'
                            }
                        },
                        label: {
                            normal: {
                                formatter: '{d}%',
                                textStyle: {
                                    fontSize: 30,
                                    color:"#fff"
                                }
                            }
                        }
                    },
                    {
                        value:0, 
                        name:'占位',
                        tooltip: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: '#ffff99'
                            }
                        },
                        label: {                            
                            normal: {
                                position:'inside',
                                formatter: ''
                            }
                        }
                    }
                ]
            }
        ],
       title:{
        text:""
       }
    };
//第四个--借阅人数占全校总人数饼图
var myChart4=null;//借阅人数占全校总人数的比例
var option4= { 
        title : {
            text: '借阅人数占全校总人数的比例',
            x:'center'
        },      
        tooltip : {
            trigger: 'item',
            formatter: "借阅人数占全校总人数的比例:{d}%"
        },
        series : [
            {
                type: 'pie',
                radius : ['55%', '80%'],
                label: {
                    normal: {
                        position: 'center'
                    }  
                },
                data:[
                    {
                        value:0,
                        name:'借阅人数占全校总人数的比例',
                        itemStyle: {
                            normal: {
                                color: '#d35556'
                            }
                        },
                        label: {
                            normal: {
                                formatter: '{d}%',
                                textStyle: {
                                    fontSize: 30,
                                    color:"#fff"
                                }
                            }
                        }
                    },
                    {
                        value:0, 
                        name:'占位',
                        tooltip: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: '#ffff99'
                            }
                        },
                        label: {                            
                            normal: {
                                position:'inside',
                                formatter: ''
                            }
                        }
                    }
                ]
            }
        ],
       title:{
        text:""
       }
    };
//超市排名算法
function read_proportion(option)
{
    var json={};
    var piearr1=[];//饼图1数据
    var piearr2=[];//饼图2数据
    var piearr4=[];//饼图4数据
    //饼图1计算
    var readMale_sum=0;
    var readMale_other=0;
    //饼图2计算
    var readFmale_sum=0;
    var readFmale_other=0;
    //饼图4计算
    var all_sum=0;
    var all_other=0;

    if(result)//饼图数据
    {
        if(result.length!=0)
        {   
            readMale_other=100-result.oneResult;
            piearr1[0]= result.oneResult;
            piearr1[1]= readMale_other;
            readFmale_other=100-result.twoResult;
            piearr2[0]= result.twoResult;
            piearr2[1]= readFmale_other;

            all_other=100-result.fiveResult;
            piearr4[0]= result.fiveResult;
            piearr4[1]= all_other;
        }
    }

    //拼接json

    if(result.length==0)
    {
        return null;
    }else{
        json.piearr1=piearr1;
        json.piearr2=piearr2;
        json.piearr4=piearr4;
        return json;        
    }

}

//获取饼状图1盒
var $map1=$("#borrowMale_percent");
//获取饼状图2盒   
var $map2=$("#borrowFmale_percent");
//获取饼状图4盒  
var $map4=$("#all_percent");
//调用consumeAbilityList进行数据转换
var json=read_proportion(result); 
// console.log(json)                   
if(json==null)
{
    $map1.html("<div class='nodata'>暂无数据.....</div>");
    $map2.html("<div class='nodata'>暂无数据.....</div>");
    $map4.html("<div class='nodata'>暂无数据.....</div>");
    // $(".message_box").hide();
}else{
    //加载饼图1
    option1.series[0].data[0].value=json.piearr1[0];
    option1.series[0].data[1].value=json.piearr1[1];
    option1.title.text="阅读男性占全校男性比例" 
    myChart1=new echarts_Template($map1[0],option1,"bar");
    //加载饼图2
    option2.series[0].data[0].value=json.piearr2[0];
    option2.series[0].data[1].value=json.piearr2[1];
    option2.title.text="阅读女性占全校女性比例" 
    myChart2=new echarts_Template($map2[0],option2,"pie");
    //加载饼图4
    option4.series[0].data[0].value=json.piearr4[0];
    option4.series[0].data[1].value=json.piearr4[1];
    option4.title.text="借阅人数占全校总人数的比例" 
    myChart4=new echarts_Template($map4[0],option4,"pie");
}




// 男女生上网比例第三个图
var myChart3=null;//饼图

var option3={   
            title : {
            text: '男女各占借阅总人数的比例',
            x:'center'
        },
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
var myChart32=null;
var option32 = {
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
        symbol: "image://../images/pc/ioc11.png",
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
        symbol: "image://../images/pc/ioc11.png",
        symbolSize: ['12', '30'],
        symbolBoundingData: 100,
        data: [0],
        z: 5
    }]
};

//象形柱图男生占比
var myChart33=null;
var option33 = {

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
        symbol: "image://../images/pc/ioc12.png",
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
        symbol: "image://../images/pc/ioc12.png",
        symbolSize: ['12', '30'],
        symbolBoundingData: 100,
        data: [0],
        z: 5
    }]
};



//数据加载

// var $map=$("#read_money");
var $map3=$("#read_count");
// var $map2=$("#read_proportion");
var $map32=$("#read_graphical");
var $map33=$("#read_graphical1");
// console.log(result);
if(result==null)
{
    // $map.html("<div class='nodata'>暂无数据.....</div>");
    $map3.html("<div class='nodata'>暂无数据.....</div>");
    // $map2.hide();
    $map32.hide();
    $map33.hide();
}else {
    //饼图加载
    option3.series[0].data[0].value=result.borrowMale;
    option3.series[0].data[1].value=result.borrowFemale;
    option3.title.text="男女各占借阅总人数的比例" 
    myChart3=new echarts_Template($map3[0],option3,"pie");

    //比例加载
    $('.woman').children('span').text(result.fourResult);
    $('.man').children('span').text(result.threeResult);

    //象形柱图加载
    option32.series[0].data[0]=result.fourResult;
    option32.series[1].data[0]=result.fourResult;
    myChart32=new echarts_Template($map32[0],option32,"pie");

    option33.series[0].data[0]=result.threeResult;
    option33.series[1].data[0]=result.threeResult;
    myChart33=new echarts_Template($map33[0],option33,"pie");
}