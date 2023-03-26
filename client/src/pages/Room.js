import React, {useContext} from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { SocketContext } from "../SocketContext";

import { Chat, ChatContext} from "../components/Chat";


const Room = ({socket}) => {
    const location = useLocation();

    const username = location.state.username;
    const room = location.state.roomID;

    console.log("room.js username ", username);
    console.log("room.js roomID ", room);

    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, joinRoom } = useContext(SocketContext);

    return (
        <div>
            <h1> room </h1>
            <p> 이곳은 룸 </p>
            <Chat socket={socket} username={username} room={room}/>
            {stream && (
                <video playsInline muted ref={myVideo} autoPlay />
            )}
          
            {callAccepted && !callEnded && (
                <video playsInline muted ref={userVideo} autoPlay />
            )}

            
            
        </div>
    );
};

export default Room;