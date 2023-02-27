import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {db, storage} from "../firebase";
import {doc, addDoc, updateDoc, collection, Timestamp} from "firebase/firestore";
//import {ref, uploadBytes}

export default function CatalogForm() {

  const navigate = useNavigate();
  const location = useLocation();
  const emptyProduct = {
    category: "",
    name: "",
    price: null,
    stock: null,
    artist: "",
    description: "",
    img: ""
  };
  let productToEdit;
  if (location.state === null) {
    productToEdit = emptyProduct;
  } else {
    productToEdit = location.state.product;
  }


  const handleOnSubmit = async (event) => {

    const nameInput = event.target.name.value;
    const priceInput = event.target.price.valueAsNumber;
    const categoryInput = event.target.category.value;
    const artistInput = event.target.artist.value;
    const stockInput = event.target.stock.valueAsNumber;
    const descriptionInput = event.target.description.value;

    let toAdd = {
      category: categoryInput,
      name: nameInput,
      price: priceInput,
      stock: stockInput,
      artist: artistInput,
      description: descriptionInput,
      img: ""
    };
  /*
    const allFieldsFilled = toAdd.every((field) => {
      const value = `${field}`.trim();
      return value !== "" && value !== "0";
    });

*/
    if (productToEdit === emptyProduct) {alert("New product entry added!");
    try{
      navigate("/");
      await addDoc(collection(db, "products"), toAdd);

    } catch (err) {
      alert(err)
    }}
    
    else {
      alert("Product entry edited!");
      
        const taskDocRef = doc(db, 'products', productToEdit.id);
        navigate("/");
        try{
          await updateDoc(taskDocRef, {
            category: categoryInput,
            name: nameInput,
            price: priceInput,
            stock: stockInput,
            artist: artistInput,
            description: descriptionInput,
            img: ""
          })
        } catch (err) {
          alert(err)
        } 

    }
    
  };
/* if got time to implement images
  <label className="file"> Image</label>
  <input
    type="file"
    name="image"
    className="fill"
    accept=".jpeg, .png, .jpg"
    placeholder="Upload Image..."
  />
*/
  return (
    <form onSubmit={handleOnSubmit}>
      <label className="fill">Product Name</label>
      <input
        type="text"
        name="name"
        className="fill"
        placeholder="Enter Product Name..."
        defaultValue={productToEdit.name}
        required 
      />
      <label className="fill">Price</label>
      <input
        type="number"
        step=".01"
        name="price"
        className="fill"
        placeholder="Enter Price ($)..."
        defaultValue={productToEdit.price}
        required
      />
      <label className="fill">Category</label>
      <input
        type="text"
        name="category"
        className="fill"
        placeholder="Enter Category..."
        defaultValue={productToEdit.category}
        required
      />
      <label className="fill">Artist</label>
      <input
        type="text"
        name="artist"
        className="fill"
        placeholder="Enter Artist..."
        defaultValue={productToEdit.artist}
        required
      />
      <label className="fill"> Decription</label>
      <input
        type="text"
        name="description"
        className="fill"
        placeholder="Enter Description..."
        defaultValue={productToEdit.description}
        required
      />
      <label className="fill"> Stock</label>
      <input
        type="number"
        name="stock"
        className="fill"
        placeholder="Enter Stock..."
        defaultValue={productToEdit.stock}
        required
      />
      <input type="submit" value="Confirm" />
      <button
        className="cancel"
        type="button"
        onClick={() => {
          navigate("/");
        }}
      >
        Cancel
      </button>
    </form>
  );
}
