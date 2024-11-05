import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [sessionToken, setSessionToken] = useState(null);

    // Check local storage for an existing session token on initial load
    useEffect(() => {
        const storedToken = localStorage.getItem('sessionToken');
        if (storedToken) {
            setSessionToken(storedToken);
        }
    }, []);

    const login = (token) => {
        setSessionToken(token);
        localStorage.setItem('sessionToken', token); // Save token to local storage
    };

    const logout = () => {
        setSessionToken(null);
        localStorage.removeItem('sessionToken'); // Clear token from local storage
    };

    return (
        <AuthContext.Provider value={{ sessionToken, isLoggedIn: !!sessionToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
