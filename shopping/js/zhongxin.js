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

//切换

var main=document.querySelector('.main');
var mes=document.querySelector('.messageDiv');
var head=document.querySelector('.head');
var me=document.querySelector('.mes'); 
var vip=document.querySelector('.vip_right');
var wdf=document.querySelector('.wdfs'); 
var fan=document.querySelector('.fansBox'); 
var lv=document.querySelector('.lvBox');
var rank=document.querySelector('.vip_rank_title_link');
var box=document.querySelector('.myMoneyBox');
var fre=document.querySelector('.freeze');
var bla=document.querySelector('.balance');
var qianb=document.querySelector('.my_purse_title_link');
var coupon=document.querySelector('.coupon');
var couponsBox=document.querySelector('.couponsBox');

fox_tap(coupon,function(){
	main.style.display='none';
	couponsBox.style.display='block';
});
fox_tap(head,function(){
	main.style.display='none';
	mes.style.display='block';
});
fox_tap(vip,function(){
	main.style.display='none';
	mes.style.display='block';
});
fox_tap(me,function(){
	mes.style.display='none';
	main.style.display='block';
});
fox_tap(wdf,function(){
	main.style.display='none';
	fan.style.display='block';
});
fox_tap(rank,function(){
	main.style.display='none';
	lv.style.display='block';
});
fox_tap(qianb,function(){
	main.style.display='none';
	box.style.display='block';
});
fox_tap(fre,function(){
	main.style.display='none';
	box.style.display='block';
});
fox_tap(bla,function(){
	main.style.display='none';
	box.style.display='block';
});
var fa=document.querySelectorAll(".fansSelect ul")
var yes=document.querySelectorAll(".fansSelect div")

//console.log(yes)

for(var i=0;i<yes.length;i++){
//	fan[i].style.display="none";
	yes[i].index=i;
	yes[i].onclick=function(){
		for(var j=0;j<yes.length;j++){
			yes[j].style.backgroundColor=""
			yes[j].style.color="#262626";
			fa[j].style.display="none"
		}
		this.style.color="#fff";
		this.style.backgroundColor="red";
		fa[this.index].style.display="block"
	}
}
