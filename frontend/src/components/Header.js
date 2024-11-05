// src/components/Header.js

import React, { useEffect, useCallback } from 'react';
import Logo from '../images/Logo.svg'; // Ensure you have this logo file
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Header = ({ toggleSidebar }) => {
    const { isLoggedIn, logout } = useAuth(); // Get isLoggedIn and logout from context
    const navigate = useNavigate(); // Hook for navigation
    const location = useLocation(); // Hook to get the current location

    const handleLogout = useCallback(() => {
        logout(); // Call the logout function
        navigate('/'); // Redirect to login page after logout
    }, [logout, navigate]);
    const handleLogoutAlt = useCallback(() => {
        logout(); // Call the logout function
        navigate('/login'); // Redirect to login page after logout
    }, [logout, navigate]);

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    handleLogoutAlt(); // Logout if unauthorized
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor); // Clean up the interceptor on unmount
        };
    }, [handleLogout, handleLogoutAlt]); // Include handleLogout in dependencies

    // Determine if the current path matches any of the routes
    const isHomePath = location.pathname === '/';
    const isAddUserPath = location.pathname === '/add-user';

    return (
        <header className="flex items-center justify-between p-8 pr-4 bg-customBlue text-white">
            <div className="flex items-center">
                <img src={Logo} alt="Logo" className="h-6 w-auto" />
            </div>
            <div className="hidden md:flex space-x-4 mb-auto">
                <span 
                    className={`cursor-pointer ${isHomePath ? 'text-customOrange' : 'text-customWhite'} hover:text-customOrange`}
                    onClick={() => navigate('/')} // Redirect to home page
                >
                    Home
                </span>
                <span 
                    className={`cursor-pointer ${isAddUserPath ? 'text-customOrange' : 'text-customWhite'} hover:text-customOrange`}
                    onClick={() => navigate('/add-user')} // Redirect to add user page
                >
                    Add User
                </span>
                <span className={`cursor-pointer ${location.pathname === '/about' ? 'text-customOrange' : 'text-customWhite'} hover:text-customOrange`}
                    //onClick={() => navigate('/about')} // Redirect to About Us page
                >
                    About Us
                </span>
                <span className={`cursor-pointer ${location.pathname === '/press' ? 'text-customOrange' : 'text-customWhite'} hover:text-customOrange`}
                    //onClick={() => navigate('/press')} // Redirect to Press page
                >
                    Press
                </span>
                <span className={`cursor-pointer ${location.pathname === '/solutions' ? 'text-customOrange' : 'text-customWhite'} hover:text-customOrange`}
                    //onClick={() => navigate('/solutions')} // Redirect to Solutions page
                >
                    Solutions
                </span>
            </div>
            <div className="flex items-center ml-4">
                <div className="flex flex-col md:flex-row">
                    <button className="bg-transparent border border-customOrange text-customWhite w-full md:w-auto px-4 py-2 rounded-lg text-lg transition duration-300 hover:bg-customOrange hover:scale-105 mb-2 md:mb-0">
                        Contact Us
                    </button>
                    {isLoggedIn ? (
                        <button 
                            onClick={handleLogout} 
                            className="bg-transparent border border-customOrange text-customWhite w-full md:w-auto px-4 py-2 rounded-lg text-lg transition duration-300 hover:bg-customOrange hover:scale-105 md:ml-2">
                            Logout
                        </button>
                    ) : (
                        <button 
                            onClick={() => navigate('/login')} 
                            className="bg-transparent border border-customOrange text-customWhite w-full md:w-auto px-4 py-2 rounded-lg text-lg transition duration-300 hover:bg-customOrange hover:scale-105 md:ml-2">
                            Login
                        </button>
                    )}
                </div>
                <button
                    onClick={() => toggleSidebar(true)}
                    className="text-xl focus:outline-none ml-4"
                >
                    &#9776;
                </button>
            </div>
        </header>
    );
};

export default Header;
