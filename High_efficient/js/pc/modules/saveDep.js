/* 
 *添加部门js文件
 *创建人：孟令超
 *创建日期:2017/02/15
 *@修改人：xzx     @修改时间：2017.4.27    @修改原因：frame框架跳转登陆页面跳转不出去    @修改位置或名称：交互事件添加cookie判断
 */

$(function() {
	var Loading1 = new Loading();
	Loading1.init();
	var Alert1 = new Alert();
	$("#subimt").click(function() {
		//判断cookie是否过期
		overdue();
		if ($("#departmentname").val() == "") {
			Alert1.content = "请输入部门名称";
			Alert1.init();
			Alert1.show();
			return
		}
		if ($("#department").val() == "") {
			Alert1.content = "请选择部门";
			Alert1.init();
			Alert1.show();
			return
		}
		var json = {
			depName: "",
			parentId: "",
			depId:""
		};
		json.depName = $("#departmentname").val();
		json.parentId = $("#department").attr("sid");
		json.depId = $("#departmentname").attr("depId");
		json = JSON.stringify(json);
		var json1 = {
			"pageNow": 1,
			"pageSize": 10
		};
		json1 = JSON.stringify(json1);
		Loading1.show();
		$.ajax({
			type: 'post',
			url: 'saveDep',
			data: {
				'jsonStr': json
			},
			success: function(result) {
				result = JSON.parse(result);
				if (result.result == "success") {
					Alert1.content = "修改成功！";
					Alert1.success = function() {
						window.location.href = 'getDepList?jsonStr=' + json1;
					};
					Alert1.init();
					Alert1.show();
				} else {
					if (result.errorMsg == "") {
						var Msg = "修改失败";
					} else {
						var Msg = result.errorMsg;
					}
					Alert1.content = Msg;
					Alert1.success = function() {
						window.location.href = 'getDepList?jsonStr=' + json1;
					};
					Alert1.init();
					Alert1.show();
				}
			},
			error: function() {
				Loading1.hide();
				Alert1.content = "修改失败请联系管理员！";
				Alert1.init();
				Alert1.show();
			}
		});
	});
});