import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import * as fp from "fingerpose";

import { drawHand } from "./utilities";
import { drawKeywords } from "./keywords";
import { decisionOutput } from "./keywords";
import { playSound, changeVolume } from "./audio";


class Count {
  constructor(value){
    this.value = value;
  }
}

const c = new Count(0);


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

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
  let decision = true;
  let count = 1;
  let output = false;


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
      canvasRef.current.width = 1600;
      canvasRef.current.height = 900;

      // Make Detections
      const hand = await net.estimateHands(video);
      // console.log(hand);


      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
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

          if(gesture.gestures[maxConfidence].name != handgesture_1){
            if(gesture.gestures[maxConfidence].name == "PalmUp"){
              decision = true;
              handgesture_1 = gesture.gestures[maxConfidence].name;
              
            }
            if(gesture.gestures[maxConfidence].name == "PalmDown"){
              decision = false;
              handgesture_1 = gesture.gestures[maxConfidence].name;
            }
            
          }
          
        }
      }



      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawKeywords(ctx, c.value, decision);
      drawHand(hand, ctx);
      console.log(decision);

      decisionOutput(output);
      console.log(output);
      

      //Audio Control
      changeVolume (output);
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
    }, 3000);
    return () => clearTimeout(interval);
  }, []);

  playSound();


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
            width: 360 * 0.75,
            height: 270  * 0.75,
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
      </header>
    </div>
  );
}

export default App;


