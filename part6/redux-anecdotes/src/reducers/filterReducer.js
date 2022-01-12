
const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'SEARCH':
            return action.input
        default : return state
    }
}

export const filterChange = (input) => {
    return {
        type: 'SEARCH',
        input,
    }
}

export default filterReducer