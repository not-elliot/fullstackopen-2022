import React from 'react';


// sub components
const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.id} part={part} />
    )}    
  </>


// main component
const Course = ({ course }) => {

  return (
      <div>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total sum={course.parts.reduce((acc, part) => acc + part.exercises, 0)} />
      </div>
  );
};

export default Course;