leftScroll();
function leftScroll(){
//	获取移动的ul
var moveUl=document.querySelector(".sub_navbar ul");
//获取ul的父盒子的高度
var parentWidth=document.querySelector(".sub_navbar").offsetWidth;
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

var delay=200;


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



 var liWidth=document.querySelector(".sub_navbar li").offsetWidth;

   var liArr=document.querySelectorAll(".sub_navbar li");
  // 给每个li绑定一个data-index属性

for(var i=0;i<liArr.length;i++){
	
	liArr[i].dataset['index']=i;
}




   // 让ul移动  索引值*li的高度的距离 
   fox_tap(moveUl,function(e){
//     console.log(e);

    // console.log(e.target);  //a

for(var i=0;i<liArr.length;i++){
	liArr[i].children[0].className="sijde";
	liArr[i].className="sijde";
}
 if(e.target.children>1){
 	 e.target.children[0].className="active";
 }else{
 	 e.target.className="active";
 }
  


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
//轮播
lunboFN();
function lunboFN(){
				var ck=document.querySelector(".banner");
				var moveUl=document.querySelector(".fasf");
				var mvWidth=document.querySelector(".banner").offsetWidth;
				var ydbox=document.querySelector(".suo_yin").children;
				var index=1;
				var timer=null;
				timer=setInterval(lunboMov,2000);
				function lunboMov(){
				index++;
			    	   
                        
                        moveUl.style.transition="all .3s";
				 	    moveUl.style.transform="translateX("+index*mvWidth*-1+"px)";
                      
			    		
				 	    

					moveUl.addEventListener("transitionend",function(){
						
						 if(index>5){
						 	index=1;
						 	moveUl.style.transition="";
						 	moveUl.style.transform="translateX("+index*mvWidth*-1+"px)";
							
						}else if(index<1){
							index=5;
						 	moveUl.style.transition="";
						 	moveUl.style.transform="translateX("+index*mvWidth*-1+"px)";
						}
					
							
						
//						console.log(index)
						for(var i=0;i<ydbox.length;i++){
							ydbox[i].style.background="black";
						    ydbox[i].style.opacity=0.2;
						}
						ydbox[index-1].style.background="dodgerblue";
						ydbox[index-1].style.opacity=1;
					})
				}
				 var startX=0;
				 var moveX=0;
				 var distanceX=0;
				 moveUl.addEventListener("touchstart",function(even){		
                    startX=even.touches[0].clientX;
                  
                    
	               });
	               moveUl.addEventListener("touchmove",function(even){		
                    moveX=even.touches[0].clientX-startX;
                      clearInterval(timer);
                      moveUl.style.transform="translateX("+(moveX+index*mvWidth*-1)+"px)";
 
                 	
	               });
	               moveUl.addEventListener("touchend",function(even){
                    	if(Math.abs(moveX)>mvWidth*1/3){
                      	if(moveX>0){
                      		index--;
                      	}else{
                      		index++;
                      	}
                      	moveUl.style.transition="all .3s";
                      	 moveUl.style.transform="translateX("+index*mvWidth*-1+"px)";
                      	 
                      }else{
                        moveUl.style.transform="translateX("+index*mvWidth*-1+"px)";
                      }
//                    for(var i=0;i<ydbox.length;i++){
//							ydbox[i].style.background="";
//						}
//						ydbox[index-1].style.background="#fff";
                      timer=setInterval(lunboMov,2000);
	});
				}
//2
lunbofd();
function lunbofd(){
				var ck=document.querySelector(".afgr");
				var moveUl=document.getElementById("yjfd");
				var mvWidth=document.querySelector(".main").offsetWidth-20;
				var ydbox=document.querySelector(".suo_y").children;
				var index=1;
				var timer=null;
				timer=setInterval(lunboMov,2000);
				function lunboMov(){
					console.log(mvWidth)
				index++;
			    	   
                        
                        moveUl.style.transition="all .3s";
				 	    moveUl.style.transform="translateX("+index*mvWidth*-1+"px)";
                      
			    		
				 	    

					moveUl.addEventListener("transitionend",function(){
						
						 if(index>5){
						 	index=1;
						 	moveUl.style.transition="";
						 	moveUl.style.transform="translateX("+index*mvWidth*-1+"px)";
							
						}else if(index<1){
							index=5;
						 	moveUl.style.transition="";
						 	moveUl.style.transform="translateX("+index*mvWidth*-1+"px)";
						}
					
							
						
//						console.log(index)
						for(var i=0;i<ydbox.length;i++){
							ydbox[i].style.background="black";
						    ydbox[i].style.opacity=0.2;
						}
						ydbox[index-1].style.background="dodgerblue";
						ydbox[index-1].style.opacity=1;
					})
				}
				 var startX=0;
				 var moveX=0;
				 var distanceX=0;
				 moveUl.addEventListener("touchstart",function(even){		
                    startX=even.touches[0].clientX;
                  
                    
	               });
	               moveUl.addEventListener("touchmove",function(even){		
                    moveX=even.touches[0].clientX-startX;
                      clearInterval(timer);
                      moveUl.style.transform="translateX("+(moveX+index*mvWidth*-1)+"px)";
   
                 	
	               });
	               moveUl.addEventListener("touchend",function(even){
                    	if(Math.abs(moveX)>mvWidth*1/3){
                      	if(moveX>0){
                      		index--;
                      	}else{
                      		index++;
                      	}
                      	moveUl.style.transition="all .3s";
                      	 moveUl.style.transform="translateX("+index*mvWidth*-1+"px)";
                      	 
                      }else{
                        moveUl.style.transform="translateX("+index*mvWidth*-1+"px)";
                      }
//                    for(var i=0;i<ydbox.length;i++){
//							ydbox[i].style.background="";
//						}
//						ydbox[index-1].style.background="#fff";
                      timer=setInterval(lunboMov,2000);
	});
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
//选项卡
var mainarr=document.querySelectorAll(".main");
var subarr=document.querySelectorAll(".sub_navbar ul li");

 for(var u=0;u<subarr.length;u++){
 	subarr[u].index=u;
 	subarr[u].onclick=function(){
   		for(var j=0;j<subarr.length;j++){
 
   			mainarr[j].style.display='none';
   		} 		
 		mainarr[this.index].style.display='block';
 	}
 }
//顶部
var navbar=document.querySelector(".navbar");
var inner=document.querySelector(".navbar_inner");
var heightad=document.querySelector(".main").offsetTop;
window.onscroll=function(){
	var liheight=document.body.scrollTop||document.documentElement.scrollTop;
	if(liheight>=heightad){
		inner.style.display="none";
		
	}else{
		inner.style.display="block";
		
	}
}
