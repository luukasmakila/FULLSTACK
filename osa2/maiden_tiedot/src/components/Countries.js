import React from "react"
import Info from "./Info"

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

  export default Countries