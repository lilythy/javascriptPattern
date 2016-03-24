//1.最简单的实现方法
var Singleton = function(name){
	this.name = name;
	this.instance = null;
};

Singleton.prototype.getName = function(){
	alert(this.name);
};

Singleton.getInstance = function(name){
	if(!this.instance){
		this.instance = new Singleton();
	}
	return this.instance;
};

var a = Singleton.getInstance('seven1');
var b = Singleton.getInstance('seven2');
alert(a === b);   // true

//或者
var Singleton = function(name){
	this.name = name;
}

Singleton.prototype.getName = function(){
	alert(this.name);
}

Singleton.getInstance = (function(){
	var instance = null;
	return function(name){
		if(!instance){
			instance = new Singleton('name');
		}
		return instance;
	}
})();

var a = Singleton.getInstance('seven1');
var b = Singleton.getInstance('seven2');
alert(a === b);   // true

//2.透明的单例模式。上述简单的单例模式并不透明，必须要知道Singleton对象有getInstance方法可以创造单例，并不能直接new 
//下面代码负责在页面中创建唯一的div节点
var CreatDiv = (function(){
	var instance;
	var CreatDiv = function(html){
		if(instance){
			return instance;
		}
		this.html = html;
		this.init();
		return instance = this;
	};

	CreatDiv.prototype.init = function(){
		var div = document.createElement('div');
		div.innerHTML = this.html;
		document.body.appendChild(div);
	};
	return CreatDiv;
})();

var a = new CreatDiv('seven1');
var b = new CreatDiv('seven2');

alert(a === b);  //true

//虽然上述例子实现了单例透明，但是singleton构造函数没有做到职责单一，一个方法干了两件事情，第一，是创建对象和
//执行初始化init方法，第二是保证只有一个对象
//用代理模式实现单例模式可解决此问题
var CreatDiv = function(html){
	this.html = html;
	this.init();
};

CreatDiv.prototype.init = function(){
	var div = document.createElement('div');
	div.innerHTML = this.html;
	document.body.appendChild(div);
};

//接下来引入代理类ProxySingetonCreateDiv
var ProxySingetonCreateDiv = (function(){
	var instance;
	return function(){
		if(!instance){
			instance = new CreatDiv(html);
		}
		return instance;
	}
})();

var a = new ProxySingetonCreateDiv('seven1');
var b = new ProxySingetonCreateDiv('seven2');

alert(a === b);