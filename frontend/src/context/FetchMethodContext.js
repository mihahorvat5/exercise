import React, { createContext, useContext, useState } from 'react';

const FetchMethodContext = createContext();

export const FetchMethodProvider = ({ children }) => {
    const [fetchMethod, setFetchMethod] = useState('API');

    return (
        <FetchMethodContext.Provider value={{ fetchMethod, setFetchMethod }}>
            {children}
        </FetchMethodContext.Provider>
    );
};

export const useFetchMethod = () => {
    return useContext(FetchMethodContext);
};
