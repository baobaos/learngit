var zwjNav=document.getElementById("zwj_nav").children;
var zwjMain=document.getElementById("zwj_main").children;
//console.log(zwjMain)
for(var i=0;i<zwjNav.length;i++){
			zwjNav[i].index=i;
			zwjNav[i].onclick=function(){
				for(var j=0;j<zwjNav.length;j++){
				zwjNav[j].classList.remove("current");
					zwjMain[j].style.display="none"
				}
				this.classList.add("current");
		      zwjMain[this.index].style.display="block";
			}
		}