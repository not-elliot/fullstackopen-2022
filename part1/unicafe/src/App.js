import { useState } from 'react';

// components
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr><td>{text}</td><td>{value} {text === 'positive' ? " %" : ""}</td></tr>
);

const Statistics = (props) => {
  console.log("Statistics props:", props);
  const {good, neutral, bad} = props.reviewCounts;
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * (-1))/all;
  const positivePercentage = good/all*100;
  if(all < 1) {
    return (<p>No feedback given</p>);
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positivePercentage} />
      </tbody>
    </table>
  );
};

// main component with state
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodIncrement = () => {
    setGood(good + 1);
  }

  const neutralIncrement = () => {
    setNeutral(neutral + 1);
  }

  const badIncrement = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={goodIncrement} text="good" />
      <Button handleClick={neutralIncrement} text="neutral" />
      <Button handleClick={badIncrement} text="bad" />
      <h2>statistics</h2>
      <Statistics reviewCounts={{good, neutral, bad}} />
    </div>
  );
}

export default App;
