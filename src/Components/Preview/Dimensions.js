import React from 'react';
import '../../Styles/Preview/Dimensions.css';

function Dimensions(props) {
    const { height, width, handleWidthChange, handleHeightChange } = props;

    return (
        <div className='dimensions-container'>
            <p>W</p>
            <input
                type='number'
                value={width}
                style={{ marginLeft: '7px', marginRight: '15px' }}
                onChange={handleWidthChange}
                title='Enter image width'
            ></input>
            <p>H</p>
            <input
                type='number'
                value={height}
                style={{ marginRight: '15px', marginLeft: '7px' }}
                onChange={handleHeightChange}
                title='Enter image height'
            ></input>
        </div>
    );
}

export default Dimensions;
