import { atom, selector } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWatchlistedCoins } from '../services/requests';

export const allPortfolioBoughtAssets = selector({
    key: 'allPortfolioBoughtAssets',
    get: async () => {
        const jsonValue = await AsyncStorage.getItem('@portfolio_coins');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    }
})

export const allPortfolioBoughtAssetsFromAPI = selector({
    key: 'allPortfolioBoughtAssetsFromAPI',
    get: async ({get}) => {
        const boughtPortfolioAssets = get(allPortfolioBoughtAssetsInStorage);
        const portfolioAssetsMarketData = await getWatchlistedCoins(1, boughtPortfolioAssets.map((portfolioAsset) => portfolioAsset.id).join(','));

        const boughtAssets = boughtPortfolioAssets.map((boughtAsset) => {

        })
    }
})

export const allPortfolioAssets = atom({
    key: 'allPortfolioAssets',
    default: allPortfolioBoughtAssetsFromAPI,
})

export const allPortfolioBoughtAssetsInStorage = atom({
    key: 'allPortfolioBoughtAssetsInStorage',
    default: allPortfolioBoughtAssets,
})
