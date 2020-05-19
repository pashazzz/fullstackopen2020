import React from 'react'

const CountryName = ({ country, showCountry }) => {
    const handleClick = () => showCountry(country);
    
    return <div>
            {country.name}
            <button onClick={handleClick}>show</button>
        </div>
}

export default CountryName