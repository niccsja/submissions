import React from "react";

const Filter = (props) => {
    return (
        <>
        find countries <input value={props.value} onChange={props.search} />
        </>
    )
}

export default Filter;