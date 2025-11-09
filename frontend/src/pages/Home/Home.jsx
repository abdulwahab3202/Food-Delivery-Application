import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import AboutUs from '../../components/AboutUs/AboutUs'
import Chef from '../../components/Chef/Chef'
const Home = () => {
  return (
    <div>
      <Header />
      <AboutUs/>
      <Chef/>
    </div>
  )
}
export default Home