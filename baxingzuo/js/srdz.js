var input1=document.getElementById("input1");
var input2=document.getElementById("input2");
var input3=document.getElementById("input3");
input1.onblur=i1;
input2.onblur=i2;
input3.onblur=i3;
function i1(){
	if(input1.value==""){
		return false;
	}else{
		return true;
	};
};
function i2(){
	if(input1.value==""){
		return false;
	}else{
		return true;
	};
};
function i3(){
	if(input1.value==""){
		return false;
	}else{
		return true;
	};
};
function yz(){
	if(i1()&&i2()&&i3()){
		return true;
	}else{
		return false;
	}
};

