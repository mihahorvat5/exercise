import React from 'react';
import triangle from '../../images/triangle.svg';

const YourSpace = () => {
    return (
        <div className="flex flex-col lg:flex-row flex-grow">
            {/* Left div for text and buttons */}
            <div className="flex-1 flex flex-col items-center justify-center text-customBlue">
                <div className="max-w-[420px] w-full text-center mb-4">
                    <h1 className="text-6xl font-bold mb-8">
                        Your space, our expertise.
                    </h1>
                    <p className="text-lg font-medium mt-4">
                        Syyclops connects all building data - physical, dynamic, human, product, and more - to make that data accessible and actionable, to house both resources and records, and to get you organized.
                    </p>
                </div>
                
                {/* Buttons Container */}
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-5 w-full max-w-[420px] mt-4 mb-8 lg:mb-0">
                    <button className="text-lg h-[52px] flex items-center justify-center bg-customOrange text-white py-2 px-4 rounded-xl w-full lg:w-[calc(50%-8px)] transition-transform transform hover:scale-105">
                        Get Started
                    </button>
                    <button className="text-lg h-[52px] flex items-center justify-center bg-customOrange text-white py-2 px-4 rounded-xl w-full lg:w-[calc(50%-8px)] transition-transform transform hover:scale-105">
                        <img src={triangle} alt="" className="mr-2" />
                        Watch Video
                    </button>
                </div>
            </div>

            {/* Right div for text divs */}
            <div className="flex-1 flex flex-col items-center justify-center lg:p-0">
                <div className="rounded-xl bg-customBlue w-full lg:w-[70%] flex flex-col items-center" style={{ aspectRatio: '1 / 1' }}>
                    {/* Inner Container for Text Divs */}
                    <div className="flex flex-col items-center justify-center h-full text-white w-4/5">
                        {/* Pre-prepared text blocks */}
                        <div className="text-center p-2 border-b border-gray-300 w-full last:border-b-0">
                            <p className="text-lg text-red-500 font-black">Podrobna navodila v ReadMe</p>
                        </div>
                        <div className="text-center p-2 border-b border-gray-300 w-full last:border-b-0">
                            <p className="text-lg">Neprijavljen - SideBar ima DummyJSON</p>
                        </div>
                        <div className="text-center p-2 border-b border-gray-300 w-full last:border-b-0">
                            <p className="text-lg">Prijavljen - SideBar izbira SQL ali backend</p>
                        </div>
                        <div className="text-center p-2 border-b border-gray-300 w-full last:border-b-0">
                            <p className="text-lg">Izbira SQL ali backend tudi za Login</p>
                        </div>
                        <div className="text-center p-2 border-b border-gray-300 w-full last:border-b-0">
                            <p className="text-lg">Add User dela za prijavljene (SQL in backend)</p>
                        </div>
                        <div className="text-center p-2 border-b border-gray-300 w-full last:border-b-0">
                            <p className="text-lg">Edit User dela za prijavljene in neprijavljene</p>
                        </div>
                        <div className="text-center p-2 border-b border-gray-300 w-full last:border-b-0">
                            <p className="text-lg">Delete User dela za prijavljene in neprijavljene</p>
                        </div>
                        <div className="text-center p-2 border-b border-gray-300 w-full last:border-b-0">
                            <p className="text-lg font-bold">Edit in Delete PRI PRIJAVLJENIH STA VEZANA NA LASTNIKA, Prijavljen sme upravljat samo z svojimi podatki</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YourSpace;
