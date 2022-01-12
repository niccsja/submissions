
const notificationReducer = (state = null, action) => {
   
    switch(action.type) {
       case 'SET_NOTIF':
           return action.data.content
        case 'CLEAR_NOTIF':
            return action.data.content
        default: return state
    }
}

/* export const setNotification = (content) => {
    return {
        type: 'SET_NOTIF',
        data: {
            content,
        },
    };
    
}; */

export const asyncNotification = (content, timer = 5000) => {
    return async dispatch => {
       
      await dispatch({
           type: 'SET_NOTIF',
           data: {
               content,
           }
       })

       setTimeout(() => {
           dispatch({
               type: 'CLEAR_NOTIF',
               data: {
                   content: null,
               },
           });
       }, timer)

       
      
    }
};

export default notificationReducer

