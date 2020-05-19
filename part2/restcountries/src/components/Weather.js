import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [ weather, setWeather ] = useState(null)
    const [ city ] = useState(capital)
    const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${escape(city)}`

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setWeather(response.data)
            })
    }, [url])

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <div><b>temperature: </b> {weather === null ? '' : weather.current.temperature} Celsius</div>
            <div><img alt={weather === null ? '' : weather.current.weather_descriptions[0]} src={weather === null ? '' : weather.current.weather_icons[0]}/></div>
            <div><b>wind: </b> {weather === null ? '' : weather.current.wind_speed} mph direction {weather === null ? '' : weather.current.wind_dir} </div>
        </div>)
}

export default Weather