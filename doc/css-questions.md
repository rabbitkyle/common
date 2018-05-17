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

# flex布局

在 Flexbox 模型中，有三个核心概念：
– flex 项（愚人码头注：也称 flex 子元素），需要布局的元素
– flex 容器，其包含 flex 项
– 排列方向（direction），这决定了 flex 项的布局方向

将一个 display: flex 属性添加到一个元素上，默认情况下，所有的直接子元素都被认为是 flex 项，并从左到右依次排列在一行中。如果 flex 项的宽度总和大于容器，那么 flex 项将按比例缩小，直到它们适应 flex 容器宽度

## *DOM*
```html
<div class="flex-container">
	<div class="flex-items">1</div>
	<div class="flex-items">2</div>
	<div class="flex-items">3</div>
</div>
```

## *flex*
```css
.flex-container {
	display: flex;  /* inline-flex */
}
```

## *flex-direction*
```css
.flex-container {
	flex-direction: column; /* column-reverse, row, row-reverse*/
}
```

## *justify-content*
```css
.flex-container {
	justify-content: flex-start; /* flex-end, center, space-evenly(间隙均分), space-round(dobule size), space-between(左右与相邻边距不一定相等) */
}
```

## *flex项水平垂直居中*
```css
.flex-container {
	justify-content: center;
	align-items: center;
}
```

## *某个特殊flex项*
```css
.flex-items {
	align-self: flex-end; /* flex-start, center */
}
```

## *flex 项多行/列排列*
```css
.flex-container {
	flex-wrap: wrap; /* wrap-reverse */
}
```

## *多行/列排列的 flex 项在交叉轴上的对齐方式*
```css
.flex-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-content: space-evenly;
}
```

## *拉伸 flex 项*
```css
.flex-items {
	flex-grow: 1; /* 默认为1，0则不拉伸， 只有在 flex 容器中有剩余空间时才会生效*/
}
```

## *收缩flex项*
```css
.flex-items {
	flex-shrink: 1; /* 默认为1，0则不收缩， 只有在 flex 容器中空间不足时才会生效*/
}
```

## *设置flex项的大小*
```css
.flex-container {
  	display: flex;
}
.flex-item.nth-of-type(1) {
  	flex-basis: 200px;
}
.flex-item.nth-of-type(2) {
  	flex-basis: 10%;
}
```

## *将 flex-grow, flex-shrink, 和 flex-basis 放在一起*
```css
.flex-container {
  	display: flex;
}
.flex-item:nth-of-type(1) {
  	flex: 1 0 100px;
}
.flex-item:nth-of-type(2) {
  	flex: 2 0 10%;
}
```
