const usersList = (state = [], action) => {
    if(action.type === 'LIST_OF_USERS') {
        const usersSet = new Set(state.concat(action.usersList));
        return Array.from(usersSet);                
    } 
    return state;    
  }
  
  export default usersList 