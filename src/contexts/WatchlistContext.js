import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
    const [watchlistCoinIds, setWatchlistCoinIds] = useState([]);

    return (
        <WatchlistContext.Provider value={{}}>
            {children}
        </WatchlistContext.Provider>
    )
}

export default WatchlistProvider;
