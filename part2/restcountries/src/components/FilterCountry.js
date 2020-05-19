import React from 'react'

const FilterCountry = (props) => (
    <div>
        Find countries: 
        <input value={props.value} onChange={props.handleFilterCountry} />
    </div>
)

export default FilterCountry