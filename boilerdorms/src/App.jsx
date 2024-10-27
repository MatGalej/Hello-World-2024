import React from 'react';
import { Routes, Route} from 'react-router-dom'
import FrontPage from './pages/FrontPage';  
import DormsPage from './pages/Dorms';  
import Signup from './pages/Signup';  
import Login from './pages/Login';
import { Auth } from "./pages/auth";

const App = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<FrontPage/>}/>
            <Route path="/dorms" element={<DormsPage/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Signup" element={<Signup/>}/>

        </Routes>

        
    </>

    
    
  );
};

export default App;