import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class MessageItem extends Component {
    constructor(props) {
        super(props);       
    }
    
    render() {   
        return (        
            <section className={this.props.login === this.props.msg.from?
              'enter-message-container outer-message-container ':
              'enter-message-container'}>              
              <div className={'user-data '}>
                <h3>{this.props.msg.from}</h3>
                <div className='date'>{new Date(+this.props.msg.time).toLocaleString()}</div>
              </div>            
              <div className={this.props.login === this.props.msg.from?
              'message-container outer-message':
              'message-container'}>{this.props.msg.message}</div>
            </section>
        )
    }
}

MessageItem.propTypes = {  
  login: PropTypes.string,  
  msg: PropTypes.object
}

const mapStateToProps = function(state) {
  return {login: state.setLogin}
}

export default connect(mapStateToProps)(MessageItem);