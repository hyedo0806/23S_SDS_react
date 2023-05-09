import '../chat.css';
import { TextField } from '@material-ui/core';
import React, {createContext, useEffect, useState, useContext, useRef} from 'react'
import { SocketContext } from "../SocketContext";

import DiaryItem from "./msgRender";

const ChatContext = createContext();


const Chat = ({socket, username, room, msgList}) => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, joinRoom, send_message} = useContext(SocketContext);
  
  const [currMsg, setcurrMsg] = useState("");
  const scrollRef = useRef(null);
  
  const msgHandler = () => {
    send_message(username, room, currMsg);
    setcurrMsg("");
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

 
  return (
   
        <div className='chat'>
            
            <div className='chat-msgList' ref={scrollRef}>
              {msgList.map((it) => (
               
                
                  <DiaryItem key={`diaryitem_${it.id}`} {...it} />
                
              ))}
            </div>


            <div className='chat-box'>
                <input className='chat-box-input' type="text" placeholder='input the message...' value={currMsg} onChange={(e) => setcurrMsg(e.target.value)}/>
                <button className='chat-box-button' onClick={msgHandler} > send </button>
            </div>
            
        </div>

    
        
  );
}

export { Chat };
