import React from 'react'

const PersonForm = props => (
    <div>
        <div>name: <input value={props.newName} onChange={props.handleNewName} /></div>
        <div>number: <input value={props.newNumber} onChange={props.handleNewNumber} /></div>
    </div>
)

export default PersonForm