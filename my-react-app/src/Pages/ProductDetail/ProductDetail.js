import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductDetail.css";
import chair from "../../assets/chair.jpeg";

const ProductDetail = () => {

  return (


    <div>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ paddingLeft: 30, paddingBottom: 30 }}>Eames Eiffel Plastic Chair</h1>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <img src={chair} alt="Eames Eiffel Plastic Chair" width={400} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 50, paddingLeft: 30 }}>
            <h2>Dimensions: 47cm x 76cm x 40cm</h2>
            <h2 style={{ paddingBottom: 20 }}>Price: $35.00</h2>
            <h3>Available in multiple colors</h3>
            <h3>Materials: Plastic, wood, metal</h3>
            <h3>Shipping and return policies: ...</h3>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: 20, paddingTop: 20}}>
              <button style={{ padding: 10, paddingLeft: 30, paddingRight: 30, borderRadius: 12, display: 'flex', marginRight: 20}}>장바구니</button>
              <Link to="/waiting">
                <button style={{ padding: 10, paddingLeft: 30, paddingRight: 30, borderRadius: 12 }}>구매</button>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>

  );
};


export default ProductDetail;

export const Header = () => {
  return (
    <header style={{ height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 50 }}>
      <h2>Furniture</h2>
      <nav>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex' }}>
          <li style={{ marginRight: '1rem' }}><a href="/">Home</a></li>
          <li style={{ marginRight: '1rem' }}><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>

  );
};