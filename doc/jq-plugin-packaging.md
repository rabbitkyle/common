# jq 插件封装

```js
(function($) {

	// 动态生成plugin-id
	var index = 0;
	var guid = function() {
		return function() {
			return "plugin" + (Date.now() + index++).toString(16);
		};
	}();

	$.fn.[plugin-name] = [Func];

})(window.jQuery);
```