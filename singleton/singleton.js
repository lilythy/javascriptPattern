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
var Singleton1 = function(name){
	this.name = name;
}

Singleton1.prototype.getName = function(){
	alert(this.name);
}

Singleton1.getInstance = (function(){
	var instance = null;
	return function(name){
		if(!instance){
			instance = new Singleton1('name');
		}
		return instance;
	}
})();

var a = Singleton1.getInstance('seven1');
var b = Singleton1.getInstance('seven2');
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
var CreatDiv1 = function(html){
	this.html = html;
	this.init();
};

CreatDiv1.prototype.init = function(){
	var div = document.createElement('div');
	div.innerHTML = this.html;
	document.body.appendChild(div);
};

//接下来引入代理类ProxySingetonCreateDiv
var ProxySingetonCreateDiv = (function(){
	var instance;
	return function(){
		if(!instance){
			instance = new CreatDiv1(html);
		}
		return instance;
	}
})();

var a = new ProxySingetonCreateDiv('seven1');
var b = new ProxySingetonCreateDiv('seven2');

alert(a === b);

/*前面的单例更多地接近于传统面向对象语言，是以类为中心的，比如java中，如果需要某个对象，就必须先定义一个类，对象就是从类中创建而来的，
 而javascript是“无类”语言，因此生搬单例模式并无意义*/
/*单例模式的核心是确保只有一个实例，并提供全局访问。
 * 在javascript开发中，我们经常会把全局变量当做单例来使用，但全局变量很容易造成命名空间污染和变量冲突，所以可以用以下几种方式降低污染*/

//1.使用命名空间（适当地将属性和方法放入命名空间，并不会杜绝全局变量，但可以减少全局变量的数量），如：
var namespace1 = {
	a:function(){
		alert(1);
	},
	b:function(){
		alert(2);
	}
}
//或者动态地创建命名空间
var myapp = {};
myapp.namespace = function(name){
	var parts = name.split('.');
	var current = myapp;
	for(var i in parts){
		if(!current[parts[i]]){
			current[parts[i]] = {};
		}
		current = current[parts[i]];
	}
};

myapp.namespace('event');
myapp.namespace('dom.style');
//上述代码等价于：
var myapp = {
	event:{},
	dom:{
		style:{}
	}
};

//2.使用闭包封装私有变量（这种方法把一些变量封装在闭包的内部，只暴露一些接口跟外界通信）
var user = (function(){
	var _name = 'seven',
			_age = 27;
	return {
		getUserInfo:function(){
			return _name + '-' + _age;
		}
	}
})();

/*惰性单例是单例模式的重点。惰性单例指的是在需要的时候才创建对象实例，
 而不是在页面加载好的时候就创建，白白浪费DOM节点。*/
//传统面向对象惰性单例模式如上述的Singleton.getInstance，我们再来回忆一次代码
Singleton.getInstance = function(){
	var instance = null;
	return function(name){
		if(!instance){
			instance = new Singleton(name);
		}
		return instance;
	}
}

//下面介绍javascript中与全局变量结合实现惰性的单例
var createLoginLayer = (function(){
	var div;
	return function(){
		if(!div){
			div = document.createElement('div');
			div.innerHTML = '我是登录框';
			div.style.display = 'none';
			document.body.appendChild(div);
		}
		return div;
	}
})();

//上面完成了一个可用的单例模式，但是违法了单一职责原则，创建对象和管理单例的逻辑都放在了createLoginLayer对象内部。
//把如何管理单例的逻辑从原来的代码中抽离出来，封装在getSingle内
var getSingle = function(fn){
	var result;
	return function(){
		return result || (result = fn.apply(this,arguments));
	}
};

var createLoginLayer = function(){
	var div = document.createElement('div');
	div.innerHTML = '我是登录框';
	div.style.display = 'none';
	document.body.appendChild(div);
	return div;
}

var createSinleLoginLayer = getSingle(createLoginLayer);

document.getElementById("loginBtn").onclick = function(){
	var loginLayer = createSinleLoginLayer();
	loginLayer.style.display = 'block';
}
