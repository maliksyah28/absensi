import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from './auth/authSlice/authSlice';
import { useEffect, useState } from 'react';

//pages
import Home  from './Pages/Home';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Profile from './Pages/Profile';
import Revise from './Pages/Revise';
import ManageDept from './Pages/ManageDept';
import UserProfile from './Pages/User';
import Testing from './Pages/Testing';
function App() {
  const [isLocalStorageChecked, setisLocalStorageChecked] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    // string
    const userLocalStorage = localStorage.getItem("userInfo");

    // ada ga isinya ?
    if (userLocalStorage) {
      // ubah string menjadi object
      const user = JSON.parse(userLocalStorage);
      // objectnya dimasukkan ke action creator login
      // menghasilkan action --> { type: "auth/login", payload : user }
      const action = login(user);
      // kirim ke reducer
      dispatch(action);
    }

    setisLocalStorageChecked(true);
  }, []);

  if (isLocalStorageChecked) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin' element={<Admin/>} />
          <Route path='/HistoryAbsence' element={<Profile/>} />
          <Route path='/Revise' element={<Revise/>} />
          <Route path='/ManageDept' element={<ManageDept/>} />
          <Route path='/profile' element={<UserProfile/>} />
          <Route path='/test' element={<Testing/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
  return <h1 style={{ textAlign: "center" }}>Checking Local Storage</h1>;
  
 
}

export default App;
