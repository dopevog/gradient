import React from 'react';
import '../../Styles/Preview/Preview.css';
import DownloadButton from './DownloadButton';
import ExpandButton from './ExpandButton';
import Dimensions from './Dimensions';
import Degrees from './Degrees';
import LinearRadial from './LinearRadial';
import Center from './Center';
import { generateImage } from '../../Utils/colorUtils';

class Preview extends React.Component {
    generateImage() {
        const { gradient, width, height } = this.props;
        return generateImage(gradient, width, height);
    }

    isValidImage = () => {
        const { width, height } = this.props;
        return width && height;
    };

    download = () => {
        const url = this.generateImage();
        const link = document.createElement('a');
        link.download = 'gradient';
        link.href = url;
        link.click();
    };

    expand = () => {
        const url = this.generateImage();
        const w = window.open('about:blank');
        const image = new Image();
        image.src = url;

        setTimeout(function () {
            w.document.write(image.outerHTML);
        }, 0);
    };

    render() {
        const {
            gradient,
            width,
            height,
            handleLinearRadialChange,
            handleCenterChange,
            handleWidthChange,
            handleHeightChange,
            handleDegreesChange,
        } = this.props;
        const { degrees, isLinear, center } = gradient;
        const buttonsDisplayStyle = this.isValidImage()
            ? { '': '' }
            : { display: 'none' };
        const Customize = isLinear ? (
            <Degrees
                degrees={degrees}
                handleDegreesChange={handleDegreesChange}
            />
        ) : (
            <Center center={center} clickFunction={handleCenterChange} />
        );
        const background = gradient.toBgString();
        const DIV_MAX = 350;

        const longer = Math.max(height, width);
        const shorter = Math.min(height, width);

        let scaledHeight, scaledWidth;

        if (longer === height) {
            scaledHeight = DIV_MAX;
            scaledWidth = (DIV_MAX / longer) * shorter;
            buttonsDisplayStyle.bottom = '10px';
        } else {
            scaledWidth = DIV_MAX;
            scaledHeight = (DIV_MAX / longer) * shorter;
            buttonsDisplayStyle.top = '106px';
        }

        return (
            <div className='preview-container'>
                <div className='preview-header'>
                    <h2>PREVIEW</h2>
                    <LinearRadial
                        isLinear={isLinear}
                        changeFunction={handleLinearRadialChange}
                    />
                </div>
                <div className='preview-content-wrapper'>
                    <div
                        className='preview-content'
                        style={{
                            background,
                            height: scaledHeight,
                            width: scaledWidth,
                        }}
                    />
                    <div
                        className='preview-buttons-container'
                        style={buttonsDisplayStyle}
                    >
                        <ExpandButton clickFunction={this.expand} />
                        <DownloadButton clickFunction={this.download} />
                    </div>
                </div>
                <div className='preview-interface'>
                    <Dimensions
                        height={height}
                        width={width}
                        handleWidthChange={handleWidthChange}
                        handleHeightChange={handleHeightChange}
                    />
                    {Customize}
                </div>
            </div>
        );
    }
}

export default Preview;
