import React, { useState, useReducer } from "react";
import SearchFilterBar from "./SearchFilterBar";
import ProductTable from "./ProductTable";

export default function ProductsCatalog() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      search: "",
      sortNames: "none",
      sortPrice: "none",
      filterCategory: "none",
      filterArtist: "none",
      inStock: false
    }
  );

  const handleFilterProducts = (event) => {

    const name = event.target.name;
    const newValue = event.target.value;
    if (event.target.type === "checkbox"){
      setFilters({ [name]: event.target.checked });
    }
    else setFilters({ [name]: newValue });
    


  };

  return (
    <div>
      <h1>Artists' Merchandise Catalog</h1>
      <SearchFilterBar
        setFilters={setFilters}
        handleFilterProducts={handleFilterProducts}
        products={products}
      />
      <ProductTable
        filters={filters}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
}
