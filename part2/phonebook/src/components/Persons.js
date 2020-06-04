import React from 'react'
import Person from './Person'

const Persons = ({ personsToShow, handleRemove }) => (
    personsToShow.map(person => <Person key={person.name} person={person} handleRemove={handleRemove} />)
)

export default Persons