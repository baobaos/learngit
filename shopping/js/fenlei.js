leftScroll();
//1:获取一些必须知道的元素
//移动的ul   ul的父盒子   整个页面的高度
function leftScroll(){
//	获取移动的ul
var moveUl=document.querySelector(".main_f ul");
//获取ul的父盒子的高度
var parentHeight=document.querySelector(".main_f").offsetHeight;
//获取head的高度
//var headHeight=document.querySelector(".search_box").offsetHeight;
var ulHeight=moveUl.offsetHeight;
//console.log(parentHeight+"......"+ulHeight);

//计算 移动的高度  往上移动  是负值
var  minDistance=-(ulHeight-parentHeight);

var  maxDistance=0;
//console.log(minDistance);

//通过touch事件移动ul
var startY=0;

var moveY=0;

var distanceY=0;

var delay=200;


//开始
moveUl.addEventListener('touchstart',function(e){
//	记录开始的点
	startY=e.touches[0].clientY;
});


//移动
moveUl.addEventListener('touchmove',function(e){
//	记录触摸点移动的距离
	moveY=e.touches[0].clientY-startY;

//	判断是否满足移动的条件
	if((distanceY+moveY)>(maxDistance+delay)){  //向下
		moveY=0;
		distanceY=maxDistance+delay;
		
	}else if((distanceY+moveY)<(minDistance-delay)){  //向上
		
		moveY=0;
		distanceY=minDistance-delay;
		
	}
    moveUl.style.transition="";
	moveUl.style.transform='translateY('+(distanceY+moveY)+'px)';

	
});

//结束
moveUl.addEventListener('touchend',function(){
	distanceY+=moveY;

	
	if(distanceY>maxDistance){
		distanceY=maxDistance;
	}else if(distanceY<minDistance){
		distanceY=minDistance;
	}
	moveUl.style.transition="all .5s";
	moveUl.style.transform='translateY('+distanceY+'px)';
});




// 点击跳转

// 绑定tap事件给ul 
// 事件参数中能够拿到触发该事件的dom元素
// e.target获取的是元素的子元素

// ----------------
   // 点击 的时候 获取li的索引值
// 获取li 的高度
   var liHeight=document.querySelector(".main_f li").offsetHeight;

   var liArr=document.querySelectorAll(".main_f li");
  // 给每个li绑定一个data-index属性

for(var i=0;i<liArr.length;i++){
	
	liArr[i].dataset['index']=i;
}




   // 让ul移动  索引值*li的高度的距离 
   fox_tap(moveUl,function(e){
//     console.log(e);

    // console.log(e.target);  //a

for(var i=0;i<liArr.length;i++){
	liArr[i].className="";
}
   e.target.className="current";


  // 获取当前点击的li 的索引值

   var currentIndex=e.target.parentNode.dataset['index'];


   // 计算ul移动的距离
    var moveDistance=liHeight*currentIndex*-1;


    

if(moveDistance>maxDistance){
	moveDistance=maxDistance;
}else if(moveDistance<minDistance){
	moveDistance=minDistance;
}
moveUl.style.transform='translateY('+moveDistance+'px)';

   });




// -------------
}


function fox_tap(element,callBack){
	
	//	不会移动  ---不执行touchmove
//   快速移开  start跟end的时间差比较小
//	开始的时间
	var startTime=0;
//	标示  是否触发了move事件
	var isMove=false;
//	定义一个最大的延迟时间
    var maxTime=250;
	
		element.addEventListener('touchstart',function(){
			isMove=false;
			
			startTime=Date.now();
		});
		element.addEventListener('touchmove',function(){
//			若触发了move,isMove为true
			isMove=true;
		});
		element.addEventListener('touchend',function(e){
			if(isMove==true){
//				console.log('点击失效');
				return;   //点击失效
			}
			
			if((Date.now()-startTime)>maxTime){
//				console.log('时间过长');
				return;
				
			}
			//事件对象
            callBack(e);
		})
	
}
//选项卡
var mainarr=document.querySelectorAll(".right_content");
var subarr=document.querySelectorAll(".main_f ul li");

 for(var u=0;u<subarr.length;u++){
 	subarr[u].index=u;
 	subarr[u].onclick=function(){
   		for(var j=0;j<subarr.length;j++){
 
   			mainarr[j].style.display='none';
   		} 		
 		mainarr[this.index].style.display='block';
 	}
 }
 //底部的js
var liearr=document.querySelectorAll("footer a");

for(var i=0;i<liearr.length;i++){
	
	liearr[i].onclick=function(){
		console.log(5)
		for(var j=0;j<liearr.length;j++){
		liearr[j].className="";
	    }
		this.className="active";
	}
}