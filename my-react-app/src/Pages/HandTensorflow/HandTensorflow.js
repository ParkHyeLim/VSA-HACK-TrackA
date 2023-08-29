import React, { useEffect, useRef, useState } from "react";
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as handpose from '@tensorflow-models/handpose';
import './HandTensorflow.css';

const FingerSkeleton = () => {
  const camera = useRef();
  const canvas = useRef();
  let circleRef = useRef();
  const netRef = useRef();
  const handposeModelRef = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
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
    const run = async () => {
      netRef.current = await mobilenet.load();
      handposeModelRef.current = await handpose.load();

      // Get webcam access
      const webcam = await tf.data.webcam(camera.current, {
        resizeWidth: windowWidth,
        resizeHeight: windowHeight,
      });

      while (true) {
        const img = await webcam.capture();

        // Detect hand pose
        const handPredictions = await handposeModelRef.current.estimateHands(img);

        if (handPredictions.length > 0) {
          const ctx = canvas.current.getContext("2d");
          const landmarks = handPredictions[0].landmarks;

          // Clear canvas
          ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

          // Draw finger skeleton
          for (let i = 0; i < landmarks.length; i++) {
            const [x, y] = landmarks[i];

            if (i === 8) {
              // Set circle position using index finger coordinates
              if (circleRef.current) {
                circleRef.current.style.right = x + 'px';
                circleRef.current.style.top = y + 'px';
              }
            }

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();

          }

          img.dispose();

          await tf.nextFrame();
        }
      };

    }
    run();
  }, []);

  return (
    <div>
      <video
        autoPlay
        playsInline
        muted={true}
        ref={camera}
        width={windowWidth}
        height={windowHeight}
        style={{ display: 'none' }}
      />

      <div className="circle" ref={circleRef}></div>
      <canvas
        ref={canvas}
        width={windowWidth}
        height={windowHeight}
      />
    </div>
  );
};

export default FingerSkeleton;
