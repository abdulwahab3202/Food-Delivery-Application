import React, { useContext, useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Add from './pages/Add/Add'
import List from './pages/List/List';
import Container from './components/Container/Container';
import AdminHome from './components/AdminHome/AdminHome';
import Home from './components/Home/Home';
import { StoreContext } from './context/StoreContext';
import Edit from './pages/Edit/Edit';
const App = () => {
  const {selectedFood, setSelectedFood} = useContext(StoreContext);
  return (
    <div className='app'>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Container/>}/>
      <Route path='/admin' element={<AdminHome/>}/>
      <Route path='/add' element={<Add/>}/>
      <Route path='/list' element={<List/>}/>
      <Route path='/edit' element={<Edit selectedFood={selectedFood} setSelectedFood={setSelectedFood}/>}/>
    </Routes>
    </div>
  )
}

export default App;