const msgReducer = (state = [], action) => {
    if(action.type === 'ADD_MSG') {
        return state.concat(action.msgs);
    }    
    return state;    
  }
  
  export default msgReducer