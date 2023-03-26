import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Typography, AppBar } from '@material-ui/core';
import RouteTest from './components/RouteTest';
import Room from './pages/Room';
import Home from './pages/Home';
import Edit from './pages/Edit';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <h2> hello </h2>
          
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/edit" element={<Edit />}/>
            <Route path="/room/:id" element={<Room/>}/>
          </Routes>
  
      </div>
    </BrowserRouter>
    
  );
}

export default App;
