import React, {createContext, useEffect, useState, useContext} from 'react'
import { SocketContext } from "../SocketContext";

const ChatContext = createContext();

const Chat = ({socket, username, room}) => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, joinRoom, send_message } = useContext(SocketContext);
  
  const [currMsg, setcurrMsg] = useState("");
  
  const msgHandler = () => {
    send_message(username, room, currMsg)
    setcurrMsg("");
  };


  return (
    <ChatContext.Provider value={{currMsg}}> 
        <div>
            <div className="chat-header">
                <p> Live Chat </p>
            </div>
            <div className="chat-body"></div>
            <div className='chat-footer'>
                <input type="text" placeholder='input the message...' value={currMsg} onChange={(e) => setcurrMsg(e.target.value)}/>
                <button onClick={msgHandler} > send </button>
            </div>
        </div>

    </ChatContext.Provider>
        
  );
}

export { Chat, ChatContext };
