import React from 'react'
import './List.css'
import { useNavigate } from 'react-router-dom'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const List = () => {
  const navigate = useNavigate();
  return (
    <div>
      <FoodDisplay />
      <div className="button-container">
        <button className='btn' onClick={() => { navigate('/admin') }}>Back</button>
      </div>
    </div>
  )
}

export default List