import { combineReducers } from 'redux';
import msgReducer from './msgReducer';
import countUnreadMsg from './newMsgReducer';
import usersList from './usersList';
import setLogin from './setLogin';

export default combineReducers({
    msgReducer,
    countUnreadMsg, 
    usersList, 
    setLogin
})
