import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./component/navbar";
import Home from "./page/Home";
import CategoryPage from "./page/catagoryPage";
import ProductPage from "./page/productPage";
import CartPage from "./page/cartPage";
import Login from "./auth/login";
import Signup from "./auth/signup";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
         <Route path="/category/:categoryName" element={<CategoryPage />} />
         <Route path="/product/:productId" element={<ProductPage/>} />
         <Route path="/cartPage" element={<CartPage/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
  );
};

export default App;
