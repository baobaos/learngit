



   $(function(){
   	
   
   	$(".main-nav").mouseover(function(){
   		$("#J_subNav").show();
   	});
    $("#J_subNav").mouseover(function(){
   		$(this).show();
   	});
   	$("#J_subNav").mouseout(function(){
   		$(this).hide();
   	});
   });




 




		var ul=document.getElementById('promoInner');     //获取lun付给一个变量
		var dianArr=document.getElementById('promoTrigger').children;   //点点后面所有的div
		var chang=ul.children.length;       //ul后面li的长度
		var i=0;                         //声明一个变量i，它从0开始
		var flag=true;                   //先是true ，后判断

		function lunbo(){
			for(var j=0;j<=dianArr.length-1;j++){     
				//遍历j让所有的点点名字变成rt
				
				dianArr[j].className="rt"
				
			}
				if(flag==true){                        //判断是不是真。是真正走
					i++;
					dianArr[i].className="rt rn"                 //改变点点的样式，通过li名，
					if(i==chang-1){                         //判断i==ul的长度如果相等，变成flase
						flag=false;
					}
				}else{
					i--;                                   //flase 让i--，倒着走回去
					dianArr[i].className="rt rn"              //同理
					if(i==0){
						flag=true;
					}
				};
	   
			animate(-i*604,ul)                           //调入有参函数，i为负值*图片的宽度，ul（box）传参
		}
		
		
	
	
		
		var dalunbo=setInterval(lunbo,3000)
        var timer;
		function animate(target,box){
			clearInterval(timer);
			var speed=box.offsetLeft>target?-10:10;
			timer=setInterval(function(){
				var chang=Math.abs(box.offsetLeft-target);
				box.style.left=box.offsetLeft+speed+"px";
				if(chang<Math.abs(speed)){
					box.style.left=target+"px";
					clearInterval(timer);
				}
			},10)
		}
	  $(function(){
			$("#shang>a").mouseover(function(){
				 var oo=$("#shang>a").index(this);
		    $(this).addClass("on").siblings().removeClass("on");
				 $($("#xia").children()[$(this).index()]).show().siblings().hide();
                 
				});
			});
      $(function(){
			$("#yx>a").mouseover(function(){
				 var oo=$("#yx>a").index(this);
		    $(this).addClass("on").siblings().removeClass("on");
				 $($("#nibaa").children()[$(this).index()]).show().siblings().hide();
                 
				});
			});


// 选项卡
  $(function(){
			$("#newsTab>ul>li").mouseover(function(){
				 var uu=$("#newsTab>ul>li").index(this);
			$(this).addClass("on").siblings().removeClass("on");
				 $($("#two").children()[$(this).index()]).show().siblings().hide();

				});
			});





    $(function(){
    	$("#media").mouseover(function(){
    		$('#mediaCon').show();
    	});
    	$("#media").mouseout(function(){
    		$('#mediaCon').hide();
    	});
    	
    });
    $(function(){
    	$("#item_hero").mouseover(function(){
    		$('#xianshi').show();
    	});
    	$("#xianshi").mouseover(function(){
    		$(this).show();
    	});
    	$("#xianshi").mouseout(function(){
    		$(this).hide();
    	});
    	
    	
    });
  

  
