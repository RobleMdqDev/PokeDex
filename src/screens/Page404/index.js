import React from 'react';
import { PAGE_NOT_FOUND } from '../../constants';
import poke from '../../img/poke_ball_icon.png'
import './style.css';

const Page404 = ()=>{

    return (
        <div className='P404-area'>
            <div className='P404-number'>
            <p>4</p>
            <img src={poke} alt='pokeball'/>
            <p>4</p>
            </div>            
            <h1 className='P404-title'>{PAGE_NOT_FOUND}</h1>            
        </div>
    )
}

export default Page404;