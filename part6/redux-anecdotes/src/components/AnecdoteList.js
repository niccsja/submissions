import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import Notification from '../components/Notification';
import { setNotification } from '../reducers/notificationReducer'
import { asyncNotification } from "../reducers/notificationReducer";
import Filter from './Filter';



const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => state.anecdote);
    const input = useSelector(state => state.filter);
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
    const filteredAnecdotes = sortedAnecdotes.filter(a => a.content.includes(input.toLowerCase()))

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
                            dispatch(vote(anecdote.id));
                            dispatch(asyncNotification(`${anecdote.content}`))
                            
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

export default AnecdoteList