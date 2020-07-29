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
          <Aside/>
          <Main sendCallback={this.props.sendCallback}/>      
        </div>
    );
  }
}

export default ChatPage;
