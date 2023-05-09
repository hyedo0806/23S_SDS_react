import React from 'react';
import ReactDOM from 'react-dom/client';


import { ContextProvider, SocketProvider } from './SocketContext';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Room from './pages/Room';
import Home from './pages/Home';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div style={{width:'100vw', height:'100vh'}}>
    <ContextProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/room/:id" element={<Room/>}/>
          </Routes>
      </BrowserRouter>
    </ContextProvider>
  </div>
  
);

