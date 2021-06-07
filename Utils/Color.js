import {
    hexToRGB,
    isDark,
    getColorwheel,
    getHue,
    hexToRgb,
    getSL,
    hslToHex,
    rgbToHsv,
    hsvToHex,
} from './colorUtils';

class Color {
    constructor(hex, stop, selected, index) {
        this.hex = hex; // 6 char String hex representation of a color
        this.stop = stop; // Number 0 - 100
        this.selected = selected; // true if selected
        this.index = index; // current place in the stack
        this.r = this.getRGB('r') || 0;
        this.g = this.getRGB('g') || 0;
        this.b = this.getRGB('b') || 0;
        this.blackPosition = null;
    }

    getRGB = (primary) => {
        return hexToRGB(this.hex, primary);
    };

    isDark = () => {
        return isDark(this.hex); // return if the color is dark
    };

    getColorwheel = () => {
        return getColorwheel(this.hex);
    };

    getHue = () => {
        const rgb = hexToRgb(this.hex);
        if (rgb) {
            return getHue(rgb);
        }
    };

    isEqual = (color) => {
        const { hex } = this;
        return color.hex === hex;
    };

    clone = () => {
        return new Color(this.hex, this.stop, this.selected, this.index);
    };

    changeHue = (h) => {
        const sl = getSL(hexToRgb(this.hex));
        const s = sl.s;
        const l = sl.l;
        const hsl = { h, s, l };
        this.hex = hslToHex(hsl);
        this.r = this.getRGB('r') || 0;
        this.g = this.getRGB('g') || 0;
        this.b = this.getRGB('b') || 0;
    };

    getSvPosition = () => {
        const rgb = hexToRgb(this.hex);
        if (rgb) {
            const { s, v } = rgbToHsv(rgb);
            let x, y;

            if (this.blackPosition) {
                x = this.blackPosition.x;
                y = this.blackPosition.y;
                this.blackPosition = null;
            } else {
                x = 2.5 * s;
                y = 2.5 * (100 - v);
            }
            return { x, y };
        }
    };

    changeColorFromPosition = ({ x, y }) => {
        const h = this.getHue();
        const s = x / 2.5;
        const v = 100 - y / 2.5;
        this.hex = hsvToHex({ h, s, v });
        this.r = this.getRGB('r') || 0;
        this.g = this.getRGB('g') || 0;
        this.b = this.getRGB('b') || 0;

        if (y === 250) {
            this.blackPosition = { x, y };
        }
    };
}

export { Color };
