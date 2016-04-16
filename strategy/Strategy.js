/*策略模式的定义是：定义一系列的算法，把它们一个个封装起来，并且使他们可以相互替换。*/

/*下面以计算年终奖为例，根据工资基数和年度绩效来计算年终奖。*/
//1.最初的代码实现
var calculateBonus = function(performanceLevel,salary){
	if(performanceLevel === 'S'){
		return salary*4;
	}
	if(performanceLevel === 'A'){
		return salary*3;
	}
	if(performanceLevel === 'B'){
		return salary*2;
	}
};
calculateBonus('B',20000);

/*上述代码非常简单，但存在显而易见的缺点：
①calculateBonus函数较庞大，且包含了很多if-else语句；
②calculateBonus函数缺乏弹性，如果增加绩效等级C，或想将绩效S的奖金系数改为5，必须深入函数的内部实现，这是违反开放-封闭原则的。*/

//2.使用组合函数重构这段代码
var performanceS = function(salary){
	return salary*4;
}

var performanceA = function(salary){
	return salary*3;
}

var performanceB = function(salary){
	return salary*2;
}

var calculateBouns1 = function(performanceLevel,salary){
	if(performanceLevel === 'S'){
		return performanceS(salary);
	}
	if(performanceLevel === 'A'){
		return performanceA(salary);
	}
	if(performanceLevel === 'B'){
		return performanceB(salary);
	}
};
calculateBouns1('A',10000);

/*上述代码虽然使得得到一定的改善，但calculateBouns1函数还是可能越来越庞大，而且缺乏弹性。
* 下面我们考虑用策略模式来重构代码，策略模式的程序由两部分组成，第一部分是一组策略类，策略类封装了具体的算法；
* 第二部分是环境类Context，Context接受客户的请求，随后把请求委托给策略类。*/

//3.1模仿传统面向对象语言的实现
var PerformanceS = function(){};
PerformanceS.prototype.calculate = function(salary){
	return salary*4;
}

var PerformanceA = function(){};
PerformanceA.prototype.calculate = function(salary){
	return salary*3;
}

var PerformanceB = function(){};
PerformanceB.prototype.calculate = function(salary){
	return salary*2;
}

var Bonus = function(){
	this.salary = null;
	this.strategy = null;
}
Bonus.prototype.setSalary = function(salary){
	this.salary = salary;
}

Bonus.prototype.setStrategy = function(strategy){
	this.strategy = strategy;
}

Bonus.prototype.getBonus = function(){
	return this.strategy.calculate(this.salary);
}
//调用
var bonus = new Bonus();
bonus.setSalary(10000);
bonus.setStrategy(new PerformanceS());
console.log(bonus.getBonus()); //输出40000

//3.2 Javascript版本的策略模式
var strategies = {
	'S':function(salary){
		return salary*4;
	},
	'A':function(salary) {
		return salary * 3;
	},
	'B':function(salary) {
		return salary * 2;
	}
};

var calculateBonus2 = function(level,salary){
	return strategies[level](salary);
}

console.log(calculateBonus2('S',20000));  //输出80000

