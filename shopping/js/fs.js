
var fan=document.querySelectorAll(".fansSelect ul")
var yes=document.querySelectorAll(".fansSelect div")

//console.log(yes)

for(var i=0;i<yes.length;i++){
//	fan[i].style.display="none";
	yes[i].index=i;
	yes[i].onclick=function(){
		for(var j=0;j<yes.length;j++){
			yes[j].style.backgroundColor=""
			yes[j].style.color="#262626";
			fan[j].style.display="none"
		}
		this.style.color="#fff";
		this.style.backgroundColor="red";
		fan[this.index].style.display="block"
	}
}
