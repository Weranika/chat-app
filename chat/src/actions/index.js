export const msgReducer = arrMsg => ({
    type: 'ADD_MSG',
    msgs: arrMsg
})
  
export const countUnreadMsg = newMsgs => ({
    type: 'UNREAD_MSG',
    msgsLen: newMsgs
})

export const resetUnreadMsgs =() => ({
    type: 'RESET_UNREAD_MSGS'
})

export const listOfUsers = users => ({
    type: 'LIST_OF_USERS',
    usersList: users
})

export const setLogin = login => ({
    type: 'SET_LOGIN',
    login: login
})