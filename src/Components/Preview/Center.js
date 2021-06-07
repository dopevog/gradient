import React from 'react';
import '../../Styles/Preview/Center.css';

function Center(props) {
    const { center, clickFunction } = props;
    const positions = [
        'top left',
        'top center',
        'top right',
        'center left',
        'center center',
        'center right',
        'bottom left',
        'bottom center',
        'bottom right',
    ];

    const renderPositions = positions.map((position) =>
        position === center ? (
            <div
                className='center-grid-item-selected'
                key={'center' + position}
            />
        ) : (
            <div
                className='center-grid-item'
                onClick={() => clickFunction(position)}
                key={'center' + position}
                title={`Change gradient center to ${position}`}
            />
        )
    );
    return (
        <div className='center-container'>
            <p>CENTER</p>
            <div className='center-grid'>{renderPositions}</div>
        </div>
    );
}

export default Center;
