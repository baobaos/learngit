/*
 *@本js功能：选项卡功能封装
 *@本js作者：王昆宇
 *@编写时间：2017年1月18日
 */

function tab(arr,type){
	$(".tabbox>.tab>a").click(function(){

		var num=$(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		if(!arr)
		{
			 //overdue();
			$(".tabbox>.tabcontent>.box:eq("+num+")").fadeIn(400).siblings().hide();
		}else
		{
			if(type)
			{	
				// overdue();
				$(".tabbox>.tabcontent>.tabcontextbox:eq("+num+")").fadeIn(400,arr[num]).siblings().hide();
			}else {
				// overdue();
				$(".tabbox>.tabcontent>.box:eq("+num+")").fadeIn(400,arr[num]).siblings().hide();
			} 
		}
					
	});
}