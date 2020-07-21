import React, { Component } from 'react';
import reconnect from './img/inf.png'

const Reconect = () => (    
    <div className='reconext'>
        <div >Oops! Seems you have some problem with Internet</div>
        <img src={reconnect} alt={'reconnect'}></img>
    </div>   
    );

export default Reconect;
