var not=document.getElementById("home");
var have=document.getElementById("home2");
var hav=document.getElementById("home2").children;
console.log(hav)
if(hav.length==0){
	not.style.display="block";
	have.style.display="none"
}else{
	not.style.display="none";
	have.style.display="block"
}