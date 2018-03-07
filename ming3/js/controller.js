angular.module('Controllers', [])
// 本周新品
.controller('TodayController', ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

	$http({
		url: 'php/test2.php', // 请求地址，解决跨域问题
		
	}).then(function (data) {
//		 console.log(data);
		// 日期
	$scope.navs=data.data;
	});
}])
//每周小物
.controller('OlderController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
	$http({
		url: 'php/week.php', 
	}).then(function (info) {
		$scope.dat = info.data;
//     console.log(info);
	});
}])
//
////精品推荐
.controller('listController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
	$http({
		url: 'php/high.php', // 
	}).then(function (info) {
//		console.log(info);
		$scope.posts = info.data;
	});
}])
//// 商品详情
.controller('DemoController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) { 
	$http({
		url: 'php/xiang.php', // 
	}).then(function (info) {
		console.log(info);	
		$scope.buy = info.data[0];
	
		$("#ajax_get").on("click",function(){
			var buya=info.data[0].id;
		var use=sessionStorage.id;
		var tu1=info.data[0].comm_picture;
		var shop_na=info.data[0].comm_name;
	    var shop_pri=info.data[0].comm_price;
	    var num=document.querySelector('#num span:nth-child(2)').innerText;
	    console.log(num)
	   $.ajax({		
		url:"php/shop.php",
		data:{shang_id:buya,user:use,tu:tu1,name:shop_na,price:shop_pri,numbe:num},
		type:"post",
		
	   });	
		})
		
	});
	
}])
