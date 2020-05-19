import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population}</div>
            <div>Native Name: {country.nativeName}</div>
            <div>SubRegion: {country.subregion}</div>

            <h3>Languages</h3>
            <ul>
                { country.languages.map(lang => <li key={lang.iso639_2}>{ lang.name }</li>) }
            </ul>

            <h3>Currencies</h3>
            <ul>
                { country.currencies.map(curr => <li key={curr.code}>{ curr.name }: { curr.symbol }</li>) }
            </ul>

            <img width="200" alt="Flag of {country.name}" src={ country.flag } />

            <Weather capital={country.capital} />

        </div>
    )
}

export default Country