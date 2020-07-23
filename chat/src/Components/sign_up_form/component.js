import React, { Component } from 'react';
import './style.css';
import '../../images/cloud.png';
import PropTypes from 'prop-types';

class SignUp extends Component {
  constructor(props) {
      super(props);

      this.state = {
        login: '',
      };   
  }

  handleChange = (event) => {    
    this.setState({login: event.target.value});
  };

  updateLogin = (event) => {
    this.props.updateLogin(this.state.login);
  }

  render() {    
    return (  
      <div className='body-signUp'>
        <div className='container'>
          <h2>Sign in</h2>
          <div className='notation'>Please enter you login</div>           
            <div className='login-form'>              
              <input  type='text' name='name' placeholder='enter your login'
               value={this.state.login} onChange={this.handleChange}/>     
            </div>     
            <button className='go-to-chat' type="submit" onClick={this.updateLogin}>Go to CHAT</button>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {    
  updateLogin: PropTypes.func
}

export default SignUp;