import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';

import {CountryListProps, CountryObject} from '../types';

const CountryItem = (data: CountryObject) => (
  <View style={styles.rowContainer}>
    <Text style={styles.countryText}>
      {data.State} : (${data.Population})
    </Text>
  </View>
);

export const CountryList = (props: CountryListProps) => {
  return (
    <FlatList
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      data={props.data}
      renderItem={({item}) => <CountryItem {...item} />}
      keyExtractor={(item, index) => `country_${index}`}
    />
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    height: 50,
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  countryText: {
    fontSize: 16,
    color: 'black',
  },
});
