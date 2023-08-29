import React from "react";
import { Link } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {

  return (
    <div>
      <div>제품 상세 페이지</div>
      <Link to="/payment">
        <button>구매</button>
      </Link>
    </div>
  );
};

export default ProductDetail;
