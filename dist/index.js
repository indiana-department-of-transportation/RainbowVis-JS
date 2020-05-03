"use strict";
/**
 * index.ts
 *
 * @description Rainbowvis.js main file. Many of the methods/functions have
 * multiple aliases and/or do very similar things, this was to maintain
 * backwards-compatibility with the original API while porting to Typescript
 * and adapting it for our needs at INDOT. Same for the mixed use of the
 * American 'color' and British 'colour'.
 *
 * INDOT Typescript port/refactor by Jared Smith jarsmith@indot.in.gov
 *
 * @author Sophiah Ho
 * @license EPL v1
 */
Object.defineProperty(exports, "__esModule", { value: true });
const HEX_COLOR_STRING = /^#?[\da-f]{6}$/i;
// Extended list of CSS colornames s taken from
// http://www.w3.org/TR/css3-color/#svg-color
const COLOUR_NAMES = {
    aliceblue: "F0F8FF",
    antiquewhite: "FAEBD7",
    aqua: "00FFFF",
    aquamarine: "7FFFD4",
    azure: "F0FFFF",
    beige: "F5F5DC",
    bisque: "FFE4C4",
    black: "000000",
    blanchedalmond: "FFEBCD",
    blue: "0000FF",
    blueviolet: "8A2BE2",
    brown: "A52A2A",
    burlywood: "DEB887",
    cadetblue: "5F9EA0",
    chartreuse: "7FFF00",
    chocolate: "D2691E",
    coral: "FF7F50",
    cornflowerblue: "6495ED",
    cornsilk: "FFF8DC",
    crimson: "DC143C",
    cyan: "00FFFF",
    darkblue: "00008B",
    darkcyan: "008B8B",
    darkgoldenrod: "B8860B",
    darkgray: "A9A9A9",
    darkgreen: "006400",
    darkgrey: "A9A9A9",
    darkkhaki: "BDB76B",
    darkmagenta: "8B008B",
    darkolivegreen: "556B2F",
    darkorange: "FF8C00",
    darkorchid: "9932CC",
    darkred: "8B0000",
    darksalmon: "E9967A",
    darkseagreen: "8FBC8F",
    darkslateblue: "483D8B",
    darkslategray: "2F4F4F",
    darkslategrey: "2F4F4F",
    darkturquoise: "00CED1",
    darkviolet: "9400D3",
    deeppink: "FF1493",
    deepskyblue: "00BFFF",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1E90FF",
    firebrick: "B22222",
    floralwhite: "FFFAF0",
    forestgreen: "228B22",
    fuchsia: "FF00FF",
    gainsboro: "DCDCDC",
    ghostwhite: "F8F8FF",
    gold: "FFD700",
    goldenrod: "DAA520",
    gray: "808080",
    green: "008000",
    greenyellow: "ADFF2F",
    grey: "808080",
    honeydew: "F0FFF0",
    hotpink: "FF69B4",
    indianred: "CD5C5C",
    indigo: "4B0082",
    ivory: "FFFFF0",
    khaki: "F0E68C",
    lavender: "E6E6FA",
    lavenderblush: "FFF0F5",
    lawngreen: "7CFC00",
    lemonchiffon: "FFFACD",
    lightblue: "ADD8E6",
    lightcoral: "F08080",
    lightcyan: "E0FFFF",
    lightgoldenrodyellow: "FAFAD2",
    lightgray: "D3D3D3",
    lightgreen: "90EE90",
    lightgrey: "D3D3D3",
    lightpink: "FFB6C1",
    lightsalmon: "FFA07A",
    lightseagreen: "20B2AA",
    lightskyblue: "87CEFA",
    lightslategray: "778899",
    lightslategrey: "778899",
    lightsteelblue: "B0C4DE",
    lightyellow: "FFFFE0",
    lime: "00FF00",
    limegreen: "32CD32",
    linen: "FAF0E6",
    magenta: "FF00FF",
    maroon: "800000",
    mediumaquamarine: "66CDAA",
    mediumblue: "0000CD",
    mediumorchid: "BA55D3",
    mediumpurple: "9370DB",
    mediumseagreen: "3CB371",
    mediumslateblue: "7B68EE",
    mediumspringgreen: "00FA9A",
    mediumturquoise: "48D1CC",
    mediumvioletred: "C71585",
    midnightblue: "191970",
    mintcream: "F5FFFA",
    mistyrose: "FFE4E1",
    moccasin: "FFE4B5",
    navajowhite: "FFDEAD",
    navy: "000080",
    oldlace: "FDF5E6",
    olive: "808000",
    olivedrab: "6B8E23",
    orange: "FFA500",
    orangered: "FF4500",
    orchid: "DA70D6",
    palegoldenrod: "EEE8AA",
    palegreen: "98FB98",
    paleturquoise: "AFEEEE",
    palevioletred: "DB7093",
    papayawhip: "FFEFD5",
    peachpuff: "FFDAB9",
    peru: "CD853F",
    pink: "FFC0CB",
    plum: "DDA0DD",
    powderblue: "B0E0E6",
    purple: "800080",
    red: "FF0000",
    rosybrown: "BC8F8F",
    royalblue: "4169E1",
    saddlebrown: "8B4513",
    salmon: "FA8072",
    sandybrown: "F4A460",
    seagreen: "2E8B57",
    seashell: "FFF5EE",
    sienna: "A0522D",
    silver: "C0C0C0",
    skyblue: "87CEEB",
    slateblue: "6A5ACD",
    slategray: "708090",
    slategrey: "708090",
    snow: "FFFAFA",
    springgreen: "00FF7F",
    steelblue: "4682B4",
    tan: "D2B48C",
    teal: "008080",
    thistle: "D8BFD8",
    tomato: "FF6347",
    turquoise: "40E0D0",
    violet: "EE82EE",
    wheat: "F5DEB3",
    white: "FFFFFF",
    whitesmoke: "F5F5F5",
    yellow: "FFFF00",
    yellowgreen: "9ACD32"
};
/**
 * @description Verifies that a string is a valid CSS hexcolor.
 *
 * @param str The string to verify.
 * @returns Boolean true if valid hex string, false otherwise.
 */
exports.isHexColour = (str) => {
    return Boolean(str.match(HEX_COLOR_STRING));
};
/**
 * @description Takes either a valid CSS color name or hex string
 * and returns the value itself or the corresponding hex string
 * without the leading '#'.
 *
 * @param str The hex string or color name.
 * @returns Hex string sans '#' for the hex or color name given.
 */
exports.getHexColour = (str) => {
    if (exports.isHexColour(str)) {
        return str.substring(str.length - 6, str.length);
    }
    else {
        const name = str.toLowerCase();
        if (name in COLOUR_NAMES) {
            return COLOUR_NAMES[name];
        }
        throw new Error(`${str} is not a valid colour.`);
    }
};
/**
 * @description Takes a numeric string value and pads it to
 * two places with a leading zero.
 *
 * @param hex The hex string to pad.
 * @returns The padded hex string.
 */
exports.formatHex = (hex) => {
    if (hex.length === 1) {
        return '0' + hex;
    }
    else {
        return hex;
    }
};
/**
 * @class ColourGradient
 *
 * Represents a color gradient over a given range.
 */
class ColourGradient {
    /**
     * @description Constructor for ColourGradient.
     *
     * @param [args] The destructured argument object.
     * @param args.min The optional minimum number in the range, defaults to 0.
     * @param args.max The optional maximum number in the range, defaults to 100.
     * @param args.startColour The optional start color for the spectrum, defaults
     * to red (#FF0000).
     * @param args.endColour The optional end color for the spectrum, defaults to
     * blue (#0000FF).
     */
    constructor({ min = 0, max = 100, startColour = 'ff0000', endColour = '0000ff', } = {}) {
        this.min = min;
        this.max = max;
        this.startColour = startColour;
        this.endColour = endColour;
    }
    /**
     * @description Sets the color gradient endpoints.
     *
     * @param start Start color for the spectrum.
     * @param end End color for the spectrum.
     * @returns This.
     */
    setGradient(start, end) {
        this.startColour = exports.getHexColour(start);
        this.endColour = exports.getHexColour(end);
        return this;
    }
    /**
     * @description Sets the range endpoints. May be passed in either
     * order.
     *
     * @param start Minimum number for the spectrum.
     * @param end Maximum number for the spectrum.
     * @returns This.
     */
    setNumberRange(min, max) {
        this.min = Math.min(min, max);
        this.max = Math.max(min, max);
        return this;
    }
    /**
     * @description Retrieves a color from the spectrum at the given number in
     * the range.
     *
     * @param number The number from the range to retrieve a color for.
     * @returns Hex color value.
     */
    colourAt(number) {
        return this.calcHex(number, this.startColour.substring(0, 2), this.endColour.substring(0, 2))
            + this.calcHex(number, this.startColour.substring(2, 4), this.endColour.substring(2, 4))
            + this.calcHex(number, this.startColour.substring(4, 6), this.endColour.substring(4, 6));
    }
    /**
     * @description Calculates the value for a specific channel given
     * the number and color ranges.
     *
     * @param num The number from the range to pull a color for.
     * @param channelStart_Base16 The RGB fragment from tne start color.
     * @param channelEnd_Base16 The RGB fragment from tne end color.
     * @returns The channel hex value.
     */
    calcHex(num, channelStart_Base16, channelEnd_Base16) {
        if (num < this.min) {
            num = this.min;
        }
        if (num > this.max) {
            num = this.max;
        }
        const numRange = this.max - this.min;
        const cStart_Base10 = parseInt(channelStart_Base16, 16);
        const cEnd_Base10 = parseInt(channelEnd_Base16, 16);
        const cPerUnit = (cEnd_Base10 - cStart_Base10) / numRange;
        const c_Base10 = Math.round(cPerUnit * (num - this.min) + cStart_Base10);
        return exports.formatHex(c_Base10.toString(16));
    }
}
exports.ColourGradient = ColourGradient;
/**
 * @class Rainbow
 *
 * The color spectrum over the given colors with the given numeric range.
 */
class Rainbow {
    /**
     * @description Constructor for Rainbow.
     *
     * @param [args] The destructured arguments object.
     * @param args.min The optional minimum number for the numeric range.
     * @param args.max The optional maximum number for the numeric range.
     * @param args.colours The optional array of colors to create a spectrum for.
     */
    constructor({ min = 0, max = 100, colours = ['ff0000', 'ffff00', '00ff00', '0000ff'], } = {}) {
        this.min = min;
        this.max = max;
        this.gradients = [];
        this.colours = [];
        this.setSpectrum(...colours);
    }
    /**
     * @description Sets the color spectrum.
     *
     * @param colours Array of colors to create a spectrum for.
     */
    setSpectrum(...colours) {
        if (colours.length < 2) {
            throw new Error('Rainbow must have two or more colours.');
        }
        else {
            const increment = (this.max - this.min) / (colours.length - 1);
            const firstGradient = new ColourGradient();
            firstGradient.setGradient(colours[0], colours[1]);
            firstGradient.setNumberRange(this.min, this.min + increment);
            this.gradients = [firstGradient];
            for (var i = 1; i < colours.length - 1; i++) {
                var colourGradient = new ColourGradient();
                colourGradient.setGradient(colours[i], colours[i + 1]);
                colourGradient.setNumberRange(this.min + increment * i, this.min + increment * (i + 1));
                this.gradients[i] = colourGradient;
            }
            this.colours = colours;
        }
    }
    overColors(...colors) {
        this.setSpectrum(...colors);
        return this;
    }
    withRange(min, max) {
        this.setNumberRange(min, max);
        return this;
    }
    setNumberRange(min, max) {
        this.min = Math.min(min, max);
        this.max = Math.max(min, max);
        return this;
    }
    colourAt(number) {
        if (Number.isNaN(number)) {
            throw new TypeError(number + ' is not a number');
        }
        else if (this.gradients.length === 1) {
            return this.gradients[0].colourAt(number);
        }
        else {
            var segment = (this.max - this.min) / (this.gradients.length);
            var index = Math.min(Math.floor((Math.max(number, this.min) - this.min) / segment), this.gradients.length - 1);
            return this.gradients[index].colourAt(number);
        }
    }
    colorAt(number) {
        return this.colourAt(number);
    }
    getColor(number) {
        return `#${this.colorAt(number)}`;
    }
}
exports.Rainbow = Rainbow;
exports.rainbow = (args = {}) => new Rainbow(args);
exports.default = Rainbow;
//# sourceMappingURL=index.js.map