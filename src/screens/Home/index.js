import React from 'react';

import ListComponent from '../../components/ListComponent';

import './style.css';
import pokeball from '../../img/go-ball-3.png';
const Home = ()=>{
    return (
        <div className='home-background'>
            <img src={pokeball} className='home-pokeball' alt='pokeball'/>
            <img src={pokeball} className='home-pokeball' alt='pokeball'/>
            <img src={pokeball} className='home-pokeball' alt='pokeball'/>
            <h1>Home</h1>
            <div>
                <ListComponent/>              
            </div>          
        </div>    
    )
}

export default Home;