import React, {useEffect, useState} from 'react';
import {View, TextInput, Text} from 'react-native';

import {CountryList} from './components';

import {CountryObject} from './types';

import {styles} from './style';

const baseURL =
  'https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest';

function App(): JSX.Element {
  const [countries, setCountryList] = useState<CountryObject[]>([]);
  const [processState, setApiStatus] = useState<string>('Processing...');
  const [filterCountries, setFilteredCountry] = useState<CountryObject[]>([]);

  useEffect(() => {
    setApiStatus('Processing');
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
          setApiStatus('Completed');
        });
      })
      .catch(() => {
        setApiStatus('Error occured!!');
      });
  }, []);

  const onFilter = (text: string) => {
    if (text.trim().length > 0) {
      const filterCountry = [...countries]
        .filter(country => {
          //filtering search text with state name
          const state = country.State.toUpperCase();

          if (
            state.includes(text.toUpperCase()) &&
            state.indexOf(text[0].toUpperCase()) === 0
          ) {
            return true;
          }
          return false;
        })
        .sort((a, b) => {
          //sorting descending order of state
          const prevState = a.State.toUpperCase().replace(
            text.toUpperCase(),
            '',
          );

          const currentState = b.State.toUpperCase().replace(
            text.toUpperCase(),
            '',
          );

          let returnVal = 0;
          const length = Math.min(prevState.length, currentState.length);

          for (let i = 0; i < length; i++) {
            if (prevState.charAt(i) !== currentState.charAt(i)) {
              if (prevState.charAt(i) < currentState.charAt(i)) {
                returnVal = 1;
              }
              break;
            }
          }

          return returnVal;
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
      <Text style={styles.statusText}>{processState}</Text>
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
