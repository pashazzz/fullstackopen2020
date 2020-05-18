import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  const filterRe = filterName === '' ? null : new RegExp(filterName, 'gi');
  const personsToShow = filterRe === null ? persons : persons.filter(person => filterRe.test(person.name))

  const handleFilterName = event => setFilterName(event.target.value)
  const handleNewName = event => setNewName(event.target.value)
  const handleNewNumber = event => setNewNumber(event.target.value)
  const saveNewPerson = event => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    }
    if (newName === '') {
      return;
    }

    const newObject = {
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(newObject));
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App