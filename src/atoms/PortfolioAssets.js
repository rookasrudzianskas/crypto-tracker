import { atom, selector } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWatchlistedCoins } from '../services/requests';

export const allPortfolioAssets = atom({
    key: 'allPortfolioAssets',
    default: [],
})
