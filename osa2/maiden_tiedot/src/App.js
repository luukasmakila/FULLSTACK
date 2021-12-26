import React, {useState, useEffect} from "react"
import axios from 'axios'
import Info from "./components/Info"

const Countries = ({countriesToShow, handleClick}) => {
  
  if (countriesToShow.length > 10) {
    return (
      <h3>Too many matches, specify another filter</h3>
    )
  }
  else if (countriesToShow.length <= 10 && countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map(country => 
          <div key={country.name}>
            <h3>{country.name} <button value={country.name} onClick={handleClick}>show</button></h3>
          </div>
        )}
      </div>
    )
  }
  else if (countriesToShow.length === 1) {
    return (
      <div>
        <Info country={countriesToShow[0]}/>
      </div>
    )
  }
  else {
    return (
      <h3>No matches found</h3>
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
  
  const handleClick = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <div>find countries <input onChange={handleFilterChange}/></div>
      <Countries countriesToShow={countriesToShow} handleClick={handleClick}/>
    </div>
  )
}

export default App;