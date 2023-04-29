import React, {createContext, useEffect, useState, useContext, useRef} from 'react'
import { SocketContext } from "../SocketContext";


const Video = ({socket, username, room}) => {
  const { handleMuteClick, handleCameraClick, muteBtn, cameraBtn, name, callAccepted,userVideo, callEnded, call, joinRoom, send_message, answerCall } = useContext(SocketContext);
  
  const [msgList, setmsgList] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [currMsg, setcurrMsg] = useState("");
  
  const myVideo = useRef(null);

  useEffect(() => {
    async function getMedia(deviceId) {
      const initialConstrains = {
        audio: true,
        video: { facingMode: "user" },
      };
      const cameraConstraints = {
        audio: true,
        video: { deviceId: { exact: deviceId } },
      };
      try {
      
        const myStream = await navigator.mediaDevices.getUserMedia(
          deviceId ? cameraConstraints : initialConstrains
        );
        myVideo.current.srcObject = myStream;
        console.log("getmedia ", myStream)
        
      } catch (e) {
        console.log(e);
      }
      
    }
  getMedia();
  }, []);
  

  return (
   
        <div>
            
            <p> Live Chat </p>
            
            <video ref={myVideo} autoPlay />
            <button onClick={() => handleMuteClick(myVideo, muteBtn)}> {muteBtn? "Unmute" : "Mute"} </button>
            <button onClick={() => handleCameraClick(myVideo, cameraBtn)}> {cameraBtn ? "Turn Video Off" : "Turn Video On"} </button>
            
        </div>


  );
}

export { Video};


