import React from "react";
import { filterChange } from "../reducers/filterReducer";
import { useDispatch, useSelector } from "react-redux";

const Filter = () => {

    const search = useSelector(state => state.filter)
    const dispatch = useDispatch();

    const handleChange = (event) => {
        event.preventDefault();
        const input = event.target.value
        event.target.value = '';
        dispatch(filterChange(input));
        console.log(input)
    }

    const style = {
        marginBottom: 10,
    };

    return (
        <div style={style}>
            filter <input value={search} onChange={handleChange} />
        </div>
    )
}

export default Filter