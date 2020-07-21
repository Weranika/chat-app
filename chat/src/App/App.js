import React from 'react';
import './App.css';
import './reset.css';
import SignUp from '../Components/sign_up_form/component';
import ChatPage from '../Components/chat/component';
import { Offline, Online } from "react-detect-offline";
import Reconect from '../Components/disconnect/disconnect';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loginClick = this.loginClick.bind(this);
    this.noLoginClick = this.noLoginClick.bind(this);    
    this.state = {isLoggedIn: false,
                  login: '',
                  messages: [],
                  myMessage: '',
                  users: []
                 };    
    this.socket = this.getConnection();
    this.sendMessage = this.sendMessage.bind(this);           
  }

  getConnection() {
    const socket = new WebSocket("ws://chat.shas.tel"); 
    const messageUpdater = this.updateMessages.bind(this);
    const getUsers = this.getUsersFromArr.bind(this);    
    const reconect = this.getConnection.bind(this);

    socket.onmessage = function(event) {   
      messageUpdater(JSON.parse(event.data).reverse().map((item) => {
        return {
          from: item.from,      
          time: item.time,
          message: item.message,
          id: item.id
        }        
      }));   

      getUsers();      
    };
    
    socket.onclose = function(event) {      
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', event.reason);
      setTimeout(function() {        
        reconect();
      }, 40000);
    };

    socket.onerror = function(err) {
      console.error('Socket encountered error: ', err.message, 'Closing socket');
      socket.close();
    };

    return socket;
  }

  sendMessage(msg) {
    this.socket.send(JSON.stringify(msg));
  }

  updateMessages(arrMsg) {
    const allMsg = this.state.messages.concat(arrMsg);
    this.setState({messages: allMsg});   
  }

  getUsersFromArr() {    
    const usersSet = new Set();
    this.state.messages.forEach(function(item) {
      usersSet.add(item.from);
    });
    const usersArr = Array.from(usersSet);    
    this.setState({users: usersArr});   
  }
 
  loginClick(value) {
    this.setState({isLoggedIn: true, login: value});
    this.handleLogin(value);
  }

  noLoginClick() {   
    this.setState({isLoggedIn: false, login: ''});      
  } 

  handleLogin = (value) => {   
    localStorage.setItem('login', value);    
  };
  
  render() {     
    const isLoggedIn = this.state.isLoggedIn;   
    if (isLoggedIn) {            
      return (
        <>
          <Online>
            <ChatPage messages={this.state.messages} 
                        login={this.state.login}
                        sendCallback={this.sendMessage}
                        users={this.state.users}
              />  
          </Online>      
          <Offline>
            <Reconect/>
          </Offline>    
        </>                 
      );        
    } else {
      return (
        <>
          <Online>
            <SignUp updateLogin ={this.loginClick}/>       
          </Online>
          <Offline>
            <Reconect/>
          </Offline>   
        </>
      );
    }
    
  }  
}

export default App;

