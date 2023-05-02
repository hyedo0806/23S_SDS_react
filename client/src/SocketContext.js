import React, {createContext, useState, useRef, useEffect} from "react";
import {io} from 'socket.io-client';


const SocketContext = createContext();

const socket = io('http://localhost:4000');

const ContextProvider = ({ children }) => {

    const [remoteStream, setRemoteStream] = useState(null);
    const [localStream, setLocalStream] = useState(null);

    const [msg, setMsg] = useState({ 
      author : '',
      message : ''
    })

    let userName;
    let myPeerConnection;
    let roomName;
    let myStream;
    const myVideo = useRef();
    const userVideo = useRef();
    const myPeerConnectionRef = useRef();
    
    async function initCall() {

      await getMedia();
      makeConnection();
    }

    async function joinRoom(username, roomID){
      userName = username;
      roomName = roomID;

      if (username !== "" && roomID !== ""){
        setMsg({
          author : username,
          message : "입장을 환영합니다"
        })

        await initCall();
 
        socket.emit("join_room", username, roomID);
      } 
    }

  
    async function getMedia(deviceId) {
      const initialConstrains = {
        audio: true,
        video: { facingMode: "user" },
      };
      const cameraConstraints = {
        audio: true,
        video: { deviceId: { exact: deviceId } },
      };
  
      myStream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialConstrains
      );
      
      setLocalStream(myStream);
      myVideo.current.srcObject = myStream;
      console.log("socket.js getmedia ", myVideo);
    };

    function makeConnection() {
      myPeerConnection = new RTCPeerConnection(); 
      
      myPeerConnection.onicecandidate = event => {
        if (event.candidate) {
          socket.emit('ice', event.candidate, roomName);
        }
      };
        
      myPeerConnection.ontrack = event => {
        setRemoteStream(event.streams[0]);
        userVideo.current.srcObject = event.streams[0];
      };
      
      myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream));

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
          console.log("socket.js ", userName, ", ", msgData);
          socket.emit("send_message", msgData);
          
      }
    };

    socket.on("receive_message", (data) => {
      setMsg({
        author : data.author,
        message : data.message
      })
        
    })
    

    socket.on("welcome", async (who) => {
      console.log("socket.js welcome : ", userName, ", ", who);
      const offer = await myPeerConnection.createOffer();
      myPeerConnection.setLocalDescription(offer);
      console.log("sent the offer, ", userName, ' to ', who);
      socket.emit("offer", offer, roomName);
      
    });

    socket.on("offer", async(offer) => {
      console.log("socek.js offer : ", offer);
      
      myPeerConnection.setRemoteDescription(offer);
      const answer = await myPeerConnection.createAnswer();
      myPeerConnection.setLocalDescription(answer);
      socket.emit("answer", answer, roomName);
    })

    socket.on("answer",(answer) => {
      console.log("received the answer");
      myPeerConnection.setRemoteDescription(answer);
    });

    socket.on("ice", (ice) => {
      console.log("received candidate");
      myPeerConnection.addIceCandidate(ice);
    });

    

    
    
    
    
    return (
      <SocketContext.Provider value={{

    
        myVideo,
        userVideo,
       
        msg,
        initCall,
        joinRoom,
        send_message, 
        getMedia,
      }}
      >
        
        {children}
      </SocketContext.Provider>
    );
};
  


export { ContextProvider, SocketContext };