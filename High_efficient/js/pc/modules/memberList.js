/* 
 *部门列表js文件
 *创建人：孟令超
 *创建日期:2017/02/14
 *@修改人：xzx     @修改时间：2017.4.27    @修改原因：frame框架跳转登陆页面跳转不出去    @修改位置或名称：交互事件添加cookie判断
 **/



$(function() {

	var Loading1 = new Loading(); // loadng 盒子初始化
	Loading1.init(); // 插入loading 盒子
	var Alert1 = new Alert(); //弹出盒子初始化
	var confirm1 = new Confirm(); // 确定取消盒子初始化
	/*搜索框赋值*/
	$("#depName").val(result.finddep);
	if (result.memberList != null || result.memberList.length != 0) {
		for (var i = 0; i < result.memberList.length; i++) {
			if(result.memberList[i].userSex=="1"){
				var sex="女";
			}else if(result.memberList[i].userSex=="2"){
				var sex="男";	
			}else{
				var sex="未知";	
			}
			$("#tbody_id").append(
					'<tr class="gradeX">'+
                    '<td>'+
                        '<span class="center">'+
                            '<input type="checkbox" class="children"  id="' + result.memberList[i].userNum + '"> '+
                        '</span>'+
                    '</td>'+
                    '<td>' + result.memberList[i].userNum + '</td>'+
                    '<td>' + result.memberList[i].userName + '</td>'+
                    '<td>' + sex + '</td>'+
                    '<td>'+result.memberList[i].telephoneNum+'</td>'+
                    '<td>'+result.memberList[i].roleName+'</td>'+
                    '<td>'+result.memberList[i].depName+'</td>'+
                    '<td><a href="javascript:void(0)" class="btn btn-success save" data_id="' + result.memberList[i].userNum + '">修改</a><a href="javascript:void(0)" class="btn btn-success margin_left_15 delete" data_id="' + result.memberList[i].userNum + '">删除</a></td>'+
                '</tr>'
					);
		}
		var del = new Del($("#all"), $(".children"));
	}
	
	var sumpage = result.totalPage; //总页数
	var nowpage = result.pageNow; //当前页数
	var pagenumber = result.pageSize; //每页显示数量
	var finddep = result.finddep;
	//分页加载
	$(".tcdPageCode").createPage({
		pageCount: sumpage,
		//总页数
		current: nowpage,
		//当前页数
		pageNumber: pagenumber,
		//每页显示数量
		backFn: function(p) {
			nowpage = p;
			if (nowpage >= sumpage) {
				nowpage = sumpage;
			}
			var json = {
				totalPage: sumpage,
				pageNow: nowpage,
				pageSize: pagenumber,
				depName: finddep
			};
			//判断cookie是否过期
			overdue();
			json = JSON.stringify(json);
			window.location.href = 'getMemberList?jsonStr=' + json;
		}
	});

	//模糊查询
	$("#finddep").click(function() {
		//判断cookie是否过期
		overdue();
		var deptname = $("#depName").val();
		var arr = [];
		if (deptname != "") {
			arr.push(deptname);
		}
		Verification.character.Arr = arr;
		var istrue = Verification.character.Method();
		if (istrue) {
			Alert1.content = "不能输入/\@$#'“等特殊符号";
			Alert1.init();
			Alert1.show();
			return;
		}
		Loading1.show();
		var json = {
			pageNow: 1,
			pageSize: 10,
			userName: deptname
		};
		json = JSON.stringify(json);
		window.location.href = 'getMemberList?jsonStr=' + json;
	});

	//添加部门
	$("#adddep").click(function() {
		//判断cookie是否过期
		overdue();
		Loading1.show();
		window.location.href = 'skipAddMember?jsonStr=""';
	});

	//批量删除调用全选的del.js文件
	$(".bdel").click(function() {
		//判断cookie是否过期
		overdue();
		if (del.getArr().length == 0) {
			Alert1.content = "请选择删除内容！";
			Alert1.init();
			Alert1.show();
		} else {
			confirm1.content = "是否确认删除？";
			confirm1.init();
			confirm1.success = function() {
				//获取选中的ID数组；
				var list = del.getArr();
				var json1 = {
					"pageNow": 1,
					"pageSize": 10
				};
				json1 = JSON.stringify(json1);
				list = JSON.stringify(list);
				Loading1.show();

				//执行异步提交表单
				$.ajax({
					type: 'post',
					url: 'delMembers',
					data: {
						'jsonStr': list
					},
					success: function(result) {
						Loading1.hide();
						result = JSON.parse(result);
						if (result.result == "success") {
							Alert1.content = "删除成功";
							Alert1.success = function() {
								window.location.href = 'getMemberList?jsonStr=' + json1;
							};
							Alert1.init();
							Alert1.show();

						} else {
							if (result.errorMsg == "") {
								var Msg = "删除失败";

							} else {

								var Msg = result.errorMsg;
							}
							Alert1.content = Msg;
							Alert1.success = function() {
								window.location.href = 'getMemberList?jsonStr=' + json1;
							};
							Alert1.init();
							Alert1.show();

						}
					},
					error: function() {
						Loading1.hide();
						Alert1.content = "提交失败！";
						Alert1.init();
						Alert1.show();
					}
				});
			};
			confirm1.show();
		}
	});

	//编辑
	$(".save").on("click", function() {
		//判断cookie是否过期
		overdue();
		Loading1.show();
		var dep_id = Number($(this).attr("data_id"));
		var url = encodeURIComponent('{"userNum":"' + dep_id + '"}');
		location.href = 'skipSaveMember?jsonStr=' + url;
	});
	//列表的删除按钮
	$(".delete").on("click", function() { /*获取当先选中的ID*/
		//判断cookie是否过期
		overdue();
		var dep_id = $(this).attr("data_id");
		confirm1.content = "是否确认删除？";
		confirm1.init();
		confirm1.success = function() {
			//获取选中的ID数组；
			var list = new Array;
			list.push(dep_id);
			var json1 = {
				"pageNow": 1,
				"pageSize": 10
			};
			json1 = JSON.stringify(json1);
			list = JSON.stringify(list);
			Loading1.show();

			//执行异步提交表单
			$.ajax({
				type: 'post',
				url: 'delMembers',
				data: {
					'jsonStr': list
				},
				success: function(result) {
					Loading1.hide();
					result = JSON.parse(result);
					if (result.result == "success") {
						Alert1.content = "删除成功";
						Alert1.success = function() {
							window.location.href = 'getMemberList?jsonStr=' + json1;
						};
						Alert1.init();
						Alert1.show();

					} else {
						if (result.errorMsg == "") {
							var Msg = "删除失败";

						} else {

							var Msg = result.errorMsg;
						}
						Alert1.content = Msg;
						Alert1.success = function() {
							window.location.href = 'getMemberList?jsonStr=' + json1;
						};
						Alert1.init();
						Alert1.show();

					}
				},
				error: function() {
					Loading1.hide();
					Alert1.content = "提交失败！";
					Alert1.init();
					Alert1.show();
				}
			});
		};
		confirm1.show();
	});

});