import React, { useEffect, useState } from "react";
import "./WaitingPage.css";

const WaitingPage = () => {
  const [people, setPeople] = useState(9); // 총인원
  const [place, setPlace] = useState(9); // 현재 위치

  useEffect(() => {
    
  }, []);

  useEffect(() => {

  }, [place]);

  return (
    <div>
      <div>대기열 페이지</div>
      <div>총 대기 인원 : {people}</div>
      <div>현재 나의 위치 : {place} 번째</div>
    </div>
  );
};

export default WaitingPage;
