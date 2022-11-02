//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PortfolioAssetsList from "./components/PortfolioAssetsList";

const PortfolioScreen = () => {
    return (
        <View>
            <PortfolioAssetsList />
        </View>
    );
};

export default PortfolioScreen;
