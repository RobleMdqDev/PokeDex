import React from 'react';
import { useSelector } from 'react-redux';

import { userLoading } from '../../store/reducers/userReducer';

import './style.css';

const LoadingComponent = ()=>{
    
    const userLoad = useSelector(userLoading);

    return( 
            userLoad
            ?
                <div className='LC-area'>
                    <div className='LC-img' />
                </div>
            :   ''
            
    )
}

export default LoadingComponent;