/*代理模式的关键是，当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问，
* 客户实际上访问的是替身对象。替身对象对请求做出一些处理之后，再把请求转交给本体对象。*/

//1.第一个例子，小明追MM的故事
/*小明有个喜欢的女孩为A，他想给A送一束花来表白。刚好小明打听到A和他有一个共同的朋友B，于是内向的小明决定让B来代替自己完成送花这件事。
* （虽然小明的故事必然以悲剧收场，因为追MM更好的方式是送一辆宝马，嘻嘻）*/
var Flower = function(){};

var xiaoming = {
	sendFlower:function(target){
		var flower = new Flower();
		target.receiveFlower(flower);
	}
};

var B = {
	receiveFlower:function(flower){
		A.receiveFlower(flower);
	}
};

var A = {
	receiveFlower:function(flower){
		console.log('收到花 ' + flower);
	}
};

xiaoming.sendFlower(B);

/*上述代码，代理模式只是简单地把请求转交给本体。假设A在心情好的时候收到花的成功几率为60%，而在心情差的时候收到花的成功几率几乎为0.则需要B今天A的心情。*/
var Flower1 = function(){};

var xiaoming1 = {
	sendFlower:function(target){
		var flower = new Flower();
		target.receiveFlower(flower);
	}
};

var B1 = {
	receiveFlower:function(flower){
		A1.listenGoodMood(function(){
			A1.receiveFlower(flower);
		});
	}
};

var A1 = {
	receiveFlower:function(flower){
		console.log('收到花 ' + flower);
	},
	listenGoodMood:function(fn){
		setTimeout(function(){
			fn();
		},10000);
	}
};

xiaoming1.sendFlower(B1);

/*保护代理：代理B可以帮助A过滤掉一些请求，比如送花的人中年龄太大的或者没有宝马的。
* 虚拟代理：虚拟代理把一些开销很大的对象，延迟到真正需要它的时候才去创建。
* 下面为虚拟代理的例子：*/
var B2 = {
	receiveFlower:function(flower){
		A1.listenGoodMood(function(){
			var flower = new Flower();  //延迟创建flower对象
			A.receiveFlower(flower);
		});
	}
}

