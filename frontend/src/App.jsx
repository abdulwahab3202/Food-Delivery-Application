import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {Route,Routes} from 'react-router-dom'
import { Footer } from './components/Footer/Footer'
import Cart from './pages/Cart/Cart'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import Home from './pages/Home/Home'
import OrderPlaced from './components/OrderPlaced/OrderPlaced'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import ExploreMenu from './components/ExploreMenu/ExploreMenu'
import MyOrders from './components/MyOrders/MyOrders'
import Whislist from './components/Whislist/Whislist'

const App = () => {
  const [showLogin,setShowLogin] = useState(false)
  const [menu,setMenu] = useState("home")
  const [category, setCategory] = useState("All")
  return (
    <>
    {showLogin ? <LoginPopUp setShowLogin={setShowLogin}/> : <></>}
    <div className='app'>
    <Navbar setShowLogin={setShowLogin} menu={menu} setMenu={setMenu}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/menu' element={<ExploreMenu category={category} setCategory={setCategory} />}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/order' element={<CheckoutPage/>}/>
      <Route path='/orderplaced' element={<OrderPlaced setMenu={setMenu}/>}/>
      <Route path='/myorders' element={<MyOrders/>}/>
      <Route path='/wishlist' element={<Whislist/>}/>
    </Routes>
    </div>
    <Footer setMenu={setMenu}/>
    </>
  )
}
export default App