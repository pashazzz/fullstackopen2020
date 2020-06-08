import React, { useState, useEffect } from 'react'
import dbApi from './services/dbApi'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ messageType, setMessageType ] = useState('')

  useEffect(() => {
    dbApi.getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const filterRe = filterName === '' ? null : new RegExp(filterName, 'i');
  const personsToShow = filterRe === null ? persons : persons.filter(person => filterRe.test(person.name))

  const displayMessage = (type, message) => {
    setMessageType(type);
    setMessage(message)
    setTimeout( () => {setMessage(null)}, 5000)
  }

  const handleFilterName = event => setFilterName(event.target.value)
  const handleNewName = event => setNewName(event.target.value)
  const handleNewNumber = event => setNewNumber(event.target.value)
  const saveNewPerson = event => {
    event.preventDefault();

    const exist = persons.find(person => person.name === newName);
    if (exist !== undefined) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return;
      }
    }
    if (newName === '') {
      return;
    }

    const newObject = {
      name: newName,
      number: newNumber,
    }

    if (exist !== undefined) {
      dbApi.update(exist.id, newObject)
        .then(returnedPerson => {
          displayMessage('info', `The phone number of '${returnedPerson.name}' was updated`)
          setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person));
        })
        .catch(error => {
          displayMessage('error', `The record of '${newObject.name}' has already removed from server`)
          setPersons(persons.filter(person => person.id !== exist.id ))
        })
    } else {
      dbApi.create(newObject)
        .then(returnedPerson => {
          displayMessage('info', `Added '${returnedPerson.name}'`)
          setPersons(persons.concat(returnedPerson));
        })
        .catch(error => {
          displayMessage('error', `Some error with the creating record of '${newObject.name}'`)
        })
    }

    setNewName('');
    setNewNumber('');
  }

  const handleRemove = (id, name) => {
    dbApi.remove(id)
      .then(() => {
        displayMessage('info', `Removed '${name}'`)
        setPersons(persons.filter(person => person.id !== id ))
      })
      .catch(error => {
        displayMessage('error', `Information of '${name}' has already removed from server`)
        dbApi.getAll()
          .then(persons => { setPersons(persons) })
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={messageType} message={message} />

      <form>
        <Filter value={filterName} handleFilterName={handleFilterName}/>
        <h2>Add a new</h2>
        <PersonForm
          newName={newName}
          handleNewName={handleNewName}
          newNumber={newNumber}
          handleNewNumber={handleNewNumber}
        />
        <div>
          <button type="submit" onClick={saveNewPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        handleRemove={handleRemove}
      />
    </div>
  )
}

export default App