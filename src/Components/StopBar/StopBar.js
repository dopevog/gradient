import React from 'react';
import '../../Styles/StopBar/StopBar.css';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

function StopBar(props) {
    const { gradient, handleStopSlider } = props;
    const background = gradient.toStopBarBgString();
    const stopValues = gradient.getSortedStops();

    const StopBarSlider = withStyles({
        root: {
            borderRadius: 4,
            width: 800,
            padding: '0px !important',
        },
        thumb: {
            height: 30,
            width: 10,
            backgroundColor: 'var(--input-text-light-gray)',
            opacity: 50,
            borderRadius: 5,
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            boxShadow: '2px 2px 7px black',
            '&:focus, &:hover, &$active': {
                boxShadow: '2px 2px 7px black',
                background: 'var(--hover-gray)',
            },
        },
        track: {
            height: 40,
            borderRadius: 4,
            background: 'transparent',
        },
        rail: {
            height: 40,
            borderRadius: 4,
            background,
            opacity: 100,
            paddingLeft: '10px',
            paddingRight: '10px',
            width: 800,
        },
    })(Slider);

    return (
        <div className='stopbar-container'>
            <StopBarSlider
                defaultValue={stopValues}
                step={1}
                onChangeCommitted={(e, value) => handleStopSlider(value)}
                title='Change stops'
            />
        </div>
    );
}

export default StopBar;
