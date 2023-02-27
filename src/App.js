import * as React from "react";
import { Routes, Route } from "react-router-dom";
import CatalogForm from "./components/CatalogForm";
import ProductsCatalog from "./components/ProductsCatalog";
export default function App() {

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProductsCatalog/>
          }
        />
        <Route
          path="CatalogForm"
          element={
            <CatalogForm />
          }
        />
      </Routes>
    </div>
  );
}
