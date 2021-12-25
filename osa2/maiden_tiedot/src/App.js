import React, {useState, useEffect} from "react"
import axios from 'axios'

const Countries = ({countriesToShow}) => {
  if (countriesToShow.length > 10) {
    return (
      <h3>Too many matches, specify another filter</h3>
    )
  }
  else if (countriesToShow.length < 10 && countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map(country => 
          <h3 key={country.name}>{country.name}</h3>
        )}
      </div>
    )
  }
  else {
    return (
      <div>
        {countriesToShow.map(country =>
          <div key={country.name}>
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
          </div>
        )}
      </div>
    )
  }
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    axios
    .get("https://restcountries.com/v2/all")
    .then(response => {
      console.log("promise fullfilled")
      setCountries(response.data)
    })
  }
  useEffect(hook, [])

  const countriesToShow = showAll
    ? countries
    : countries.filter(country => country.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) === true)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <div>find countries <input onChange={handleFilterChange}/></div>
      <Countries countriesToShow={countriesToShow}/>
    </div>
  )
}

export default App;