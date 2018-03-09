$(function(){
	// 测试代码。。。
	
	//  和测试异步加载方法
	Ajax.request('http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=郑州&day=0&dfc=3',{  
        data : '', 
		dataType :'json',
		async:true,
        success : function(jsonData){  
			
        },  
        error : function(jsonError){  
			
        }  
    } )
	
	// 加载页面方法
	eachTable.judgArray(json,"dyntable");
	
	
	/* 调用第三方插件 extendPagination.js 用于翻页
	 * totalCount 数据总长度
	 * limit  最多显示多少分页
	 * showCount 每个分页显示多少数据
	 */
	 
	var jsonLength=	json.content.length;
	$('#callBackPager').extendPagination({
            totalCount: jsonLength,
            showCount: 10,
            limit: 10,
            callback: function (curr) {
				eachTable.judgArray(json,"dyntable",curr);
            }
        });	
	})	