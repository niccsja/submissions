import React, { useState } from "react";
import ReactDOM from "react-dom";

export const App = (props) => {
  let arrayNum = 6;
  const voteArr = Array(arrayNum).fill(0);

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(voteArr);

  const handleVote = () => {
    const copyArr = [...vote];
    copyArr[selected] += 1;
    setVote(copyArr);
  };
  const handleClick = () => {
    setSelected(Math.floor(Math.random() * Math.floor(6)));
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>This has {vote[selected]} votes</div>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleClick}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with the most votes</h1>
        {props.anecdotes[Math.max(...vote)]}
        <p>This has {Math.max(...vote)} votes</p>
      </div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];
ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
