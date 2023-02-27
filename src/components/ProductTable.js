import ProductRow from "./ProductRow";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../firebase'
export default function ProductTable({ filters, products, setProducts}) {

// get all products from firestore in realtime
  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let productsArray = [];
      querySnapshot.forEach((doc) => {
        productsArray.push({ ...doc.data(), id: doc.id });
      });
      setProducts(productsArray);
    });
    return () => unsub();
  }, []);

/* get all unique artists
let findUnique = (products, category) => {
  let unique_values = products
      .map((item) => item.category)
      .filter(
          (value, index, current_value) => current_value.indexOf(value) === index
      );
  return unique_values;
};

uniqueArtists = (findUnique(products, artist));
*/
  const navigate = useNavigate();
  // filter

  let filteredTable = products.filter((product) => {

    if (filters.inStock && product.stock===0) return false;
    if (
      filters.filterCategory != "none" &&
      filters.filterCategory != product.category
    )
      return false;
    if (
      filters.filterArtist != "none" &&
      filters.filterArtist != product.artist
    )
      return false;
    return product.name.toLowerCase().indexOf(filters.search.toLowerCase()) !==-1;
  });

  // sort asc/desc
  if (filters.sortNames === "a-z") {
    filteredTable.sort((a, b) => String(a.name).localeCompare(String(b.name)));
  } else if (filters.sortNames === "z-a") {
    filteredTable.sort((b, a) => String(a.name).localeCompare(String(b.name)));
  }
  if (filters.sortPrice === "low-high") {
    filteredTable.sort((a, b) => {
      return a.price - b.price;
    });
  } else if (filters.sortPrice === "high-low") {
    filteredTable.sort((b, a) => a.price - b.price);
  }
  if (filters.sortStock === "asc") {
    filteredTable.sort((a, b) => {
      return a.stock - b.stock;
    });
  } else if (filters.sortStock === "desc") {
    filteredTable.sort((b, a) => a.stock - b.stock);
  }

  return (
    <div>
      <button
        className="add"
        type="button"
        onClick={() => {
          navigate("/CatalogForm");
        }}
      >
        +
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Category</th>
            <th>Artist</th>
            <th>Description</th>
            <th>Stock</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTable.map((product) => (
            <ProductRow
              product={product}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
