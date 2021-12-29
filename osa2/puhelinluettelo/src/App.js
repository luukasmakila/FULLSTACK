import React, { useState, useEffect } from 'react'
import numberService from "./services/Numbers"
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState("false")

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLocaleLowerCase().startsWith(filter.toLocaleLowerCase()) === true)

  const hook = () => {
    numberService
    .getAll()
    .then(persons => {
      setPersons(persons)
    })
  }
  useEffect(hook, [])

  const handleDelete = (event) => {
    const id = event.target.value
    const person = persons.filter(person => person.id === id)
    console.log(person[0].name)

    const result = window.confirm(`Do you want to delete ${person[0].name} from the phonebook?`)

    if (result) {
      numberService.deleteNumber(id)
      .then(something => {
        numberService.getAll()
        .then(persons => {
          setPersons(persons)
          setMessage(`${person[0].name} was deleted from the phonebook!`)
          setTimeout(() => {
          setMessage(null)
          }, 3000)
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
      const result = window.confirm(`${newName} is already in the phonebook, replca old number with a new one?`)
      if (result) {
        const changePerson = persons.filter(person => person.name === newName)
        const id = changePerson[0].id
        numberService
        .changeNumber(id, nameObject)
        .then(newData => {
          console.log(newData)
          setPersons(persons.map(person => person.id !== id ? person : newData))
          setMessage(`Changed ${changePerson[0].name}'s number!`)
          setNewNumber("")
          setNewName("")
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
      }
    }
    else {
      numberService
      .addNew(nameObject)
      .then(returnedObject => {
        console.log(returnedObject)
        console.log("here")
        setPersons(persons.concat(returnedObject))
        setMessage(`Added ${returnedObject.name} to the phonebook!`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      setNewName("")
      setNewNumber("")
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
      <h1>Phonebook</h1>
      <Notification message={message} error={error}/>
      <Filter changeFilter={handleFilterChange}/>
      <h2>add a new</h2>
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