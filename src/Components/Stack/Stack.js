import React from 'react';
import '../../Styles/Stack/Stack.css';
import StackItem from './StackItem';
import AddColorButton from './AddColorButton';
import { BsArrowUpDown } from 'react-icons/bs';
import { INPUT_TEXT_GRAY } from '../../Utils/hexConstants';
import { ButtonBase } from '@material-ui/core';

function Stack(props) {
    const {
        gradient,
        addColor,
        changeSelected,
        deleteColor,
        handleKeyDown,
        changeValue,
        stopValue,
        handleHexChange,
        onDragStart,
        onDragOver,
        onDragEnd,
        reverseStack,
        handleStopChange,
    } = props;
    const { stack } = gradient;

    const renderStack = stack.map((color) => (
        <StackItem
            color={color}
            stack={stack}
            deleteFunction={(e) => deleteColor(e, color.index)}
            changeSelected={() => changeSelected(color.index)}
            key={'stackitem-' + color.index}
            cannotDelete={stack.length === 2}
            handleKeyDown={handleKeyDown}
            changeValue={changeValue}
            stopValue={stopValue}
            handleHexChange={handleHexChange}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            handleStopChange={handleStopChange}
        />
    ));

    return (
        <div className='stack-container'>
            <div className='stack-header'>
                <h2>STACK</h2>
                <div
                    className='stack-icon-container'
                    onClick={reverseStack}
                    title='Reverse'
                >
                    <ButtonBase centerRipple>
                        <BsArrowUpDown color={INPUT_TEXT_GRAY} size='23px' />
                    </ButtonBase>
                </div>
            </div>

            <div className='stack-container-label'>
                <p />
                <p>HEX</p>
                <p>%</p>
            </div>
            {renderStack}
            <AddColorButton
                clickFunction={addColor}
                disabled={stack.length === 5}
            />
        </div>
    );
}

export default Stack;
