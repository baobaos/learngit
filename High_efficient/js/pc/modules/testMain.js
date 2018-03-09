/* 
 *框架页面js
 *创建人：邢智欣
 *创建日期:2017/04/27
 */

$(function() {
	
	//调用方法
	testLogin(arrIds,arrHrefs);
	
	function testLogin(arrIds,arrHrefs){
		for(var i = 0; i < arrIds.length; i++){
			$('#'+arrIds[i]).attr('href',arrHrefs[i]);
			$('#'+arrIds[i]).bind('click',function(){
				//判断cookie是否过期
				overdue();
			});
		}
		
	}
	
});