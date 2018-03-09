 /* www.jq22.com */
			$(function(){
				
				var Picture=new Picture2();
                 	Picture.init();	 
				// 初始化插件
				$("#demo").zyUpload({
					width            :   "550px",                 // 宽度
					height           :   "auto",                 // 宽度
					itemWidth        :   "140px",                 // 文件项的宽度
					itemHeight       :   "115px",                 // 文件项的高度
					url              :   "uploadImages",  // 上传文件的路径
					fileType         :   ["jpg","png","JPG","jpeg","JPEG"],// 上传文件的类型
					fileSize         :   51200000,                // 上传文件的大小
					multiple         :   true,                    // 是否可以多个文件上传
					dragDrop         :   true,                    // 是否可以拖动上传文件
					tailor           :   true,                    // 是否可以裁剪图片
					del              :   true,                    // 是否可以删除文件
					finishDel        :   true,  				  // 是否在上传文件完成后删除预览
					/* 外部获得的回调接口 */
					onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
						console.info("当前选择了以下文件：");
						console.info(selectFiles);
						$("#selectFilesid").val(($("#selectFilesid").val())*1+selectFiles.length);
					},
					onDelete: function(file, files){              // 删除一个文件的回调方法 file:当前删除的文件  files:删除之后的文件
						console.info("当前删除了此文件：");
						console.info(file.name);
						$("#selectFilesid").val(($("#selectFilesid").val())*1-1);
					},
					onSuccess: function(file, response){   
                        var result=JSON.parse(response);
						$("#selectFilesid").val(($("#selectFilesid").val())*1-1);
						$("#img_box_box").show(300);
						$("#image_id").append(
						'<span style="position:relative;width: 120px;margin-left: 10px;height: 120px;display: inline-block;">'+
           '<p style="position:absolute; top:0; left:0; opacity:0.7; background:#000000; color:#fff;width: 100%;text-align: center;height: 20px;font-size: 12px;line-height: 20px;white-space: nowrap;text-overflow:ellipsis; overflow:hidden;">'+result.reimbursementVO.nameBefore+'</p>'+
          ' <span class="gb" style="cursor: pointer;color:#fff; font-size:16px; position:absolute; right:10px; top:0px;height: 20px;line-height: 20px;" id_name="'+result.reimbursementVO.images+'">X</span>'+
          ' <img src="'+unescape(result.reimbursementVO.imageUrl)+'/'+result.reimbursementVO.images.substring(0,8)+'/'+result.reimbursementVO.images+'" style="width:118px; height:118px; border:1px solid #7B7B7B" class="img_yl">'+
          ' </span>')
					$(".gb").unbind("click").bind("click",function(){
						var str=$("#images").val();
						var strs= new Array(); //定义一数组 
						strs=str.split(","); //字符分割 
						
						for (i=0;i<strs.length ;i++ ) 
						{ 
							if(strs[i]==$(this).attr("id_name")){
								 strs.splice(i,1);  
								}
						}
						$("#images").val('');
						for(var c=0;c<strs.length;c++){
							//alert(strs[i])
							if(strs[c]!=""){
								if($("#images").val()==""){
									  $("#images").val(strs[c]);
								  }else{
									  $("#images").val($("#images").val()+","+strs[c]);
								  }
								}
							
						}
						if($("#delImages").val()==""){
							$("#delImages").val($(this).attr("id_name"));
						}else{
							$("#delImages").val($("#delImages").val()+","+$(this).attr("id_name"));
						}
						$(this).parent().remove();
						})	
						
						$(".img_yl").unbind("click").bind("click",function(){
							  $(".abs_img .big_img2 img").attr("src", $(this).attr("src"));
                                Picture.show();
							 })
						
						var resultJson=JSON.parse(response);
						
						if($("#images").val()==""){
							$("#images").val(resultJson.reimbursementVO.images);
						}else{
							$("#images").val($("#images").val()+","+resultJson.reimbursementVO.images);
						}
						
					},
					onFailure: function(file, response){          // 文件上传失败的回调方法
						$("#failArr").val($("#failArr").val()+file.name+",");
					},
					onComplete: function(response){    
					  $("#complatemark").val("1")       	  // 上传完成的回调方法
						
					}
				});
				
			});
		
		