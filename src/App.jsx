// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home.jsx";
import Inventory from "./pages/Inventory.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import Reports from "./pages/Reports.jsx";
import InventoryLayout from "./pages/InventoryLayout.jsx";
import ProductInventory from "./pages/ProductInventory.jsx";
import Product from "./pages/Product.jsx";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<InventoryLayout />}>
            <Route index element={<Inventory />} />
            <Route path=":id" element={<ProductInventory />}>
              <Route path=":productId" element={<Product />} />
            </Route>
          </Route>
          <Route path="/report" element={<Reports />} />
          <Route path="/supplier" element={<Suppliers />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
