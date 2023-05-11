import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';

import {CountryListProps, CountryObject} from '../types';

const CountryItem = (data: CountryObject) => (
  <View style={styles.rowContainer}>
    <Text>
      {data.State} : (${data.Population})
    </Text>
  </View>
);

export const CountryList = (props: CountryListProps) => {
  console.log('props ', props);

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
    height: 40,
    borderBottomWidth: 1,
  },
});
