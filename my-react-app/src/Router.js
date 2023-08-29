import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Product from "./Pages/Product/Product";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Payment from "./Pages/Payment/Payment";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="detail" element={<ProductDetail />} />
        <Route path="payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
