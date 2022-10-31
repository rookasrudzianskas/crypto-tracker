//@ts-nocheck
import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const CoinDetailFooter = () => {
    const optionArr = ["Price", "Market Cap"];
    const [option, setOption] = useState(optionArr[0]);

    return (
        <View>
            <View className="flex-row items-center">
                <View className="flex-row py-1 px-2 rounded-lg bg-gray-700/60 justify-between space-x-2 mt-5 flex-1">
                    {optionArr.map((optionItem, index) => (
                        <TouchableOpacity onPress={() => setOption(optionItem)} className={`${option === optionItem && ' bg-gray-900/80 rounded-lg'} py-2 flex-1 items-center justify-center`} key={index} activeOpacity={0.7}>
                            <Text className={` ${option === optionItem ? 'text-white' : 'text-gray-400'} font-bold`}>{optionItem}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View className="flex-row flex-1">
                    <TouchableOpacity activeOpacity={0.7}>
                        <Text className="text-gray-100">Volume</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7}>
                        <Text className="text-gray-100">BTC</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CoinDetailFooter;
