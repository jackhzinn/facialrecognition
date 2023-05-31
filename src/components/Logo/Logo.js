import React from "react";
import { Tilt } from 'react-tilt';
import './Logo.css';
import logoImg from './brain_gear.png'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt options={{max: 55}} style={{ height: 150, width: 150 }} className="Tilt br2 shadow-2">
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: '2px'}}src={logoImg} alt="logo"/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;