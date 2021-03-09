import React from "react";

    const Person = (props) => {
       console.log("The value of props from Person component is: ", props);
      return (
        <li>
          {props.person} {props.number}
        </li>
      );
    };

export default Person;