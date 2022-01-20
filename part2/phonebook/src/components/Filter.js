import React from "react";

 const Filter = (props) => {
    console.log("The value of props in Filter is: ", props);
      return (
        <div>
          filter shown with a{" "}
          <input value={props.value} onChange={props.search}></input>
        </div>
      );

};

export default Filter;
