	/*
 *@本js功能：关联页面代码
 *@本js作者：白丹丹
 *@编写时间：2017年1月20日
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

	/*成绩关联*/
	var markLineOpt = {};

	var bg = {
	    name: '相关背景',
	    type: 'pie',
	    avoidLabelOverlap: false,
	    labelLine: {
	        normal: {
	            show: false
	        }
	    },
	    data: [{
	        value: 1
	    }],
	    animation: false
	};

	var dot = {
	    name: '强相关',
	    type: 'scatter',
	    xAxisIndex: 0,
	    yAxisIndex: 0,
	    symbol: 'circle',
	    symbolSize: 40,
	    label: {
	        normal: {
	            show: true,
	            textStyle: {
	                color: '#fff'
	            },
	            position: 'bottom',
	            formatter: function(param) {
	                return param.data[2];
	            },
	        },
	    },
	    itemStyle: {
	        normal: {
	            color: '#9bca63'
	        },
	    },

	    data: [],
	}

    //====> 定义关联图 具体参数
	var option = {
	    title: {  //====> 定义标题
	        text: '',
	        x: '35%',
	        y: 0
	    },
	    tooltip: { //====>  定义提示文字
	        trigger: 'item',
	        backgroundColor: '#fff',
	        textStyle: {
	            color: '#999'
	        },
	        formatter: (item) => {
	            if (item.data[1]) {

	            }
	        }
	    },
	    xAxis: [{  //====> 定义横轴
	        gridIndex: 0,
	        type: 'value',
	        show: false,
	        min: 0,
	        max: 100,
	        nameLocation: 'start',
	        nameGap: 0


	    }],
	    yAxis: [{ //====>  定义纵轴
	        gridIndex: 0,
	        min: 0,
	        show: false,
	        max: 100,
	        nameLocation: 'start',
	        nameGap:0
	    }],
	    series: [  //====>  定义数据模块
	        {
	            name: '弱相关',
	            type: 'scatter',
	            xAxisIndex: 0,
	            yAxisIndex: 0,
	            symbol: 'circle',
	            symbolSize: 100,
	            label: {
	                normal: {
	                    show: true,
	                    textStyle: {
	                        fontSize: '20'
	                    },
	                    formatter: function(param) {
	                        return param.data[2];
	                    },
	                },

	            },


	            itemStyle: {
	                normal: {
	                    color: '#208c7f'
	                }
	            },
	            data: [
	                [50, 50, '手机', '#208c7f']

	            ],
	            markLine: markLineOpt
	        },
	        Object.assign({}, bg, {
	            radius: ['0%', '40%'],
	            itemStyle: {
	                normal: {
	                    color: '#1d8075',
	                },
	                emphasis: {
	                    color: '#1d8075',
	                }
	            }
	        }),
	        Object.assign({}, bg, {
	            radius: ['39%', '70%'],
	            itemStyle: {
	                normal: {
	                    color: '#186f70',
	                },
	                emphasis: {
	                    color: '#186f70',
	                }
	            }
	        }),
	        Object.assign({}, bg, {
	            radius: ['68%', '100%'],
	            itemStyle: {
	                normal: {
	                    color: '#146268',
	                },
	                emphasis: {
	                    color: '#146268',
	                }
	            }
	        })

	    ]
	};	

// 取关联值的函数
function getValue(begin, end, scale) {
					
	{		
		var dVal = end - begin;
		
		scale = mul(add(scale, 1), 100);		
		//计算0.01对应的值（-1至1为2, 所以使用end与begin的差除以200即为0.01的值）
		var part = div(dVal, 200);		
		return add(mul(scale, part), begin).toFixed(2);		
	};	
}

// result后台数据
function relation(result){
  
	$("#month_average_text").val(result.consumeDate);
  
  // console.log(datalist[1])
  	var  color=["#e9bc45","#22b6f2","#fc7aa8","#42be80","#d35556","#a463f0","#526897"];
	var datalist = [
	    /**
	     * x坐标 
	     * y坐标 
	     * name 标签名称
	     * 颜色
	     */	  
	    // [85, 90, '小米',"#fe8463"],
	    // [50, 115, '360',"#fe8463"],
	    // [72, 83, '定位',"#fe8463"],
	    // [47, 110, '下载',"#f00"]

	]
	//学习能力方法
	function gradeMethod(result){
		for(var i=0;i<result.assAnalyList.length;i++){
			if(result.assAnalyList[i].aName=="信用度"){
				datalist[0]=[];
				datalist[0][0]=getValue(0,30,result.assAnalyList[i].correlation);
	            datalist[0][1]=50;
	            datalist[0][2]=result.assAnalyList[i].aName;
			}if(result.assAnalyList[i].bName=="信用度"){
				datalist[0]=[];
				datalist[0][0]=getValue(0,30,result.assAnalyList[i].correlation);
	            datalist[0][1]=50;
	            datalist[0][2]=result.assAnalyList[i].bName;
	            datalist[0][3]=color[0];
			}
			if(result.assAnalyList[i].aName=="阅读广泛度"){
				 datalist[1]=[];
	            datalist[1][0]=getValue(70,140,result.assAnalyList[i].correlation);
	            datalist[1][1]=50;
	            datalist[1][2]=result.assAnalyList[i].aName;
	            datalist[1][3]=color[1];
			}if(result.assAnalyList[i].bName=="阅读广泛度"){
				datalist[1]=[];
	            datalist[1][0]=getValue(70,140,result.assAnalyList[i].correlation);
	            datalist[1][1]=50;
	            datalist[1][2]=result.assAnalyList[i].bName;
	            datalist[1][3]=color[1];
			}
			if(result.assAnalyList[i].aName=="学生阅读能力"){
				  datalist[2]=[];
	              datalist[2][0]=50;
	              datalist[2][1]=getValue(70,140,result.assAnalyList[i].correlation);
	              datalist[2][2]=result.assAnalyList[i].aName;
	              datalist[2][3]=color[2];

			}if(result.assAnalyList[i].bName=="学生阅读能力"){
				  datalist[2]=[];
	              datalist[2][0]=50;
	              datalist[2][1]=getValue(70,140,result.assAnalyList[i].correlation);
	              datalist[2][2]=result.assAnalyList[i].bName;
	              datalist[2][3]=color[2];

			}
			if(result.assAnalyList[i].aName=="个人卫生"){
				
				  datalist[3]=[];
	              datalist[3][0]=50;
	              datalist[3][1]=getValue(0,30,result.assAnalyList[i].correlation);
	              datalist[3][2]=result.assAnalyList[i].aName;
	              datalist[3][3]=color[3];

			}if(result.assAnalyList[i].bName=="个人卫生"){
				
				  datalist[3]=[];
	              datalist[3][0]=50;
	              datalist[3][1]=getValue(0,30,result.assAnalyList[i].correlation);
	              datalist[3][2]=result.assAnalyList[i].bName;
	              datalist[3][3]=color[3];

			}
			if(result.assAnalyList[i].aName=="上网时长"){
				 datalist[4]=[];
		            datalist[4][0]=getValue(0,30,result.assAnalyList[i].correlation);
		            datalist[4][1]=100-parseInt(getValue(0,30,result.assAnalyList[i].correlation));
		            datalist[4][2]=result.assAnalyList[i].aName;
		            datalist[4][3]=color[4];
			}if(result.assAnalyList[i].bName=="上网时长"){
				     datalist[4]=[];
		            datalist[4][0]=getValue(0,30,result.assAnalyList[i].correlation);
		            datalist[4][1]=100-parseInt(getValue(0,30,result.assAnalyList[i].correlation));
		            datalist[4][2]=result.assAnalyList[i].bName;
		            datalist[4][3]=color[4];

			}
			if(result.assAnalyList[i].aName=="细心程度"){
				 	datalist[5]=[];
		            datalist[5][1]=getValue(0,30,result.assAnalyList[i].correlation);
		            datalist[5][0]=100-parseInt(getValue(0,30,result.assAnalyList[i].correlation));
		            datalist[5][2]=result.assAnalyList[i].aName;
		            datalist[5][3]=color[5];

			}if(result.assAnalyList[i].bName=="细心程度"){
				    datalist[5]=[];
		            datalist[5][1]=getValue(0,30,result.assAnalyList[i].correlation);
		            datalist[5][0]=100-parseInt(getValue(0,30,result.assAnalyList[i].correlation));
		            datalist[5][2]=result.assAnalyList[i].bName;
		            datalist[5][3]=color[5];

			}
			if(result.assAnalyList[i].aName=="消费能力"){
				datalist[6]=[];
	            datalist[6][0]=getValue(70,110,result.assAnalyList[i].correlation);
	            datalist[6][1]=getValue(70,110,result.assAnalyList[i].correlation);
	            datalist[6][2]=result.assAnalyList[i].aName;
	            datalist[6][3]=color[6];

			}if(result.assAnalyList[i].bName=="消费能力"){
				datalist[6]=[];
	            datalist[6][0]=getValue(70,110,result.assAnalyList[i].correlation);
	            datalist[6][1]=getValue(70,110,result.assAnalyList[i].correlation);
	            datalist[6][2]=result.assAnalyList[i].bName;
	            datalist[6][3]=color[6];

			}	
		}
	}
	
	//信用度方法
	function creditMethod(result){
		for(var i=0;i<result.assAnalyList.length;i++){
			if(result.assAnalyList[i].aName=="学习能力"){
				datalist[0]=[];
				datalist[0][0]=getValue(0,30,result.assAnalyList[i].correlation);
	            datalist[0][1]=50;
	            datalist[0][2]=result.assAnalyList[i].aName;
	            datalist[0][3]=color[0];
			}if(result.assAnalyList[i].bName=="学习能力"){
				datalist[0]=[];
				datalist[0][0]=getValue(0,30,result.assAnalyList[i].correlation);
	            datalist[0][1]=50;
	            datalist[0][2]=result.assAnalyList[i].bName;
	            datalist[0][3]=color[0];
			}
			if(result.assAnalyList[i].aName=="消费能力"){
				 datalist[1]=[];
	            datalist[1][0]=getValue(70,120,   result.assAnalyList[i].correlation);
	            datalist[1][1]=50;
	            datalist[1][2]=result.assAnalyList[i].aName;
	            datalist[1][3]=color[1];
			}if(result.assAnalyList[i].bName=="消费能力"){
				datalist[1]=[];
	            datalist[1][0]=getValue(70,120,result.assAnalyList[i].correlation);
	            datalist[1][1]=50;
	            datalist[1][2]=result.assAnalyList[i].bName;
	            datalist[1][3]=color[1];
			}
			if(result.assAnalyList[i].aName=="学生阅读能力"){
				  datalist[2]=[];
	              datalist[2][0]=50;
	              datalist[2][1]=getValue(70,120,result.assAnalyList[i].correlation);
	              datalist[2][2]=result.assAnalyList[i].aName;
	              datalist[2][3]=color[2];

			}if(result.assAnalyList[i].bName=="学生阅读能力"){
				  datalist[2]=[];
	              datalist[2][0]=50;
	              datalist[2][1]=getValue(70,120,result.assAnalyList[i].correlation);
	              datalist[2][2]=result.assAnalyList[i].bName;
	              datalist[2][3]=color[2];
			}
			if(result.assAnalyList[i].aName=="阅读广泛度"){			
				  datalist[3]=[];
	              datalist[3][0]=50;
	              datalist[3][1]=getValue(0,30,result.assAnalyList[i].correlation);
	              datalist[3][2]=result.assAnalyList[i].aName;
	              datalist[3][3]=color[3];

			}if(result.assAnalyList[i].bName=="阅读广泛度"){
				
				  datalist[3]=[];
	              datalist[3][0]=50;
	              datalist[3][1]=getValue(0,30,result.assAnalyList[i].correlation);
	              datalist[3][2]=result.assAnalyList[i].bName;
	              datalist[3][3]=color[3];
			}
			if(result.assAnalyList[i].aName=="上网时长"){
				 datalist[4]=[];
		            datalist[4][0]=getValue(0,30,result.assAnalyList[i].correlation);
		            datalist[4][1]=100-parseInt(getValue(0,30,result.assAnalyList[i].correlation));
		            datalist[4][2]=result.assAnalyList[i].aName;
		            datalist[4][3]=color[4];
			}if(result.assAnalyList[i].bName=="上网时长"){
				     datalist[4]=[];
		            datalist[4][0]=getValue(0,30,result.assAnalyList[i].correlation);
		            datalist[4][1]=100-parseInt(getValue(0,30,result.assAnalyList[i].correlation));
		            datalist[4][2]=result.assAnalyList[i].bName;
		            datalist[4][3]=color[4];

			}
		}
	}
	
	//消费能力方法
	function coumstMethod(result){
		for(var i=0;i<result.assAnalyList.length;i++){
			if(result.assAnalyList[i].aName=="学习能力"){
				datalist[0]=[];
				datalist[0][0]=getValue(0,30,result.assAnalyList[i].correlation);
	            datalist[0][1]=50;
	            datalist[0][2]=result.assAnalyList[i].aName;
	            datalist[0][3]=color[0];
			}if(result.assAnalyList[i].bName=="学习能力"){
				datalist[0]=[];
				datalist[0][0]=getValue(0,30,result.assAnalyList[i].correlation);
	            datalist[0][1]=50;
	            datalist[0][2]=result.assAnalyList[i].bName;
	            datalist[0][3]=color[0];
			}if(result.assAnalyList[i].aName=="学生阅读能力"){
				 datalist[1]=[];
		            datalist[1][0]=getValue(70,120,   result.assAnalyList[i].correlation);
		            datalist[1][1]=50;
		            datalist[1][2]=result.assAnalyList[i].aName;
		            datalist[1][3]=color[1];
				}if(result.assAnalyList[i].bName=="学生阅读能力"){
					datalist[1]=[];
		            datalist[1][0]=getValue(70,120,result.assAnalyList[i].correlation);
		            datalist[1][1]=50;
		            datalist[1][2]=result.assAnalyList[i].bName;
		            datalist[1][3]=color[1];
				}
				if(result.assAnalyList[i].aName=="阅读广泛度"){
					  datalist[2]=[];
		              datalist[2][0]=50;
		              datalist[2][1]=getValue(70,120,result.assAnalyList[i].correlation);
		              datalist[2][2]=result.assAnalyList[i].aName;
		              datalist[2][3]=color[2];

				}if(result.assAnalyList[i].bName=="阅读广泛度"){
					  datalist[2]=[];
		              datalist[2][0]=50;
		              datalist[2][1]=getValue(70,120,result.assAnalyList[i].correlation);
		              datalist[2][2]=result.assAnalyList[i].bName;
		              datalist[2][3]=color[2];

				}
				if(result.assAnalyList[i].aName=="上网时长"){
					
					  datalist[3]=[];
		              datalist[3][0]=50;
		              datalist[3][1]=getValue(0,30,result.assAnalyList[i].correlation);
		              datalist[3][2]=result.assAnalyList[i].aName;
		              datalist[3][3]=color[3];

				}if(result.assAnalyList[i].bName=="上网时长"){
					
					  datalist[3]=[];
		              datalist[3][0]=50;
		              datalist[3][1]=getValue(0,30,result.assAnalyList[i].correlation);
		              datalist[3][2]=result.assAnalyList[i].bName;
		              datalist[3][3]=color[3];

				}
			
			
		}
	}
	
	//阅读能力方法
	function readMethod(result){
		for(var i=0;i<result.assAnalyList.length;i++){
			if(result.assAnalyList[i].aName=="学习能力"){
				datalist[0]=[];
				datalist[0][0]=getValue(0,30,result.assAnalyList[i].correlation);
	            datalist[0][1]=50;
	            datalist[0][2]=result.assAnalyList[i].aName;
	            datalist[0][3]=color[0];
			}if(result.assAnalyList[i].bName=="学习能力"){
				datalist[0]=[];
				datalist[0][0]=getValue(0,30,result.assAnalyList[i].correlation);
	            datalist[0][1]=50;
	            datalist[0][2]=result.assAnalyList[i].bName;
	            datalist[0][3]=color[0];
			}if(result.assAnalyList[i].aName=="消费能力"){
				 datalist[1]=[];
		            datalist[1][0]=getValue(70,120,   result.assAnalyList[i].correlation);
		            datalist[1][1]=50;
		            datalist[1][2]=result.assAnalyList[i].aName;
		            datalist[1][3]=color[1];
				}if(result.assAnalyList[i].bName=="消费能力"){
					datalist[1]=[];
		            datalist[1][0]=getValue(70,120,result.assAnalyList[i].correlation);
		            datalist[1][1]=50;
		            datalist[1][2]=result.assAnalyList[i].bName;
		            datalist[1][3]=color[1];
				}
				if(result.assAnalyList[i].aName=="健康程度"){
					  datalist[2]=[];
		              datalist[2][0]=50;
		              datalist[2][1]=getValue(70,120,result.assAnalyList[i].correlation);
		              datalist[2][2]=result.assAnalyList[i].aName;
		              datalist[2][3]=color[2];

				}if(result.assAnalyList[i].bName=="健康程度"){
					  datalist[2]=[];
		              datalist[2][0]=50;
		              datalist[2][1]=getValue(70,120,result.assAnalyList[i].correlation);
		              datalist[2][2]=result.assAnalyList[i].bName;
		              datalist[2][3]=color[2];

				}
				if(result.assAnalyList[i].aName=="细心程度"){
					
					  datalist[3]=[];
		              datalist[3][0]=50;
		              datalist[3][1]=getValue(0,30,result.assAnalyList[i].correlation);
		              datalist[3][2]=result.assAnalyList[i].aName;
		              datalist[3][3]=color[3];

				}if(result.assAnalyList[i].bName=="细心程度"){
					
					  datalist[3]=[];
		              datalist[3][0]=50;
		              datalist[3][1]=getValue(0,30,result.assAnalyList[i].correlation);
		              datalist[3][2]=result.assAnalyList[i].bName;
		              datalist[3][3]=color[3];

				}
			
			
		}
	}
	
	//上网时长方法
	function onlineMethod(result){
		for(var i=0;i<result.assAnalyList.length;i++){
			if(result.assAnalyList[i].aName=="学习能力"){
				datalist[0]=[];
				datalist[0][0]=getValue(0,30,result.assAnalyList[i].correlation);
	            datalist[0][1]=50;
	            datalist[0][2]=result.assAnalyList[i].aName;
	            datalist[0][3]=color[0];
				console.log(datalist[0][0])
			}if(result.assAnalyList[i].bName=="学习能力"){
				datalist[0]=[];
				datalist[0][0]=getValue(0,30,result.assAnalyList[i].correlation);
	            datalist[0][1]=50;
	            datalist[0][2]=result.assAnalyList[i].bName;
	            datalist[0][3]=color[0];
			}if(result.assAnalyList[i].aName=="消费能力"){
				 datalist[1]=[];
		            datalist[1][0]=getValue(70,120,   result.assAnalyList[i].correlation);
		            datalist[1][1]=50;
		            datalist[1][2]=result.assAnalyList[i].aName;
		            datalist[1][3]=color[1];
				}if(result.assAnalyList[i].bName=="消费能力"){
					datalist[1]=[];
		            datalist[1][0]=getValue(70,120,result.assAnalyList[i].correlation);
		            datalist[1][1]=50;
		            datalist[1][2]=result.assAnalyList[i].bName;
		            datalist[1][3]=color[1];
				}
				if(result.assAnalyList[i].aName=="健康程度"){
					  datalist[2]=[];
		              datalist[2][0]=50;
		              datalist[2][1]=getValue(70,120,result.assAnalyList[i].correlation);
		              datalist[2][2]=result.assAnalyList[i].aName;
		              datalist[2][3]=color[2];

				}if(result.assAnalyList[i].bName=="健康程度"){
					  datalist[2]=[];
		              datalist[2][0]=50;
		              datalist[2][1]=getValue(70,120,result.assAnalyList[i].correlation);
		              datalist[2][2]=result.assAnalyList[i].bName;
		              datalist[2][3]=color[2];

				}
				if(result.assAnalyList[i].aName=="细心程度"){
					
					  datalist[3]=[];
		              datalist[3][0]=50;
		              datalist[3][1]=getValue(0,30,result.assAnalyList[i].correlation);
		              datalist[3][2]=result.assAnalyList[i].aName;
		              datalist[3][3]=color[3];

				}if(result.assAnalyList[i].bName=="细心程度"){
					
					  datalist[3]=[];
		              datalist[3][0]=50;
		              datalist[3][1]=getValue(0,30,result.assAnalyList[i].correlation);
		              datalist[3][2]=result.assAnalyList[i].bName;
		              datalist[3][3]=color[3];

				}
			
			
		}
	}
	
	//健康方法
	function heathyMethod(result){
		for(var i=0;i<result.assAnalyList.length;i++){
			if(result.assAnalyList[i].aName=="学习能力"){
				datalist[0]=[];
				datalist[0][0]=getValue(0,30,result.assAnalyList[i].correlation);
	            datalist[0][1]=50;
	            datalist[0][2]=result.assAnalyList[i].aName;
	            datalist[0][3]=color[0];
				console.log(datalist[0][0])
			}if(result.assAnalyList[i].bName=="学习能力"){
				datalist[0]=[];
				datalist[0][0]=getValue(0,30,result.assAnalyList[i].correlation);
	            datalist[0][1]=50;
	            datalist[0][2]=result.assAnalyList[i].bName;
	            datalist[0][3]=color[0];
			}if(result.assAnalyList[i].aName=="学生阅读能力"){
				 datalist[1]=[];
		            datalist[1][0]=getValue(70,120,   result.assAnalyList[i].correlation);
		            datalist[1][1]=50;
		            datalist[1][2]=result.assAnalyList[i].aName;
		            datalist[1][3]=color[1];
				}if(result.assAnalyList[i].bName=="学生阅读能力"){
					datalist[1]=[];
		            datalist[1][0]=getValue(70,120,result.assAnalyList[i].correlation);
		            datalist[1][1]=50;
		            datalist[1][2]=result.assAnalyList[i].bName;
		            datalist[1][3]=color[1];
				}
				if(result.assAnalyList[i].aName=="上网时长"){
					  datalist[2]=[];
		              datalist[2][0]=50;
		              datalist[2][1]=getValue(70,120,result.assAnalyList[i].correlation);
		              datalist[2][2]=result.assAnalyList[i].aName;
		              datalist[2][3]=color[2];

				}if(result.assAnalyList[i].bName=="上网时长"){
					  datalist[2]=[];
		              datalist[2][0]=50;
		              datalist[2][1]=getValue(70,120,result.assAnalyList[i].correlation);
		              datalist[2][2]=result.assAnalyList[i].bName;
		              datalist[2][3]=color[2];

				}
				if(result.assAnalyList[i].aName=="个人卫生"){
					
					  datalist[3]=[];
		              datalist[3][0]=50;
		              datalist[3][1]=getValue(0,30,result.assAnalyList[i].correlation);
		              datalist[3][2]=result.assAnalyList[i].aName;
		              datalist[3][3]=color[3];

				}if(result.assAnalyList[i].bName=="个人卫生"){
					
					  datalist[3]=[];
		              datalist[3][0]=50;
		              datalist[3][1]=getValue(0,30,result.assAnalyList[i].correlation);
		              datalist[3][2]=result.assAnalyList[i].bName;
		              datalist[3][3]=color[3];

				}if(result.assAnalyList[i].aName=="细心程度"){
					 datalist[4]=[];
			            datalist[4][0]=getValue(0,30,result.assAnalyList[i].correlation);
			            datalist[4][1]=100-parseInt(getValue(0,30,result.assAnalyList[i].correlation));
			            datalist[4][2]=result.assAnalyList[i].aName;
			            datalist[4][3]=color[4];
				}if(result.assAnalyList[i].bName=="细心程度"){
					     datalist[4]=[];
			            datalist[4][0]=getValue(0,30,result.assAnalyList[i].correlation);
			            datalist[4][1]=100-parseInt(getValue(0,30,result.assAnalyList[i].correlation));
			            datalist[4][2]=result.assAnalyList[i].bName;
			            datalist[4][3]=color[4];

				}
			
			
		}
	}
	
	//整体判断用哪个方法
	if(result.assAnalyList)		
	  {
	  	if(result.assAnalyList.length!=0)
	  	{
	  		
			if(result.Aattribute==1){
				option.series[0].data[0][2]="学习能力";
				gradeMethod(result);
			}
			if(result.Aattribute==2){
				option.series[0].data[0][2]="消费能力";
				coumstMethod(result);
			}
			if(result.Aattribute==6){
				option.series[0].data[0][2]="阅读能力";
				readMethod(result);
			}
			if(result.Aattribute==8){
				option.series[0].data[0][2]="上网时长";
				onlineMethod(result);
			}
			if(result.Aattribute==9){
				option.series[0].data[0][2]="信用度";
				creditMethod(result);
			}
			if(result.Aattribute==11){
				option.series[0].data[0][2]="健康程度";
				heathyMethod(result);
			}
  	}
	  	
  }

	var dataMap = datalist.map((item) => {
	    return Object.assign({}, dot, {
	        symbolSize: 60,
	        itemStyle: {
	            normal: {
	                color: item[3]
	            },
	        },
	        data: [
	            item
	        ]
	    })
	});
	return dataMap;
}
	//动态加载数据	
	var $map=$("#relation");	
	//调用consumeAbilityList进行数据转换
	var json=relation(result);
		if(json==null||json=='')
		{
			$("#month_average_text").val(result.consumeDate);
			$(".relation_introduce").hide();
			$(".relation_strong").hide();
			$map.html("<div class='nodata'>暂无数据.....</div>");

		}else{	
			for(i=0;i<json.length;i++)
			{
				option.series.push(json[i])
			}	
			$(".relation_introduce").show();
			$(".relation_strong").show();	
			myChart=new echarts_Template($map[0],option);
		}

		
		/* 查询学生关联值变化 */

		var loading=new Loading();
		loading.init();
		var alert1=new Alert();		
		$("#relation_search").click(function(){
			overdue();
			var text=$("#month_average_text").val();
			if(text=="")
			{
				alert1.content="请选择年份！";
				alert1.init();
				alert1.show();				
			}else 
			{
				loading.show();
				var jsonStr={"consumeDate":text,"Aattribute":result.Aattribute};
				$.ajax({
		            type: "post",
					url: 'getGradeAssociationAnalysisByPost?jsonStr='+JSON.stringify(jsonStr),
		            success: function (result) {
		            	loading.hide();
		            	result = JSON.parse(result);
		            	var json=result.assAnalyList;
		            	if(json==null||json.length==0)
						{
							$map.html("<div class='nodata'>暂无数据.....</div>");
							$(".relation_introduce").hide();
							$(".relation_strong").hide();
						}else{
							$(".relation_introduce").show();
							$(".relation_strong").show();	
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



	