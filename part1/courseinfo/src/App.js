import React from 'react';
import './index.css';

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: {
            part1: {
                title: 'Fundamentals of React',
                exercises: 10,
                link: 'https://fullstackopen.com/en/part1',
            },
            part2: {
                title: 'Using props to pass data',
                exercises: 7,
                link: 'https://fullstackopen.com/en/part2',
            },
            part3: {
                title: 'State of a component',
                exercises: 14,
                link: 'https://fullstackopen.com/en/part3',
            },
        },
    }
  
    return (
        <div className="app-container">
            <Header course={course.name} />
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

const Header = (props) => {
    return (
        <h1 className="l-tac">{props.course}</h1>
    );
};

const Content = (props) => {
    const parts = [];
    for (let part in props.parts) {
        parts.push(
            <Part data={props.parts[part]} key={part}/>
        );
    }

    return (
        <ol className="b-parts">
            {parts}
        </ol>
    )
}

const Part = (props) => {
    return (
        <li>
            <a href={props.data.link}>{props.data.title}:</a> {props.data.exercises}
        </li>
    )
}

const Total = (props) => {
    const total = Object.values(props.parts).reduce((total, {exercises}) => total + exercises, 0);

    return (
        <p className="b-total">
            <strong>Number of exercises:</strong> {total}
        </p>
    )
}

export default App;