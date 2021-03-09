import React from "react";
import Person from "./Person";


 const Persons = (props) => {
   console.log(props.person);
   return (
     <ul>
       {props.person.map((person, i) => (
         <Person key={i} person={person.name} number={person.number} />
       ))}
     </ul>
   );
 };

export default Persons;