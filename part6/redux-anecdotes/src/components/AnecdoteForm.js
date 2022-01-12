import React from "react";
import { connect } from 'react-redux'
import { createNewAnecdote } from "../reducers/anecdoteReducer";




const AnecdoteForm = (props) => {
    
   

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        props.newAnecdote(content)
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

const mapDispatchToProps = {
    newAnecdote: createNewAnecdote
}

const connectedForm = connect(null,mapDispatchToProps)(AnecdoteForm)

export default connectedForm