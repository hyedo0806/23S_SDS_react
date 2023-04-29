import { TextField } from '@material-ui/core';
import React, {createContext, useEffect, useState, useContext} from 'react'
import { SocketContext } from "../SocketContext";

import DiaryItem from "./msgRender";

const ChatContext = createContext();


const Chat = ({socket, username, room, msgList}) => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, joinRoom, send_message} = useContext(SocketContext);
  
  const [currMsg, setcurrMsg] = useState("");
  
  const msgHandler = () => {
    send_message(username, room, currMsg);
    setcurrMsg("");
  };

 
  return (
    <ChatContext.Provider value={{currMsg}}> 
        <div>
            <div className="chat-header">
                <p> Live Chat </p>
            </div>

            <div>
              {msgList.map((it) => (
               
                <DiaryItem key={`diaryitem_${it.id}`} {...it} />
              ))}
            </div>


            <div className='chat-input'>
                <input type="text" placeholder='input the message...' value={currMsg} onChange={(e) => setcurrMsg(e.target.value)}/>
                <button onClick={msgHandler} > send </button>
            </div>
            
        </div>

    </ChatContext.Provider>
        
  );
}

export { Chat, ChatContext };
