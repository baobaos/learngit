 var app=angular.module("app",["ngRoute","Controllers"]);
// app.config(["$routeProvider",function($routeProvider){
// 	$routeProvider.when('/today', {
//		templateUrl: 'views/old.html',
//		controller: 'TodayController'
//	})
//	.when('/older', {
//		templateUrl: 'views/wang.html',
//		controller: 'OlderController'
//	})
//  .when('/author', {
////		templateUrl: 'views/list.html',
//		 controller: 'listController'
//	})
//	.when('/category', {
////		templateUrl: 'views/center.html',
//		 controller: 'DemoController'
//	})
//	.otherwise({
//		redirectTo: '/today'
//	});
// }]);
// 
// app.run(['$rootScope', function ($rootScope) {
//	// 设置类名初始值
//	$rootScope.collapsed = false;
//
//	// 全局方法
//	$rootScope.toggle = function () {
//		// console.log(1);
//		// 改变类名初始值
//		$rootScope.collapsed = !$rootScope.collapsed;
//
//		// 获取所有导航
//		var navs = document.querySelectorAll('.navs dd');
//
//		if($rootScope.collapsed) {
//			// console.log('打开');
//			for(var i=0; i<navs.length; i++) {
//				navs[i].style.transform = 'translate(0)';
//				navs[i].style.transitionDelay = '0.2s';
//				navs[i].style.transitionDuration = (i + 1) * 0.15 + 's';
//			}
//		} else {
//			// console.log('关闭');
//			// 6 
//			// 6 - 1
//			var len = navs.length - 1;
//			for(var j=len; j>0; j--) {
//				// console.log(navs.length - j + 1);
//				navs[j].style.transform = 'translate(-100%)';
//				navs[j].style.transitionDelay = '';
//				navs[j].style.transitionDuration = (len - j) * 0.15 + 's';
//			}
//		}
//	}
//
//
//}]);