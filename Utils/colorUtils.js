import {
    toRadians,
    calculateCenterOffset,
    calculateRadius,
} from './generalUtils';

function hexToRGB(hex, primary) {
    let s;
    switch (primary) {
        case 'r':
            s = hex.substring(0, 2);
            break;
        case 'g':
            s = hex.substring(2, 4);
            break;
        case 'b':
            s = hex.substring(4, 6);
            break;
        default:
            console.log('Not valid primary.');
    }
    return parseInt(s, 16);
}

function getLuminanceFromHex(hex) {
    const r = hexToRGB(hex, 'r'),
        g = hexToRGB(hex, 'g'),
        b = hexToRGB(hex, 'b');
    const rgb = [r, g, b];

    for (let i = 0; i < rgb.length; i++) {
        let c = rgb[i];
        c /= 255;

        if (c > 0.03928) {
            c = Math.pow((c + 0.055) / 1.055, 2.4);
        } else {
            c /= 12.92;
        }

        rgb[i] = c;
    }

    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function isDark(hex) {
    let L = getLuminanceFromHex(hex);
    return L <= 0.5;
}

function toBgString(gradient) {
    const { stack, isLinear, degrees, center } = gradient;
    const validDegrees = degrees || 0;
    let centerString = center === 'center center' ? '' : ' at ' + center;
    let background = isLinear
        ? 'linear-gradient(' + validDegrees + 'deg, '
        : 'radial-gradient(circle' + centerString + ', ';

    let colorString = [];
    for (let i = 0; i < stack.length; i++) {
        colorString.push('#' + stack[i].hex + ' ' + stack[i].stop + '%');
    }

    background += colorString.join(', ') + ')';

    return background;
}

function toStopBarBgString(gradient) {
    const { stack } = gradient;
    let background = 'linear-gradient(90deg, ';

    let colorString = [];
    for (let i = 0; i < stack.length; i++) {
        colorString.push('#' + stack[i].hex + ' ' + stack[i].stop + '%');
    }

    background += colorString.join(', ') + ')';

    return background;
}

function toCSSBgString(gradient) {
    const { stack, isLinear, degrees, center } = gradient;
    const validDegrees = degrees || 0;
    let centerString = center === 'center center' ? '' : ' at ' + center;

    let background = 'background: ';
    background += isLinear
        ? 'linear-gradient(\n    ' + validDegrees + 'deg,\n    '
        : 'radial-gradient(\n    circle' + centerString + ',\n    ';

    let colorString = [];
    for (let i = 0; i < stack.length; i++) {
        colorString.push('#' + stack[i].hex + ' ' + stack[i].stop + '%');
    }

    background += colorString.join(',\n    ') + '\n);';

    return background;
}

function hexToRgb(hex) {
    const r = hexToRGB(hex, 'r');
    const g = hexToRGB(hex, 'g');
    const b = hexToRGB(hex, 'b');
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
        return { r, g, b };
    }
}

function getHue(rgb) {
    // Make r, g, and b fractions of 1
    let { r, g, b } = rgb;
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0;

    if (delta === 0) h = 0;
    // Red is max
    else if (cmax === r) h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax === g) h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;

    return h;
}

function getSL(rgb) {
    let { r, g, b } = rgb;
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        s = 0,
        l = 0;

    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return { s, l };
}

//
function hslToHex(hsl) {
    let { h, s, l } = hsl;

    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length === 1) r = '0' + r;
    if (g.length === 1) g = '0' + g;
    if (b.length === 1) b = '0' + b;

    return r + g + b;
}

// hex to hex
function getColorwheel(hex) {
    let rgb = hexToRgb(hex);
    if (rgb) {
        let h = getHue(rgb);
        let hsl = {
            h,
            s: 100,
            l: 50,
        };

        return hslToHex(hsl);
    } else {
        return 'ffffff';
    }
}

function generateImage(gradient, width, height) {
    const { stack, isLinear, degrees, center } = gradient;
    const validDegrees = degrees || 0;

    const canvas = document.createElement('CANVAS');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    let g;

    if (isLinear) {
        const maxLen = width;
        const aspect = height / width;
        const angle = Math.PI / 2 + toRadians(validDegrees);
        g = ctx.createLinearGradient(
            width / 2 + Math.cos(angle) * maxLen * 0.5,
            height / 2 + Math.sin(angle) * maxLen * 0.5 * aspect,
            width / 2 - Math.cos(angle) * maxLen * 0.5,
            height / 2 - Math.sin(angle) * maxLen * 0.5 * aspect
        );
    } else {
        const radius = calculateRadius(width, height, center);
        const start = (stack[0].stop / 100) * radius;
        const end = (stack[stack.length - 1].stop / 100) * radius;
        const offset = calculateCenterOffset(width, height, center);

        g = ctx.createRadialGradient(
            width / 2 + offset.width,
            height / 2 + offset.height,
            start,
            width / 2 + offset.width,
            height / 2 + offset.height,
            end
        );
    }

    stack.forEach((color) => {
        const { hex, stop } = color;
        g.addColorStop(stop / 100, '#' + hex);
    });

    // Fill with gradient
    ctx.fillStyle = g;
    // (startx, starty, endx, endy)
    ctx.fillRect(0, 0, width, height);
    const url = canvas.toDataURL('image/png');

    return url;
}

function rgbToHsv(rgb) {
    let { r, g, b } = rgb;
    r /= 255;
    g /= 255;
    b /= 255;

    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h,
        s,
        v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                return;
        }

        h /= 6;
    }

    s *= 100;
    v *= 100;

    return { h, s, v };
}

function hsvToHex(hsv) {
    let { h, s, v } = hsv;
    h /= 360;
    s /= 100;
    v /= 100;
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
        default:
            return;
    }

    r *= 255;
    g *= 255;
    b *= 255;

    return (
        (1 << 24) +
        (Math.round(r) << 16) +
        (Math.round(g) << 8) +
        Math.round(b)
    )
        .toString(16)
        .slice(1);
}

export {
    hexToRGB,
    isDark,
    toBgString,
    toStopBarBgString,
    getColorwheel,
    toCSSBgString,
    generateImage,
    getHue,
    hexToRgb,
    getSL,
    hslToHex,
    rgbToHsv,
    hsvToHex,
};
