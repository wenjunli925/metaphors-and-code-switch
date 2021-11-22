// 0. Install fingerpose npm install fingerpose
// 1. Add Use State
// 2. Import emojis and finger pose import * as fp from "fingerpose";
// 3. Setup hook and emoji object
// 4. Update detect function for gesture handling
// 5. Add emoji display to the screen

//6. Add custom gestures

///////// NEW STUFF ADDED USE STATE
import React, { useRef, useState, useEffect } from "react";
///////// NEW STUFF ADDED USE STATE

// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";
import { drawKeywords } from "./keywords";
// import { increseIndex } from "./keywords";


///////// NEW STUFF IMPORTS
import * as fp from "fingerpose";
// import victory from "./victory.png";
// import thumbs_up from "./thumbs_up.png";
///////// NEW STUFF IMPORTS

class Count {
  constructor(value){
    this.value = value;
  }
}

export const c = new Count(0);


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  ///////// NEW STUFF ADDED STATE HOOK
  // const [emoji, setEmoji] = useState(null);
  // const images = { thumbs_up: thumbs_up, victory: victory };
  ///////// NEW STUFF ADDED STATE HOOK


  //Custom Gestures!!
  //Index Right
  const IndexRightGesture = new fp.GestureDescription('Right');

  IndexRightGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
  IndexRightGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);

  IndexRightGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 0.9);
  IndexRightGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownRight, 0.9);

  for(let finger of [fp.Finger.Thumb, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    IndexRightGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    IndexRightGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  }

  //Index Left
  const IndexLeftGesture = new fp.GestureDescription('Left');

  IndexLeftGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
  IndexLeftGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalDown, 1.0);

  IndexLeftGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 0.9);
  IndexLeftGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownLeft, 0.9);

  for(let finger of [fp.Finger.Thumb, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    IndexLeftGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    IndexLeftGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  }

  //Palm Up
  const PalmUpGesture = new fp.GestureDescription('PalmUp');

  for(let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    PalmUpGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    // PalmUpGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);

    PalmUpGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
    // PalmUpGesture.addDirection(finger, fp.FingerDirection.DiagonalDownLeft, 0.9);
    // PalmUpGesture.addDirection(finger, fp.FingerDirection.DiagonalDownRight, 0.9);  
  }

  //Palm Down
  const PalmDownGesture = new fp.GestureDescription('PalmDown');

  for(let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    PalmDownGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    // PalmDownGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);

    PalmDownGesture.addDirection(finger, fp.FingerDirection.VerticalDown, 1.0);
    // PalmDownGesture.addDirection(finger, fp.FingerDirection.DiagonalDownLeft, 0.9);
    // PalmDownGesture.addDirection(finger, fp.FingerDirection.DiagonalDownRight, 0.9);  
  }

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };
  
  let handgesture_1 = "PalmUp";
  let decision = 0;
  let count = 0;
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth/2;
      const videoHeight = webcamRef.current.video.videoHeight/2;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = 1200;
      canvasRef.current.height = 700;

      // Make Detections
      const hand = await net.estimateHands(video);
      // console.log(hand);

      ///////// NEW STUFF ADDED GESTURE HANDLING

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          // fp.Gestures.VictoryGesture,
          // fp.Gestures.ThumbsUpGesture,
          // IndexUpGesture,
          // IndexDownGesture,
          PalmUpGesture,
          PalmDownGesture,
          IndexRightGesture,
          IndexLeftGesture
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          // console.log(gesture.gestures);

          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          // console.log(gesture.gestures[maxConfidence].name);
          // setEmoji(gesture.gestures[maxConfidence].name);
          // console.log(emoji);

          if(gesture.gestures[maxConfidence].name != handgesture_1){
            if(gesture.gestures[maxConfidence].name == "PalmUp"){
              decision = 1;
              handgesture_1 = gesture.gestures[maxConfidence].name;
              
            }
            if(gesture.gestures[maxConfidence].name == "PalmDown"){
              decision = 0;
              handgesture_1 = gesture.gestures[maxConfidence].name;
            }
            
          }
          
        }
      }

      
  

      ///////// NEW STUFF ADDED GESTURE HANDLING

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
      drawKeywords(ctx, c.value, decision);


     

      // const { createCanvas, loadImage } = require('canvas')
      // const canvas = createCanvas(200, 200)
      // const ctx = canvas.getContext('2d')

      // Write "Awesome!"
      // ctx.font = '30px Impact'
      // ctx.rotate(0.1)
      // ctx.fillText('Awesome!', 50, 100)
    }

    
  };

  


  useEffect(()=>{runHandpose()},[]);
  
  useEffect(() => {
    const interval = setInterval(function() {
      count++;
      if(count > 24){
        count = 0;
      }
      c.value = count;
      console.log(count);
      console.log(c.value);
    }, 3000);
    return () => clearTimeout(interval);
  }, []);




  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "fixed",
            // marginLeft: "auto",
            // marginRight: "auto",
            // left: 0,
            right: 0, bottom: 0,

            // textAlign: "center",
            zindex: 9,
            width: 360,
            height: 270,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 1200,
            height: 700,
          }}
        />
        {/* NEW STUFF
        {emoji !== null ? (
          <img
            src={images[emoji]}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 400,
              bottom: 500,
              right: 0,
              textAlign: "center",
              height: 100,
            }}
          />
        ) : (
          ""
        )} */}

        {/* NEW STUFF */}
      </header>
    </div>
  );
}

export default App;


