var vm=new Vue({
	el:"#app",
	data:{
		productList:[],
		totalMoney:0,
		delFlag:false,
		checkAllFlag:false,
		curProduct:'',
		productName:''
	},
//	 filters:{
//	 	formatMoney:function(value){
//	 		return "￥"+value.toFixed(2);
//	 	}
//	 },
	mounted:function(){
		this.cartView();
	},
	methods:{
		cartView:function(){
			$.getJSON('php/shopcar.php',function (item) {
						console.log(item);
		            this.productList=item;
		           }.bind(this));
		},
		changeMoney:function(product,way){
			if(way>0){
				product.productQuantity++;
			}else{
				product.productQuantity--;
				if(product.productQuantity<1){
					product.productQuantity=1;
				}
			}
		this.calcTotalPrice();
		},
		selectProduct:function(item){
			if(typeof item.checked == 'undefined'){
//				Vue.set(item,"checked",true);        //全局注册
				this.$set(item,"checked",true);      //局部注册
//				item.checked= true;
			}else{
				item.checked = !item.checked;
			}
			
			this.calcTotalPrice();
		},
		
		checkAll:function (){
			this.checkAllFlag = !this.checkAllFlag;
			var _this=this;
			this.productList.forEach(function (item,index){
					if(typeof item.checked == 'undefined'){
						_this.$set(item,"checked",_this.checkAllFlag);  
					}else{
						item.checked = _this.checkAllFlag;
					}
				});
				this.calcTotalPrice();
		},
		calcTotalPrice:function(){
			var _this=this;
			this.totalMoney=0;
			this.productList.forEach(function(item,index){
				if(item.checked){
					console.log(item.shop_price)
					_this.totalMoney+=item.shop_price*item.productQuantity;
				}
			})
		},
		delConfirm:function (item){
//			alert(1)
			this.delFlag=true;
			this.curProduct=item;
			var goodsID=item.id;
			console.log(goodsID)
				if(this.delFlag){
						$.ajax({
							url:'php/removeCar1.php',
							method:"post",
							data:{goodsID:goodsID}
					    }).then(function(data){
							console.log(data)
					   });
				}else{}
		},
		delProduct:function (){
			var index=this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag=false;
		}
	}
	
});
// Vue.filter("money",function(value,type){
// 	return "￥"+value.toFixed(2)+type;
// })