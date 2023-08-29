import React, { useEffect, useRef, useState } from "react";
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as handpose from '@tensorflow-models/handpose';
import './hands.css';

const ImageClassifier = () => {
  let net;
  let handposeModel;
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

      while (true) {
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
        }

        img.dispose();

        await tf.nextFrame();
      }
    };

    run();
  }, []);

  return (
    <div className="container">
      <div className="video-container">
        <video
          autoPlay
          playsInline
          muted={true}
          ref={camera}
          className="video"
        />
      </div>
      <div className="circle" ref={circleRef}></div>
    </div>
  );
};

export default ImageClassifier;
