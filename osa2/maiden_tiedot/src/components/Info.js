import React from "react"

const Info = ({country}) => {
  console.log(country)
  
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
    </div>
  )
}

export default Info