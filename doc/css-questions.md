# 左边定宽，右边自适应

```html
<body>
	<div class="left"></div>
	<div class="right"></div>
</body>
```

## 实现方式

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

# 清浮动

```css
.clearfix::after {
  	content: '';
  	display: block;
  	clear: both;
}
```

### `inline`和`inline-block`有什么区别？

我把`block`也加入其中，为了获得更好的比较。

|                                 | `block`                                                     | `inline-block`                             | `inline`                                                                                                           |
| ------------------------------- | ----------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| 大小                            | 填充其父容器的宽度。                                        | 取决于内容。                               | 取决于内容。                                                                                                       |
| 定位                            | 从新的一行开始，并且不允许旁边有 HTML 元素（除非是`float`） | 与其他内容一起流动，并允许旁边有其他元素。 | 与其他内容一起流动，并允许旁边有其他元素。                                                                         |
| 能否设置`width`和`height`       | 能                                                          | 能                                         | 不能。 设置会被忽略。                                                                                              |
| 可以使用`vertical-align`对齐    | 不可以                                                      | 可以                                       | 可以                                                                                                               |
| 边距（margin）和填充（padding） | 各个方向都存在                                              | 各个方向都存在                             | 只有水平方向存在。垂直方向会被忽略。 尽管`border`和`padding`在`content`周围，但垂直方向上的空间取决于'line-height' |
| 浮动（float）                   | -                                                           | -                                          | 就像一个`block`元素，可以设置垂直边距和填充。                                                                      |
