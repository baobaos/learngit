$('.top>.middle>ul>li').eq(1).on('mouseover',function(){
	$(this).children('div').stop().fadeIn(300);
})
$('.top>.middle>ul>li').eq(1).on('mouseout',function(){
	$(this).children('div').stop().fadeOut(300);
})


//	-----------------------------------------------sidebar侧边固定栏
$('.sidebar-box>ul>li').on('mouseover',function(){
	$(this).children('div').css({'opacity':1,'right':'50px'})
}).on('mouseout',function(){
	$(this).children('div').css({'opacity':0,'right':'-240px'})
})
//         -------------回到顶部
	$('#fh').on('click',function() {
		$('html,body').animate({scrollTop:0},'slow');
	});
	
$(".ksdz").on('click',function(){
	$(".srdz").slideDown();
});

$(".x").on('click',function(){
	$(".srdz").slideUp();
	$(".ksdz").css("display","none");
});