import React, {createContext, useState, useRef, useEffect} from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {io} from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:4000');

const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const [msg, setMsg] = useState({ 
      author : '',
      message : ''
    })

    // const msg = {
    //   author:"1", 
    //   message:"2"
    // };
  
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();


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

    const joinRoom = (username, roomID) =>{
      
      if (username !== "" && roomID !== ""){
        setMsg({
          author : username,
          message : "입장을 환영합니다"
        })
        socket.emit("join_room", username, roomID);
      } 
      
    }

    useEffect(() => {
      socket.on("receive_message", (data) => {
        setMsg({
          author : data.author,
          message : data.message
        })
          
      })
      
      
    },[socket]);
    

    

    const new_message = (msg, room) => {
      
      socket.emit("new_message", msg);
    }
  
    const answerCall = () => {
      setCallAccepted(true);
  
      const peer = new Peer({ initiator: false, trickle: false, stream });
  
      peer.on('signal', (data) => {
        socket.emit('answerCall', { signal: data, to: call.from });
      });
  
      peer.on('stream', (currentStream) => {
        userVideo.current.srcObject = currentStream;
      });
  
      peer.signal(call.signal);
  
      connectionRef.current = peer;
    };
  
    const callUser = (id) => {
      const peer = new Peer({ initiator: true, trickle: false, stream });
  
      peer.on('signal', (data) => {
        socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
      });
  
      peer.on('stream', (currentStream) => {
        userVideo.current.srcObject = currentStream;
      });
  
      socket.on('callAccepted', (signal) => {
        setCallAccepted(true);
  
        peer.signal(signal);
      });
  
      connectionRef.current = peer;
    };
  
    const leaveCall = () => {
      setCallEnded(true);
  
      connectionRef.current.destroy();
  
      window.location.reload();
    };
  
    return (
      <SocketContext.Provider value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        msg,
        callUser,
        leaveCall,
        answerCall,
        joinRoom,
        send_message
      }}
      >
        {children}
      </SocketContext.Provider>
    );
};
  


export { ContextProvider, SocketContext };