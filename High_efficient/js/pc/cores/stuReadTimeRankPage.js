/* 
 *综合能力强群体分析js文件
 *创建人：孟令超
 *创建日期:2017/02/14
 **/
$(function() {

		//调用tab插件
		var arr=[function(){
		//动态加载数据				
		
		// window.location.href='getStuReadTimeRankAll?jsonStr={"pageNowOne":1,"pageSizeOne":10}';
	},function(){
		//动态加载数据			
	
		// window.location.href='getStuReadTimeRankMonth?jsonStr={"pageNowTwo":1,"pageSizeTwo":10}';
	}];
	tab(arr);
});
