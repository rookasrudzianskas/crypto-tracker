import React, { useContext, createContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {

    return (
        <WatchlistContext.Provider value={{}}>
            {children}
        </WatchlistContext.Provider>
    )
}

export default WatchlistProvider;
