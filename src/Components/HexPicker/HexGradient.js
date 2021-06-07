import React from 'react';
import '../../Styles/HexPicker/HexGradient.css';
import Draggable from 'react-draggable';

function HexGradient(props) {
    const { colorwheelColor, SV, updatePosition } = props;
    const { x, y } = SV;

    function Slider() {
        return (
            <Draggable
                onStop={(e, value) => {
                    updatePosition({ x: value.x, y: value.y });
                }}
                defaultPosition={{ x, y }}
                bounds={{ left: 0, right: 250, top: 0, bottom: 250 }}
            >
                <div className='sl-slider'></div>
            </Draggable>
        );
    }

    return (
        <div
            className='hexgradient-container'
            title='Change saturation and value'
        >
            <div
                className='hexgradient-base'
                style={{ background: '#' + colorwheelColor }}
            ></div>
            <div className='hexgradient-white'></div>
            <div className='hexgradient-black'></div>
            <Slider />
        </div>
    );
}

export default HexGradient;
