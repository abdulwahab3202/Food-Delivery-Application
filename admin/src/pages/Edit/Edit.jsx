import './Edit.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Edit = ({ selectedFood, setSelectedFood }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (selectedFood) {
            setName(selectedFood.name || "");
            setPrice(selectedFood.price || "");
            setDescription(selectedFood.description || "");
            setImage(selectedFood.image || "");
        }
    }, [selectedFood]);

    const editFood = async (event) => {
        event.preventDefault();
        try {
            const result = await axios.post("http://localhost:3000/food/edit", { itemId: selectedFood.id, name, price, description, image });

            if (result.data.success) {
                Swal.fire({
                    title: "Cool!",
                    text: result.data.msg,
                    icon: "success",
                    scrollbarPadding: false
                });
                navigate('/admin');
            } else {
                Swal.fire({
                    title: "Oops!",
                    text: "Unable to edit the food item",
                    icon: "error",
                    scrollbarPadding: false
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="addfoodcontainer">
            <h2>Edit Food</h2>
            <form onSubmit={editFood}>
                <p>Food name</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <p>Food price</p>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <p>Food description</p>
                <textarea rows={3} cols={30} value={description} onChange={(e) => setDescription(e.target.value)} required />
                <p>Food Image URL</p>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
                <div className="buttons">
                    <input type="submit" value="Save Changes" />
                    <input type="button" value="Back" onClick={() => navigate('/admin')} />
                </div>
            </form>
        </div>
    );
};

export default Edit;
