import React from "react"

const Filter = ({changeFilter}) => {
    return (
      <div>
        filter shown with
        <input onChange={changeFilter}/>
      </div>
    )
}

export default Filter