import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useUser } from '../context/UserContext'; // Import the User Context
import { useOnlineUser } from '../context/OnlineUserContext'; // Import the Online User Context
import { useAuth } from '../context/AuthContext'; // Import the Auth Context
import { useFetchMethod } from '../context/FetchMethodContext'; // Import the Fetch Method Context
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation for routing

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const sidebarRef = useRef(null);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const { users, loading, error } = useUser(); // Access user data
    const { onlineUsers, loading: loadingOnline, error: errorOnline } = useOnlineUser(); // Access online user data
    const { sessionToken } = useAuth(); // Get the session token to check login status
    const navigate = useNavigate(); // Use navigate for routing
    const location = useLocation(); // Get the current location
    const { fetchMethod, setFetchMethod } = useFetchMethod(); // Use Fetch Method Context
    const [selectedUserId, setSelectedUserId] = useState(null); // Track selected user

    const handleClickOutside = useCallback((event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            toggleSidebar(false); // Close the sidebar if clicked outside
        }
    }, [toggleSidebar]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    // Handle overlay visibility based on sidebar state
    useEffect(() => {
        if (isOpen) {
            setOverlayVisible(true);
        } else {
            const timer = setTimeout(() => {
                setOverlayVisible(false);
            }, 300); // Match the duration of the closing animation
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Handle user card click
    const handleUserClick = (userId) => {
        setSelectedUserId(userId); // Set the selected user ID
        navigate(`/user/${userId}`); // Redirect to user details page using navigate
    };

    // Effect to unselect user if the URL changes to a different user
    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const currentUserId = pathParts[pathParts.length - 1]; // Assuming the last part is the user ID

        // Check if the current user ID is different from the selected user ID
        if (selectedUserId && currentUserId !== selectedUserId.toString()) {
            setSelectedUserId(null); // Unselect if current ID doesn't match selected
        }
    }, [location, selectedUserId]);

    return (
        <>
            {/* Background overlay when the sidebar is open on mobile */}
            {overlayVisible && (
                <div className="fixed inset-0 bg-customWhite opacity-20 z-10 transition-opacity duration-300"></div>
            )}
            <div
                ref={sidebarRef}
                className={`fixed inset-y-0 right-0 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:w-1/3 w-full bg-customBlue text-customWhite text-center transition-transform duration-300 z-20 flex flex-col`}
            >
                {/* Close button for mobile, hidden on desktop */}
                {isOpen && (
                    <div className="flex justify-end pr-4 pt-4 md:hidden">
                        <button onClick={() => toggleSidebar(false)} className="text-2xl">
                            &times; {/* X icon */}
                        </button>
                    </div>
                )}
                
                {/* Top container for message and checkbox */}
                <div className="p-4">
                    <p>
                        {sessionToken ? 'Showing backend' : 'Showing online'}
                    </p>
                    <label className="flex items-center">
                        <input 
                            type="checkbox" 
                            checked={fetchMethod === 'SQL'} // Check if SQL fetch method is selected
                            onChange={() => setFetchMethod(fetchMethod === 'SQL' ? 'API' : 'SQL')} // Toggle fetch method
                            className="mr-2"
                        />
                        Use SQL
                    </label>
                </div>
    
                {/* Bottom container for user cards with flexGrow instead of fixed height */}
                <div className="p-4 overflow-y-auto flex-grow">
                    {loading ? (
                        <p>Loading users...</p>
                    ) : error ? (
                        <p className="text-red-500">Database not connected!</p>
                    ) : (
                        users.map((user) => (
                            <div
                                key={user.id}
                                className={`flex p-4 rounded-lg shadow-lg mb-4 ${selectedUserId === user.id ? 'bg-customWhite' : 'bg-customWhite opacity-60'}`}
                                onClick={() => handleUserClick(user.id)}
                            >
                                <img 
                                    src={user.image} 
                                    alt={`${user.firstName} ${user.lastName}`} 
                                    className="h-full w-24 object-cover rounded-lg p-2 self-center" 
                                />
                                <div className="ml-4 flex flex-col justify-center text-customBlue flex-grow">
                                    <h3 className="text-lg font-bold">{`${user.firstName} ${user.lastName} UID: ${user.id}`}</h3>
                                    <p className="text-sm">Age: {user.age}</p>
                                    <p className="text-sm">Gender: {user.gender}</p>
                                    <p className="text-sm">Email: {user.email}</p>
                                    <p className="text-sm">Phone: {user.phone}</p>
                                </div>
                            </div>
                        ))
                    )}
    
                    {/* Render online users for non-logged-in users */}
                    {!sessionToken && (
                        <>
                            {loadingOnline ? (
                                <p>Loading online users...</p>
                            ) : errorOnline ? (
                                <p className="text-red-500">Error loading online users</p>
                            ) : (
                                onlineUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className={`flex p-4 rounded-lg shadow-lg mb-4 ${selectedUserId === user.id ? 'bg-customWhite' : 'bg-customWhite opacity-60'}`}
                                        onClick={() => handleUserClick(user.id)}
                                    >
                                        <div className="flex flex-col justify-center w-full text-customBlue">
                                            <h3 className="text-lg font-bold">{`${user.firstName} ${user.lastName} UID: ${user.id}`}</h3>
                                            <p className="text-sm">Age: {user.age}</p>
                                            <p className="text-sm">Gender: {user.gender}</p>
                                            <p className="text-sm">Email: {user.email}</p>
                                            <p className="text-sm">Phone: {user.phone}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );    
};

export default Sidebar;
