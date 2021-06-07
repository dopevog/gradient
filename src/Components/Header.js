import React from 'react';
import '../Styles/Header.css';
import logo from '../Assets/logo.png';

function Header(props) {
    return (
        <div className='header-container'>
            <img src={logo} alt='logo'></img>
            <h1>
                gradient
                <span
                    style={{
                        fontFamily: 'Times New Roman',
                        fontWeight: 'bold',
                        fontSize: '37px',
                    }}
                >
                </span>

            </h1>
            <p>BETA</p>
        </div>
    );
}

export default Header;
