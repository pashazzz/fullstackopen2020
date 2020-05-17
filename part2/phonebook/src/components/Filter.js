import React from 'react'

const Filter = ({ value, handleFilterName }) => <div>filter shown with: <input value={value} onChange={handleFilterName}/></div>

export default Filter