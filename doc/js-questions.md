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