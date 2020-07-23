import React, { Component } from 'react';
import reconnect from './img/inf.png';
const Favico = require('favico.js'); 

class Reconect extends Component {
    constructor(props) {
        super(props);     
        this.disconnectFavico();
    }

    disconnectFavico () {
        const favico = new Favico({ animation:'popFade' });        
        favico.badge(' ');
      }

    render() {   
      return (        
        <div className='reconext'>
            <div >Oops! Seems you have some problem with Internet</div>
            <img src={reconnect} alt={'reconnect'}></img>
        </div>   
     );
    }
}

export default Reconect;
