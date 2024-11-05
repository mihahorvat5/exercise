// src/context/UserContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    fetchUsers,
    fetchUsersDB,
    updateUser,
    deleteUser,
    updateUserDB,
    deleteUserDB,
    createUser,  // Import the createUser function
    createUserDB, // Import the createUserDB function
} from '../api/userController'; // Ensure these are imported
import { useAuth } from './AuthContext';
import { useFetchMethod } from './FetchMethodContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { sessionToken } = useAuth();
    const { fetchMethod } = useFetchMethod();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users whenever sessionToken or fetchMethod changes
    useEffect(() => {
        const fetchUsersData = async () => {
            setLoading(true);
            setError(null); // Reset error state before fetching
            try {
                let usersData;
                if (sessionToken) {
                    if (fetchMethod === 'SQL') {
                        usersData = await fetchUsersDB(sessionToken);
                    } else {
                        usersData = await fetchUsers(sessionToken);
                    }
                    setUsers(usersData);
                } else {
                    setUsers([]); // If no sessionToken, clear users
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setUsers([]); // Clear the users array on error
                setError(error); // Set the error state
            } finally {
                setLoading(false);
            }
        };

        fetchUsersData(); // Call the function within the effect
    }, [sessionToken, fetchMethod]); // Only include sessionToken and fetchMethod

    useEffect(() => {
        console.log('Updated users:', users);
    }, [users]);

    const updateUserContext = async (userId, updatedData) => {
        try {
            let response;
            // Determine which update function to call based on fetchMethod
            if (fetchMethod === 'SQL') {
                response = await updateUserDB(userId, updatedData, sessionToken);
            } else {
                response = await updateUser(userId, updatedData, sessionToken);
            }

            const updatedUser = response.user;

            if (!updatedUser) throw new Error("Updated user data is missing in response");

            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === userId ? updatedUser : user))
            );
            console.log('User updated successfully:', updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    };

    const deleteUserContext = async (userId) => {
        try {
            // Determine which delete function to call based on fetchMethod
            if (fetchMethod === 'SQL') {
                await deleteUserDB(userId, sessionToken);
            } else {
                await deleteUser(userId, sessionToken);
            }
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    };

    // Updated function to add a user
    const addUserContext = async (userData) => {
        try {
            let response;
            // Determine which create function to call based on fetchMethod
            if (fetchMethod === 'SQL') {
                response = await createUserDB(userData, sessionToken); // Call createUserDB for SQL
            } else {
                response = await createUser(userData, sessionToken); // Call createUser for REST
            }

            const newUser = response.user; // Get the user data from the response

            if (!newUser) throw new Error("User data is missing in response");

            setUsers((prevUsers) => [...prevUsers, newUser]); // Update the users list with the new user
            console.log('User added successfully:', newUser);
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    };

    return (
        <UserContext.Provider value={{
            users,
            loading,
            error,
            updateUser: updateUserContext,
            deleteUser: deleteUserContext,
            addUser: addUserContext // Add addUser to the context value
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
