/**
 * 深度拷贝对象
 * @param  {Object} source 要深度复制的对象
 * @return {Object}        深度拷贝后的新对象
 */
function deepCopy(source) {
    if (typeof source != 'object') {
        return source;
    }
    var result = (source.constructor === Array) ? [] : {};
    for (var i in source) {
        if (typeof source[i] === 'object') {
            result[i] = deepCopy(source[i]);
        } else {
            result[i] = source[i];
        }
    }
    return result;
}

/**
 * rgb值转hex
 * @param   {Number} r 颜色值
 * @param   {Number} g 颜色值
 * @param   {Number} b 颜色值
 * @constructor
 */
function RGBToHex(r, g, b) {
    return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
};
// padStart 兼容
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength >> 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        } else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}

// padEnd 兼容
if (!String.prototype.padEnd) {
    String.prototype.padEnd = function padEnd(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString: ''));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return String(this) + padString.slice(0,targetLength);
        }
    };
}

/**
*
* @param hex 例如:"#23ff45"
* @returns {string}
*/
function hexToRgb(hex) {
    return "rgb(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) +  ")";
}

/**
 * [anagrams description]
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function anagrams(str) {
    if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
    return str.split('').reduce(function (acc, letter, i) {
        return acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(function (val) {
            return letter + val;
        }));
    }, []);
};

/* ------ Adapter ------ */

/**
 * [call description]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function call(key) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return function (context) {
    return context[key].apply(context, args);
  };
};

// Promise.resolve([1, 2, 3])
//  .then(call('map', x => 2 * x))
//  .then(console.log); //[ 2, 4, 6 ]

/**
 * [collectInto description]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
function collectInto(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return fn(args);
  };
};

// const Pall = collectInto(Promise.all.bind(Promise));
// let p1 = Promise.resolve(1);
// let p2 = Promise.resolve(2);
// let p3 = new Promise(resolve => setTimeout(resolve, 2000, 3));
// Pall(p1, p2, p3).then(console.log);

/**
 * [flip description]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
function flip(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return fn.apply(undefined, [args.pop()].concat(args));
  };
};
// let a = { name: 'John Smith' };
// let b = {};
// const mergeFrom = flip(Object.assign);
// let mergePerson = mergeFrom.bind(null, a);
// mergePerson(b); // == b
// b = {};
// Object.assign(b, a); // == b

/**
 * [over description]
 * @return {[type]} [description]
 */
function over() {
  for (var _len3 = arguments.length, fns = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    fns[_key3] = arguments[_key3];
  }

  return function () {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return fns.map(function (fn) {
      return fn.apply(null, args);
    });
  };
};

// const minMax = over(Math.min, Math.max);
// minMax(1, 2, 3, 4, 5); // [1,5]

/**
 * [pipeFunctions description]
 * @return {[type]} [description]
 */
function pipeFunctions() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return fns.reduce(function (f, g) {
    return function () {
      return g(f.apply(undefined, arguments));
    };
  });
};

// const add5 = x => x + 5;
// const multiply = (x, y) => x * y;
// const multiplyAndAdd5 = pipeFunctions(multiply, add5);
// multiplyAndAdd5(5, 2); // 15

function _toConsumableArray$12(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
             arr2[i] = arr[i];
          }
         return arr2;
      } else {
          return Array.from(arr);
      }
  }

function spreadOver(fn) {
  return function (argsArr) {
    return fn.apply(undefined, _toConsumableArray$12(argsArr));
  };
};

// const arrayMax = spreadOver(Math.max);
// arrayMax([1, 2, 3]); // 3

/********* Array *******/

/**
 * [切分数组]
 * @param  {[type]} arr  [description]
 * @param  {[type]} size [description]
 * @return {[type]}      [description]
 */
function chunk(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, function (v, i) {
    return arr.slice(i * size, i * size + size);
  });
};

// chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]

/**
 * [去除数组内非真项]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function compact(arr) {
    return arr.filter(Boolean);
}

// compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); // [ 1, 2, 3, 'a', 's', 34 ]

/**
 * [countBy description]
 * @param  {[type]}   arr [description]
 * @param  {Function} fn  [description]
 * @return {[type]}       [description]
 */
function countBy(arr, fn) {
  return arr.map(typeof fn === 'function' ? fn : function (val) {
    return val[fn];
  }).reduce(function (acc, val, i) {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
};

// countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2}
// countBy(['one', 'two', 'three'], 'length'); // {3: 2, 5: 1}

/**
 * [统计某项在数组中出现的次数]
 * @param  {[type]} arr [description]
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
function countOccurrences(arr, val) {
  return arr.reduce(function (a, v) {
    return v === val ? a + 1 : a + 0;
  }, 0);
};

// countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}

/**
 * [deepFlatten description]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function deepFlatten(arr) {
  var _ref;

  return (_ref = []).concat.apply(_ref, _toConsumableArray(arr.map(function (v) {
    return Array.isArray(v) ? deepFlatten(v) : v;
  })));
};

// deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]

/**
 * [返回2个数组的不同项]
 * @param  {Array} a [description]
 * @param  {Array} b [description]
 * @return {Array}   [返回 a - (a ∩ b)]
 */
function difference(a, b) {
    var s = new Set(b);
    return a.filter(function(x) {
        return !s.has(x);
    })
}
// difference([1, 2, 3], [1, 2, 4])

/**
 * [differenceBy description]
 * @param  {Array}   a  [description]
 * @param  {Array}   b  [description]
 * @param  {Function} fn [description]
 * @return {Array}      [description]
 */
function differenceBy(a, b, fn) {
    var s = new Set(b.map(function(v) {
        return fn(v);
    }));

    return a.filter(function(x) {
        return !s.has(fn(x));
    })
}

// differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]

/**
 * [escapeHTML description]
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, function (tag) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag;
  });
};
