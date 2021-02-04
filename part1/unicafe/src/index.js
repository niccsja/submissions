import React, { useState } from "react";
import ReactDOM from "react-dom";



const Statistic = (props) => {
  if (props.state === 0 || props.state === "NaN%") {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.state}</td>
        </tr>
      </tbody>
    </table>
  );
};
const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};
export const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let all = good + neutral + bad;
  let average = (good * 1 + neutral + bad * -1) / 3;
  let positive = (good / all) * 100 + "%";

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />

      <h1>Statistics</h1>

      <Statistic text="good" state={good} />
      <Statistic text="neutral" state={neutral} />
      <Statistic text="bad" state={bad} />
      <Statistic text="all" state={all} />
      <Statistic text="average" state={average} />
      <Statistic text="positive" state={positive} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));