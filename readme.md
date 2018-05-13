# workspace :  storage daily code
### content
* [`ColorGradient获取颜色渐变色`](#ColorGradient获取颜色渐变色)









































### ColorGradient获取颜色渐变色
```js
	var options = {
		values: [-1, 0, 2],
		colors: ["rgba(255, 0, 0, 1)", "rgba(0, 255, 0, 1)", "rgba(0, 0, 255, 1)"],
		count: 100
	}
	var ColorGradient = new ColorGradient(options);

	var targetColor = ColorGradient.getColor(-0.4);
	var colorList = ColorGradient.getColorList();
```
