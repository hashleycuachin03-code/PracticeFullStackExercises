import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //working with buttons:
const goodFeedBack = (feedBack) => {
  console.log('feedBackType', feedBack);
  setGood(feedBack)
}
const neutralFeedBack = (feedBack) => {
  console.log('feedBackType', feedBack);
  setNeutral(feedBack)
}
const badFeedBack = (feedBack) => {
  console.log('feedBackType', feedBack);
  setBad(feedBack)
}

const header = 'give feedback';
const content = 'statistics'

  return (
    <div>
      <Header header={header} />
      <Button onClick={() => goodFeedBack(good + 1)} text="good" />
      <Button onClick={() => neutralFeedBack(neutral + 1)} text="neutral" />
      <Button onClick={() => badFeedBack(bad + 1)} text="bad" />
      <Content content={content} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>  
  )
}
//compute functions:
const sum = (good, neutral, bad) => {
  return good + neutral + bad
}
const average = (good, neutral, bad) => {
  return (good - bad) / (good + neutral + bad)
}
const positive = (good, neutral, bad) => {
  return good / (good + neutral + bad) * 100
}
const Statistics = ({ good, neutral, bad }) => {
  const total = sum(good, neutral, bad)

  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <StatisticLine text="good: " value={good} />
      <StatisticLine text="neutral: " value={neutral} />
      <StatisticLine text="bad: " value={bad} />
      <StatisticLine text="all: " value={total} />
      <StatisticLine text="average: " value={average(good, neutral, bad)} />
      <StatisticLine text="positive: " value={`${positive(good, neutral, bad)}%`} />
    </div>
  )
}

//display component:
const StatisticLine = ({ text, value }) => {
  return (
    <div>
      <p>{text} {value}</p>
    </div>
  )
}
//button component:
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
//layout components:
const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  );
}

const Content = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.content}</h1>
    </div>
  );
}

export default App