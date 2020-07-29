const setLogin = (state = '', action) => {
    if(action.type === 'SET_LOGIN') {
        return action.login      
    } 
    return state;    
  }
  
  export default setLogin 