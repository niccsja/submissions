import React from "react";
import { connect } from 'react-redux';
import { filterChange } from "../reducers/filterReducer";

const Filter = (props) => {

    

    const handleChange = (event) => {
        event.preventDefault();
        const input = event.target.value
        event.target.value = '';
        props.filter(input)
        console.log(input)
    }

    const style = {
        marginBottom: 10,
    };

    return (
        <div style={style}>
            filter <input value={props.search} onChange={handleChange} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        search: state.filter
    }
}

const mapDispatchToProps ={
    filter: filterChange
}

const connectedFilter = connect(mapStateToProps,mapDispatchToProps)(Filter)

export default connectedFilter