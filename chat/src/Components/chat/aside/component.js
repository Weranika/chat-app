import React, { Component } from 'react';
import './style.css';
import logo from './img/messagesIcon.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Aside extends Component {
  constructor(props) {
      super(props);       
  }

  render() {   
    return (        
      <aside>
        <header className='chatHeader'>   
          <div>
            <img src={logo} alt={"logo"}/>            
          </div>     
          <h4 className='chat-users'>Chat users</h4>
        </header>        
        <ul>
          {this.props.users.sort(function(a, b) {
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

Aside.propTypes = {    
  users: PropTypes.array  
}

const mapStateToProps = function(state) {
  return {users: state.usersList};
}

export default connect(mapStateToProps)(Aside);