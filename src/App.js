import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Main from "./components/Main"
import Home from "./pages/Home"
// import Home from "./pages/Home2"
// import Home from "./pages/Home3"

import { BrowserRouter as Router,Route,Routes as Switch } from 'react-router-dom'
import Adkar from './pages/Adkar'

import Hadith from './pages/Hadith'
import User from './pages/User'
const App = () => {
  return (<>
  <Router>
  <Header/>
  <div className='flex'>
  <Sidebar />
  <Main>
    <Switch>
      <Route  path="/" element={<Home/>}/>
      <Route  path="/Adkar" element={<Adkar/>}/>
      <Route  path="/Hadith" element={<Hadith/>}/>
      <Route  path="/User" element={<User/>}/>
    </Switch>
  </Main>
  </div>
  </Router>

  
  </>
    
 
  )
}

export default App
