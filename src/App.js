import logo from './logo.svg';


import Home from './pages/home';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import First from './template/first/first';
import Edittemplate from './pages/edittemplate';
import 'bootstrap/dist/css/bootstrap.min.css';

import Alltemplate from './pages/alltemplate';
import Second from './template/second/second';
import Download from './pages/download';


function App() {
  return (
    <>
    
    

     
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/all' element={<First/>}/>
      <Route path='/alltemplate' element={<Alltemplate/>}/>
     

      
      <Route path='/edittemplate' element={<Edittemplate/>} />
       
       <Route path='/first' element={<First/>}/>
       <Route path='/second' element={<Second/>}/>

       <Route path='/download' element={<Download/>}/>
    </Routes>



    </>
  );
}

export default App;
