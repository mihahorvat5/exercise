import React, { useEffect, useState } from 'react';
import Logo from '../images/Logo.svg'; // Ensure you have this logo file

const Footer = () => {
    const [currentTime, setCurrentTime] = useState('');

    const updateTime = () => {
        const now = new Date();
        const options = {
            weekday: 'long',  // Day name (e.g., "ponedeljek" for Monday)
            day: 'numeric',   // Day of the month (e.g., "1")
            month: 'long',    // Month name (e.g., "oktober" for October)
            year: 'numeric',   // Year (e.g., "2024")
        };
        const formattedDate = now.toLocaleDateString('sl-SI', options);
        const formattedTime = now.toLocaleTimeString('sl-SI', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' // Include seconds
        });
        setCurrentTime(`${formattedDate} --> ${formattedTime}`); // Updated format
    };

    useEffect(() => {
        const timer = setInterval(updateTime, 1000); // Update every second
        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    return (
        <footer className="flex flex-col sm:flex-row justify-between items-center p-4 bg-customBlue text-customWhite">
            <div className="flex items-center mb-2 sm:mb-0"> {/* Add margin-bottom for mobile spacing */}
                <img src={Logo} alt="Logo" className="w-auto" /> {/* Adjust size as needed */}
            </div>
            <div className="flex items-center mb-2 sm:mb-0"> {/* Add margin-bottom for mobile spacing */}
                <span>{currentTime}</span>
            </div>
            <div className="flex items-center">
                <span>Miha Horvat © 2024 All rights reserved</span>
            </div>
        </footer>
    );
};

export default Footer;
