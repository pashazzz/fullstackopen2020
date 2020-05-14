import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const random = () => Math.floor(Math.random() * anecdotes.length);
  const incVote = (selected) => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };
  const getMostVoted = () => points.indexOf(Math.max(...points));

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Anecdote anecdote={props.anecdotes[selected]} votes={points[selected]} />
      <div>
        <Button clickHandler={() => incVote(selected)} text="vote" />
        <Button clickHandler={() => setSelected(random())} text="next anecdote" />
      </div>

      <Title text="Anecdote with most votes" />
      <Anecdote anecdote={props.anecdotes[getMostVoted()]} votes={points[getMostVoted()]} />
    </div>
  )
}

const Title = ({text}) => <h1>{text}</h1>
const Anecdote = ({anecdote, votes}) => <>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </>
const Button = ({text, clickHandler}) => <button onClick={clickHandler}>{text}</button>

const anecdotes = [
  'The best way to get a project done faster is to start sooner',
  'Let us change our traditional attitude to the construction of programs. Instead of imagining that our main task is to instruct a computer what to to, let us concentrate rather on explaining to human beings what we want a computer to do.',
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
