import React from "react";
import Person from "./Person";


 const Persons = (props) => {
   const People = props.person;
  
  const ids = People.map(p => p.id);
   console.log(ids);
   return (
     <ul>
     {console.log(People)}
       {People.map((p) => (
         
         <Person key={p.id} person={p.name}
                         number={p.number}
                         id={p.id}
                         handleDelete={() => People.handleDelete()}
                         />
                         
       ))}
     </ul>
   );
 };

export default Persons;