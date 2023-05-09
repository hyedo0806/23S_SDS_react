import '../home.css';
import { ContextProvider, SocketContext } from "../SocketContext";
import {Link, useSearchParams} from 'react-router-dom';
import React, {createContext, useState, useRef, useEffect, useContext} from "react";

function Home() {
    
    const { initCall, joinRoom } = useContext(SocketContext);
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");


    return (

        <div className='home'>
            
            <h1 className='home-title'> meeting </h1>
            <div className='home-enter'> 
                <input className='home-enter-input' type="text" placeholder='Name ' onChange={(e) => {setUsername(e.target.value)}}/>
                <input className='home-enter-input' type="text" placeholder='RoomID' onChange={(e) => {setRoom(e.target.value)}}/>

                <Link to={`/room/${room}`}  state={{
                        roomID: room,
                        username: username
                }} style={{ textDecoration: 'none' }}>
                    <button className='home-enter-button' onClick={async () => joinRoom(username, room)}>
                        Enter
                    </button>
                </Link>
            </div>
            
        </div>
        
    );
};

export default Home;