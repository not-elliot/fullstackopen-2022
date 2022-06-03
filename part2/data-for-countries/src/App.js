import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

import CountryDetails from './components/CountryDetails';

function App() {
  // variables
  const restURL = 'https://restcountries.com/v3.1/all';

  // state
  const [countries, setCountries] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [countriesVisible, setCountriesVisible] = useState([]);

  // effect
  const fetchFromRestAPIHook = () => {
    axios
      .get(restURL)
      .then(response => {
        setCountries(response.data);
        console.log(response.data);
      });
  };
  useEffect(fetchFromRestAPIHook, []);

  // event handler
  const addCountryToShow = (countryName) => {
    return () => setCountriesVisible(countriesVisible.concat(countryName));
  };
  const hideCountryToShow = (countryName) => {
    const filteredArr = countriesVisible.filter(country => country !== countryName);
    return () => setCountriesVisible(filteredArr);
  };

  const filterHandler = (e) => {
    setFilterText(e.target.value);
    setCountriesVisible([]);
  }

  // additional logic
  const filteredCountries = countries
                              .filter(country =>
                                country.name.common.toLowerCase()
                                  .includes(filterText.toLowerCase()));

  console.log("countriesVisible", countriesVisible);


  return (
    <div>
    find countries
      <input type='text' onChange={filterHandler} value={filterText} />
      <button type='button' onClick={() => setFilterText('')}>x</button>
      {
        filteredCountries.length > 10
        ? <div>Too many matches, specify another filter</div>
        : filteredCountries.length < 1
          ? <div>Nothing found</div>
          : filteredCountries.length === 1
            ? <CountryDetails country={filteredCountries[0]} />
            : filteredCountries.map(country => 
              <div key={country.name.common}>
                {country.name.common}
                {
                  countriesVisible.find(c => c === country.name.common)
                  ? (<>
                      <button type='button' onClick={hideCountryToShow(country.name.common)}>hide</button>
                      <CountryDetails country={country} />
                    </>)

                  : <button type='button' onClick={addCountryToShow(country.name.common)}>show</button>
                }
              </div>

            )
      }
    </div>
  );
};

export default App;
