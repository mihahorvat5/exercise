import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useFetchMethod } from '../context/FetchMethodContext';
import { login as loginApi, loginDB as loginApiDB } from '../api/userController';

import cityConnected from '../images/cityConnected.svg';
import loginMap from '../images/loginMap.svg';
import loginKey from '../images/loginKey.svg';
import logo from '../images/textLogo.png';

const Login = () => {
    const { login, sessionToken } = useAuth();
    const { fetchMethod } = useFetchMethod();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(''); // Error message state
    const [showErrorModal, setShowErrorModal] = useState(false); // Modal visibility
    const [staySignedIn, setStaySignedIn] = useState(false); // Checkbox state

    useEffect(() => {
        console.log("Session token on Login page:", sessionToken);
    }, [sessionToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { session_token } = fetchMethod === 'SQL' 
                ? await loginApiDB(username, password)
                : await loginApi(username, password);
                
            login(session_token);
            console.log("Logging in with token:", session_token);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setLoginError("Wrong username or password");
            } else {
                setLoginError(`Error: ${error.message || "Unknown error"}`);
            }
            setShowErrorModal(true);
            console.error("Login error:", error);
        }
    };

    const closeModal = () => {
        setShowErrorModal(false);
        setLoginError('');
    };

    const toggleStaySignedIn = () => {
        setStaySignedIn(prevState => !prevState);
    };

    return (
        <div className="flex h-screen w-full bg-customBlue font-roboto">
            {/* Left side with logo, text, and image */}
            <div className="hidden lg:flex min-w-[400px] h-full relative">
                <div className="absolute top-12 left-12">
                    <img src={logo} alt="Logo" width="200" height="24" />
                </div>
                <div className="absolute top-1/3 pl-12 pr-20 mt-11 text-center">
                    <h1 className="text-[64px] font-bold text-left text-white leading-[64px]">
                        Your space, our expertise.
                    </h1>
                </div>
                <img src={cityConnected} alt="City Connected" className="w-full h-full object-cover" />
            </div>

            {/* Right side with the form */}
            <div className="relative flex flex-1 h-full items-center justify-center lg:justify-start lg:ml-[15%]">
                <div className="w-[375px] mt-2">
                    <h2 className="text-white text-3xl font-bold text-left mb-12">Sign in to Syyclops</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div className="relative">
                            <label className="text-sm font-medium leading-none text-customWhite">
                                Your username
                            </label>
                            <div className="relative mt-2">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="flex border border-input px-3 py-2 text-sm bg-white rounded-xl h-[56px] w-full text-black pl-10 pr-10 focus:border-primary-light focus:border-2 hover:border-primary-light"
                                />
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-3">
                                    <img src={loginMap} alt="Login Icon" />
                                </div>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="relative pt-4">
                            <label className="text-sm font-medium leading-none text-customWhite">
                                Your password
                            </label>
                            <div className="relative mt-2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mb-4 flex border border-input px-3 py-2 text-sm bg-white rounded-xl h-[56px] w-full text-black pl-10 pr-10 focus:border-primary-light focus:border-2 hover:border-primary-light"
                                />
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-3">
                                    <img src={loginKey} alt="Password Icon" />
                                </div>
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-customBlue hover:text-customOrange transition-colors"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex items-center justify-between text-sm text-mid-neutral-100 cursor-pointer hover:text-primary-light !mt-[-8px]">
                            Forgot password?
                        </div>

                        {/* Stay Signed In Checkbox */}
                        <div className="flex items-center gap-2 pt-4 pb-4">
                            <button
                                type="button"
                                role="checkbox"
                                aria-checked={staySignedIn}
                                onClick={toggleStaySignedIn}
                                className={`shrink-0 border border-customOrange ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded transition-colors h-6 w-6 flex items-center justify-center ${
                                    staySignedIn ? 'bg-customOrange text-white' : 'bg-white'
                                }`}
                            >
                                {staySignedIn && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="white" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        className="h-4 w-4 text-white"
                                    >
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                )}
                            </button>
                            <p className="text-sm text-mid-neutral-100">Stay signed in</p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-customOrange text-white w-full h-[56px] font-bold text-lg rounded-xl hover:opacity-90"
                        >
                            Sign in
                        </button>

                        {/* Sign Up Prompt */}
                        <div className="flex items-center justify-center !mt-4">
                            <p className="text-sm text-mid-neutral-100">Don't have an account?</p>
                            <button
                                className="inline-flex items-center justify-center rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-white hover:text-customBlue h-10 px-4 py-2 text-customOrange text-sm font-bold ml-2"
                                type="button"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Error Modal */}
            {showErrorModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 rounded shadow-lg max-w-md w-full bg-customBlue">
                        <h3 className="text-lg font-semibold text-customOrange">Error</h3>
                        <p className="mt-2 text-white">
                            {loginError}
                        </p>
                        <button
                            onClick={closeModal}
                            className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
