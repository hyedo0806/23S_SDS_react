import React, {createContext, useEffect, useState, useContext, useRef} from 'react'
import { SocketContext } from "../SocketContext";


const Video = React.memo(({username, roomID}) => {
  const { myVideo, name, callAccepted,userVideo, callEnded, call, joinRoom, send_message, answerCall } = useContext(SocketContext);
  
  const [msgList, setmsgList] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [currMsg, setcurrMsg] = useState("");
  const [muteBtn, setMutebtn] = useState(false);
  const [cameraBtn, setCamerabtn] = useState(true);

  
  
  function handleCameraClick (e) {
      
    setCamerabtn(!e);
    myVideo.current.srcObject.getVideoTracks()[0].enabled = cameraBtn;
  }

  function handleMuteClick (e) {
    console.log("speaker ", muteBtn);
    setMutebtn(!e);
    myVideo.current.srcObject.getAudioTracks()[0].enabled = !muteBtn;
  }

  

  return (
   
        <div>
            
            <p> Live Chat </p>
            
            <video ref={myVideo} autoPlay />
            <button onClick={() => handleMuteClick( muteBtn)}> {muteBtn? "Unmute" : "Mute"} </button>
            <button onClick={() => handleCameraClick( cameraBtn)}> {cameraBtn ? "Turn Video Off" : "Turn Video On"} </button>
            <video ref={userVideo} autoPlay />
        </div>
        


  );
});

export {Video};


