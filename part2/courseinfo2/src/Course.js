import React from "react"

function Course(props){
  console.log("The value of props is ", props);
  return (
    <>
      <Header courses={props.courses} />
      <Content courses={props.courses} />
      <Total courses={props.courses} />
    </>
  );
};

const Header = ({ courses }) => {
  console.log("the value is: ", courses);
  console.log(courses);
  return (
    <>
      <h1>{courses[0].name}</h1>
      <h1>{courses[1].name}</h1>
    </>
  );
};

const Total = ({ courses }) => {
  console.log("the value of props is: ", courses[0].parts);
  console.log("the value of props is: ", courses[1].parts);
  console.log(courses.indexOf(Object.keys("name")));
  return (
    <>
      <h3>
        Number of exercises:
        {courses[0].parts.reduce((acc, obj) => acc + obj.exercises, 0)}
      </h3>
    </>
  );
};

/* const Total = ({ course }) => {
  const sum =
    course.parts[0].exercises +
    course.parts[1].exercises +
    course.parts[2].exercises;
  return <h3>Total of {sum} exercises </h3>;
}; */

const Part = (props) => {
  console.log("the value of props is:", props);
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = ({ courses }) => {
  let index = [];
  let i = 0;
  console.log(courses[1].parts);
  for (i; i < courses.length; i++) {
    index.push(i);
    console.log(index);
  }

  console.log(courses.length);
  console.log(index);
  return (
    <div>
      {courses[0].parts.map((el) => (
        <Part key={el.id} name={el.name} exercises={el.exercises} />
      ))}

      {courses[1].parts.map((el) => (
        <Part key={el.id} name={el.name} exercises={el.exercises} />
      ))}
    </div>
  );
}

export default Course;

