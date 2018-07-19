// 基本排序算法

/**
 * [bubbleSort 冒泡排序]
 * @param  {Array} arr [需要排序的数组]
 * @return {Array}  []   [排好序的数据]
 */
function bubbleSort(arr) {
	var data = deepcopy(arr);
	var len = data.length;
	if (!len) {return;}

	for (var i = 0; i < len; i++) {
		for (var j = 0; j < len - i - 1; j++) {
			if (data[j] > data[j+1]) {
				var temp = data[j];
				data[j] = data[j+1];
				data[j+1] = temp;
			}
		}
	}

	return data;
}

/*************************************/

/**
 * [quickSort 快排]
 * @param  {Array} items [description]
 * @param  {Number} left  [description]
 * @param  {Number} right [description]
 * @return {Array}       [description]
 */
function quickSort(items, left, right) {
	var index;
    if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }
    }
    return items;
}

function swap(items, firstIndex, secondIndex) {
	var temp = items[firstIndex];
	items[firstIndex] = items[secondIndex];
	items[secondIndex] = temp;
}

function partition(items, left, right) {
	var pivot = items[Math.floor((right + left) / 2)];
    var i = left;
    var j = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}

/*************************************/

/**
 * [insertionSort 插入排序]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr;
}


/*************************************/
/**
 * [selectionSort 选择排序]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     // 寻找最小的数
                minIndex = j;                 // 将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

/*************************************/



/*************************************/









/**
 * [deepcopy 深拷贝]
 * @param  {Object} c [原始数据]
 * @return {Object}   [拷贝数据]
 */
function deepcopy(c) {
	var result;
	if (typeof c !== 'object') {
		return c;
	}
	result = c.constructor === Array ? [] : {};
	for (var i in c) {
		if (typeof c[i] !== 'object') {
			result[i] = c[i];
		} else {
			result[i] = deepcopy(c[i]);
		}
	}
	return result;
}