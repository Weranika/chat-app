import React, { Component } from 'react';
import './style.css';
import MessageItem from './messageItem';
import Input from './InputComponent';

class Main extends Component {
  constructor(props) {
      super(props);
  }  

  render() {   
    return (
      <main>
        <h2 className='account'>Hello {this.props.login}</h2>
        <div className='chat'>                 
          {this.props.messages.map((item)=> {           
            return <MessageItem key={item.id} msg={(
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

export default Main;