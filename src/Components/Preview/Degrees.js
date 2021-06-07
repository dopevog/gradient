import React from 'react';
import '../../Styles/Preview/Degrees.css';

function Degrees(props) {
    const { degrees, handleDegreesChange } = props;

    return (
        <div className='degrees-container'>
            <p>°</p>
            <input
                type='number'
                value={degrees}
                style={{ marginLeft: '10px' }}
                onChange={handleDegreesChange}
                title='Enter degrees'
            ></input>
        </div>
    );
}

export default Degrees;
