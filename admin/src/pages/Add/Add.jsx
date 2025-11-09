import './Add.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

const Add = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const addfood = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/food/add`, { name, price, description, category, image });
      if (result.data.success) {
        Swal.fire({
          title: "Horrah!",
          text: "Item Added Successfully",
          icon: "success",
          scrollbarPadding: false
        });
      }
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage("");
      navigate('/admin');
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="addfoodcontainer1">
      <h2>Add Food</h2>
      <form onSubmit={addfood}>
        <p>Food name</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <p>Food price</p>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <p>Food description</p>
        <textarea rows={3} cols={30} value={description} onChange={(e) => setDescription(e.target.value)} required />

        <p>Food Category</p>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="Biriyani">Biriyani</option>
          <option value="Noodles">Noodles</option>
          <option value="Chicken">Chicken</option>
          <option value="Roles">Roles</option>
          <option value="Pizza">Pizza</option>
          <option value="Burger">Burger</option>
          <option value="Sandwich">Sandwich</option>
          <option value="Dessert">Dessert</option>
        </select>

        <p>Food Image Url</p>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />

        <div className="buttons">
          <input type="submit" value="Add Food" />
          <input type="button" value="Back" onClick={() => { navigate('/admin') }} />
        </div>
      </form>
    </div>

  );
}

export default Add;
