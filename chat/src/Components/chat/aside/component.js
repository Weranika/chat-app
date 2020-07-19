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
        <h4 className='chat-users'>Chat users</h4>
        <ul>
          {Array.from(this.list).sort(function(a, b){
            let nameA = a.toLowerCase(), nameB = b.toLowerCase()
            if (nameA < nameB) {
              return -1;
            }              
            if (nameA > nameB)
            {
              return 1;
            }              
            return 0;
            }).map(function(item, i){   
            return <li key={i}>{item}</li>
          })}
        </ul>        
      </aside>        
    );
  }
}

export default Aside;