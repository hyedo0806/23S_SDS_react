import React, {createContext, useEffect, useState, useContext, useRef} from 'react'
import { SocketContext } from "../SocketContext";

const VideoContext = createContext();

const Video = ({socket, username, room}) => {
  const { name, callAccepted,  userVideo, callEnded, call, joinRoom, send_message, answerCall } = useContext(SocketContext);
  const [stream, setStream] = useState();
  const [msgList, setmsgList] = useState([]);
  const [currMsg, setcurrMsg] = useState("");
  
  const myVideo = useRef();
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    // socket.on('me', (id) => {
    //   setMe(id)
    //   console.log("socket communication!");
    // });

    // socket.on('callUser', ({ from, name: callerName, signal }) => {
    //   setCall({ isReceivingCall: true, from, name: callerName, signal });
    // });
  }, []);


  return (
    <VideoContext.Provider value={{currMsg}}> 
        <div>
            <div className="chat-header">
                <p> Live Chat </p>
            </div>

            <video playsInline muted ref={myVideo} autoPlay />
            
            <video playsInline muted ref={userVideo} autoPlay />
            
        </div>

    </VideoContext.Provider>
        
  );
}

export { Video, VideoContext };


