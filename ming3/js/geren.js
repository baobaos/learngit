var tx=document.querySelector(".head_tx")
var sz=document.querySelector(".y_sz")
var xx=document.querySelector(".y_xx")
var tb=document.querySelector("#tb1")
var tb2=document.querySelector("#tb2")
var tb3=document.querySelector("#tb3")
var dingd=document.querySelector(".dingd")
var yuyue=document.querySelector(".yuyue")
//console.log(gr)

var ismove=false;
function tz(even,html){
	even.addEventListener("touchstart",function(){
		ismove=false;
	})
	even.addEventListener("touchmove",function(){
		ismove=true;
	})
	even.addEventListener("touchend",function(){
		if(ismove==true){
			
		}else{
			window.location.href=html;
		}
	        
})
}
tz(tx,"new_file.html");
tz(sz,"shezhi.html");
tz(xx,"fenye_xiaoxi.html")
tz(tb,"gouwu.html")
tz(tb2,"shoucang.html")
tz(tb3,"liquan.html")
tz(dingd,"wddd.html")
tz(yuyue,"yuyue.html")