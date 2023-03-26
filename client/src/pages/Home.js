import { ContextProvider, SocketContext } from "../SocketContext";
import {Link, useSearchParams} from 'react-router-dom';
import React, {createContext, useState, useRef, useEffect, useContext} from "react";

function Home() {
    
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, joinRoom } = useContext(SocketContext);
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");


    return (

        <div>
            <h1> home </h1>
            <p> 이곳은 홈 </p>
            <input type="text" placeholder='Input your name ' onChange={(e) => {setUsername(e.target.value)}}/>
            <input type="text" placeholder='RoomID' onChange={(e) => {setRoom(e.target.value)}}/>

            <Link to={`/room/${room}`}  state={{
                    roomID: room,
                    username: username
            }}>
                <button onClick={() => joinRoom(username, room)}>
                    Enter
                </button>
            </Link>
            
        </div>
        
    );
};

export default Home;