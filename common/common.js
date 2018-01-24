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
