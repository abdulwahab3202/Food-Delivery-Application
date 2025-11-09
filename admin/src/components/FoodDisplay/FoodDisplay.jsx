import React, { useContext } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../context/StoreContext';
const FoodDisplay = () => {
    const {food_list} = useContext(StoreContext);
  return (
    <div className='food-display' id='food-display'>
        <p className='p'>All Dishes</p>
        <div className="food-display-list">
            {
                food_list.map((item,index) => {
                    if(true){
                        return <FoodItem key={index} id={item._id} name={item.name} image={item.image} description={item.description} price={item.price}/>
                    }
                })
            }
        </div>
    </div>
  )
}

export default FoodDisplay