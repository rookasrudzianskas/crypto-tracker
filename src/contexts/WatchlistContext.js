import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
    const [watchlistCoinIds, setWatchlistCoinIds] = useState([]);

    const getWatchlistData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@watchlist_coins');
            setWatchlistCoinIds(jsonValue != null ? JSON.parse(jsonValue) : []);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWatchlistData();
    }, []);

    const storeWatchlistCoinId = async (coinId) => {
        try {
            const newWatchlist = [...watchlistCoinIds, coinId];
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <WatchlistContext.Provider value={{
            watchlistCoinIds,
        }}>
            {children}
        </WatchlistContext.Provider>
    )
}

export default WatchlistProvider;
