import React, { Component } from 'react';
import './style.css';

class Aside extends Component {
  constructor(props) {
      super(props); 
      this.list = this.userList(this.props.messages);  
  }

  userList(messagesArr) {
    const usersSet = new Set();
    messagesArr.forEach(function(item) {
      usersSet.add(item.from)
    });
    return usersSet;
  }

  render() {   
    return (        
      <aside>
        <div className='chat-users'>Chat users</div>
        <ul>
          {Array.from(this.list).map(function(item, i){   
            return <li key={i}>{item}</li>
          })}
        </ul>        
      </aside>        
    );
  }
}

export default Aside;