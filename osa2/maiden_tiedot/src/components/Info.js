import React, {useState, useEffect} from "react"
import axios from "axios"

const Info = ({country}) => {
  const [weather, setWeather] = useState(null)
  const capital = country.capital
  const url = 'http://api.weatherstack.com/current?access_key={API_KEY_HERE}&query='+capital

  useEffect(() => {
    axios.get(url)
    .then(response => {
      setWeather(response.data)
    })
  }, [url])

  if(weather) {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        {country.languages.map(language =>
          <ul key={language.name}>
            <li>{language.name}</li>
          </ul>
        )}
        <img src={country.flags.svg} width="400" height="200" alt="flag"/>
        <h3>Weather in {country.capital}</h3>
        <h3>temperature: {weather.current.temperature} Celcius</h3>
        <img src={weather.current.weather_icons} width="100" height="100" alt="weather_now"/>
        <h3>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</h3>
      </div>
    )
  }
  else {
    return (
      <div>

      </div>
    )
  }
}

export default Info