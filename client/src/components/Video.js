import '../video.css';
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
   
        <div className='video'>
            <div className='userpart'>
              <video className='uservideo' ref={userVideo} autoPlay />  
            </div>
            <div className='mypart'>
              <video className='myvideo' ref={myVideo} autoPlay />  
            </div>
            <div className='button'>
              <button className='mute' onClick={() => handleMuteClick( muteBtn)}> {muteBtn? "Unmute" : "Mute"} </button>
              <button className='camera' onClick={() => handleCameraClick( cameraBtn)}> {cameraBtn ? "Turn Video Off" : "Turn Video On"} </button>
            </div>

        </div>
        


  );
});

export {Video};


