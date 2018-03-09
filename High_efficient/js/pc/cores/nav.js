/*
 *@本js功能：导航加载页面功能
 *@本js作者：王昆宇
 *@编写时间：2017年1月17日
 */
$(".dropdown-toggle").click(function(){
    $(this).addClass('active').next('ul').slideDown(400);
    $(this).parents().siblings().children('.dropdown-toggle').removeClass("active").next('ul').slideUp(400);
});

$(function(){
	var confirm1 = new Confirm(); // 确定取消盒子初始化
    var bodyheight = $(window).height();
    $(".iframemain").height(bodyheight-85);
    $("#out").click(function(){
    	confirm1.content = "是否退出登录？";
    	confirm1.success = function() {
			window.location.href = 'login.html';
		};
		confirm1.init();
		confirm1.show();    
    });
});