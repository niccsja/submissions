import React from "react";


const Input = (props) => {
    console.log("The value of props in PersonForm is: ", props.value);
    return (
      <div>
        
      {props.valname}  <input
          value={props.value}
          onChange={props.change}
          name={props.name}
          label={props.name}
        />
      </div>
    );
};

 const PersonForm = (props) => {

    return (
      <form onSubmit={props.submit}>
        <div>
          <Input valname="name" change={props.nameChange} />
          <Input valname="number" change={props.numChange} />
        </div>
        {/* <div>
          {props.number} <input value={props.number}
                         onChange={props.change}
                         name={props.number}
                         label={props.number} />
        </div> */}
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
}

export default PersonForm;
