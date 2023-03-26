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
  
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    //const [searchParams, setSearchParams] = useSearchParams();
    //    const username = searchParams.get("user");
    //    const room = searchParams.get("id");

    socket.on("welcome", (nickname)=>{
        console.log("new joined ", nickname);
    });
    const send_message = (username, room, currMsg) => {
      if (currMsg !== "") {
          const msgData = {
              room: room, 
              author: username,
              message: currMsg,
              time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getHours(),
          };
  
        socket.emit("send_message", msgData);
        console.log("socketcontext.js sendmsg roomID", msgData.room);
        console.log("socketcontext.js sendmsg username", msgData.author);
        console.log("socketcontext.js sendmsg msg", msgData.message);
      }
    };

    const joinRoom = (username, roomID) =>{
      console.log("socketcontext.js joinroom roomID", roomID);
      console.log("socketcontext.js joinroom username", username);
      if (username !== "" && roomID !== ""){
        socket.emit("join_room", username, roomID);
      } 
    }

    useEffect(() => {
      socket.on("receive_message", (data) => {
          console.log("client.js : ", data);
      })
    }, [socket]);
  
    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((currentStream) => {
          setStream(currentStream);
  
          myVideo.current.srcObject = currentStream;
        });
  
      socket.on('me', (id) => {
        setMe(id)
        console.log("socket communication!");
      });
  
      socket.on('callUser', ({ from, name: callerName, signal }) => {
        setCall({ isReceivingCall: true, from, name: callerName, signal });
      });
    }, []);

    

    const new_message = (msg, room) => {
      console.log("socketcontext.js new_message : ", msg);
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