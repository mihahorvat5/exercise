import React, { useEffect, useState } from 'react';
import Logo from '../images/Logo.svg';

const Footer = () => {
    const [currentTime, setCurrentTime] = useState('');

    const updateTime = () => {
        const now = new Date();
        const options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        const formattedDate = now.toLocaleDateString('sl-SI', options);
        const formattedTime = now.toLocaleTimeString('sl-SI', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit'
        });
        setCurrentTime(`${formattedDate} --> ${formattedTime}`);
    };

    useEffect(() => {
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <footer className="flex flex-col sm:flex-row justify-between items-center p-4 bg-customBlue text-customWhite">
            <div className="flex items-center mb-2 sm:mb-0">
                <img src={Logo} alt="Logo" className="w-auto" />
            </div>
            <div className="flex items-center mb-2 sm:mb-0">
                <span>{currentTime}</span>
            </div>
            <div className="flex items-center">
                <span>Miha Horvat © 2024 All rights reserved</span>
            </div>
        </footer>
    );
};

export default Footer;
