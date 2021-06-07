import React from 'react';
import './App.css';
import Header from './Components/Header';
import HexPicker from './Components/HexPicker/HexPicker';
import Stack from './Components/Stack/Stack';
import Suggested from './Components/Suggested/Suggested';
import StopBar from './Components/StopBar/StopBar';
import CSS from './Components/CSS/CSS';
import Preview from './Components/Preview/Preview';
import { SUGGESTIONS } from './Utils/gradientConstants';
import { Color } from './Utils/Color';
import { shuffle, padLeft } from './Utils/generalUtils';
import { MAX_SIZE, ENTER_KEY } from './Utils/inputConstants';
import CopyConfirmation from './Components/CSS/CopyConfirmation';
import Hidden from '@material-ui/core/Hidden';

class App extends React.Component {
    state = {
        gradient: null,
        selected: 0,
        width: window.screen.width,
        height: window.screen.height,
        suggestedSelected: '',
        suggested: [],
        stopValue: null,
        draggedColor: null,
        cssConfirmationDisplay: false,
    };

    componentWillMount() {
        this.shuffleSuggested();
    }

    shuffleSuggested = (e) => {
        if (e) {
            e.stopPropagation();
        }

        let shuffledSuggested = shuffle(SUGGESTIONS);
        let shownSuggested = shuffledSuggested.slice(0, 4);
        let first = shownSuggested[0];

        this.setState({
            gradient: first.clone(),
            suggestedSelected: first.name,
            suggested: shownSuggested,
            stopValue: first.stack[0].stop,
        });
    };

    addColor = () => {
        const { gradient, selected } = this.state;
        let gradientCopy = gradient.clone();
        let { stack } = gradientCopy;

        if (stack.length < 5) {
            // set current selected as false
            stack[selected].selected = false;

            // recalculate stops
            stack.forEach((c) => {
                c.stop = Math.round((c.index / stack.length) * 100);
            });

            const defaultColor = new Color('ffffff', 100, true, stack.length);
            stack.push(defaultColor);

            this.setState({
                gradient: gradientCopy,
                selected: defaultColor.index,
                stopValue: 100,
            });
        }
    };

    deleteColor = (e, deletedIndex) => {
        const { gradient, selected, suggestedSelected } = this.state;
        let gradientCopy = gradient.clone();
        let { stack } = gradientCopy;

        if (suggestedSelected) {
            this.unsetSuggested();
        }

        if (stack.length > 2) {
            e.stopPropagation();

            // if deleting currently selected
            if (deletedIndex === selected) {
                let nextSelected;

                if (deletedIndex === stack.length - 1) {
                    // if deleting last one set selected as the one before
                    nextSelected = deletedIndex - 1;
                } else {
                    // else set selected as the one after
                    nextSelected = deletedIndex + 1;
                }
                stack[nextSelected].selected = true;
            }

            // delete item
            stack.splice(deletedIndex, 1);

            // update indices and stopValue
            let newSelected, stopValue;
            for (let i = 0; i < stack.length; i++) {
                const color = stack[i];
                color.index = i;
                if (color.selected) {
                    newSelected = i;
                    stopValue = color.stop;
                }
            }

            this.setState({
                gradient: gradientCopy,
                selected: newSelected,
                stopValue,
            });
        }
    };

    changeSelected = (index) => {
        const { gradient, selected } = this.state;
        const { stack } = gradient;
        let stackCopy = [...stack];

        // set curr selected to false
        stackCopy[selected].selected = false;

        // set arg to selected and change this.state.selected
        stackCopy[index].selected = true;

        this.setState((prevState) => ({
            gradient: {
                ...prevState.gradient,
                stack: stackCopy,
            },
            selected: index,
            stopValue: stackCopy[index].stop,
        }));
    };

    setSuggested = (e, suggestedName) => {
        e.stopPropagation();

        const { suggested } = this.state;

        let selectedGradient;
        /* iterate through suggested checking if the suggested's
        name matches the one selected, if so, set
        this.state.gradient as its clone */
        suggested.forEach((gradient) => {
            if (gradient.name === suggestedName) {
                let clone = gradient.clone();
                this.setState({ gradient: clone });
                selectedGradient = clone;
            }
        });

        this.setState({
            suggestedSelected: suggestedName,
            selected: 0,
            stopValue: selectedGradient.stack[0].stop,
        });
    };

    unsetSuggested = () => {
        const { suggestedSelected } = this.state;
        if (suggestedSelected) {
            this.setState({ suggestedSelected: '' });
        }
    };

    handleLinearRadialChange = () => {
        const { gradient } = this.state;
        let gradientCopy = gradient.clone();
        const change = !gradient.isLinear;
        gradientCopy.isLinear = change;

        this.setState({
            gradient: gradientCopy,
        });
    };

    handleCenterChange = (center) => {
        const { gradient } = this.state;
        let gradientCopy = gradient.clone();
        gradientCopy.center = center;

        this.setState({
            gradient: gradientCopy,
        });
    };

    handleWidthChange = (e) => {
        let { value } = e.target;

        if (value) {
            value = Number(value);
        }
        if (value <= MAX_SIZE) {
            this.setState({
                width: value,
            });
        }
    };

    handleHeightChange = (e) => {
        let { value } = e.target;

        if (value) {
            value = Number(value);
        }
        if (value <= MAX_SIZE) {
            this.setState({
                height: value,
            });
        }
    };

    handleDegreesChange = (e) => {
        let { value } = e.target;

        if (value) {
            value = Number(value);
        }

        if (value >= 0 && value < 360) {
            const { gradient } = this.state;
            let gradientCopy = gradient.clone();
            gradientCopy.degrees = value;

            this.setState({
                gradient: gradientCopy,
            });
        }
    };

    handleStopChange = (e) => {
        let { value } = e.target;
        const { gradient, selected } = this.state;

        if (value) {
            value = Number(value);
        }

        if (value >= 0 && value <= 100) {
            let gradientCopy = gradient.clone();
            let { stack } = gradientCopy;

            // update the value
            stack[selected].stop = value;

            // sort the stack in increasing order of stops
            let newSelected = gradientCopy.sortStack();

            this.setState({
                gradient: gradientCopy,
                selected: newSelected,
            });
        } else {
            this.setState({ stopValue: gradient.stack[selected].stop });
        }
    };

    handleKeyDown = (e) => {
        if (e.keyCode === ENTER_KEY) {
            this.handleStopChange(e);
        }
    };

    setValue = (stopValue) => {
        this.setState({ stopValue });
    };

    changeValue = (e) => {
        const { value } = e.target;
        this.setState({ stopValue: value });
    };

    // hasPound = true for stackItem, false for currentColor
    handleHexChange = (e, hasPound) => {
        let { value } = e.target;
        const { selected, gradient } = this.state;
        let gradientCopy = gradient.clone();

        if (hasPound) {
            value = value.substring(1);
        }

        gradientCopy.stack[selected].hex = value;

        this.setState({
            gradient: gradientCopy,
        });
    };

    onDragStart = (e, draggedColor) => {
        // step drag item to entire stack item, instead of just icon
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);

        this.setState({
            draggedColor,
        });
    };

    onDragOver = (e, color) => {
        // let item drop where its dragged over
        e.preventDefault();

        const { gradient, draggedColor } = this.state;
        const gradientCopy = gradient.clone();
        const { stack } = gradientCopy;

        // if dragged over is same as dragged item
        if (draggedColor.isEqual(color)) {
            return;
        }

        // create stack without dragged item
        const newStack = stack.filter((color) => !color.isEqual(draggedColor));

        // insert dragged item
        newStack.splice(color.index, 0, draggedColor);

        let stops = gradientCopy.getSortedStops();

        // set indicies
        for (let i = 0; i < newStack.length; i++) {
            const currColor = newStack[i];
            currColor.index = i;
            currColor.stop = stops[i];
        }
        gradientCopy.stack = newStack;

        this.setState({ gradient: gradientCopy });
    };

    onDragEnd = () => {
        const { gradient, draggedColor } = this.state;
        const gradientCopy = gradient.clone();
        const { stack } = gradientCopy;
        let selected, stopValue;

        // save original stops
        let stops = stack.map((color) => color.stop);

        // update selected and stops
        for (let i = 0; i < stack.length; i++) {
            const color = stack[i];

            if (!color.isEqual(draggedColor)) {
                color.selected = false;
            } else {
                color.selected = true;
                selected = color.index;
                stopValue = stops[i];
            }
        }

        this.setState({
            draggedColor: null,
            gradient: gradientCopy,
            selected,
            stopValue,
        });
    };

    handleRChange = (e) => {
        let { value } = e.target;

        const { selected, gradient } = this.state;
        let gradientCopy = gradient.clone();
        const { stack } = gradientCopy;
        let currColor = stack[selected];
        let { g, b } = currColor;

        let r;
        if (value) {
            value = Number(value);
            r = value;
        } else {
            r = 0;
        }

        if (value >= 0 && value <= 255) {
            r = padLeft(r.toString(16));
            g = padLeft(g.toString(16));
            b = padLeft(b.toString(16));
            const newHex = r + g + b;
            currColor.hex = newHex;
            currColor.r = value;
        }

        this.setState({
            gradient: gradientCopy,
        });
    };

    handleGChange = (e) => {
        let { value } = e.target;

        const { selected, gradient } = this.state;
        let gradientCopy = gradient.clone();
        const { stack } = gradientCopy;
        let currColor = stack[selected];
        let { r, b } = currColor;

        let g;
        if (value) {
            value = Number(value);
            g = value;
        } else {
            g = 0;
        }

        if (value >= 0 && value <= 255) {
            r = padLeft(r.toString(16));
            g = padLeft(g.toString(16));
            b = padLeft(b.toString(16));
            const newHex = r + g + b;
            currColor.hex = newHex;
            currColor.g = value;
        }

        this.setState({
            gradient: gradientCopy,
        });
    };

    handleBChange = (e) => {
        let { value } = e.target;

        const { selected, gradient } = this.state;
        let gradientCopy = gradient.clone();
        const { stack } = gradientCopy;
        let currColor = stack[selected];
        let { r, g } = currColor;

        let b;
        if (value) {
            value = Number(value);
            b = value;
        } else {
            b = 0;
        }

        if (value >= 0 && value <= 255) {
            r = padLeft(r.toString(16));
            g = padLeft(g.toString(16));
            b = padLeft(b.toString(16));
            const newHex = r + g + b;
            currColor.hex = newHex;
            currColor.b = value;
        }

        this.setState({
            gradient: gradientCopy,
        });
    };

    reverseStack = () => {
        const { selected, gradient } = this.state;
        let gradientCopy = gradient.clone();
        const { stack } = gradientCopy;

        let newSelected = stack.length - 1 - selected;
        let stopValue = gradientCopy.reverse();

        this.setState({
            gradient: gradientCopy,
            selected: newSelected,
            stopValue,
        });
    };

    showCSSConfirmation = () => {
        this.setState({ cssConfirmationDisplay: true });
        setTimeout(
            () => this.setState({ cssConfirmationDisplay: false }),
            2000
        );
    };

    handleStopSlider = (values) => {
        const { gradient } = this.state;
        let gradientCopy = gradient.clone();
        const { stack } = gradientCopy;

        let stopValue;
        for (let i = 0; i < stack.length; i++) {
            const color = stack[i];
            color.stop = values[i];

            if (color.selected) {
                stopValue = values[i];
            }
        }

        this.setState({
            gradient: gradientCopy,
            stopValue,
        });
    };

    // value is the H
    handleColorSlider = (value) => {
        const { gradient, selected } = this.state;
        let gradientCopy = gradient.clone();
        const { stack } = gradientCopy;
        const color = stack[selected];
        color.changeHue(value);

        this.setState({
            gradient: gradientCopy,
        });
    };

    updatePosition = ({ x, y }) => {
        const { gradient, selected } = this.state;
        let gradientCopy = gradient.clone();
        const { stack } = gradientCopy;
        const color = stack[selected];
        color.changeColorFromPosition({ x, y });

        this.setState({
            gradient: gradientCopy,
        });
    };

    render() {
        const {
            gradient,
            suggestedSelected,
            suggested,
            selected,
            height,
            width,
            stopValue,
            cssConfirmationDisplay,
        } = this.state;
        const { stack } = gradient;
        const color = stack[selected];

        return (
            <div className='App' onClick={this.unsetSuggested}>
                <Header />
                <Hidden smDown>
                    <div className='container'>
                        <div className='wrapper'>
                            <div className='left'>
                                <StopBar
                                    gradient={gradient}
                                    handleStopSlider={this.handleStopSlider}
                                />
                                <div className='color-picker'>
                                    <div className='color-picker-left'>
                                        <HexPicker
                                            colorwheelColor={color.getColorwheel()}
                                            color={color}
                                            handleHexChange={
                                                this.handleHexChange
                                            }
                                            handleRChange={this.handleRChange}
                                            handleGChange={this.handleGChange}
                                            handleBChange={this.handleBChange}
                                            hue={color.getHue()}
                                            handleColorSlider={
                                                this.handleColorSlider
                                            }
                                            SV={
                                                color.getSvPosition() || {
                                                    x: 0,
                                                    y: 0,
                                                }
                                            }
                                            updatePosition={this.updatePosition}
                                        />
                                    </div>
                                    <div className='color-picker-right'>
                                        <Stack
                                            gradient={gradient}
                                            addColor={this.addColor}
                                            changeSelected={this.changeSelected}
                                            deleteColor={this.deleteColor}
                                            handleKeyDown={this.handleKeyDown}
                                            changeValue={this.changeValue}
                                            stopValue={stopValue}
                                            handleHexChange={
                                                this.handleHexChange
                                            }
                                            onDragStart={this.onDragStart}
                                            onDragOver={this.onDragOver}
                                            onDragEnd={this.onDragEnd}
                                            reverseStack={this.reverseStack}
                                            handleStopChange={
                                                this.handleStopChange
                                            }
                                        />
                                        <Suggested
                                            suggested={suggested}
                                            selected={suggestedSelected}
                                            setSuggested={this.setSuggested}
                                            shuffleSuggested={
                                                this.shuffleSuggested
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='wrapper'>
                            <div className='right'>
                                <Preview
                                    gradient={gradient}
                                    height={height}
                                    width={width}
                                    handleLinearRadialChange={
                                        this.handleLinearRadialChange
                                    }
                                    handleCenterChange={this.handleCenterChange}
                                    handleWidthChange={this.handleWidthChange}
                                    handleHeightChange={this.handleHeightChange}
                                    handleDegreesChange={
                                        this.handleDegreesChange
                                    }
                                />
                                <CSS
                                    gradient={gradient}
                                    showCSSConfirmation={
                                        this.showCSSConfirmation
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <CopyConfirmation display={cssConfirmationDisplay} />
                </Hidden>
                <Hidden mdUp>
                    <span
                        style={{
                            padding: 50,
                        }}
                    >
                        gradient is currently not supported on mobile
                        devices. Please use the site on a larger screen.
                    </span>
                </Hidden>
            </div>
        );
    }
}

export default App;
