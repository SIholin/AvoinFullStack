import { useState } from 'react'

const Header = (props) => (
  <h1>{props.name}</h1>
)

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.name}
  </button>
)

const Statistics = (props) => {
  const sum = props.good+props.neutral+props.bad

  if (sum < 1) {
    return (
      <div>
        <Header name="Statistics"/>
      </div>
    )
  }

  return (
    <div>
      <Header name="Statistics"/>
      <table>
        <tbody>
          <Stat text={'good'} votes={props.good}/> 
          <Stat text={'neutral'} votes={props.neutral}/>
          <Stat text={'bad'} votes={props.bad}/>
          <Stat text={'all'} votes={sum} />
          <Stat text={'average'} votes={(props.good-props.bad)/sum} />
          <Stat text={'positive'} votes={(props.good/sum)*100 +'%'} />
        </tbody>
      </table>
    </div>
  )
}

const Stat = (props) => {
  return (
      <tr>
        <td>
          {props.text} 
        </td>
        <td>
          {props.votes}
        </td>
      </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback:</h1>
      <Button name={'good'} onClick={() => setGood(good +1)}/>
      <Button name={'neutral'} onClick={() => setNeutral(neutral+1)}/>
      <Button name={'bad'} onClick={() => setBad(bad+1)}/>
      
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App
