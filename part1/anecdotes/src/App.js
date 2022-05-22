import { useState } from 'react';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      {anecdote}
      <br />
      <span>has {votes} votes</span>
    </div>
  );
};

const App = () => {
  // variables
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];

  // state
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  // event handlers
  const selectRandomQuoteOnClick = () => {
    const randNr = Math.floor(Math.random() * anecdotes.length);
    setSelected(randNr);
  }
  const voteForQuoteOnClick = () => {
    const newVotes = [...votes];
    newVotes[selected] = votes[selected] + 1;
    setVotes(newVotes);
  }

  // other logic
  const highestVotedQuote = anecdotes
    .map((quote, index) => ({ quote, votes: votes[index]}))
    .sort((a, b) => b.votes - a.votes)[0];
  console.log(highestVotedQuote);
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={voteForQuoteOnClick} text="vote" />
      <Button handleClick={selectRandomQuoteOnClick} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote={highestVotedQuote.quote} votes={highestVotedQuote.votes} />
    </div>
  );
}

export default App;
