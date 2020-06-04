import React from 'react'

const Person = ({ person, handleRemove }) => {

    const wantRemove = () => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            handleRemove(person.id)
        }
    }

    return (
        <div>{person.name} {person.number} <button onClick={wantRemove}>delete</button></div>
    )
}

export default Person