import React from 'react';
import './App.css';
import './reset.css';
import SignUp from '../Components/sign_up_form/component';
import ChatPage from '../Components/chat/component';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loginClick = this.loginClick.bind(this);
    this.noLoginClick = this.noLoginClick.bind(this);
    this.state = {isLoggedIn: false,
                  login: '',
                  messages: [],
                  myMessage: ''
                 };    
    this.socket = this.getConnection();
    this.sendMessage = this.sendMessage.bind(this);
  }

  getConnection() {
    const socket = new WebSocket("ws://chat.shas.tel"); 
    const messageUpdater = this.updateMessages.bind(this);

    socket.onmessage = function(event) {   
      messageUpdater(JSON.parse(event.data).reverse().map((item) => {
        return {
          from: item.from,      
          time: item.time,
          message: item.message,
          id: item.id
        }        
      }));        
    };

    socket.onerror = function(error) {
      alert("Error" + error.message);
    };

    socket.onclose = function(event) {
      if (event.wasClean) {
        alert('Socket is close');
      } else {
        alert('Not connected'); 
      }
      alert('Code: ' + event.code + ' reason: ' + event.reason);
    };

    return socket;
  }

  sendMessage(msg) {
    this.socket.send(JSON.stringify(msg));
  }

  updateMessages(arrMsg) {
    this.setState({messages: arrMsg});
  }

  loginClick(value) {
    this.setState({isLoggedIn: true, login: value});
  }

  noLoginClick() {   
    this.setState({isLoggedIn: false, login: ''});      
  } 

  render() {    
    const isLoggedIn = this.state.isLoggedIn;   
    if (isLoggedIn) {            
      return (        
        <ChatPage messages={this.state.messages} 
                  login={this.state.login}
                  sendCallback={this.sendMessage}
        />        
      );
    } else {
      return (
        <SignUp updateLogin ={this.loginClick}/>        
      );
    }    
  }  
}

export default App;