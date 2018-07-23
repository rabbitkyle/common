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

	function draw() {
		// do something

		return {
			// some function
			action: function() {

			},
			action2: function() {

			}
		}
	}

	$.fn.draw = draw;

})(window.jQuery);
```

# jq 链式操作

```js
function Animal() {

	function eat() {
		console.log("eat");
		return api;
	}

	function sleep() {
		console.log("sleep");
		return api;
	}

	function play() {
		console.log("play");
		return api;
	}

	var api = {
		eat: eat,
		sleep: sleep,
		play: play
	};

	return api;
	
}
```