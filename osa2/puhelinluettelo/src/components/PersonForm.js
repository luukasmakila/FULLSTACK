import React from "react"

const PersonForm = ({addName, newName, newNumber, nameChange, numberChange}) => {
    return (
      <div>
        <form onSubmit={addName}>
          <div>name: <input value={newName} onChange={nameChange}/></div>
          <div>number: <input value={newNumber} onChange={numberChange}/></div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
}

export default PersonForm