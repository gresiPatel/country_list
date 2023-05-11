/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {View, TextInput, Text} from 'react-native';

import {CountryList} from './components';

import {CountryObject} from './types';

import {styles} from './style';

const baseURL =
  'https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest';

function App(): JSX.Element {
  const [countries, setCountryList] = useState<CountryObject[]>([]);
  const [filterCountries, setFilteredCountry] = useState<CountryObject[]>([]);

  useEffect(() => {
    fetch(baseURL)
      .then(response => response.json())
      .then(apiResponse => {
        const responseData: CountryObject[] = [...apiResponse.data];
        const _countries: CountryObject[] = responseData.sort((a, b) => {
          return a.Population > b.Population ? 1 : 0;
        });
        Promise.all(_countries).then(() => {
          setCountryList(_countries);
          setFilteredCountry(_countries);
        });
      });
  }, []);

  const onFilter = (text: string) => {
    if (text.trim().length > 0) {
      const filterCountry = [...countries].filter(country => {
        console.log('state >>> ', country.State, country.State.includes(text));

        if (
          country.State.toUpperCase().includes(text.toUpperCase()) &&
          country.State.toUpperCase().indexOf(text[0].toUpperCase()) === 0
        ) {
          return true;
        }
        return false;
      });

      Promise.all(filterCountry).then(() => {
        setFilteredCountry(filterCountry);
      });
    } else {
      setFilteredCountry(countries);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Text style={styles.filterText}>Filter</Text>
      <TextInput
        style={styles.inputText}
        onChangeText={text => onFilter(text)}
        placeholder="Type here..."
      />
      <CountryList data={filterCountries} />
    </View>
  );
}

export default App;
