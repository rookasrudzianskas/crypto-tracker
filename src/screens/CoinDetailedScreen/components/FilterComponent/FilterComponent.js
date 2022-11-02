//@ts-nocheck
import React, {memo} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const FilterComponent = (props) => {
    const { filterDay, filterText, selectedRange, setSelectedRange } = props;
    const isFilterSelected = (filter) => filter === selectedRange;

    return (
        <TouchableOpacity onPress={() => setSelectedRange(filterDay)}
                          className={`${isFilterSelected(filterDay) && ' bg-gray-900/80 rounded-lg'} py-2 flex-1 items-center justify-center`}
                          activeOpacity={0.7}
        >
                <Text className={` ${isFilterSelected(filterDay) ? 'text-white' : 'text-gray-400'} font-bold`}>{filterText}</Text>
        </TouchableOpacity>
    );
};

export default memo(FilterComponent);
