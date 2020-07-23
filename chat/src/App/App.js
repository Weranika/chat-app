import React from 'react';
import './App.css';
import './reset.css';
import SignUp from '../Components/sign_up_form/component';
import ChatPage from '../Components/chat/component';
import { Offline, Online } from "react-detect-offline";
import Reconect from '../Components/disconnect/disconnect';
import soundFile from '../Audio/ios_notification.mp3';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.loginClick = this.loginClick.bind(this);       
    this.state = {isLoggedIn: true,                  
                  messages: [],
                  newMsg: [],
                  myMessage: '',
                  users: [],
                  visibility: true
                 };       
    if (localStorage.getItem('login') !== null) {
      this.state.login = localStorage.getItem('login')
    }    
    else {
      this.state.login = ''};                      
    this.sendMessage = this.sendMessage.bind(this);        
  }

  getConnection() {
    const socket = new WebSocket("ws://chat.shas.tel"); 
    const messageUpdater = this.updateMessages.bind(this);
    const getUsers = this.getUsersFromArr.bind(this);    
    const reconect = this.getConnection.bind(this);
    const playSound = this.playSound.bind(this);
    const setNewMsg =this.setNewMsg.bind(this);

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
      playSound();   
      setNewMsg();
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

  componentDidMount() {
    this.socket = this.getConnection();
    
    document.addEventListener( 'visibilitychange' , () =>
    {
     if (!document.hidden) {      
       document.title = 'Chat App';     
    }}, false );
  }
  
  sendMessage(msg) {
    this.socket.send(JSON.stringify(msg));
  }

  setNewMsg() {
    if (document.hidden) {
      (this.state.newMsg.length === 1)?      
      document.title=`You have ${this.state.newMsg.length} new message!`:
      document.title=`You have ${this.state.newMsg.length} new messages!`;
    }
  }

  updateMessages(arrMsg) {    
    const allMsg = this.state.messages.concat(arrMsg);
    this.setState({
                  messages: allMsg,
                  newMsg: arrMsg
                  });  
  }  

  playSound() {
    if (document.hidden) {
      const audio = new Audio(soundFile);
      audio.play();
    }    
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
    if(value === '') {
      alert('Please enter login');
    } else {
      localStorage.setItem('login', value);    
      this.setState({login: value});
    }    
  }

  setLocalStorageLogin = (value) => {   
    localStorage.setItem('login', value);    
  };

  render() {            
    if (localStorage.getItem('login') !== '' && 
        localStorage.getItem('login') !== null) {   
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

