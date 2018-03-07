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
//编辑
var main=document.querySelector(".main");
var empty=document.querySelector(".empty");
var bian=document.querySelector(".edit");
var comd=document.querySelectorAll(".commodity");
var de=document.querySelectorAll(".del");
var titl=document.querySelector(".title");
var pay=document.querySelector(".pay");
var rmb=document.querySelector(".pay p span");

var dian=true;
  bian.onclick=function(){
  	if(dian==true){
  		this.innerHTML="取消";
  		dian=false;
     for(var i=0;i<comd.length;i++){
     	comd[i].style.right=60+"px";
		de[i].style.right=0;
     }		
  	}else{
  		this.innerHTML="编辑";
  		dian=true;
  		 for(var i=0;i<comd.length;i++){
     	comd[i].style.right=0;
		de[i].style.right=-60+"px";
     }
  	}	
}

 
//左边点击

var jiesuan=document.querySelector('.pay a span');
for(var i=0;i<comd.length;i++){
	comd[i].index=i;
	comd[i].onclick=function(){
		this.classList.toggle('select');	
		var seleso=document.querySelectorAll('.commodity.select');
		jiesuan.innerText=seleso.length;
        var price=document.querySelectorAll('.commodity.select .price span');
        var arr=[];
       for(var j=0;j<price.length;j++){
       	arr.push(parseInt(price[j].innerText));
       }
       var  sum=0;
           for(var k=0;k<arr.length;k++){
//         console.log(parseInt(shu[k].innerText))
           
           sum=arr[k]*parseInt(shu[k].innerText)+sum;
           }
       rmb.innerText=sum;
//     console.log(arr)
		
		if(seleso.length==0){
			pay.style.display='none';
			titl.innerHTML="全选";
			titl.classList.remove('select');
			dian=true;
		}else{
			pay.style.display='block';
		}      
	}	
}

//全选点击

titl.onclick=function(){
//	this.classList.toggle('select')
	if(dian==true){
  		this.innerHTML="取消";
  		dian=false;
  		this.classList.add('select');
    	for(var i=0;i<comd.length;i++){
     	comd[i].classList.add('select');
     }	
     sel=document.querySelectorAll('.commodity.select');
     jiesuan.innerText=sel.length;
     pay.style.display='block';
     var price=document.querySelectorAll('.commodity.select .price span');
        var arr=[];
       for(var j=0;j<price.length;j++){
       	arr.push(parseInt(price[j].innerText));
       }
       var  sum=0;
       for(var k=0;k<arr.length;k++){
            sum=arr[k]*parseInt(shu[k].innerText)+sum;
           }
       rmb.innerText=sum;
  	}else{
  		this.classList.remove('select');
  		this.innerHTML="全选";
  		dian=true;
  		for(var i=0;i<comd.length;i++){
     	comd[i].classList.remove('select');
        }	
        pay.style.display='none';
  	}
}

//计算点击
var jian=document.querySelectorAll('.num button:nth-child(1)');
var jia=document.querySelectorAll('.num button:nth-child(3)');
var shu=document.querySelectorAll('.num span:nth-child(2)');
//console.log(shu)
  for(var t=0;t<jian.length;t++){
  	jian[t].ind=t;
  	jian[t].onclick=function(){ 		
  		 stopBubble(this.zk)
  		if(shu[this.ind].innerText<=0){
  			shu[this.ind].innerText=0;
  		}else{
  			var arr=[];
       for(var j=0;j<shu.length;j++){
       	arr.push(parseInt(shu[j].innerText));
       }
//     console.log(arr)
  		shu[this.ind].innerText=arr[this.ind]-1;
  		}
  			

  		var price=document.querySelectorAll('.commodity.select .price span');
        var arr=[];
       for(var j=0;j<price.length;j++){
       	arr.push(parseInt(price[j].innerText));
       }
       var  sum=0;
       
           for(var k=0;k<arr.length;k++){
           console.log(parseInt(shu[k].innerText))
           
           sum=arr[k]*parseInt(shu[k].innerText)+sum;
           }
//         console.log(sum)
       rmb.innerText=sum;
       
  	}
  }
  for(var r=0;r<jian.length;r++){
  	jia[r].ina=r;
  	jia[r].onclick=function(){ 		
  		 stopBubble(this.zk)
  		if(shu[this.ina].innerText>=99){
  			shu[this.ina].innerText=99;
  		}else{
  			var arr=[];
       for(var j=0;j<shu.length;j++){
       	arr.push(parseInt(shu[j].innerText));
       }
//     console.log(arr)
  		shu[this.ina].innerText=arr[this.ina]+1;
  		}
  		var price=document.querySelectorAll('.commodity.select .price span');
        var arr=[];
       for(var j=0;j<price.length;j++){
       	arr.push(parseInt(price[j].innerText));
       }
       var  sum=0;
           for(var k=0;k<arr.length;k++){
//         console.log(parseInt(shu[k].innerText))
            console.log(arr[k])
           sum=arr[k]*parseInt(shu[k].innerText)+sum;
           }
          
       rmb.innerText=sum;
  	}
  }

//删除
  for(var w=0;w<de.length;w++){
  	de[w].iok=w;
  	de[w].onclick=function(){
  		de=document.querySelectorAll(".del")
  		comd[this.iok].remove();
  		this.remove();
  		console.log(de.length)
  		if(de.length==1){
  			empty.style.display='block';
  			main.style.display='none';
  		}
  	}
  }


//阻止冒泡
function stopBubble(e) { 
if (e && e.stopPropagation) {//非IE浏览器 
　　e.stopPropagation(); 
} 
else {
window.event.cancelBubble = true; 
} 
} 