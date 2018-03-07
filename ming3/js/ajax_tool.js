// ajax get 五部曲
function ajaxGet (url,data) {
	// 异步对象
var ajax=new XMLHttpRequest();
	// 设置url
// xx.php?name=jack&age=12
// 所以这里需要拼接url
if(data){
	url+='?';
	url+=data;
	
}
ajax.open('get',url);
// 发送
ajax.send();
	// 注册事件
ajax.onreadystatechange=function(){
   if(ajax.readyState==4&&ajax.status==200){
     // 在事件中获取数据，并修改界面显示
     console.log(ajax.responseText);

   }

}
}

// ajax post 五部曲
function ajaxPost(url,data){
	// 异步对象
var ajax=new XMLHttpRequest();
	// 设置url
	ajax.open('post',url);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	// 发送
	ajax.send(data);
	// 注册事件
ajax.onreadystatechange=function(){
   if(ajax.readyState==4&&ajax.status==200){
     // 在事件中获取数据，并修改界面显示
     console.log(ajax.responseText);

   }
}
}

// 将get和post封装到一起
//function ajaxTool(url,data,method,success){
//	 var ajax=new XMLHttpRequest();
//	 if(method=='get'){
//     if(data){
//	     url+='?';
//	     url+=data;
//	
//     }
//     ajax.open('get',url);
//       // 发送
//     ajax.send();
//	 }else{
//
//     ajax.open('post',url);
//	   ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//	   // 发送
//	   ajax.send(data);
//
//	 }
//// 注册事件
//ajax.onreadystatechange=function(){
// if(ajax.readyState==4&&ajax.status==200){
//   // 在事件中获取数据，并修改界面显示
//   // console.log(ajax.responseText);
//   
//   // 将数据让外面可以使用
//   // return ajax.responseText;
//// onreadystatechange调用时 说明数据回来了 
//    // ajax.responseText
//
//// 外面可以传入一个function 作为参数
//  success(ajax.responseText);
// }
//}
//
//}


function ajaxTool(opction){
	var ajax=new XMLHttpRequest();
	if(opction.method=="get"){
		if(opction.data){
			opction.url+="?";
			opction.url+=opction.data;
		}
		ajax.open('get',opction.url);
		ajax.send();
	}else{
		ajax.open('post',opction.url);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		ajax.send(opction.data);
	}
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4&&ajax.status==200){
			// console.log(ajax.responseText);

			// 让数据可以在外面使用
			// return ajax.responseText;
			opction.success(ajax.responseText);
		}
	}
}
