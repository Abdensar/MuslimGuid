import React from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
// import Main from "./components/Main"
import Main from "./components/Mainn"
import { BrowserRouter as Router,Route,Routes as Switch } from 'react-router-dom'
import Home from "./pages/Home"
import Adkar from './pages/Adkar'
import Hadith from './pages/Hadith'
import User from './pages/User'
import Chatbot from './pages/Chatbot'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
const App = () => {
  return (<>
  <Router>
  <Header />
  <div className='flex'>
  <Sidebar />
  <Main> 
    <Switch >
      <Route  path="/"  element={<Home/>}/>
      <Route  path="/Adkar" element={<Adkar/>}/>
      <Route  path="/Hadith" element={<Hadith/>}/>
      <Route  path="/User" element={<User/>}/>
      <Route  path="/Chatbot" element={<Chatbot/>}/>
      <Route  path="/Login" element={<Login/>}/>
      <Route  path="/Register" element={<Register/>}/>

    </Switch>
  </Main>
  </div>
  </Router>

  
  </>
    
 
  )
}

export default App
