### 目录

* [`实现简单的数据双向绑定`](#实现简单的数据双向绑定)
* [`对象与原始类型进行比较`](#对象与原始类型进行比较)
* [`深度优先遍历与广度优先遍历`](#深度优先遍历与广度优先遍历)
* [`类数组转换为数组`](#类数组转换为数组)
* [`获取节点方式比较`](#获取节点方式比较)
* [`Function.prototype.bind`](#bind方法)
* [`hashKey`](#获取唯一key值)
* [`实现继承的几种方法`](#实现继承)
* [`函数防抖动`](#函数防抖动)
* [`函数节流`](#函数节流)

### 实现简单的数据双向绑定

#### 实现原理--Object.defineProperty()
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<input type="text" id="aa">
	<span id="bb"></span>
	<script>
		var obj = {};
		var template;
		Object.defineProperty(obj, 'hellow', {
			set: function(newValue) {
				document.getElementById("aa").value = newValue;
				template = newValue;
				document.getElementById("bb").innerHTML = newValue;
			},
			get: function() {
				return template;
			}
		});

		document.addEventListener('keyup', function(e) {
			obj.hellow = e.target.value;
		})
	</script>
</body>
</html>
```

### 对象与原始类型进行比较
```js
var a = {
	value: 2,
	toString: function() {
		return ++this.value
	}
}

if (a == 3 && a == 4) {
	console.log(233);
}

// 233
```
--对象与原始类型进行比较，会先将对象转换为原始类型，对象转换类型就是依据valueOf 和toStrig的返回值。
先调用valueOf返回它本身，不是原始类型，因此在调用toString，第一次判断 a == 3， toString执行 返回++2，就是3， 第二次 为4， 故进入if语句

### 深度优先遍历与广度优先遍历
```js
// 深度优先
function depthFistSearch(node) {
    if (!node) { return };
    let depth = arguments[1] || 0;
    console.log(node.name, node.level, depth);
    
    var items = node.children
    if (items) {
        items.map(function(d) {
            depthFistSearch(d, depth + 1);
        })
    }
}

//广度优先
function breadthFistSearch(node) {
    if (!node) { return };
    var queue = [{
        item: node,
        depth: 0
    }];

    while (queue.length) {
        var curNode = queue.shift();
        console.log(curNode.item.name, curNode.depth);

        var childList = curNode.item.children;
        if (childList) {
            childList.map(function(d) {
                queue.push({
                    item: d,
                    depth: curNode.depth + 1
                })
            })
        }
    }
}

//转树形结构
function formatTree(data) {
    var maps = {};
    var root = {
        name: "root",
        id: null,
        children: []
    };
    data.map(function(d) {
        maps[d.id] = d;
    });

    data.map(function(d) {
        var parent = maps[d.pid];
        if (parent) {
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(d);
        } else {
            root.children.push(d);
        }
    });

    addLev(root, 0);
    return root;
}

function addLev(node, index) {
    if (!node) { return; }
    node.level = index;
    if (node.children) {
        node.children.map(function(d) {
            addLev(d, index + 1);
        })
    }
}

// 数据源
var data = [
    {id: 0, pid: null, name: "web前端大组"},
    {id: 11, pid: 3, name: "尼古拉斯·赵四"},
    {id: 8, pid: 2, name: "rabbit"},
    {id: 3, pid: 0, name: "应用组"}, 
    {id: 5, pid: 1, name: "李四"},
    {id: 2, pid: 0, name: "业务组"},
    {id: 7, pid: 2, name: "cookie"},
    {id: 12, pid: null, name: "Java组"},
    {id: 4, pid: 1, name: "张三"},
    {id: 9, pid: 2, name: "kyle"},
    {id: 6, pid: 1, name: "王麻子"},
    {id: 10, pid: 2, name: "stan"},
    {id: 1, pid: 0, name: "UI组"}
];

var treeData = formatTree(data);

depthFistSearch(treeData);

breadthFistSearch(treeData);

console.log(treeData)
```

### 类数组转换为数组

* Array.from();
* Array.prototype.slice.call();

```js
const nodeList = $("div.items");
Array.from(nodeList).map(d => condole.log(d));
Array.prototype.slice.call(nodeList).forEach(function(d) {
    console.log(d);
});
```

### 获取节点方式比较

    querySelectorAll , getElementByClassName , jq $("div")

querySelectorAll, jq $("div")为静态节点， getElementByClassName为动态节点， 删除节点后，静态节点不变， 动态节点会改变；
* html

```html
    <div class="items">1</div>
    <div class="items">2</div>
    <div class="items">3</div>
    <div class="items">4</div>
    <div id="target" class="items">5</div>
```
* js

```js
var nodeList = document.querySelectorAll('div.items');
var domList = document.getElementByClassName("items");
var jqDomList = $(".items");

setTimeout(function() {
    $("#target").remove();
    console.log(nodeList);
    console.log(domList);  // 为删除节点后的集合
    console.log(jqDomList);
}, 2000)
```
### bind方法
```js
Function.prototype.bind = function(context) {
    var self = this;
    return function() {
        self.apply(context, arguments);
    }
};

function sayHi() {
    console.log(this.a);
};

var a = 5;
var obj = {
    a: 8
};

sayHi();    // 5

var fn = sayHi.bind(obj);

fn();    // 8

```
### 获取唯一key值
```js
function hash(key) {
    let hashValue = 0;
    const stringTypeKey = `${key}${typeof key}`;
    for (let index = 0; index < stringTypeKey.length; index++) {
      const charCode = stringTypeKey.charCodeAt(index);
      hashValue += charCode << (index * 8);
    }
    return hashValue;
}

hash('1');

```

### 实现继承


1. 构造函数的继承---构造函数绑定

```js
function Animal() {
    this.type = "动物";
}

function Cat(name, color) {
    Animal.apply(this, arguments);
    this.name = name;
    this.color = color;
}

var cat1 = new Cat("大毛","黄色");

alert(cat1.type); // 动物
```

2. 构造函数的继承---prototype模式

```js
function extend(Child, Parent) {
    var F = function() {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}

extend(Cat, Animal);
```

3. 非构造函数的继承---拷贝继承

```js
    // 非构造函数的继承
    var Chinese = {
　　　　nation:'中国'
　　};

    var Doctor ={
　　　　career:'医生'
　　}

　　function object(o) {

　　　　function F() {}

　　　　F.prototype = o;

　　　　return new F();

　　}

    var Doctor = object(Chinese);
    alert(Doctor.nation); //中国


    // 深拷贝继承
    function deepCopy(p, c) {

　　　　var c = c || {};

　　　　for (var i in p) {

　　　　　　if (typeof p[i] === 'object') {

　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};

　　　　　　　　deepCopy(p[i], c[i]);

　　　　　　} else {

　　　　　　　　　c[i] = p[i];

　　　　　　}
　　　　}

　　　　return c;
　　}

```

### 函数防抖动

```js
// 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间。
// func是用户传入需要防抖的函数
// wait是等待时间
const debounce = (func, wait = 50) => {
  	let timeout = null;
	return function (e) {
		// 每当用户输入的时候把前一个 setTimeout clear 掉
		clearTimeout(timeout); 
		// 然后又创建一个新的 setTimeout, 这样就能保证interval 间隔内如果时间持续触发，就不会执行 fn 函数
		timeout = setTimeout(() => {
			func.apply(this, arguments);
		}, wait);
	};
}
```

### 函数节流
```js
// 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率。
function throttle(func, delay){
    let flag = true;
	return function (e) {
		if (!flag) {
			return
		}
		flag = false;
		setTimeout(() => {
			func.apply(this, arguments);
			flag = true;
		}, delay);
	};
}
```

