/**
 * rgb值转hex
 * @param   {Number} r 颜色值
 * @param   {Number} g 颜色值
 * @param   {Number} b 颜色值
 * @constructor
 */
const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
