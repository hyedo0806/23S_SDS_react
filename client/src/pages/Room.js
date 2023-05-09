import '../room.css';
import React, {useContext, useState, useEffect, useRef} from "react";
import { SocketContext } from "../SocketContext";
import {Link, useSearchParams, useLocation} from 'react-router-dom';
import { Chat, ChatContext} from "../components/Chat";
import { Video} from "../components/Video";



const Room = ({socket}) => {
    const location = useLocation();

    const [msgList, setmsgList] = useState([]);

    const username = location.state.username;
    const room = location.state.roomID;

    const dataID = useRef(0);

    const { name, callAccepted, myVideo, userVideo, callEnded, stream, msg, call, joinRoom} = useContext(SocketContext);
    
    useEffect(() => {
    
        const newMsg = {author : msg.author, message : msg.message, id : dataID.current};
        dataID.current += 1;
        setmsgList([...msgList, newMsg]);

    },[msg]);

    return (
        <div className="room">
  
            <h1 className='room-title'> {username.toUpperCase()}'s room</h1>
            
            <Link className='room-exit' to={`/`} style={{ textDecoration: 'none' }}>
                <button className='room-exit-button' >
                    exit
                </button>
            </Link>
         
            <Video username={username} room={room}/>
            
            <Chat  socket={socket} username={username} room={room} msgList={msgList}/>
            
                
        </div>
    );
};

export default Room;