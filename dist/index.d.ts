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
/**
 * @description Verifies that a string is a valid CSS hexcolor.
 *
 * @param str The string to verify.
 * @returns Boolean true if valid hex string, false otherwise.
 */
export declare const isHexColour: (str: string) => boolean;
/**
 * @description Takes either a valid CSS color name or hex string
 * and returns the value itself or the corresponding hex string
 * without the leading '#'.
 *
 * @param str The hex string or color name.
 * @returns Hex string sans '#' for the hex or color name given.
 */
export declare const getHexColour: (str: string) => string;
/**
 * @description Takes a numeric string value and pads it to
 * two places with a leading zero.
 *
 * @param hex The hex string to pad.
 * @returns The padded hex string.
 */
export declare const formatHex: (hex: string) => string;
/**
 * @class ColourGradient
 *
 * Represents a color gradient over a given range.
 */
export declare class ColourGradient {
    min: number;
    max: number;
    startColour: string;
    endColour: string;
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
    constructor({ min, max, startColour, endColour, }?: {
        min?: number | undefined;
        max?: number | undefined;
        startColour?: string | undefined;
        endColour?: string | undefined;
    });
    /**
     * @description Sets the color gradient endpoints.
     *
     * @param start Start color for the spectrum.
     * @param end End color for the spectrum.
     * @returns This.
     */
    setGradient(start: string, end: string): this;
    /**
     * @description Sets the range endpoints. May be passed in either
     * order.
     *
     * @param start Minimum number for the spectrum.
     * @param end Maximum number for the spectrum.
     * @returns This.
     */
    setNumberRange(min: number, max: number): this;
    /**
     * @description Retrieves a color from the spectrum at the given number in
     * the range.
     *
     * @param number The number from the range to retrieve a color for.
     * @returns Hex color value.
     */
    colourAt(number: number): string;
    /**
     * @description Calculates the value for a specific channel given
     * the number and color ranges.
     *
     * @param num The number from the range to pull a color for.
     * @param channelStart_Base16 The RGB fragment from tne start color.
     * @param channelEnd_Base16 The RGB fragment from tne end color.
     * @returns The channel hex value.
     */
    calcHex(num: number, channelStart_Base16: string, channelEnd_Base16: string): string;
}
/**
 * @class Rainbow
 *
 * The color spectrum over the given colors with the given numeric range.
 */
export declare class Rainbow {
    min: number;
    max: number;
    colours: string[];
    gradients: ColourGradient[];
    /**
     * @description Constructor for Rainbow.
     *
     * @param [args] The destructured arguments object.
     * @param args.min The optional minimum number for the numeric range.
     * @param args.max The optional maximum number for the numeric range.
     * @param args.colours The optional array of colors to create a spectrum for.
     */
    constructor({ min, max, colours, }?: {
        min?: number | undefined;
        max?: number | undefined;
        colours?: string[] | undefined;
    });
    /**
     * @description Sets the color spectrum.
     *
     * @param colours Array of colors to create a spectrum for.
     */
    setSpectrum(...colours: string[]): void;
    overColors(...colors: string[]): this;
    withRange(min: number, max: number): this;
    setNumberRange(min: number, max: number): this;
    colourAt(number: number): string;
    colorAt(number: number): string;
    getColor(number: number): string;
}
export declare const rainbow: (args?: {}) => Rainbow;
export default Rainbow;
