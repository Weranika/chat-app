const countUnreadMsg = (state = 0, action) => {
    if(action.type === 'UNREAD_MSG') {
        return state + action.msgsLen;        
    }    
    else if (action.type === 'RESET_UNREAD_MSGS') {
        state = 0;
        return state;        
    }    
    return state;    
  }
  
  export default countUnreadMsg 