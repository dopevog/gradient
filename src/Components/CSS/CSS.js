import React from 'react';
import '../../Styles/CSS/CSS.css';
import CopyButton from './CopyButton';

class CSS extends React.Component {
    copy = (e) => {
        const { showCSSConfirmation } = this.props;
        this.textArea.select();
        document.execCommand('copy');
        e.target.focus();

        showCSSConfirmation();
    };

    render() {
        const { gradient } = this.props;
        const background = gradient.toCSSBgString();

        return (
            <div className='css-container'>
                <h2>CSS</h2>
                <div className='css-content'>
                    <textarea
                        name='text'
                        rows='8'
                        wrap='soft'
                        readOnly
                        value={background}
                        ref={(textarea) => (this.textArea = textarea)}
                    ></textarea>
                    <CopyButton clickFunction={(e) => this.copy(e)} />
                </div>
            </div>
        );
    }
}

export default CSS;
