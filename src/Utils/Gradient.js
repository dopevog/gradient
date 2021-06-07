import { toBgString, toStopBarBgString, toCSSBgString } from './colorUtils';

class Gradient {
    constructor(stack, isLinear, degrees, center, name) {
        this.stack = stack; // array of Color objects
        this.isLinear = isLinear; // false if radial
        this.degrees = degrees; // Number 0 - 360
        this.center = center; // one of 9 positions
        this.name = name; // name of friendo if suggested
    }

    toBgString = () => {
        return toBgString(this);
    };

    toStopBarBgString = () => {
        return toStopBarBgString(this);
    };

    toCSSBgString = () => {
        return toCSSBgString(this);
    };

    // sort stack by increasing order of stop values
    sortStack = () => {
        const { stack } = this;
        stack.sort((a, b) => (a.stop > b.stop ? 1 : -1));
        let selected;
        for (let i = 0; i < stack.length; i++) {
            const color = stack[i];
            color.index = i;
            if (color.selected) {
                selected = i;
            }
        }
        return selected;
    };

    clone = () => {
        return new Gradient(
            this.stack.map((color) => color.clone()),
            this.isLinear,
            this.degrees,
            this.center,
            ''
        );
    };

    getSortedStops = () => {
        const { stack } = this;
        return stack
            .map((color) => color.stop)
            .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    };

    reverse = () => {
        const { stack } = this;
        let stops = this.getSortedStops();
        let stopValue;

        stack.reverse();

        for (let i = 0; i < stack.length; i++) {
            const color = stack[i];
            color.index = i;
            color.stop = stops[i];

            if (color.selected) {
                stopValue = stops[i];
            }
        }

        return stopValue;
    };
}

export { Gradient };
