import React from 'react';
import axios from 'axios';

import { useState } from 'react';
import { useEffect } from 'react';

const CountryDetails = ({ country }) => {
    console.log(country);

    // variables
    const capital = country.capital[0];
    const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
    const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${weather_api_key}`;

    // state
    const [weatherInfo, setWeatherInfo] = useState(null);

    // effects
    useEffect(() => {
        axios
            .get(apiEndpoint)
            .then(response => setWeatherInfo(response.data));
    }, [apiEndpoint]);

    console.log("weatherInfo", weatherInfo);
    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>{country.capital[0]}</div>
            <div>area {country.area}</div>

            <h3>languages:</h3>
            <ul>
                {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
            </ul>
            <div>flag {country.flag}</div>
            <img src={country.flags.png} alt={`country flag of ${country.name.common}`} />
            {weatherInfo 
            ?
                <>
                    <h3>Weather in {capital}</h3>
                    <div>temperatue {(weatherInfo.main.temp - 273.15).toFixed(2)} Celsius</div>
                    {weatherInfo.weather.map(weather => <img key={weather.id} src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />)}
                </>
            :   ''
            }
        </div>
    );
};

export default CountryDetails;