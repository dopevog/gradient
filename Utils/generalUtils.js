function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function calculateCenterOffset(width, height, center) {
    switch (center) {
        case 'top left':
            return { width: -width / 2, height: -height / 2 };
        case 'top center':
            return { width: 0, height: -height / 2 };
        case 'top right':
            return { width: width / 2, height: -height / 2 };
        case 'center left':
            return { width: -width / 2, height: 0 };
        case 'center center':
            return { width: 0, height: 0 };
        case 'center right':
            return { width: width / 2, height: 0 };
        case 'bottom left':
            return { width: -width / 2, height: height / 2 };
        case 'bottom center':
            return { width: 0, height: height / 2 };
        case 'bottom right':
            return { width: width / 2, height: height / 2 };
        default:
            return;
    }
}

function calculateRadius(width, height, center) {
    const hyp = Math.sqrt(width * width + height * height);
    const longer = Math.max(width, height);
    const shorter = Math.min(width, height);
    const halfHype = Math.sqrt((longer * longer) / 4 + shorter * shorter);

    switch (center) {
        case 'top left':
        case 'top right':
        case 'bottom right':
        case 'bottom left':
            return hyp;
        case 'top center':
        case 'center right':
        case 'bottom center':
        case 'center left':
            return halfHype;
        case 'center center':
            return longer / 2;
        default:
            return;
    }
}

function padLeft(s) {
    return s.length === 1 ? '0' + s : s;
}

export { shuffle, toRadians, calculateCenterOffset, calculateRadius, padLeft };
