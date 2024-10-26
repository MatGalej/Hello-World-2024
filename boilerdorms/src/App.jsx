import React from 'react';
import { Routes, Route} from 'react-router-dom'
import FrontPage from './pages/FrontPage';  
import DormsPage from './pages/Dorms';  
import Page3 from './pages/Page3';  
import Page2 from './pages/Page2';
import { Auth } from "./components/auth";

const App = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<FrontPage/>}/>
            <Route path="/dorms" element={<DormsPage/>}/>
            <Route path="/page-2" element={<Page2/>}/>
            <Route path="/page-3" element={<Page3/>}/>

        </Routes>
    </>

    
    
  );
};

export default App;
