import { Gradient } from './Gradient';
import { Color } from './Color';

const KAREN = new Gradient(
    [new Color('87cefa', 0, true, 0), new Color('da71d6', 100, false, 1)],
    true,
    45,
    'center center',
    'Karen'
);

const DORA = new Gradient(
    [new Color('fdafaf', 0, true, 0), new Color('a6a8f2', 100, false, 1)],
    true,
    45,
    'center center',
    'Dora'
);

const STEVEN = new Gradient(
    [
        new Color('faee01', 0, true, 0),
        new Color('f37721', 50, false, 1),
        new Color('ec2e24', 100, false, 2),
    ],
    true,
    160,
    'center center',
    'Steven'
);

const SHARON = new Gradient(
    [new Color('de6262', 0, true, 0), new Color('ffb88c', 100, false, 1)],
    true,
    30,
    'top right',
    'Sharon'
);

const BRANDY = new Gradient(
    [
        new Color('47bcd5', 19, true, 0),
        new Color('299de2', 37, false, 1),
        new Color('2879d9', 52, false, 2),
        new Color('2b3bc4', 77, false, 3),
        new Color('2e189c', 92, false, 4),
    ],
    false,
    0,
    'top center',
    'Brandy'
);

const CHARLIE = new Gradient(
    [new Color('89cff0', 0, true, 0), new Color('77dd77', 100, false, 1)],
    false,
    180,
    'center left',
    'Charlie'
);

const JUDY = new Gradient(
    [
        new Color('ff598d', 0, true, 0),
        new Color('d197ff', 33, false, 1),
        new Color('ffafe6', 67, false, 2),
        new Color('fff7ba', 100, false, 3),
    ],
    false,
    45,
    'bottom right',
    'Judy'
);

const BRYAN = new Gradient(
    [
        new Color('020024', 0, true, 0),
        new Color('343258', 20, false, 1),
        new Color('555570', 43, false, 2),
        new Color('336d80', 64, false, 3),
        new Color('8ec3cd', 100, false, 4),
    ],
    true,
    0,
    'bottom right',
    'Bryan'
);

const MAX = new Gradient(
    [new Color('a1c4fd', 31, true, 0), new Color('c2e9fb', 100, false, 1)],
    true,
    78,
    'center center',
    'Max'
);

const JEFF = new Gradient(
    [
        new Color('9c1eaf', 0, true, 0),
        new Color('838e46', 40, false, 1),
        new Color('72d4ba', 100, false, 2),
    ],
    true,
    90,
    'center center',
    'Jeff'
);

const REILLY = new Gradient(
    [
        new Color('f58025', 0, true, 0),
        new Color('ee5a62', 25, false, 1),
        new Color('e8589f', 50, false, 2),
        new Color('b969eb', 75, false, 3),
        new Color('6f7bfc', 100, false, 4),
    ],
    true,
    35,
    'center center',
    'Reilly'
);

const SUGGESTIONS = [
    KAREN,
    DORA,
    STEVEN,
    SHARON,
    BRANDY,
    CHARLIE,
    JUDY,
    BRYAN,
    MAX,
    JEFF,
    REILLY,
];

export { SUGGESTIONS };
