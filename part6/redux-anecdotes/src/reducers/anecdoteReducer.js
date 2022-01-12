import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'NEW_ANEC' :
        return [...state, action.data]
    case 'INIT_ANEC' :
      return action.data
    case 'VOTE':
      
      return action.data.updatedVotes
      
     default: return state
  }
  
 
}
export const createNewAnecdote = (content) => {
    return async dispatch => {
      const newAnecdote = await anecdoteService.create(content)
      dispatch({
        type: 'NEW_ANEC',
        data: newAnecdote
      })
    }
};

export const initializeAnecdotes = () => {
    return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch({
        type: 'INIT_ANEC',
        data: anecdotes
      })
    }
}

export const vote = (id) => {
      console.log('vote', id);
    return async dispatch => {
     const anecdotesList = await anecdoteService.getAll()
     const anecdoteToChange = anecdotesList.find(a => a.id === id);
     const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
     const voted = await anecdoteService.update(id, changedAnecdote)
     const updatedVotes = anecdotesList.map(a => 
      a.id !== voted.id ? a : voted)
      console.log(updatedVotes)
     dispatch({
       type: 'VOTE',
       data: { updatedVotes }
     })
    }
    
     /*  return {
        type: 'VOTE',
        data: { id }
      } */
  };

export default reducer