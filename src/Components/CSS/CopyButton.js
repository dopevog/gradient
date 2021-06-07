import React from 'react';
import '../../Styles/CSS/CopyButton.css';
import { MdContentCopy } from 'react-icons/md';
import { INPUT_TEXT_GRAY } from '../../Utils/hexConstants';
import { ButtonBase } from '@material-ui/core';

function CopyButton(props) {
    const { clickFunction } = props;

    return (
        <div
            className='copybutton-container'
            onClick={clickFunction}
            title='Copy CSS to clipboard'
        >
            <ButtonBase centerRipple>
                <MdContentCopy
                    size='20px'
                    color={INPUT_TEXT_GRAY}
                    style={{ margin: '10px' }}
                />
            </ButtonBase>
        </div>
    );
}

export default CopyButton;
