import React, { useEffect, useState } from 'react'
import './ExploreMenu.css'
import axios from 'axios'
import FoodDisplay from '../FoodDisplay/FoodDisplay'
const ExploreMenu = ({category, setCategory}) => {

    const [menu_list, setMenu_list] = useState([]);

    const fetchmenu = async () => {
        try {
            const menu = await axios.get(`${import.meta.env.VITE_BASE_URL}/food/menu`);
            if (menu) {
                setMenu_list(menu.data);
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{fetchmenu()},[]);



  return (
    <>
    <div className='explore-menu' id='explore-menu'>
        <h1>Dive Into Our Menu</h1>
        <p className='explore-menu-text'>Are You Hungry? Explore a world of flavors right at your fingertips! Whether you're in the mood for comforting classics, sizzling street food, or healthy bites, our menu has it all.Here you can choose any type dishes you want and order it taste it within a hour. </p>
        <div className="explore-menu-list">
            {
                menu_list.map((item,index) =>{
                    return(
                        <div onClick={() => {setCategory(prev => prev === item.menu_name?"All":item.menu_name)}} key={index} className={category === item.menu_name ? "active" : "explore-menu-list-item"}>
                            <img className='explore-menu-image' src={item.menu_image} alt="menu image" />
                            <p className='explore-menu-title'>{item.menu_name}</p><br />
                        </div>
                    )
                })
            }
        </div>
    </div>
    <br />
    <FoodDisplay category={category} />
    </>
  )
}

export default ExploreMenu