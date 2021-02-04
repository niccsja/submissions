import React from "react";
import ReactDOM from "react-dom";
const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Content = (props) => {
  console.log(props.parts.parts);
  return (
    <>
      <div>
        {props.parts.parts.map((el) => (
          <Part key={`${el.names}`} names={el.names} exercises={el.exercises} />
        ))}
      </div>
      {/* <div>{props.parts.parts.forEach((el) => {
        <Part key={`${el.names}`} part={el.names} exercises={el.exercises} />; 
    })}</div> */}
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises:{" "}
        {props.parts.parts.reduce((acc, obj) => acc + obj.exercises, 0)}
      </p>
    </>
  );
};

const Part = (props) => {
  console.log(props.exercises);
  console.log(props.names);
  return (
    <p>
      {props.names} : {props.exercises}
    </p>
  );
};

const App = () => {
  // const-definitions
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        names: "Fundamentals of React",
        exercises: 10,
      },
      {
        names: "Using props to pass data",
        exercises: 7,
      },
      {
        names: "State of a component",
        exercises: 14,
      },
    ],
  };

  console.log(course.parts.reduce((acc, obj) => acc + obj.exercises, 0));

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));