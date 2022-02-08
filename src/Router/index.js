import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DetailsPokemon from '../components/DetailsPokemon'
import MenuNavLink from '../components/MenuNavLink'
import Home from '../screens/Home'
import MyTeam from '../screens/MyTeam'


const Router = ()=>{
    return (
        <BrowserRouter >            
            <MenuNavLink/>          
            <Routes >
                <Route exact path='/' element={<Home />}/>
                <Route path='/myteam/' element={<MyTeam />}/>
                <Route path='/pokemon/:id' element={<DetailsPokemon />}/>
            </Routes>           
        </BrowserRouter>
    )
}

export default Router;