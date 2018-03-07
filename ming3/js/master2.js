//点击事件开始
function fox_tap(element,callBack){
	var startTime=0;
	var isMove=false;
    var maxTime=250;
	element.addEventListener('touchstart',function(){
		isMove=false;
		
		startTime=Date.now();
	});
	element.addEventListener('touchmove',function(){
		isMove=true;
	});
	element.addEventListener('touchend',function(e){
		if(isMove==true){
			return;  
		}
		
		if((Date.now()-startTime)>maxTime){
			return;
		}	if (callBack) {
			callBack(e);
		}
	})
}
var oA2=document.querySelector(".edit");
var oContent=document.querySelector(".main");
fox_tap(oA2,appear);
var judge=true;
function appear(){
	if (judge) {
		for (var i2=1,x2=oContent.children.length;i2<x2;i2++) {
			oContent.children[i2].style.transform="translateX(-60px)"
		}
		oA2.innerText="取消";
		judge=false;
	}
	else{
		for (var i2=1,x2=oContent.children.length;i2<x2;i2++) {
			oContent.children[i2].style.transform="translateX(0px)"
		}
		oA2.innerText="编辑";
		judge=true;
	}
}
for (var i4=0,x4=oContent.children.length;i4<x4;i4++) {
	if (oContent.children[i4].children[0]) {
		oContent.children[i4].children[0].children[0].decide=1;
	}
}
//选中开始
function reply (e) {
	return (function () {
		if (e.target.decide==1) {
			e.target.style.backgroundImage="url(img/30.png)";
			e.target.decide=2;
			count ();
		}
		else if(e.target.decide==2){
			e.target.style.backgroundImage="url(img/29.png)";
			e.target.decide=1;
			count ();
		}
		if (e.target.parentNode.parentNode.decide==1) {
			e.target.parentNode.parentNode.style.backgroundImage="url(img/30.png)";
			e.target.parentNode.parentNode.decide=2;
			count ();
		}
		else if(e.target.parentNode.parentNode.decide==2){
			e.target.parentNode.parentNode.style.backgroundImage="url(img/29.png)";
			e.target.parentNode.parentNode.decide=1;
			count ();
		}
	}(e))
}
//选中结束
for (i3=0,x3=oContent.children.length;i3<x3;i3++) {
	fox_tap(oContent.children[i3],reply);
	if (oContent.children[i3].children[1]) {
		fox_tap(oContent.children[i3].children[1],oDelete);
		fox_tap(oContent.children[i3].children[0].children[0].children[1].children[2].children[1].children[0],reduce);
		fox_tap(oContent.children[i3].children[0].children[0].children[1].children[2].children[1].children[2],add)
	}
	
}
var oTitle=document.querySelector(".title")
oTitle.decide=true;
fox_tap(oTitle,allChoose);
//全选开始
function allChoose () {
	if (oTitle.decide) {
		for (var i5=1,x5=oContent.children.length-1;i5<x5;i5++) {
			oContent.children[i5].children[0].children[0].style.backgroundImage="url(img/30.png)";
			oContent.children[i5].children[0].children[0].decide=2;
		}
		oTitle.decide=false;
		oTitle.style.backgroundImage="url(img/30.png)";
		count();
	}
	else{
		for (var i5=1,x5=oContent.children.length-1;i5<x5;i5++) {
			oContent.children[i5].children[0].children[0].style.backgroundImage="url(img/29.png)";
			oContent.children[i5].children[0].children[0].decide=1;
		}
		oTitle.decide=true;
		oTitle.style.backgroundImage="url(img/29.png)";
		count();
	}
	
}
//全选结束
//删除开始
function oDelete (e) {
	console.log(e.target.parentNode)
	e.target.parentNode.children[0].children[0].decide=1;
	e.target.parentNode.style.display="none";
	count();
}
//删除结束
var x7=0,x8=0,x9=0;
var countIndex=0;
var countNum=0;
var oPay2=document.querySelector(".pay")
var oPay=document.querySelector(".pay a span");
var oPay1=document.querySelector(".pay p span");
//计算开始
function count () {
	for (i6=1,x6=oContent.children.length-1;i6<x6;i6++) {
		if (oContent.children[i6].children[0].children[0].decide==2) {
			x7=oContent.children[i6].children[0].children[0].children[1].children[2].children[0].children[0].innerHTML;
			x8=oContent.children[i6].children[0].children[0].children[1].children[2].children[1].children[1].innerHTML;
			x7=parseInt(x7);
			x8=parseInt(x8);
			x9=x7*x8;
			countNum+=x9;
			countIndex++;
		}	
	}
	if (countIndex==0) {
		oPay2.style.display="none"
	}
	else{
		oPay2.style.display="block"
	}
	oPay.innerHTML=countIndex;
	oPay1.innerHTML=countNum;
	countIndex=0;
	countNum=0;
}
//计算结束
//减开始
function reduce (e) {
	console.log(e)
	if (e.target.parentNode.children[1].innerHTML>0) {
		e.target.parentNode.children[1].innerHTML-=1;	
		count();
	}
}
//减结束
//加开始
var x10=0;
function add (e) {
	if (e.target.parentNode.children[1].innerHTML<=99) {
		x10=e.target.parentNode.children[1].innerHTML;
		e.target.parentNode.children[1].innerHTML=1+parseInt(x10);	
		count();
	}
}
//加结束