import React from 'react';
import '../../Styles/Suggested/Suggested.css';
import SuggestedItem from './SuggestedItem';
import { FiShuffle } from 'react-icons/fi';
import { INPUT_TEXT_GRAY } from '../../Utils/hexConstants';
import { ButtonBase } from '@material-ui/core';

function Suggested(props) {
    const { selected, suggested, setSuggested, shuffleSuggested } = props;

    const renderSuggested = suggested.map((gradient) => (
        <SuggestedItem
            gradient={gradient}
            selected={selected === gradient.name}
            key={'suggesteditem-' + gradient.name}
            setSuggested={(e) => setSuggested(e, gradient.name)}
        />
    ));

    return (
        <div className='suggested-container'>
            <div className='suggested-header'>
                <h2>SUGGESTED</h2>
                <div
                    className='suggested-icon-container'
                    onClick={(e) => shuffleSuggested(e)}
                    title='Shuffle'
                >
                    <ButtonBase centerRipple>
                        <FiShuffle color={INPUT_TEXT_GRAY} size='20px' />
                    </ButtonBase>
                </div>
            </div>
            <div className='suggested-content'>{renderSuggested}</div>
        </div>
    );
}

export default Suggested;
