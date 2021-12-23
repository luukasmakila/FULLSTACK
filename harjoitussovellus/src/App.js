import React, {useState} from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)
  const addOne = () => setCounter(counter + 1)
  const minusOne = () => setCounter(counter - 1)
  const reset = () => setCounter(0)
  return (
    <div>
      <Display counter={counter}/>
      <Button handleClick={addOne} text="plus"/>
      <Button handleClick={minusOne} text="minus"/>
      <Button handleClick={reset} text="reset"/>
    </div>
  )
}

const Display = ({counter}) => <div>{counter}</div>

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

export default App