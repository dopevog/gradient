import React from 'react';
import '../../Styles/HexPicker/CurrentColor.css';

function CurrentColor(props) {
    const {
        color,
        handleHexChange,
        handleRChange,
        handleGChange,
        handleBChange,
    } = props;
    const { hex, r, g, b } = color;

    return (
        <div className='currentcolor-container'>
            <h2>COLOR</h2>
            <div className='currentcolor-content'>
                <div
                    className='currentcolor-colorbox'
                    style={{ backgroundColor: '#' + hex }}
                ></div>
                <div className='currentcolor-info'>
                    <p>#</p>
                    <input
                        type='text'
                        spellCheck='false'
                        value={hex.toLowerCase()}
                        onChange={(e) => handleHexChange(e, false)}
                        title='Enter hex code'
                    ></input>
                    <p>R</p>
                    <input
                        type='number'
                        value={r}
                        onChange={(e) => handleRChange(e)}
                        title='Enter red value'
                    ></input>
                    <p>G</p>
                    <input
                        type='number'
                        value={g}
                        onChange={(e) => handleGChange(e)}
                        title='Enter green value'
                    ></input>
                    <p>B</p>
                    <input
                        type='number'
                        value={b}
                        onChange={(e) => handleBChange(e)}
                        title='Enter blue value'
                    ></input>
                </div>
            </div>
        </div>
    );
}

export default CurrentColor;
