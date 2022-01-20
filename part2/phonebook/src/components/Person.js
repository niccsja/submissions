import React from "react";


    const Person = ({ person, number, handleDelete, id }) => {
       
      return (
        <li>
          {person} {number} 
          <button onClick={() => handleDelete(id)}>Delete</button>
        </li>
      );
    };

export default Person;