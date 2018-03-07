$(function(){
imgscrool('#ban1');
imgscrool('#ban2');


var hei1=$(".set_bot").offset().top
$(window).scroll(function(){
		 t=$(document).scrollTop();
		 if(t>327){
		 	$(".art_mid_top").animate({"top":"100px"},500)
		 }
		 if(t>450){
		 	$(".art_mid_bot").animate({"top":"300px"},500)
		 }
		 if(t>1000){
		 	$(".set_mid_so1").animate({"left":"0"},500)
		 	$(".set_mid_so2").animate({"right":"0"},500)
		 }
		 if(t>1345){
		 	$(".set_mid_so3").animate({"bottom":"0"},500)
		 	$(".set_mid_so4").animate({"bottom":"0"},500)
		 	$(".set_mid_so5").animate({"bottom":"0"},500)
		 }
		 if(t>2000){
		 $(".part_son").animate({"width":"0"},500)
		 }
		  if(t>2600){
		 $(".part_son_op").animate({"width":"0"},500)
		 }
		});

$(".fix_img").click(function(){
	$(".fixet").hide();$(".fixe").hide()
})
$(".fast").click(function(){
	$(".fixet").show();$(".fixe").show()
})


})

//这是函数
function imgscrool(obj){
	
	 var widt=document.documentElement.clientWidth
	 $(".banner").css("width",widt+"px")
	 var widr=6*widt
	 $(".banner .img").css("width",widr+"px")
	 $(".banner .img li").css("width",widt+"px")
	 $("#set").css("width",widt+"px")
	var moving = false;		
//	var width = $(obj+" .banner .img img").width();
	var width=widt
	var i=0;
	var clone=$(obj+" .banner .img li").first().clone();
	$(obj+" .banner .img").append(clone);	
	var size=$(obj+" .banner .img li").size();	
	console.log(size)
	for(var j=0;j<size-1;j++){
		$(obj+" .banner .num").append("<li></li>");
	}
	$(obj+" .banner .num li").first().addClass("on");
	
	/*鼠标划入圆点*/
	if ($(obj+" .banner .num li")) {

	$(obj+" .banner .num li").click(function(){
		var index=$(this).index();
		i=index;
		$(obj+" .banner .img").stop().animate({left:-index*width},1000)	
		$(this).addClass("on").siblings().removeClass("on")		
	})
	};

		
	/*自动轮播*/
	var t=setInterval(function(){
		i++;
		move();
	},2000)
		
	/*对banner定时器的操作*/
	$(obj+" .banner").hover(function(){
		clearInterval(t);
	},function(){
		t=setInterval(function(){
			i++;
			move();
		},2000)
	})
	

	if ($(obj+" .banner .btn_l")) {

	/*向左的按钮*/
	$(obj+" .banner .btn_l").stop(true).click(function(){
	if(moving){
	return;
	};
	moving=true;
		i--
		move();	
	})
	
	/*向右的按钮*/
	$(obj+" .banner .btn_r").stop(true).click(function(){
	if(moving){
	return;
	}
	moving=true;
		i++
		move()				
	})
	
	

	};
	
	function move(){
		
		if(i==size){
			$(obj+" .banner  .img").css({left:0})			
			i=1;
		}
		
		// 修改轮播每屏宽度
		if(i==-1){
			$(obj+" .banner .img").css({left:-(size-1)*width})
			i=size-2;
		}	
		$(obj+" .banner .img").stop(true).delay(200).animate({left:-i*width},1000,function(){
			moving = false;
		})
		
		if(i==size-1){
			$(obj+" .banner .num li").eq(0).addClass("on").siblings().removeClass("on")	
		}else{		
			$(obj+" .banner .num li").eq(i).addClass("on").siblings().removeClass("on")	
		}
	}	
}	


		lisd.onclick=function(){
			    var timer=setInterval(function(){
			 	var height=document.body.scrollTop||document.documentElement.scrollTop
			 	var speed=height/10
			 	document.body.scrollTop=height-speed;
			    document.documentElement.scrollTop=height-speed;
			    if(height==0){
				 clearInterval(timer)
			    }
			 },60)
		}

