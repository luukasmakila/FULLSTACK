import React, { useState, useEffect } from 'react'
import numberService from "./services/Numbers"
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [showAll, setShowAll] = useState(true)

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLocaleLowerCase().startsWith(filter.toLocaleLowerCase()) === true)

  const hook = () => {
    numberService
    .getAll()
    .then(numbers => {
      setPersons(numbers)
    })
  }
  useEffect(hook, [])

  const handleDelete = (event) => {
    const id = parseInt(event.target.value)
    const personToDelete = persons.filter(person => person.id === id)
    console.log(personToDelete[0].name)
    const result = window.confirm(`Delete ${personToDelete[0].name} ?`)

    if (result === true) {
      numberService
      .deleteNumber(id)
      .then((deleted) => {
        numberService
        .getAll()
        .then(numbers => {
          setPersons(numbers)
        })
      })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const exists = persons.map(person => person.name)
    if (exists.indexOf(newName) !== -1) {
      const result = window.confirm(`${newName} is already added to the phonebook, replace old number with a new one?`)
      if (result === true) {
        const changingPerson = persons.filter(person => person.name === newName)
        const id = changingPerson[0].id
        const changedNumber = {...nameObject, number: newNumber}
        numberService
        .changeNumber(id, changedNumber)
        .then(newData => {
          setPersons(persons.map(person => person.id !== id ? person : newData))
        })
        setNewName("")
        setNewNumber("")
      }
    }
    else {
      numberService
      .addNew(nameObject)
      .then(returnedObject => {
        console.log(returnedObject)
        setPersons(persons.concat(returnedObject))
        setNewName("")
        setNewNumber("")
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter changeFilter={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm 
      addName={addName} 
      newName={newName} 
      newNumber={newNumber} 
      nameChange={handleNameChange} 
      numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
