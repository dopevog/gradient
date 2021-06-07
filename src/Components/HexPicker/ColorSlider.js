import React from 'react';
import '../../Styles/HexPicker/ColorSlider.css';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

function ColorSlider(props) {
    const { hue, handleColorSlider } = props;

    const ColorSlider = withStyles({
        root: {
            borderRadius: 4,
            height: '240px !important',
            width: 20,
            padding: '0px 0px !important',
            position: 'absolute',
            bottom: '0px',
            display: 'flex !important',
        },
        thumb: {
            height: 7,
            width: 15,
            backgroundColor: 'var(--input-text-light-gray)',
            opacity: 50,
            borderRadius: 5,
            boxShadow: '2px 2px 7px black',
            '&:focus, &:hover, &$active': {
                boxShadow: '2px 2px 7px black',
                background: 'var(--hover-gray)',
            },
            margin: '0px 2px 2px 2px !important',
        },

        track: {
            borderRadius: 4,
            background: 'transparent',
            height: 250,
        },
        rail: {
            borderRadius: 4,
            background:
                'linear-gradient(to top, red 0%, #ff0 17%, lime 33%, cyan 50%, blue 66%, magenta 83%, red 100%)',
            opacity: 100,
            width: '20px !important',
            paddingTop: '10px',
            paddingBottom: '10px',
            height: '230px !important',
            position: 'absolute',
            bottom: '0px',
        },
    })(Slider);

    return (
        <div className='colorslide-container'>
            <ColorSlider
                defaultValue={hue}
                orientation='vertical'
                min={0}
                max={359}
                onChangeCommitted={(e, value) => handleColorSlider(value)}
                title='Change hue'
            />
        </div>
    );
}

export default ColorSlider;
