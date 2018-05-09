#实现简单的数据双向绑定

##实现原理--Object.defineProperty()
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

#对象与原始类型进行比较
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
-- 对象与原始类型进行比较，会先将对象转换为原始类型，对象转换类型就是依据valueOf 和toStrig的返回值。
先调用valueOf返回它本身，不是原始类型，因此在调用toString，第一次判断 a == 3， toString执行 返回++2，就是3， 第二次 为4， 故进入if语句