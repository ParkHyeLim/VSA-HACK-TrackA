import React, { useEffect, useState } from "react";
import "./WaitingPage.css";

const Glassmorphism = () => {

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [people, setPeople] = useState(9); // 총인원
  const [place, setPlace] = useState(9); // 현재 위치

  useEffect(() => {

  }, []);

  useEffect(() => {

  }, [place]);

  const handleClick = (event) => {
    setIsFullScreen(!isFullScreen);
  };

  const style = isFullScreen
    ? {
      backgroundColor: 'rgba(44, 44, 44, 0.8)',
      transition: 'all 0.5s ease-in-out',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 100,
    }
    : {
      padding: 100,
      alignItems: 'center',
      justifyContent: 'center',
    };
  return (
    <div className="card" style={style} onClick={handleClick}>
      <h1 className={isFullScreen ? 'neonText' : 'text'}>Glassmorphism</h1>
      <div>
        <div>총 대기 인원 : {people}</div>
        <div>현재 나의 위치 : {place} 번째</div>
      </div>
    </div>
  );
};

const WaitingPage = () => {

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    document.addEventListener('mousemove', function (e) {
      let body = document.querySelector('body');
      let circle = document.createElement('span');
      let x = e.offsetX;
      let y = e.offsetY;
      circle.style.left = x + "px";
      circle.style.top = y + "px";
      let size = Math.random() * 100;
      circle.style.width = 20 + size + "px";
      circle.style.height = 20 + size + "px";
      body.appendChild(circle);
      setTimeout(function () {
        circle.remove();
      }, 1800);
    });
  }

  return (
    <main style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <div className="logo">
          MOVE MOUSE
          <Glassmorphism />
        </div>
      </div>
    </main>
  );
};

export default WaitingPage;