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
