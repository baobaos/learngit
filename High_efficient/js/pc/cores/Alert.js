// 提示盒封装
//基础Alert封装

function Alert() {
	//设置内容
	this.content = "提示内容";
	//设置头部内容
	this.contenthead = "提示信息";
	//创建黑色遮挡层*
	this.abs_bg = document.createElement("div");
	//创建提示框面板
	this.panel = document.createElement("div");
	//创建提示框box
	this.panelbox = document.createElement("div");
	//创建提示内容头部
	this.contentHead = document.createElement("div");
	//创建提示内容组件
	this.contentNode = document.createElement("div");
	//创建按钮box
	this.confirmBox = document.createElement("div");
	//创建确定按钮组件
	this.confirmBtn = document.createElement("a");
	//为黑色遮挡层添加类*
	this.abs_bg.className = 'abs_bg';
	//为提示框添加类
	this.panel.className = 'alert';
	//为提示框box加类
	this.panelbox.className = "alert_box"
	//为内容头部添加类
	this.contentHead.className = 'alert_contenthead';
	//为内容添加类
	this.contentNode.className = 'alert_content';
	//为按钮盒添加类
	this.confirmBox.className = "alert_btn"
	//为确定按钮添加类
	this.confirmBtn.className = 'alert_confirm';
	//点击确定按钮执行方法 如果data中有success方法则为success方法，否则为空函数
	this.success = function() {};
	//添加加载方法	    
};

Alert.prototype.init = function() {
	//生成提示框 *
	//为提示内容添加文本
	this.contentNode.innerHTML = this.content;
	this.contentHead.innerHTML = this.contenthead
	this.panel.appendChild(this.panelbox); //将基本面板添加到提示框面板	  
	this.panelbox.appendChild(this.contentHead); //将基本面板添加到提示框面板
	this.panelbox.appendChild(this.contentNode); //将基本面板添加到提示框面板
	this.panelbox.appendChild(this.confirmBox); //将按钮盒插入到提示框面板
	this.confirmBox.appendChild(this.confirmBtn); //将按钮插入到按钮盒
	//为确定按钮添加文案
	this.confirmBtn.innerHTML = '确定';
	//默认隐藏弹出盒
	this.panel.style.display = "none";
	this.abs_bg.style.display = "none";
	//插入页面中
	document.body.appendChild(this.panel);
	document.body.appendChild(this.abs_bg);
	//绑定事件
	this.bindEvent();
};

Alert.prototype.bindEvent = function() {
	var me = this;
	this.confirmBtn.onclick = function() {
		//执行关闭确认方法
		me.success();
		//隐藏弹层
		me.hide();
	}
}

Alert.prototype.hide = function() {
	this.panel.style.display = "none";
	this.abs_bg.style.display = "none";
}

Alert.prototype.show = function() {
	this.panel.style.display = "block";
	this.abs_bg.style.display = "block";
}



//基础Confirm封装*******************************************************

function Confirm() {
	//继承Alert类
	Alert.call(this);
	//创建关闭按钮组件
	this.closeBtn = document.createElement("a");
	//为关闭按钮添加类
	this.closeBtn.className = 'alert_close';
	//点击关闭按钮执行方法
	this.fail = function() {};
};

//继承基类原型
Confirm.prototype = new Alert();

//向init方法添加取消按钮
Confirm.prototype.init = function() {
	//为关闭按钮添加文案
	this.closeBtn.innerHTML = '取消';
	this.confirmBox.appendChild(this.closeBtn); //将按钮插入到按钮盒

	//继承基类init方法	 
	Alert.prototype.init.call(this);


}

//向bindEvent方法添加取消按钮事件
Confirm.prototype.bindEvent = function() {
	var me = this;
	Alert.prototype.bindEvent.call(this);
	//关闭按钮点击事件
	this.closeBtn.onclick = function() {
		//执行关闭取消方法
		me.fail();
		//隐藏弹层
		me.hide();
	}
}


//基础关注公众账号提示封装*******************************************************

function Attention() {
	//继承Alert类
	Alert.call(this);
	//创建引导图标组件
	this.Guide_img = document.createElement("img");
	//为引导图标添加路径
	this.Guide_img.src = '../../images/public/jt.png';
	//为引导图标添加类
	this.Guide_img.className = 'guide_img';
}

//继承基类原型
Attention.prototype = new Alert();

//向init方法添加取消按钮
Attention.prototype.init = function() {
	//继承基类init方法	 
	Alert.prototype.init.call(this);
	this.panel.appendChild(this.Guide_img); //将引导图标到文本框基本样式板	 
}


//点击放大图*******************************************************
var Picture1 = function() {
		//创建黑色遮挡层*
		this.abs_bg = document.createElement("div");
		//创建弹出盒
		this.abs_img = document.createElement("div");
		//创建返回按钮组件
		this.returnBtn = document.createElement("a");
		//创建删除按钮组件
		this.delBtn = document.createElement("a");
		//创建放大图盒
		this.big_img = document.createElement("div");
		//创建大图标签
		this.img = document.createElement("img");
		//添加img图片路径
		this.img.src = "";
		//为遮挡层加名称
		this.abs_bg.className = 'abs_bg';
		//为提示框添加类
		this.abs_img.className = 'abs_img';
		//为提示框box加类
		this.returnBtn.className = "return"
		//为内容头部添加类
		this.delBtn.className = 'del';
		//为内容添加类
		this.big_img.className = 'big_img';
		//点击返回按钮执行方法
		this.success = function() {};
		//点击删除按钮执行方法
		this.fail = function() {};
	}

Picture1.prototype.init = function() {
	//生成提示框 *
	//为提示内容添加文本
	this.abs_img.appendChild(this.returnBtn); //将基本面板添加到提示框面板	  
	this.abs_img.appendChild(this.delBtn); //将基本面板添加到提示框面板
	this.abs_img.appendChild(this.big_img); //将基本面板添加到提示框面板
	this.big_img.appendChild(this.img); //将按钮盒插入到提示框面板
	//默认隐藏弹出盒
	this.abs_img.style.display = "none";
	this.abs_bg.style.display = "none";
	//插入页面中
	document.body.appendChild(this.abs_img);
	document.body.appendChild(this.abs_bg);
	//绑定事件
	this.bindEvent();
};

Picture1.prototype.bindEvent = function() {
	var me = this;
	this.returnBtn.onclick = function() {
		//执行关闭确认方法
		me.success();
		//隐藏弹层
		me.hide();
	}

	this.delBtn.onclick = function() {
		//执行关闭确认方法
		me.fail();
		//隐藏弹层
		me.hide();
	}
}

Picture1.prototype.hide = function() {
	this.abs_img.style.display = "none";
	this.abs_bg.style.display = "none";
}

Picture1.prototype.show = function() {
	this.abs_img.style.display = "block";
	this.abs_bg.style.display = "block";
} /*单纯的放大图*/
var Picture2 = function() {
		//创建黑色遮挡层*
		this.abs_bg = document.createElement("div");
		//创建弹出盒
		this.abs_img = document.createElement("div");
		//创建返回按钮组件
		this.returnBtn = document.createElement("a");
		//创建放大图盒
		this.big_img = document.createElement("div");
		//创建大图标签
		this.img = document.createElement("img");
		//添加img图片路径
		this.img.src = "";
		//为遮挡层加名称
		this.abs_bg.className = 'abs_bg';
		//为提示框添加类
		this.abs_img.className = 'abs_img';
		//为提示框box加类
		this.returnBtn.className = "return"
		//为内容添加类
		this.big_img.className = 'big_img2';
		//点击返回按钮执行方法
		this.success = function() {};
		//点击删除按钮执行方法
		this.fail = function() {};
	}

Picture2.prototype.init = function() {
	//生成提示框 *
	//为提示内容添加文本
	this.abs_img.appendChild(this.returnBtn); //将基本面板添加到提示框面板	  
	this.abs_img.appendChild(this.big_img); //将基本面板添加到提示框面板
	this.big_img.appendChild(this.img); //将按钮盒插入到提示框面板
	//默认隐藏弹出盒
	this.abs_img.style.display = "none";
	this.abs_bg.style.display = "none";
	//插入页面中
	document.body.appendChild(this.abs_img);
	document.body.appendChild(this.abs_bg);
	//绑定事件
	this.bindEvent();
};

Picture2.prototype.bindEvent = function() {
	var me = this;
	this.returnBtn.onclick = function() {
		//执行关闭确认方法
		me.success();
		//隐藏弹层
		me.hide();
	}
}

Picture2.prototype.hide = function() {
	this.abs_img.style.display = "none";
	this.abs_bg.style.display = "none";
}

Picture2.prototype.show = function() {
	this.abs_img.style.display = "block";
	this.abs_bg.style.display = "block";
}
//loading*******************************************************
var Loading = function() {
		//创建黑色遮挡层*
		this.abs_bg = document.createElement("div");
		//创建弹出盒
		this.loader = document.createElement("div");
		this.loader_inner = document.createElement("div");
		this.loader_img = document.createElement("img");
		this.loader_img.src = "images/public/loading.gif";
		this.abs_bg.className = 'abs_bg';
		//为提示框添加类
		this.loader.className = 'loader';
		this.loader_inner.className = 'loader-inner ball-spin-fade-loader';
	}

Loading.prototype.init = function() {
	//生成提示框 *
	//循环添加8个div
	this.loader_inner.appendChild(this.loader_img);
	this.loader.appendChild(this.loader_inner); //将基本面板添加到提示框面板	 
	//默认隐藏弹出盒
	this.loader.style.display = "none";
	this.abs_bg.style.display = "none";
	//插入页面中
	document.body.appendChild(this.loader);
	document.body.appendChild(this.abs_bg);
};

Loading.prototype.hide = function() {
	this.loader.style.display = "none";
	this.abs_bg.style.display = "none";
}

Loading.prototype.show = function() {
	this.loader.style.display = "block";
	this.abs_bg.style.display = "block";
}

//code******************************************************

var Code = function() {
		//创建黑色遮挡层*
		this.abs_bg = document.createElement("div");
		//创建弹出盒
		this.loader = document.createElement("div");
		this.loader_inner = document.createElement("div");
		//创建返回按钮组件
		this.returnBtn = document.createElement("a");
		this.canvas_box = document.createElement("div");
		this.img = document.createElement("img");
		this.abs_bg.className = 'abs_bg';
		//为提示框添加类
		this.loader.className = 'abs_img';
		this.canvas_box.id = "container";
		this.loader_inner.className = 'code-inner';
		this.img.id = "code_img";
		//为提示框box加类
		this.returnBtn.className = "return";
		//点击返回按钮执行方法
		this.success = function() {};
	}

Code.prototype.init = function() {
	//生成提示框 *	 
	this.loader_inner.appendChild(this.returnBtn); //将基本面板添加到提示框面板
	this.loader_inner.appendChild(this.canvas_box);
	this.loader.appendChild(this.loader_inner); //将基本面板添加到提示框面板	 
	//默认隐藏弹出盒
	this.loader.style.display = "none";
	this.abs_bg.style.display = "none";
	//插入页面中
	document.body.appendChild(this.loader);
	document.body.appendChild(this.abs_bg);
	//绑定事件
	this.bindEvent();
};

Code.prototype.bindEvent = function() {
	var me = this;
	this.returnBtn.onclick = function() {
		//执行关闭确认方法
		me.success();
		//隐藏弹层
		me.hide();
	}
}

Code.prototype.hide = function() {
	this.loader.style.display = "none";
	this.abs_bg.style.display = "none";
}

Code.prototype.show = function() {
	this.loader.style.display = "block";
	this.abs_bg.style.display = "block";
}