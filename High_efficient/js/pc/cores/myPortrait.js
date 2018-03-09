/* 
 *综合能力强群体分析js文件
 *创建人：孟令超
 *创建日期:2017/02/14
 *修改日期:2017/03/10 修改人：邢智欣  修改内容：更换学生类型图片，更换雷达图下面文字
 *@修改人：xzx     @修改时间：2017.4.27    @修改原因：frame框架跳转登陆页面跳转不出去    @修改位置或名称：交互事件添加cookie判断
 **/

$(function() {

	var Loading1 = new Loading(); // loadng 盒子初始化
	Loading1.init(); // 插入loading 盒子
	var Alert1 = new Alert(); //弹出盒子初始化
	var confirm1 = new Confirm(); // 确定取消盒子初始化
	if(result.portraitMsg!=null){
		
	$("#people_icon").hide();
	// 详情赋值
	$("#getMyPortraitDetail").attr('data_id',result.portraitMsg.userId);
	//学号赋值
	$("#userId").text("学号："+result.portraitMsg.userId);
	//姓名赋值
	$("#studensName").text("姓名："+result.portraitMsg.studensName);
	//性别赋值
	if(result.portraitMsg.studensSex=="1"){
		$("#studensSex").text("性别：女");
	}else if(result.portraitMsg.studensSex=="2"){
		$("#studensSex").text("姓名：男");
	}
	// 专业赋值
	$("#studensProfess").text("专业："+result.portraitMsg.studensClass);
	// 班级赋值
	$("#studensClass").text("班级："+result.portraitMsg.studensClass);
	// 学院赋值
	$("#studensCollege").text("学院："+result.portraitMsg.collegeValue);
	if(result.portraitMsg.studenClassCode=="1"){
		$("#studenClassCode").text("学生类型：学习优秀");
	}else if(result.portraitMsg.studenClassCode=="2"){
		$("#studenClassCode").text("学生类型：上网沉迷");
	}else if(result.portraitMsg.studenClassCode=="3"){
		$("#studenClassCode").text("学生类型：喜欢阅读");
	}else if(result.portraitMsg.studenClassCode=="4"){
		$("#studenClassCode").text("学生类型：普通");
	}
	
	


	if(result.portraitMsg.gradStuFlag!=undefined&&result.portraitMsg.gradStuFlag!=null){
		$("#people_icon").show();
		$("#jy").css("display","block");
		if(result.portraitMsg.gradStuFlag=="0"){// 高新
			if(result.portraitMsg.studensSex=="1"){//女
				$("#people_icon").attr("src","images/pc/icon_people_04.png");
			}else if(result.portraitMsg.studensSex=="2"){// 男
				$("#people_icon").attr("src","images/pc/icon_people_03.png");
			}
		}else if(result.portraitMsg.gradStuFlag=="1"){ //考研
			if(result.portraitMsg.studensSex=="1"){//女
				$("#people_icon").attr("src","images/pc/icon_people_06.png");
			}else if(result.portraitMsg.studensSex=="2"){// 男
				$("#people_icon").attr("src","images/pc/icon_people_05.png");
			}
		}else if(result.portraitMsg.gradStuFlag=="2"){ //毕业
			
			if(result.portraitMsg.studensSex=="1"){//女
				$("#people_icon").attr("src","images/pc/icon_people_02.png");
			}else if(result.portraitMsg.studensSex=="2"){// 男
				$("#people_icon").attr("src","images/pc/icon_people_01.png");
			}
		}
	}else{
		$("#people_icon").show();
		if(result.portraitMsg.studenClassCode=="1"){// 学习
			if(result.portraitMsg.studensSex=="1"){//女
				$("#people_icon").attr("src","images/pc/icon_people_12.png");
			}else if(result.portraitMsg.studensSex=="2"){// 男
				$("#people_icon").attr("src","images/pc/icon_people_11.png");
			}
		}else if(result.portraitMsg.studenClassCode=="2"){ //上网沉迷
			if(result.portraitMsg.studensSex=="1"){//女
				$("#people_icon").attr("src","images/pc/icon_people_10.png");
			}else if(result.portraitMsg.studensSex=="2"){// 男
				$("#people_icon").attr("src","images/pc/icon_people_09.png");
			}
		}else if(result.portraitMsg.studenClassCode=="3"){ // 阅读
			if(result.portraitMsg.studensSex=="1"){//女
				$("#people_icon").attr("src","images/pc/icon_people_12.png");
			}else if(result.portraitMsg.studensSex=="2"){// 男
				$("#people_icon").attr("src","images/pc/icon_people_11.png");
			}
		}else if(result.portraitMsg.studenClassCode=="4"){// 普通
			if(result.portraitMsg.studensSex=="1"){//女
				$("#people_icon").attr("src","images/pc/icon_people_08.png");
			}else if(result.portraitMsg.studensSex=="2"){// 男
				$("#people_icon").attr("src","images/pc/icon_people_07.png");
			}
		}	
		
	}
	
	//beforeGardeValues上一次成绩值，
	$("#beforeGardeValues").text(result.portraitMsg.beforeGardeValues);
	//beforeReadWidelyValues上一次阅读广泛度值，
	$("#beforeReadWidelyValues").text(result.portraitMsg.beforeReadWidelyValues);
	//beforeReadValues上一次阅读能力值，
	$("#beforeReadValues").text(result.portraitMsg.beforeReadValues);
	//beforeIntPreference上一次知识偏好值，
	$("#beforeIntPreference").text(result.portraitMsg.beforeIntPreference);
	//beforeOnlineValues上一次上网值，
	$("#beforeOnlineValues").text(result.portraitMsg.beforeOnlineValues);
	//beforeConsumeValues上一次消费值，
	$("#beforeConsumeValues").text(result.portraitMsg.beforeConsumeValues);
	//beforeMessValues上一次食堂值，
	$("#beforeMessValues").text(result.portraitMsg.beforeMessValues);
	//beforeSupermarketValues上一次超市值，
	$("#beforeSupermarketValues").text(result.portraitMsg.beforeSupermarketValues);
	//beforeHealthValues上一次健康值，
	$("#beforeHealthValues").text(result.portraitMsg.beforeHealthValues);
	//beforeCreditValues上一次信用值，
	$("#beforeCreditValues").text(result.portraitMsg.beforeCreditValues);
	//beforeHygieneValues上一次卫生值，
	$("#beforeHygieneValues").text(result.portraitMsg.beforeHygieneValues);
	//beforeCarefulValues上一次细心值,
	$("#beforeCarefulValues").text(result.portraitMsg.beforeCarefulValues); 
	
	//gardeChange：成绩变化,
	if(result.portraitMsg.gardeChange=="1"){
		$("#gardeChange").append('<img src="images/pc/icon_13.png">');
	}else if(result.portraitMsg.gardeChange=="2"){
		$("#gardeChange").append('<img src="images/pc/icon_14.png">');
	}
	//readWidelyChange：阅读广泛度变化,
	if(result.portraitMsg.readWidelyChange=="1"){
		$("#readWidelyChange").append('<img src="images/pc/icon_13.png">');
	}else if(result.portraitMsg.readWidelyChange=="2"){
		$("#readWidelyChange").append('<img src="images/pc/icon_14.png">');
	}
	//readChange阅读能力变化,
	if(result.portraitMsg.readChange=="1"){
		$("#readChange").append('<img src="images/pc/icon_13.png">');
	}else if(result.portraitMsg.readChange=="2"){
		$("#readChange").append('<img src="images/pc/icon_14.png">');
	}
	//intPreferenceChange知识偏好变化,
	if(result.portraitMsg.intPreferenceChange=="1"){
		$("#intPreferenceChange").append('<img src="images/pc/icon_13.png">');
	}else if(result.portraitMsg.intPreferenceChange=="2"){
		$("#intPreferenceChange").append('<img src="images/pc/icon_14.png">');
	}
	//onlineChange上网变化,
	if(result.portraitMsg.onlineChange=="1"){
		$("#onlineChange").append('<img src="images/pc/icon_13.png">');
	}else if(result.portraitMsg.onlineChange=="2"){
		$("#onlineChange").append('<img src="images/pc/icon_14.png">');
	}
	//consumeChange：消费变化,
	if(result.portraitMsg.consumeChange=="1"){
		$("#consumeChange").append('<img src="images/pc/icon_13.png">');
	}else if(result.portraitMsg.consumeChange=="2"){
		$("#consumeChange").append('<img src="images/pc/icon_14.png">');
	}
	//messChange：食堂消费变化,
	if(result.portraitMsg.messChange=="1"){
		$("#messChange").append('<img src="images/pc/icon_13.png">');
	}else if(result.portraitMsg.messChange=="2"){
		$("#messChange").append('<img src="images/pc/icon_14.png">');
	}
	//supermarketChange：超市消费变化,
	if(result.portraitMsg.supermarketChange=="1"){
		$("#supermarketChange").append('<img src="images/pc/icon_13.png">');
	}else if(result.portraitMsg.supermarketChange=="2"){
		$("#supermarketChange").append('<img src="images/pc/icon_14.png">');
	}
	//healthChange：健康变化,
	if(result.portraitMsg.healthChange=="1"){
		$("#healthChange").append('<img src="images/pc/icon_13.png">');
	}else if(result.portraitMsg.healthChange=="2"){
		$("#healthChange").append('<img src="images/pc/icon_14.png">');
	}
	//creditChange：信用变化,
	if(result.portraitMsg.creditChange=="1"){
		$("#creditChange").append('<img src="images/pc/icon_13.png">');
	}else if(result.portraitMsg.creditChange=="2"){
		$("#creditChange").append('<img src="images/pc/icon_14.png">');
	}
	//hygieneChange：卫生变化,
	if(result.portraitMsg.hygieneChange=="1"){
		$("#hygieneChange").append('<img src="images/pc/icon_13.png">');
	}else if(result.portraitMsg.hygieneChange=="2"){
		$("#hygieneChange").append('<img src="images/pc/icon_14.png">');
	}
	//carefulChange：细心变化
	if(result.portraitMsg.carefulChange=="1"){
		$("#carefulChange").append('<img src="images/pc/icon_13.png">');
	}else if(result.portraitMsg.carefulChange=="2"){
		$("#carefulChange").append('<img src="images/pc/icon_14.png">');
	}
	
	
	
	var myChart=null;//雷达图

    indicatorData = [{
            name: '成绩',
            max: 100
        }, {
            name: '消费',
            max: 100
        }, {
            name: '上网',
            max: 100
        }, {
            name: '信用',
            max: 100
        }, {
            name: '阅读',
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
    	   data: ["本月综合能力值","全校综合能力平均值"],
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
            name: '本月综合能力值',
            type: 'radar',           
            data:  [[0, 0, 0, 0, 0]],
            areaStyle: {
                normal: {
                    color: '#1f9e7e',
                    opacity: 0.5
                }
            }
        },{
            name: '全校综合能力平均值',
            type: 'radar',           
            data:  [[0, 0, 0, 0, 0]],
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


//数据加载

var $map=$("#consumption_ranking");

if(result.portraitMsg==null)
{
	$map.html("<div class='nodata'>暂无数据.....</div>");		
}else {
	/* name: '成绩',
            max: 100
        }, {
            name: '消费',
            max: 100
        }, {
            name: '上网',
            max: 100
        }, {
            name: '信用',
            max: 100
        }, {
            name: '阅读',
            max: 100
        },*/
	//柱状图加载
	option.series[0].data[0][0]=result.portraitMsg.gardeValues;
    option.series[0].data[0][1]=result.portraitMsg.consumeValues;
    option.series[0].data[0][2]=result.portraitMsg.onlineValues;
    option.series[0].data[0][3]=result.portraitMsg.creditValues;
    option.series[0].data[0][4]=result.portraitMsg.readValues;
    option.title.text=result.portraitMsg.compreValues+"分";	
    
    option.series[1].data[0][0]=result.portraitMsg.gardeAvgValues;
    option.series[1].data[0][1]=result.portraitMsg.consumeAvgValues;
    option.series[1].data[0][2]=result.portraitMsg.onlineAvgValues;
    option.series[1].data[0][3]=result.portraitMsg.creditAvgValues;
    option.series[1].data[0][4]=result.portraitMsg.readAvgValues;
    option.title.text=result.portraitMsg.compreValues+"分";	
    
	myChart=new echarts_Template($map[0],option,"pie");	
}
    //画像时间
	$("#dataDate").text("画像时间："+result.portraitMsg.dataDate);
	var newDataDate=result.portraitMsg.dataDate.split("-");
	$("#pysj").text(newDataDate[0]+"年"+newDataDate[1]+"月");
	 //评语
	$("#py").text("评语："+result.portraitMsg.remarkMsg);
	// 模糊查询
	
	
	$("#getMyPortraitDetail").click(function() {
		//判断cookie是否过期
		overdue();
		Loading1.show();
		var userId2 = Number($("#getMyPortraitDetail").attr("data_id"));
		var url2 = encodeURIComponent('{"userId":"' + userId2 + '"}');
		window.location.href = 'getMyPortraitDetail?jsonStr=' + url2;
	});
	}else{
		$("#people_icon").hide();
	}
	
	$("#month_average_search").click(function() {
		//判断cookie是否过期
		overdue();
		Loading1.show();
		var userId = Number($("#month_average_text_id").val());
		var url = encodeURIComponent('{"userId":"' + userId + '"}');
		window.location.href = 'getMyPortrait?jsonStr=' + url;
	});
});