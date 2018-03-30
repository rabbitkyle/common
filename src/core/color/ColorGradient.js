const defaultOptions = {
	values: [0, 1],
	colors: ["rgba(255, 0, 0, 1)", "rgba(0, 255, 0, 1)"],
	count: 100
}

/**
 *  获取颜色渐变列表
 */
class ColorGradient {
    constructor(options) {
        this.options = Object.assign(defaultOptions, options);
    }

    getColor(x) {

        var values = this.options.values;
        var colors = this.options.colors;
        var colorList = this.getColorList();
        var idx = values.indexOf(x);
        var maxValue = Math.max(values[0], values[values.length-1]);
        var minValue = Math.min(values[0], values[values.length-1]);

        if (idx !== -1) {

        	return colors[idx];

        } else {

        	if (x < minValue) {

        		idx = values.indexOf(minValue);
        		return colors[idx];

        	}  else if (x > maxValue) {

        		idx = values.indexOf(maxValue);
        		return colors[idx];

        	} else {

        		var rate = Math.abs(x - values[0])/Math.abs(values[0] - values[values.length-1]);
        		return colorList[Math.round(colorList.length * rate - 1)];
        	}

        }

    }

    getColorList() {

        var options = this.options;
        var result = [];
        var colorExtentList = _sliceArr(options.colors);
        var values = options.values;
        var countList = _sliceArr(values);
        var extent = Math.abs(values[0] - values[values.length-1]);

        colorExtentList.map( (d, i) => {

        	var arr = [_rgbToArr(d[0]), _rgbToArr(d[1])];
        	var singleExtent = Math.abs(countList[i][0] - countList[i][1]);
        	var currCount = options.count * singleExtent / extent;

        	currCount = i ? currCount + 1 : currCount;

        	var colors = _getColors(arr, currCount);

        	colors = i ? colors.slice(1) : colors;

        	result = result.concat(colors);
        })

        return result;

    }
}

module.exports = ColorGradient;

/**
 * 	切分数组 [1, 2, 3] ==> [[1,2], [2, 3]]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function _sliceArr(arr) {
	var result = [];
	var len = arr.length;
	arr.map(function(d, i) {
		if (i < len-1) {
			result.push([arr[i], arr[i+1]]);
		}
	})
	return result;
}

/**
 * [_rgbToArr description]
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function _rgbToArr(str) {
	var str = str.replace('rgba', '');
	str = str.replace('(', '');
	str = str.replace(')', '');
	var result = str.split(',');
	result = result.map(function(d) {
		return +d;
	});
	return result;
}

function _getColors(arr, count) {

	var colorList = [];
	var alpha = arr[0][3];
	count = Math.round(count);

	var excursionR = (arr[1][0] - arr[0][0]) / (count - 1);
	var excursionG = (arr[1][1] - arr[0][1]) / (count - 1);
	var excursionB = (arr[1][2] - arr[0][2]) / (count - 1);
	var round = Math.round;

	for (var i = 0; i < count; i++) {
		var newColor = [];
		newColor[0] = round(arr[0][0] + excursionR * i);
		newColor[1] = round(arr[0][1] + excursionG * i);
		newColor[2] = round(arr[0][2] + excursionB * i);
		var rgbaColor = "rgba(" + newColor[0] + "," + newColor[1] + "," + newColor[2] + "," + alpha + ")";
		colorList.push(rgbaColor);
	}
	return colorList;
}








