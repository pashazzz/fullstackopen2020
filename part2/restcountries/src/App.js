import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterCountry from './components/FilterCountry'
import DisplayResult from './components/DisplayResult'

function App() {
  const [ countries, setCountries ] = useState([]);
  const [ filterCountry, setFilterCountry ] = useState('');

  const handleFilterCountry = (event) => { setFilterCountry(event.target.value) }
  const filterRegExp = filterCountry === '' ? null : new RegExp(filterCountry.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  const countriesToShow = filterCountry === '' ? [] : countries.filter(country => filterRegExp.test(country.name))
  const handleShowCountry = country => setFilterCountry(country.name)

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  return (
    <div>
      <FilterCountry value={filterCountry} handleFilterCountry={handleFilterCountry} />
      <br />
      <DisplayResult result={countriesToShow} showCountry={handleShowCountry} />
    </div>
  );
}

export default App;
