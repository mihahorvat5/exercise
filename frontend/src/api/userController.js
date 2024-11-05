// src/api/userController.js

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const fetchHomeData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching home data:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

export const fetchUsers = async (sessionToken) => { // Pass sessionToken as a parameter
    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${sessionToken}` // Set token in Authorization header
            }
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

export const fetchUsersDB = async (sessionToken) => {
    try {
        const response = await axios.get(`${API_URL}/usersDB`, {
            headers: {
                Authorization: `Bearer ${sessionToken}` // Set token in Authorization header
            }
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching users from DB:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username: username,
            password: password,
        });
        return response.data; // Return the session token from the response
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

export const loginDB = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/loginDB`, {
            username: username,
            password: password,
        });
        return response.data; // Return the session token from the response
    } catch (error) {
        console.error('Error logging into DB:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

export const createUser = async (userData, sessionToken) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData, {
            headers: {
                Authorization: `Bearer ${sessionToken}` // Set token in Authorization header
            }
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

export const createUserDB = async (userData, sessionToken) => {
    try {
        const response = await axios.post(`${API_URL}/usersDB`, userData, {
            headers: {
                Authorization: `Bearer ${sessionToken}` // Set token in Authorization header
            }
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error creating user in DB:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

export const updateUser = async (userId, userData, sessionToken) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${sessionToken}` // Set token in Authorization header
            }
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error updating user:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

export const updateUserDB = async (userId, userData, sessionToken) => {
    try {
        const response = await axios.put(`${API_URL}/usersDB/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${sessionToken}` // Set token in Authorization header
            }
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error updating user in DB:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

export const deleteUser = async (userId, sessionToken) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${sessionToken}` // Set token in Authorization header
            }
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

export const deleteUserDB = async (userId, sessionToken) => {
    try {
        const response = await axios.delete(`${API_URL}/usersDB/${userId}`, {
            headers: {
                Authorization: `Bearer ${sessionToken}` // Set token in Authorization header
            }
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error deleting user from DB:', error);
        throw error; // Throw the error to be handled by the caller
    }
};
