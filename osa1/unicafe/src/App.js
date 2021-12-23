import React, { useState } from 'react'

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGoodClick = () => setClicks({ ...clicks, good: clicks.good + 1})
  const handleNeutralClick = () => setClicks({ ...clicks, neutral: clicks.neutral + 1})
  const handleBadClick = () => setClicks({ ...clicks, bad: clicks.bad + 1})

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <Stats text="statistics"/>
      <Display text="good" value={clicks.good}/>
      <Display text="neutral" value={clicks.neutral}/>
      <Display text="bad" value={clicks.bad}/>
      <All clicks={clicks}/>
    </div>
  )
}

const Header = ({text}) => <h1>{text}</h1>

const Stats = ({text}) => <h1>{text}</h1>

const Display = ({text, value}) => <p>{text} {value}</p>

const All = ({clicks}) => (
  <Display text="all" value={clicks.good + clicks.bad + clicks.neutral}/>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

export default App