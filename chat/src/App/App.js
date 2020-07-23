import React from 'react';
import './App.css';
import './reset.css';
import SignUp from '../Components/sign_up_form/component';
import ChatPage from '../Components/chat/component';
import { Offline, Online } from "react-detect-offline";
import Reconect from '../Components/disconnect/disconnect';
import soundFile from '../Audio/ios_notification.mp3';
const Favico = require('favico.js'); 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loginClick = this.loginClick.bind(this);       
    this.state = {isLoggedIn: true,                  
                  messages: [],
                  unreadMsg: 0,
                  users: [],
                  visibility: true
                 };       
    if (localStorage.getItem('login') !== null) {
      this.state.login = localStorage.getItem('login')
    }    
    else {
      this.state.login = ''};                      
    this.sendMessage = this.sendMessage.bind(this);      
    this.favicon = new Favico({animation:'popFade'});
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
    const setUnreadMsg = this.setUnreadMsg.bind(this);
    const favicon = this.favicon;
    document.addEventListener( 'visibilitychange' , () =>
    {
     if (!document.hidden) {      
       document.title = 'Chat App';        
       favicon.badge(' ', {bgColor : '#5CB85C', animation:'none'});
       
    } else {setUnreadMsg(0); }}, false );
  }  

  setUnreadMsg(state) {
    this.state.unreadMsg = state;
  }

  sendMessage(msg) {
    this.socket.send(JSON.stringify(msg));
  }

  setNewMsg() {
    if (document.hidden) {
      if (this.state.unreadMsg === 1) {
        document.title=`You have 1 new message!`;
        this.favicon.badge(1, {bgColor : '#d00', animation:'popFade'});
      } else if (this.state.unreadMsg > 1) {
        document.title=`You have ${this.state.unreadMsg} new messages!`;
        this.favicon.badge(this.state.unreadMsg, {bgColor : '#d00', animation:'popFade'});
      } 
    } 
  }   

  updateMessages(arrMsg) {    
    const allMsg = this.state.messages.concat(arrMsg);
    const unreadMsg = this.state.unreadMsg + arrMsg.length;
    this.setState({
                  messages: allMsg,
                  unreadMsg: unreadMsg
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

