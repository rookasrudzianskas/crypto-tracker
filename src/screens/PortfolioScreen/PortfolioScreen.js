//@ts-nocheck
import React, {Suspense} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import PortfolioAssetsList from "./components/PortfolioAssetsList";

const PortfolioScreen = () => {
    return (
        <Suspense fallback={<View className="h-screen items-center justify-center"><ActivityIndicator /></View>}>
            <PortfolioAssetsList />
        </Suspense>
    );
};

export default PortfolioScreen;
