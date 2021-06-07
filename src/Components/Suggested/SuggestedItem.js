import React from 'react';
import '../../Styles/Suggested/SuggestedItem.css';
import Fade from '@material-ui/core/Fade';

function SuggestedItem(props) {
    const { gradient, selected, setSuggested } = props;
    const background = gradient.toBgString();
    const selectedDiv = selected ? 'suggesteditem-selected' : '';

    return (
        <Fade in={true} timeout={{ enter: 1500 }}>
            <div className={selectedDiv}>
                <div className='suggesteditem-container' onClick={setSuggested}>
                    <div
                        className='suggesteditem-colorbox'
                        style={{ background }}
                    ></div>
                    <p>{gradient.name || ''}</p>
                </div>
            </div>
        </Fade>
    );
}

export default SuggestedItem;
