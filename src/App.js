import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";


//pages
import Home  from './Pages/Home';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Profile from './Pages/Profile';
function App() {
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<Admin/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
