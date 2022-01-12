import React from "react";
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer';
import Notification from '../components/Notification';
import { asyncNotification } from "../reducers/notificationReducer";
import Filter from './Filter';



const AnecdoteList = (props) => {
   
    const sortedAnecdotes = props.anecdotes.sort((a, b) => b.votes - a.votes);
    const filteredAnecdotes = sortedAnecdotes.filter(a => a.content.includes(props.input.toLowerCase()))

    console.log('filter', filteredAnecdotes)

return (
    <div>
        <Notification />
        <Filter />
        {filteredAnecdotes.map((anecdote) => (
            <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button
                        onClick={() => {
                            console.log('filter', filteredAnecdotes);
                            props.vote(anecdote.id)
                            props.asyncNotification(`${anecdote.content}`)
                            
                        }
                        }
                    >
                        vote
                    </button>
                </div>
            </div>
        ))}
    </div>
);
      }

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdote,
        input: state.filter
    }
}

const mapDispatchToProps = {
    vote,
    asyncNotification
}

const ConnectedAnecdotes = connect(mapStateToProps,
     mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdotes