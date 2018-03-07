//划拉
leftScroll();
function leftScroll(){
//	获取移动的ul
var moveUl=document.querySelector("#sub_navbar ul");
//获取ul的父盒子的高度
var parentWidth=document.querySelector("#sub_navbar").offsetWidth;
//获取head的高度
//var headHeight=document.querySelector(".head").offsetWidth;
var ulWidth=moveUl.offsetWidth;
//console.log(parentHeight+"......"+ulHeight);

//计算 移动的高度  往上移动  是负值
var  minDistance=-(ulWidth-parentWidth);

var  maxDistance=0;
//console.log(minDistance);

//通过touch事件移动ul
var startX=0;

var moveX=0;

var distanceX=0;

var delay=0;


//开始
moveUl.addEventListener('touchstart',function(e){
//	记录开始的点
	startX=e.touches[0].clientX;
//	console.log(e)
});


//移动
moveUl.addEventListener('touchmove',function(e){
//	记录触摸点移动的距离
	moveX=e.touches[0].clientX-startX;

//	判断是否满足移动的条件
	if((distanceX+moveX)>(maxDistance+delay)){  //向下
		moveX=0;
		distanceX=maxDistance+delay;
		
	}else if((distanceX+moveX)<(minDistance-delay)){  //向上
		
		moveX=0;
		distanceX=minDistance-delay;
		
	}
    moveUl.style.transition="";
	moveUl.style.transform='translateX('+(distanceX+moveX)+'px)';

	
});

//结束
moveUl.addEventListener('touchend',function(){
	distanceX+=moveX;

	
	if(distanceX>maxDistance){
		distanceX=maxDistance;
	}else if(distanceX<minDistance){
		distanceX=minDistance;
	}
	moveUl.style.transition="all .5s";
	moveUl.style.transform='translateX('+distanceX+'px)';
});



 var liWidth=document.querySelector("#sub_navbar li").offsetWidth;

   var liArr=document.querySelectorAll("#sub_navbar li");
  // 给每个li绑定一个data-index属性

for(var i=0;i<liArr.length;i++){
	
	liArr[i].dataset['index']=i;
}




   // 让ul移动  索引值*li的高度的距离 
   fox_tap(moveUl,function(e){
//     console.log(e);

    // console.log(e.target);  //a



  // 获取当前点击的li 的索引值

   var currentIndex=e.target.parentNode.dataset['index'];


   // 计算ul移动的距离
    var moveDistance=liWidth*currentIndex*-1;


    

if(moveDistance>maxDistance){
	moveDistance=maxDistance;
}else if(moveDistance<minDistance){
	moveDistance=minDistance;
}
moveUl.style.transform='translateX('+moveDistance+'px)';

   });


}
// touch封装的tap事件； 
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