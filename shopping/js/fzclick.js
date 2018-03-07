//参数1:绑定的dom元素
//参数2:回调函数

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
