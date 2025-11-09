import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    const [food_list, setFoodlist] = useState([]);
    const [admin, setAdmin] = useState("");
    const [selectedFood, setSelectedFood] = useState("");

    const fetchFood = async () => {
        try {
            const food = await axios.get('http://localhost:3000/food/list');
            if (food) {
                setFoodlist(food.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchFood();
    }, []);

    const contextValue = {
        food_list,
        admin,
        selectedFood,
        setSelectedFood,
        setAdmin,
        setFoodlist,
        fetchFood
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};