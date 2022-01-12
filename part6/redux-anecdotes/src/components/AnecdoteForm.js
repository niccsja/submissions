import React from "react";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import {  useDispatch } from 'react-redux';



const AnecdoteForm = () => {
    
    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(createNewAnecdote(content));
    };
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button>create</button>
            </form>
        </>
    );
}

export default AnecdoteForm