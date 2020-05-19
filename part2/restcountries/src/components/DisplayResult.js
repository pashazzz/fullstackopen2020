import React from 'react'
import Country from './Country'
import CountryName from './CountryName'

const DisplayResult = ({ result, showCountry }) => {
    if (result.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (result.length === 1) {
        return <Country country={result[0]} />
    }

    return result.map(country => <CountryName key={country.name} country={country} showCountry={showCountry} />)
}

export default DisplayResult