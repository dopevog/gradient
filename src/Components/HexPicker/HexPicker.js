import React from 'react';
import '../../Styles/HexPicker/HexPicker.css';
import ColorSlider from './ColorSlider';
import HexGradient from './HexGradient';
import CurrentColor from './CurrentColor';

function HexPicker(props) {
    const {
        colorwheelColor,
        color,
        handleHexChange,
        handleRChange,
        handleGChange,
        handleBChange,
        hue,
        handleColorSlider,
        SV,
        updatePosition,
    } = props;
    return (
        <div className='hexpicker-container'>
            <CurrentColor
                color={color}
                handleHexChange={handleHexChange}
                handleRChange={handleRChange}
                handleGChange={handleGChange}
                handleBChange={handleBChange}
            />
            <div className='hexpicker-bottom'>
                <HexGradient
                    colorwheelColor={colorwheelColor}
                    SV={SV}
                    updatePosition={updatePosition}
                />
                <ColorSlider hue={hue} handleColorSlider={handleColorSlider} />
            </div>
        </div>
    );
}

export default HexPicker;
