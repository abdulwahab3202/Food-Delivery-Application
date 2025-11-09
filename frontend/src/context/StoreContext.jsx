import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    const [user, setUser] = useState("");
    const [myorders, setMyorders] = useState([]);
    const [food_list, setFood_list] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [wishlist, setWishlist] = useState({});

    const fetchFood = async () => {
        try {
            const food = await axios.get('http://localhost:3000/food/list');
            if (food) {
                setFood_list(food.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getUser = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    };

    useEffect(() => {
        fetchFood();
        getUser();
    }, []);

    useEffect(() => {
        if (user && user._id) {
            getCartItems();
            fetchMyOrders();
        }
    }, [user]);

    const fetchMyOrders = async () => {
        try {
            const result = await axios.post("http://localhost:3000/user/fetchmyorders", { _id: user._id });
            if (result?.data?.success) {
                setMyorders(result.data.user.myOrders);
                localStorage.setItem("myOrders", JSON.stringify(result.data.user.myOrders));
            }
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };

    const getCartItems = async () => {
        if (!user || !user._id) return;
        try {
            const res = await axios.post("http://localhost:3000/cart/getcart", { _id: user._id });
            if (res?.data?.success) {
                setCartItems(res.data.cartItems || {});
                localStorage.setItem("cartItems", JSON.stringify(res.data.cartItems || {}));
            }
        } catch (err) {
            console.error("Error fetching cart items:", err);
        }
    };

    const addToCart = async (id) => {
        if (!user || !user._id) return;
        try {
            const result = await axios.post('http://localhost:3000/cart/add', { _id: user._id, itemId: id });
            if (result?.data?.success) {
                setCartItems(result.data.cartItems);
                localStorage.setItem("cartItems", JSON.stringify(result.data.cartItems));
            }
        } catch (err) {
            console.error("Error adding item to cart:", err);
        }
    };

    const removeFromCart = async (id) => {
        if (!user || !user._id) return;
        try {
            const result = await axios.post('http://localhost:3000/cart/remove', { _id: user._id, itemId: id });
            if (result?.data?.success) {
                setCartItems(result.data.cartItems);
                localStorage.setItem("cartItems", JSON.stringify(result.data.cartItems));
            }
        } catch (err) {
            console.error("Error removing item from cart:", err);
        }
    };

    const deleteFromCart = async (id) => {
        if (!user || !user._id) return;
        try {
            const result = await axios.post('http://localhost:3000/cart/delete', { _id: user._id, itemId: id });
            if (result?.data?.success) {
                setCartItems(result.data.cartItems);
                localStorage.setItem("cartItems", JSON.stringify(result.data.cartItems));
            }
        } catch (err) {
            console.error("Error deleting item from cart:", err);
        }
    };

    const getWishlist = async () => {
        try {
            const result = await axios.post("http://localhost:3000/user/wishlist", { _id: user._id });
            if (result.data.success) {
                setWishlist({ ...result.data.wishlist });
            }
        } catch (err) {
            console.log("Error fetching wishlist:", err);
        }
    };

    const clearCartItems = () => {
        setCartItems({});
        localStorage.removeItem("cartItems");
    };

    const handlelogout = () => {
        setUser("");
        setWishlist({});
        clearCartItems();
        localStorage.removeItem("user");
        localStorage.removeItem("myOrders");
    };


    const cart = food_list.filter((item) => cartItems[item._id] > 0);

    const getTotalCartAmount = () => {
        return cart.reduce((total, item) => total + item.price * (cartItems[item._id] || 0), 0);
    };

    const googlelogin = async (details) => {
    try {
      const res = await axios.post("http://localhost:3000/user/googlelogin", details);
      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
      }
      return res.data;
    }
    catch (err) {
      console.log(err);
    }
  }


    const contextValue = {
        food_list,
        cartItems,
        user,
        myorders,
        wishlist,
        googlelogin,
        setWishlist,
        getWishlist,
        setMyorders,
        getCartItems,
        setUser,
        setCartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCartItems,
        getTotalCartAmount,
        handlelogout,
        fetchMyOrders
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};