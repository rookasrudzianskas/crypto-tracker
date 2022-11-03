//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';
import { LineChart } from "react-native-wagmi-charts";


const data = [
    {
        timestamp: 1625945400000,
        value: 33575.25,
    },
    {
        timestamp: 1625946300000,
        value: 33545.25,
    },
    {
        timestamp: 1625947200000,
        value: 33510.25,
    },
    {
        timestamp: 1625948100000,
        value: 33215.25,
    },
];

const TestScreen = () => {
    return (
        <LineChart.Provider data={data}>
            <LineChart>
                <LineChart.Path />
            </LineChart>
        </LineChart.Provider>
    );
};

export default TestScreen;
