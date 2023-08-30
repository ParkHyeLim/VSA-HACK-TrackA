import React, { useEffect, useRef, useState } from "react";
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as handpose from '@tensorflow-models/handpose';
import './HandTensorflow.css';
import socket from "../../utils/socket";
import { useHistory } from "react-router-dom";

const Glassmorphism = () => {
  const history = useHistory();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [people, setPeople] = useState(-1); // 총인원
  const [place, setPlace] = useState(-1); // 현재 위치

  
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
    if (people === 1 && place === 0){
      history.push("/payment");
    }
  }, [people, place]);

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

const HandTensorflow = () => {
  const camera = useRef();
  let circleRef = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Update the window dimensions when the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let net;
    let handposeModel;
    const run = async () => {
      // Load MobileNet model
      net = await mobilenet.load();

      // Load HandPose model
      handposeModel = await handpose.load();

      // Get webcam access
      const webcam = await tf.data.webcam(camera.current, {
        resizeWidth: windowWidth,
        resizeHeight: windowHeight,
      });

      const processFrame = async () => {
        const img = await webcam.capture();

        // Detect hand pose
        const handPredictions = await handposeModel.estimateHands(img);
        if (handPredictions.length > 0) {
          const handLandmarks = handPredictions[0].landmarks;
          const [x, y] = handLandmarks[0]; // Assuming you want the position of the first landmark (hand joint)
          if (circleRef.current) {
            circleRef.current.style.left = x + 'px';
            circleRef.current.style.top = y + 'px';
          }
          handleMousemove();
        }

        img.dispose();

        requestAnimationFrame(processFrame); // Continue processing frames
      };

      processFrame(); // Start processing frames
    };

    run();
  }, [windowWidth, windowHeight]);

  const handleMousemove = (e) => {
    // circleRef의 left 값 가져오기
    const circleLeft = parseInt(circleRef.current.style.left, 10);

    // circleRef의 top 값 가져오기
    const circleTop = parseInt(circleRef.current.style.top, 10);

    // 마우스 위치와 circleRef의 위치를 교환하기 위해 새로운 MouseEvent 객체 생성
    const newMouseEvent = new MouseEvent('mousemove', {
      clientX: circleLeft,
      clientY: circleTop,
    });

    // 원래 위치로 마우스를 옮기는 것이 아니라 새로운 MouseEvent 객체를 디스패치하여 이동
    document.dispatchEvent(newMouseEvent);
    addAnimation();
  };

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
    <div>
      <div className="logo">
        <Glassmorphism />
        <video
          autoPlay
          playsInline
          muted={true}
          ref={camera}
          className="video"
        ></video>
      </div>
      
      
      <div className="circle" ref={circleRef}></div>
    </div>
  );
};

export default HandTensorflow;