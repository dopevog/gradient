import React from 'react';
import '../../Styles/Stack/StackItem.css';
import { IoIosMenu, IoIosClose } from 'react-icons/io';
import { INPUT_TEXT_GRAY } from '../../Utils/hexConstants';

function StackItem(props) {
    const {
        color,
        deleteFunction,
        changeSelected,
        cannotDelete,
        handleKeyDown,
        changeValue,
        stopValue,
        handleHexChange,
        onDragStart,
        onDragOver,
        onDragEnd,
        handleStopChange,
    } = props;
    const { hex, stop, selected } = color;
    const selectedDiv = selected ? 'stackitem-selected' : '';
    const darkDiv = color.isDark() ? 'stackitem-dark' : '';
    const closeDiv = cannotDelete ? 'stackitem-no-close' : 'stackitem-close';
    const displayedValue = selected ? stopValue : stop;

    return (
        <div className={selectedDiv}>
            <div
                className='stackitem-container'
                onClick={changeSelected}
                onDragOver={(e) => onDragOver(e, color)}
            >
                <div
                    className='stackitem-icon-container'
                    draggable
                    onDragStart={(e) => onDragStart(e, color)}
                    onDragEnd={onDragEnd}
                >
                    <div className='stackitem-drag'>
                        <IoIosMenu
                            size='25px'
                            color={INPUT_TEXT_GRAY}
                            style={{ padding: '5px', marginRight: '10px' }}
                            title='Move'
                        />
                    </div>
                </div>
                <div className={darkDiv}>
                    <input
                        type='text'
                        spellCheck='false'
                        value={('#' + hex).toLowerCase()}
                        style={{ backgroundColor: '#' + hex }}
                        onChange={(e) => {
                            handleHexChange(e, true);
                        }}
                        title='Enter hex code'
                    ></input>
                </div>
                <input
                    type='number'
                    value={displayedValue}
                    onKeyDown={(e) => handleKeyDown(e)}
                    onChange={(e) => changeValue(e)}
                    onBlur={(e) => handleStopChange(e)}
                    title='Enter stop value'
                ></input>
                <div className='stackitem-icon-container'>
                    <div className={closeDiv}>
                        <IoIosClose
                            size='35px'
                            color={INPUT_TEXT_GRAY}
                            title='Delete color'
                            style={{ marginLeft: '7px' }}
                            onClick={deleteFunction}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StackItem;
