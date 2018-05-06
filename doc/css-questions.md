#左边定宽，右边自适应

```html
<body>
	<div class="left"></div>
	<div class="right"></div>
</body>
```

##实现方式

	1. flex

```css
	body {
		display: flex;
	}

	.left {
		width: 20px;
		height: 200px;
		background-color: #FF6663;
	}
	.right {
		height: 200px;
		flex: 1;
		background-color: #eee;
	}
```

	2. float + margin

```css
	.left {
		width: 200px;
		height: 200px;
		background-color: #FF6663;
	}
	.right {
		float: left;
		margin-left: 200px;
		height: 200px;
		background-color: #eee;
	}
```
