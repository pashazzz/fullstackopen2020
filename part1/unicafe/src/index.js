import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return <>
            <Title text="give feedback" />
            <Button text="good" clickHandler={()=>setGood(good + 1)} />
            <Button text="neutral" clickHandler={()=>setNeutral(neutral + 1)} />
            <Button text="bad" clickHandler={()=>setBad(bad + 1)} />

            <Title text="statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />
            
        </>
}

const Title = ({text}) => <h2>{text}</h2>
const Button = ({text, clickHandler}) => <button onClick={clickHandler}>{text}</button>
const Statistic = ({text, stat}) => <tr><td>{text}</td><td>{stat}</td></tr>

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad;
    if (all === 0) {
        return <>No feedback given</>
    }

    const average = (good - bad) / all;
    const positive = (good / all * 100) + ' %';

    return <table>
            <tbody>
                <Statistic text="good" stat={good} />
                <Statistic text="neutral" stat={neutral} />
                <Statistic text="bad" stat={bad} />
                <Statistic text="all" stat={all} />
                <Statistic text="average" stat={average} />
                <Statistic text="positive" stat={positive} />
            </tbody>
        </table>
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
