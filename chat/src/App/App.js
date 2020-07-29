import React from 'react';
import './App.css';
import './reset.css';
import SignUp from '../Components/sign_up_form/component';
import ChatPage from '../Components/chat/component';
import { Offline, Online } from "react-detect-offline";
import Reconect from '../Components/disconnect/disconnect';
import soundFile from '../Audio/ios_notification.mp3';
import { connect } from 'react-redux';
import { msgReducer, countUnreadMsg, resetUnreadMsgs, listOfUsers } from '../actions';
const Favico = require('favico.js'); 

class App extends React.Component {
  constructor(props) {
    super(props);
    //this.loginClick = this.loginClick.bind(this);       
    this.dispatch = this.props.dispatch;   
    this.state = {isLoggedIn: true, 
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
    const updateMessages = this.updateMessages.bind(this);
    const reconect = this.getConnection.bind(this);
    const playSound = this.playSound.bind(this);
    const setTitleAndFavicon =this.setTitleAndFavicon.bind(this);

    socket.onmessage = function(event) {   
      updateMessages(JSON.parse(event.data).reverse().map((item) => {
        return {
          from: item.from,      
          time: item.time,
          message: item.message,
          id: item.id
        }        
      }));   

      playSound();   
      setTitleAndFavicon();
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
    const favicon = this.favicon;    
    document.addEventListener( 'visibilitychange' , () =>
    {
      if (!document.hidden) {      
        document.title = 'Chat App';        
        favicon.badge(' ', {bgColor : '#5CB85C', animation:'none'});
        
      } else {
        this.dispatch(resetUnreadMsgs());
      }
    }, false );
  }    

  sendMessage(msg) {
    this.socket.send(JSON.stringify(msg));
  }

  setTitleAndFavicon() {
    if (document.hidden) {
      if (this.props.unreadMsg === 1) {
        document.title=`You have 1 new message!`;
        this.favicon.badge(1, {bgColor : '#d00', animation:'popFade'});
      } else if (this.props.unreadMsg > 1) {
        document.title=`You have ${this.props.unreadMsg} new messages!`;
        this.favicon.badge(this.props.unreadMsg, {bgColor : '#d00', animation:'popFade'});
      } 
    } 
  }   

  updateMessages(arrMsg) {         
    this.dispatch(msgReducer(arrMsg));
    this.dispatch(countUnreadMsg(arrMsg.length));   
    const usersList = arrMsg.map((item) => {
      return item.from;
    }) 
    this.dispatch(listOfUsers(usersList));
  }  

  playSound() {
    if (document.hidden) {
      const audio = new Audio(soundFile);
      audio.play();
    }    
  }    
 
  // loginClick(value) {
  //   if(value === '') {
  //     alert('Please enter login');
  //   } else {
  //     localStorage.getItem('login');    
  //     //this.setState({login: value});
  //   }    
  // }

  // setLocalStorageLogin = (value) => {   
  //   localStorage.setItem('login', value);    
  // };

  render() {            
    // if (localStorage.getItem('login') !== '' && 
    //     localStorage.getItem('login') !== null) {   
    if (this.props.setLogin) {   
      return ( 
        <>
          <Online>    
            <ChatPage sendCallback={this.sendMessage}/>  
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
            <SignUp/>       
          </Online>
          <Offline>
            <Reconect/>
          </Offline>   
        </>
      );
    }    
  }  
}

const mapStateToProps = function(state) {
  return {unreadMsg: state.countUnreadMsg,
          messages: state.msgReducer,
          setLogin: state.setLogin}
}

export default connect(mapStateToProps)(App)