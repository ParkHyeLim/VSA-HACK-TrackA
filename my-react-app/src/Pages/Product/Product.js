import React from "react";
import { Link } from "react-router-dom";

const Product = () => {

  return (
    <div>
      <div>제품 페이지</div>
      <Link to="/detail">
        <button>제품 상세</button>
      </Link>
    </div>
  );
};

export default Product;
