$('.top>.middle>ul>li').eq(1).on('mouseover',function(){
	$(this).children('div').stop().fadeIn(300);
})
$('.top>.middle>ul>li').eq(1).on('mouseout',function(){
	$(this).children('div').stop().fadeOut(300);
})
//-------------------------------banner--------
lbt('lf', 'rt', 'dm')
var liw=document.getElementById('li').clientWidth;
function lbt(id1, id2, id3) {
	var lf1 = document.getElementById(id1)
	var ri1 = document.getElementById(id2)
	var timer;
	var dm = document.getElementById(id3)
	var dm1 = dm.children[0];
	var dm2 = dm1.children;
	var i = 0;
	var flag = true;
	
	lf1.onmouseover = function() {
		clearInterval(timer)
	}
	lf1.onmouseout = function() {
		timer = setInterval(scrollImg, 3000)
	}
	ri1.onmouseover = function() {
		clearInterval(timer)
	}
	ri1.onmouseout = function() {
		timer = setInterval(scrollImg, 3000)
	}

	lf1.onclick = function() {
		i++;
		if(i >= dm2.length) {
			i = dm2.length - 1;
		}
		animateImg(-i * liw, dm1)

	}
	ri1.onclick = function() {
		i--;
		if(i <= 0) {
			i = 0;
		}
		animateImg(-i * liw, dm1)

	}
	timer = setInterval(scrollImg, 3000)

	function scrollImg() {
		if(flag == true) {
			i++;
			if(i == (dm2.length - 1)) {
				flag = false
			}
			speed = -12
		} else {
			i--;
			if(i == 0) {
				flag = true
			}
			speed = 12
		}

		animateImg(-i * liw, dm1)
	}
	var timer1 = null;

	function animateImg(target, menu) { //,target1,menu1
		clearInterval(timer1)
		timer1 = setInterval(function() {
			var val = Math.abs(target - menu.offsetLeft)
			if(target > menu.offsetLeft) {
				speed = 12
			} else {
				speed = -12
			}
			menu.style.left = menu.offsetLeft + speed + 'px'
			if(val < Math.abs(speed)) {
				menu.style.left = target + 'px'
				clearInterval(timer1)
			}
		}, 10)
	}
}
//------------------------------------改变服务标准的图片
$('.content>.bottom>ul>li').eq(1).children('a').css('background-position','-148px 5px');
$('.content>.bottom>ul>li').eq(2).children('a').css('background-position','-272px 5px');
$('.content>.bottom>ul>li').eq(3).children('a').css('background-position','-380px 7px');
$('.content>.bottom>ul>li').eq(4).children('a').css('background-position','-8px -97px');
$('.content>.bottom>ul>li').eq(5).children('a').css('background-position','-148px -97px');
$('.content>.bottom>ul>li').eq(6).children('a').css('background-position','-266px -94px');
$('.content>.bottom>ul>li').eq(7).children('a').css('background-position','-388px -94px');
//------------------------------------服务标准的动效
var fwTop=$('.content-box>.content>.bottom>ul').offset().top;
//	-----------------------------------------------目的地
var mddTop=$('.content1>.middle>ul>.li').offset().top;
var mddTop1=$('.content1>.middle>ul>.li2').offset().top;
//	-----------------------------------------------热门线路
var rmlxTop=$('.content2>ul>.li').offset().top;
var rmlxTop1=$('.content2>ul>.li1').offset().top;
var pmHeight=$(window).height();
$(window).scroll(function(){
	var gzHeight=$(document).scrollTop();
	if((gzHeight+pmHeight)>=(fwTop)){
		$('.content-box>.content>.bottom>ul').css({"padding-top":0,'opacity':1});
	}
//	-----------------------------------------------目的地
	if(gzHeight>=fwTop){
		$('.content1>.middle>ul>.li1').css("overflow",'inherit');
		$('.content1>.middle>ul>.li>a').css({"margin-left":0,'opacity':1}).parent().siblings('.li1').children('a').css({"margin-left":0,'opacity':1});
	}
	if(gzHeight+200>=mddTop1){
		$('.content1>.middle>ul>.li2>a>span').css({"transform":'scale(3)','-webkit-transform':'scale(3)','opacity':1}).siblings('img').css({"transform":'scale(380,336)','-webkit-transform':'scale(380,336)','opacity':1})
	}
//	-----------------------------------------------热门线路
	if(gzHeight+100>=rmlxTop){
		$('.content2>ul>.li').css("overflow",'inherit');
		$('.content2>ul>.li').css({"left":0,'opacity':1});
	}
	if(gzHeight+50>=rmlxTop1){
		$('.content2>ul>.li1').css("overflow",'inherit');
		$('.content2>ul>.li1').css({"left":0,'opacity':1});
	}
})
//	-----------------------------------------------sidebar侧边固定栏
$('.sidebar-box>ul>li').on('mouseover',function(){
	$(this).children('div').css({'opacity':1,'right':'50px'})
}).on('mouseout',function(){
	$(this).children('div').css({'opacity':0,'right':'-240px'})
})
//         -------------回到顶部
	$('#fh').on('click',function() {
		var tim = setInterval(scrollTop, 60)
		function scrollTop() {
			//获取滚动条的滚动距离
			var gzHeight=$(document).scrollTop();
			var tims = gzHeight / 6;
			gzHeight = gzHeight - tims;
			if(gzHeight == 0) {
				clearInterval(tim)
			}
		}
	})