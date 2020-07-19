import React, { Component } from 'react';
import './style.css';
import Aside from './aside/component';
import Main from './main/component';

class ChatPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {   
    return (      
        <div className='main-container'>          
          <Aside messages={this.props.messages}/>
          <Main messages={this.props.messages} 
                login={this.props.login}
                sendCallback={this.props.sendCallback}
          />      
        </div>
    );
  }

}

export default ChatPage;