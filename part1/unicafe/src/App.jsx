import { useState } from 'react'

const Header = ({ heading }) => <h2>{heading}</h2>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine {...props.parts.parts[0]} />
        <StatisticLine {...props.parts.parts[1]} />
        <StatisticLine {...props.parts.parts[2]} />
        <StatisticLine {...props.parts.parts[3]} />
        <StatisticLine {...props.parts.parts[4]} />
        <StatisticLine {...props.parts.parts[5]} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const parts = {
    parts: [
      {
        text: "good",
        value: good
      },
      {
        text: "neutral",
        value: neutral
      },
      {
        text: "bad",
        value: bad
      },
      {
        text: "all",
        value: all
      },
      {
        text: "average",
        value: ((good * 1) + (neutral * 0) + (bad * -1)) / all
      },
      {
        text: "positive",
        value: `${(good / all) * 100} %`
      }
    ]
  }

  const handleClickGood = () => {
    const updateGood = good + 1
    setGood(updateGood)
    setAll(updateGood + neutral + bad)
  }
  const handleClickNeutral = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
    setAll(updateNeutral + good + bad)
  }
  const handleClickBad = () => {
    const updateBad = bad + 1
    setBad(updateBad)
    setAll(updateBad + good + neutral)
  }

  return (
    <div>
      <Header heading="give feedback" />
      <Button onClick={handleClickGood} text="good" />
      <Button onClick={handleClickNeutral} text="neutral" />
      <Button onClick={handleClickBad} text="bad" />
      <Header heading="statistics" />
      <Statistics all={all} parts={parts} />  
    </div>
  )
}

export default App
