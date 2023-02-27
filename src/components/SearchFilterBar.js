import React from "react";

export default function SearchFilterBar({ handleFilterProducts, products}) {

  

  let uniqueArtists= Array.from(new Set(products.map((product)=>product.artist)));
  let uniqueCatagories= Array.from(new Set(products.map((product)=>product.category)));

  return (
    <form>
      <input
        name="search"
        type="text"
        className="searchbar"
        placeholder="Search..."
        onChange={(e) => handleFilterProducts(e)}
      />
      <select
        name="filterCategory"
        onChange={(e) => {
          handleFilterProducts(e);
        }}
      >
        <option value="none">Filter by Category...</option>
        {uniqueCatagories.map(cat => {
           return (
             <option value={cat}> {cat} </option>
           )
         })}
      </select>
      <select
        name="filterArtist"
        onChange={(e) => {
          handleFilterProducts(e);
        }}
      >
        <option value="none">Filter by Artist...</option>
        {uniqueArtists.map(artist => {
           return (
             <option value={artist}> {artist} </option>
           )
         })}
      </select>
      <select
        name="sortNames"
        onChange={(e) => {
          handleFilterProducts(e);
        }}
      >
        <option value="none">Sort Names...</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
      </select>
      <select
        name="sortPrice"
        onChange={(e) => {
          handleFilterProducts(e);
        }}
      >
        <option value="none">Sort Price...</option>
        <option value="low-high">Low to High</option>
        <option value="high-low">High to Low</option>
      </select>
      <select
        name="sortStock"
        onChange={(e) => {
          handleFilterProducts(e);
        }}
      >
        <option value="none">Sort by Stock Amount...</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <label>
        <input
          name="inStock"
          type="checkbox"
          onChange={(e) => handleFilterProducts(e)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}
