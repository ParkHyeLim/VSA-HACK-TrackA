import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductDetail.css";

const people = 10;

const ProductDetail = () => {
  const [array, setArray] = useState(Array(people).fill(false));
  const [place, setPlace] = useState(9);
  const [isSpace, setIsSpace] = useState(true);

  useEffect(() => {
    const newArray = [...array]
    newArray[place] = true;
    setArray(newArray);
  }, []);

  useEffect(() => {
    const newArray = [...array]
    newArray[place+1] = false;
    newArray[place] = true;
    setArray(newArray);
  }, [place]);

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      return setIsSpace((prev) => !prev);
    }
  }

  return (
    <div>
      <div>제품 상세 페이지</div>
      <Link to="/waiting">
        <button>구매</button>
      </Link>
      <button onClick={() => setPlace(prev => prev - 1)}>더 가까이</button>
      <button onKeyUp={handleKeyPress} onKeyDown={handleKeyPress}>때리기</button>
      <div>총 대기 인원 : {people}</div>
      <div>현재 나의 위치 : {place} 번째</div>
    </div>
  );
};

export default ProductDetail;
