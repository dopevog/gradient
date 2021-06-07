import React from 'react';
import '../../Styles/CSS/CopyConfirmation.css';
import Slide from '@material-ui/core/Slide';
import { MdCheckCircle } from 'react-icons/md';
import { INPUT_TEXT_GRAY } from '../../Utils/hexConstants';

function CopyConfirmation(props) {
    const { display } = props;

    return (
        <Slide direction='up' in={display} mountOnEnter unmountOnExit>
            <div className='copyconfirmation-container'>
                <div className='copyconfirmation-content'>
                    <MdCheckCircle color={INPUT_TEXT_GRAY} size='20px' />
                    <p>CSS copied!</p>
                </div>
            </div>
        </Slide>
    );
}

export default CopyConfirmation;
