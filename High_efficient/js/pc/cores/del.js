// 批量删除类

var Del=function(allchecked,childrenlist){
	var $Allchecked=allchecked;
	var $Childrenlist=childrenlist;
	var arr=[];
	
	$Allchecked.click(function() {
	  if ($(this).is(":checked")) { // 全选
	    arr=[]; 
		$Childrenlist.each(function() { 
		  $(this).prop("checked", true);		   
		  arr.push($(this).attr("id"));
	    }); 
	  }else { // 取消全选 
		$Childrenlist.each(function() { 
		  $(this).prop("checked", false);
		  arr=[]; 
	    }); 
	  } 
	});
	
	$Childrenlist.click(function(){
	  if ($(this).is(":checked")) { // 全选 
		arr.push($(this).attr("id"));
	  }else { // 取消全选
		var temp=[];
		for(var i=0; i<arr.length; i++)
		{
			if(arr[i]!=$(this).attr("id"))
			{
				temp.push(arr[i])
			}
		}
		arr=temp;
	  } 
	 });
	
	//返回选中数组
    this.getArr=function(){
		return  arr;
	}; 
 };
 