// src/context/OnlineUserContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchOnlineUsers, updateOnlineUser as apiUpdateUser, deleteOnlineUser as apiDeleteUser } from '../api/onlineController';

const OnlineUserContext = createContext();

export const OnlineUserProvider = ({ children }) => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getOnlineUsers = async () => {
            try {
                setLoading(true);
                const usersData = await fetchOnlineUsers();
                setOnlineUsers(usersData.users); // Assuming the response contains a users array
            } catch (error) {
                console.error('Error fetching online users:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getOnlineUsers();
    }, []);

    // Log online users whenever the online users context updates
    useEffect(() => {
        console.log('Updated online users:', onlineUsers);
    }, [onlineUsers]);

    // Update online user (exposing the function as `updateOnlineUser` to avoid naming issues)
    const updateOnlineUser = async (userId, userData) => {
        try {
            const updatedUser = await apiUpdateUser(userId, userData);
            setOnlineUsers((prevUsers) =>
                prevUsers.map(user => (user.id === userId ? updatedUser : user))
            );
            console.log('User updated successfully:', updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Delete online user
    const removeOnlineUser = async (userId) => {
        try {
            await apiDeleteUser(userId);
            setOnlineUsers((prevUsers) =>
                prevUsers.filter(user => user.id !== userId)
            );
            console.log('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <OnlineUserContext.Provider value={{ onlineUsers, loading, error, updateOnlineUser, removeOnlineUser }}>
            {children}
        </OnlineUserContext.Provider>
    );
};

export const useOnlineUser = () => {
    return useContext(OnlineUserContext);
};
