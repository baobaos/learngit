 
	
/*
 * @JS说明:用于部门内部前端规范演示
 * @作者：孟令超
 * @创建日期：2016年11月4日
 * @功能说明：1封装按条件查询返回结果，查询后生成表格  2进入页面后生成自动生成表格   3翻页后生成表格
 */
 
 
 /*
  * Ajax 函数  执行ajax方法 异步返回数据
  * Ajax.request(url,{ 
  *      async   是否异步 true(默认) 
  *      type  请求方式 GET or POST(默认) 
  *      data    请求参数 (键值对字符串) 
  *      dataType请求数据类型 默认json格式
  *      success 请求成功后响应函数，参数为 jsonData 
  *      error 请求失败后响应函数，参数为jsonError 
  * }); 
  * 
  */
var Ajax = function() {
		function request(url, opt) {
			
			//创建默认成功方法
			function Success() {    
				console.info("成功")
			};
			
            //创建默认失败方法  
			function Error() {     
				console.info("失败")
			};
			
			/***********配置默认参数*****************/
			var async = opt.async !== true,   
				type = opt.type || 'post',
				data = opt.data || null,
				dataType = opt.dataType || 'json',
				success = opt.success || Success,
				error = opt.error || Error; 
			/***********配置默认参数*****************/  
			
			//判断是否用get方式请求
			if (type == 'GET' && data) {      
				
				//拼接参数和地址栏
				url += (url.indexOf('?') == -1 ? '?' : '&') + data; 
				
				// 清空data 防止 get方式提交 data存在数据 出问题
				data = null;  
			}
			
			// 调用ajax方法  传递参数
			_onStateChange(async, type, data, success, error, url, dataType);  
		}

		function _onStateChange(async, type, data, success, error, url, dataType) {
			$.ajax({
				type: type,
				data: data,
				async: async,
				url: url,
				dataType: dataType,
				success: function(jsonData) {
					console.info(jsonData)
					// 绑定成功方法  返回数据
					success(jsonData);   
				},
				error: function(jsonError) {
					// 绑定error方法  返回数据
					error(jsonError);  
					          
				}
			});
		}
		return {
			// 让外部可以调用request 方法
			request: request  
		};
	}();

/* eachTable 函数  用于生成基础表格
 *
 * json格式 var json = {"content": [{"姓名": "孟令超","用户名": "mlc","密码": "123"},{"姓名": "李辛","用户名": "lx","密码": "456"}]}
 *
 * eachTable.judgArray(JsonData, tableId, pageNum, noData) ****************调用方法
 *
 * JsonData *********   数据源格式如上
 *
 * tableId  *********   table标签的id
 *
 * pageNum  *********   显示第几页的数据  PS:现在这个版本 每页默认10条  默认加载第一页
 *
 * noData   *********   JsonData 没有值的调用方法
 */

var eachTable = function() {
		function judgArray(JsonData, tableId, pageNum, noData) {
			//创建默认无数据方法
			function noDatafn() {
				console.info("当前没有查询结果！")
			};
			/***********配置默认参数*****************/  
			var nodata  = noData  || noDatafn,
				pagenum = pageNum || 1;
			/***********配置默认参数*****************/  
			
			/***************判断数据是否存在如果存在调用加载数据的方法，如果不存在调用无数据方法****************/	
			(JsonData == null || JsonData == "" || JsonData == "undefined") ? nodata() : eachJsonFn(JsonData, tableId, pagenum);
		}

		function eachJsonFn(JsonData, tableId, pagenum) {
			var tableHtml = '<thead><tr>'
			var titleName = JsonData.content[0];
			//循环数据 生成表格的表头
			$.each(titleName, function(name, val) {
				tableHtml += '<th class="head0">' + name + '</th>';
			})
			tableHtml += '</tr></thead><tbody>';
			//循环数据 生成 表格没行的内容
			for (var i = (pagenum - 1) * 10; i < (pagenum - 1) * 10 + 10; i++) {
				
				var content_name = JsonData.content[i];
				tableHtml += '<tr class="gradeX">';
				$.each(content_name, function(name, val) {
					tableHtml += '<td>' + val + '</td>';
				})
				tableHtml += '</tr>';
			}
			tableHtml += '</tbody>';
			//添加到页面
			$("#" + tableId).html(tableHtml);
		}
		return {
			//暴露judgArray方法给外部调用
			judgArray: judgArray
		};
	}(); 