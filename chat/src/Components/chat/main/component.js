import React, { Component } from 'react';
import './style.css';
import MessageItem from './messageItem';
import Input from './InputComponent';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Main extends Component {
  constructor(props) {
      super(props);  
      this.messagesEndRef = React.createRef();    
  }  

  componentDidMount () {    
    this.scrollToBottom();
  }
  
  componentDidUpdate () {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollTop = this.messagesEndRef.current.scrollHeight;
  }

  render() {   
    return (
      <main>   
        <h1 className='account'>Hello {this.props.login}</h1>
        <div className='chat' ref={this.messagesEndRef}>                 
          {this.props.messages.map((item)=> {           
            return <MessageItem key={item.id} login={this.props.login} 
              msg={(
                {
                  from : item.from, 
                  time : item.time, 
                  message : item.message
                }
              )}/>    
          })
        }             
        </div>        
        <Input login={this.props.login}
               sendCallback={this.props.sendCallback}
        />
      </main>         
    );
  }  
}

Main.propTypes = { 
  messages: PropTypes.array,
  login: PropTypes.string,
  sendCallback: PropTypes.func
}

const mapStateToProps = function(state) {
  return {messages: state.msgReducer}
}

export default connect(mapStateToProps)(Main);