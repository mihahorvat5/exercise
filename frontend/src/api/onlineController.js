// src/api/onlineController.js

import axios from 'axios';

const API_URL = 'https://dummyjson.com';

export const fetchOnlineUsers = async (limit = 20) => {
    try {
        const response = await axios.get(`${API_URL}/users`, {
            params: { limit } // Set the limit parameter for the request
        });
        return response.data; // Return the user data from the response
    } catch (error) {
        console.error('Error fetching online users:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

export const addOnlineUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/add`, userData);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error adding online user:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

export const updateOnlineUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}`, userData);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error updating online user:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

export const deleteOnlineUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${userId}`);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error deleting online user:', error);
        throw error; // Throw the error to be handled by the caller
    }
};
