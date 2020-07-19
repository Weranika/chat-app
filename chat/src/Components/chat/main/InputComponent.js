import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {myMessage: ''}
    }

    handleChange = (event) => {    
      this.setState({myMessage: event.target.value});      
    };

    handleSubmit(event) {
      event.preventDefault();
      this.props.sendCallback({
          from: this.props.login,
          message: this.state.myMessage
      })     
      this.setState({myMessage: ''});
    }
  
    render() {   
        return (    
          <div className='massage-field'>
            <form onSubmit={this.handleSubmit}>
              <input className='message-input' type='text' name='message' 
              placeholder='enter message' value={this.state.myMessage} autoComplete='off'
              onChange={this.handleChange}/>
              <button className='send'>Send</button>     
            </form>   
          </div>
        )
    }
}
export default Input;