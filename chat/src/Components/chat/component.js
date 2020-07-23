import React, { Component } from 'react';
import './style.css';
import Aside from './aside/component';
import Main from './main/component';
import PropTypes from 'prop-types';

class ChatPage extends Component {
  constructor(props) {
    super(props);    
  }
  
  render() {   
    return (      
        <div className='main-container'>   
          <Aside users={this.props.users}/>
          <Main messages={this.props.messages} 
                login={this.props.login}
                sendCallback={this.props.sendCallback}
          />      
        </div>
    );
  }
}

ChatPage.propTypes = {    
  users: PropTypes.array,
  messages: PropTypes.array,
  login: PropTypes.string,
  sendCallback: PropTypes.func
}

export default ChatPage;
