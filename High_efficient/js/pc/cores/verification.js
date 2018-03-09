// 表单校验方法

/***定义静态类***/
var Verification = {};
Verification.character = (function() {
	var Return = {
		Arr: [],
		//公有属性
		Method: function() { //公有方法
			return privateMethod(); //调用私用方法

		}
	}; //定义返回的公有对象 

	var privateMethod = function() { //私有方法
			var Field = false; //ture 出现特殊字符
			var myReg = /^[^@\/\'\\\"#$%&\^\*]+$/;
			for (var i = 0; i < Return.Arr.length; i++) {
				if (!myReg.test(Return.Arr[i])) {

					Field = !myReg.test(Return.Arr[i]);
					break;
				}
			}
			return Field;
		}

	return Return; //生成公有静态元素

})();