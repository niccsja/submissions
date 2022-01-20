import React from "react";
import Country from "./Country";

const Countries = (props) => {
console.log(props);
return (
    <ul>
        {props.countries.map((country, i) => (
            <Country key={i} name={props.name} />
        ))}
    </ul>
);
};

export default Countries;