import React, { useEffect, useState } from "react";
import "./WaitingPage.css";
import socket from "../../utils/socket";

const Glassmorphism = () => {

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [people, setPeople] = useState(9); // 총인원
  const [place, setPlace] = useState(9); // 현재 위치


  const data = {
    "userId" : "coco",
    "message" : "join"
  }

  useEffect(() => {

    // 웹소켓 연결이 열렸을 때
    socket.addEventListener('connection', (event) => {
      console.log('WebSocket connection opened:', event);
      
      // 메시지 전송 예시
      socket.send(JSON.stringify({ type: 'message', content: data}));
    });

    // 웹소켓 메시지를 받았을 때
    socket.addEventListener('message', (event) => {
      setPeople(event.data.queueLength);
      setPlace(event.data.userIndex);
      console.log('WebSocket message received:', event.data);
    });

    // 웹소켓 연결이 닫혔을 때
    socket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed:', event);
    });

    // 웹소켓 에러가 발생했을 때
    socket.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
    });
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