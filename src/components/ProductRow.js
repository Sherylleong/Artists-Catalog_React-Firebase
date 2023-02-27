import { useNavigate } from "react-router-dom";
import React from "react";
import { doc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from '../firebase'

export default function ProductRow({ product }) {
  const navigate = useNavigate();

  function onEditProduct() {
    navigate("/CatalogForm", {
      state: {
        product: product
      }
    });
  }
  const onDeleteProduct = async () => {
    const productRef = doc(db, "products", product.id)
    alert("Product listing deleted!");
    try{
      await deleteDoc(productRef);

    } catch (err) {
      alert(err)
    }
  }
  
  const stock = product.stock!=0 ? (
    product.stock
  ) : (
    <span style={{ color: "red" }}>{product.stock}</span>
  );

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
 });

 let price = formatter.format(product.price);

 //      <td>{product.img}</td>
  return (
    <tr>
      <td>{product.name}</td>
      <td>{price}</td>
      <td>{product.category}</td>
      <td>{product.artist}</td>
      <td>{product.description}</td>
      <td>{stock}</td>
      <td>
        <button className="edit" onClick={onEditProduct}>
          edit
        </button>
      </td>
      <td>
        {" "}
        <button className="delete" onClick={onDeleteProduct}>
          delete
        </button>
      </td>
    </tr>
  );
}
