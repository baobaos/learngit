var bannerTop=$('.nav-box').offset().top;
var pmHeight=$(window).height();
$(window).scroll(function(){
	var gzHeight=$(document).scrollTop();
	if(gzHeight>=bannerTop){
		$('.nav').css({"position":'fixed','top':0});
	}else{
		$('.nav').css({"position":'absolute'});
	}

})
var timer
var dhzdwz1=document.getElementById('sidebar').children; //new4开始
var cbdh1=document.getElementById('sidebar-li').children;    //new4开始所对应的导航
for(var i=0;i<cbdh1.length;i++){
	cbdh1[i].index=i
	cbdh1[i].onclick=function(){
		djdh(dhzdwz1[this.index])
	}
}
function djdh(op){
	clearInterval(timer);
	timer = setInterval(dw, 5)
	function dw() {
		var new4Top = op.offsetTop-120
		var height = document.body.scrollTop || document.documentElement.scrollTop
		var speed = 0;
		if(height < new4Top) {
			speed = 20
		} else {
			speed = -20
		}
		if(Math.abs(new4Top - height) < 20) {
			clearInterval(timer);
			document.body.scrollHeight = new4Top;
			document.documentElement.scrollHeight = new4Top;
		} else {
			document.body.scrollTop = height + speed;
			document.documentElement.scrollTop = height + speed;
		}
	}
}
//-----------------------------------------------
$('#sidebar-li').children().eq(0).addClass('s');
$('#sidebar-li').children().eq(0).children('span').css('background-position','0 -250px');
$('#sidebar-li').children().eq(0).children('p').css('color','#fff');
$(window).scroll(function(){
	scroll1(0);
	scroll1(1);
	scroll1(2);
	scroll1(3);
	function scroll1(i){
		var gzHeight=$(document).scrollTop();
		var sidebarCh=$('#sidebar').children().eq(i);
		var sidebarChTop=sidebarCh.offset().top-140;
		if(gzHeight>=sidebarChTop){
			$('#sidebar-li').children().eq(i).addClass('s').siblings().removeClass('s');
			if(i==0){
				$('#sidebar-li').children().eq(i).children('span').css('background-position','0 -250px').parent().siblings().children('span').css('background-position','');
				$('#sidebar-li').children().eq(i).children('p').css('color','#fff').parent().siblings().children('p').css('color','');
			}else if(i==1){
				$('#sidebar-li').children().eq(i).children('span').css('background-position','0 -300px').parent().siblings().children('span').css('background-position','');
				$('#sidebar-li').children().eq(i).children('p').css('color','#fff').parent().siblings().children('p').css('color','');
			}else if(i==2){
				$('#sidebar-li').children().eq(i).children('span').css('background-position','0 -400px').parent().siblings().children('span').css('background-position','');
				$('#sidebar-li').children().eq(i).children('p').css('color','#fff').parent().siblings().children('p').css('color','');
			}else if(i==3){
				$('#sidebar-li').children().eq(i).children('span').css('background-position','0 -450px').parent().siblings().children('span').css('background-position','');
				$('#sidebar-li').children().eq(i).children('p').css('color','#fff').parent().siblings().children('p').css('color','');
			}

		}
	}
	
})