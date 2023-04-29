import React, {createContext, useState, useRef, useEffect} from "react";
import {io} from 'socket.io-client';


const SocketContext = createContext();

const socket = io('http://localhost:4000');

const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const [muteBtn, setMutebtn] = useState(false);
    const [cameraBtn, setCamerabtn] = useState(true);


    const [msg, setMsg] = useState({ 
      author : '',
      message : ''
    })

    const userVideo = useRef();
    
    let roomName;
    let myPeerConnection;

    function handleCameraClick (myVideo, cameraBtn) {
      
      setCamerabtn(!cameraBtn);
      myVideo.current.srcObject.getVideoTracks()[0].enabled = cameraBtn;
    }
  
    function handleMuteClick (myVideo, muteBtn) {
      setMutebtn(!muteBtn);
      myVideo.current.srcObject.getAudioTracks()[0].enabled = !muteBtn;
    }

    


    const send_message = (username, room, currMsg) => {
      if (currMsg !== "") {
          setMsg({
            author : username,
            message : currMsg
          })
          const msgData = {
              room: room, 
              author: username,
              message: currMsg,
              time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getHours(),
          };

          socket.emit("send_message", msgData);
          
      }
    };

    socket.on("welcome", async () => {
      const offer = await myPeerConnection.createOffer();
      myPeerConnection.setLocalDescription(offer);
      console.log("sent the offer");
      // socket.emit("offer", offer, );
    });

    const joinRoom = (username, roomID) =>{
      roomName = roomID;
      if (username !== "" && roomID !== ""){
        setMsg({
          author : username,
          message : "입장을 환영합니다"
        })
        socket.emit("join_room", username, roomID);
      } 
      
    }

    
    
    socket.on("receive_message", (data) => {
      setMsg({
        author : data.author,
        message : data.message
      })
        
    })
    
    
    return (
      <SocketContext.Provider value={{
        muteBtn,
        cameraBtn,
        call,
        callAccepted,
        userVideo,
        stream,
        name,
        callEnded,
        me,
        msg,
        setName,
        joinRoom,
        send_message,
        handleCameraClick,
        handleMuteClick
        
      }}
      >
        
        {children}
      </SocketContext.Provider>
    );
};
  


export { ContextProvider, SocketContext };