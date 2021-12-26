import React, {useState, useEffect} from "react"
import axios from 'axios'
import Countries from "./components/Countries"

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    axios
    .get("https://restcountries.com/v2/all")
    .then(response => {
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