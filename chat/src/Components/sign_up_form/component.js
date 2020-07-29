import React, { Component } from 'react';
import './style.css';
import '../../images/cloud.png';
import { connect } from 'react-redux';
import { setLogin } from '../../actions';

class SignUp extends Component {
  constructor(props) {
      super(props);
      this.dispatch = this.props.dispatch;  

      this.state = {
        login: '',
      };   
  }

  handleChange = (event) => {    
    this.setState({login: event.target.value});
  };

  updateLogin = (event) => {
    if (this.state.login === '') {
      alert('Please enter login');
    } else {       
      localStorage.setItem('login', this.state.login);  
      this.dispatch(setLogin(this.state.login)); 
    }
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

export default connect()(SignUp)