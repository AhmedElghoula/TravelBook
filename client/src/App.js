import {useEffect} from 'react';
import './App.css';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Register, Login, Home,Travel,SingleTravel,Dashboard,NotFound404} from './pages';
import {Navbar, PrivateRoute} from './components';
import {setUser} from './redux/slice/authSlice'

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
   dispatch(setUser(user)); 
  }, []);
  

  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/addTravel" element={<PrivateRoute><Travel/></PrivateRoute>}/>
        <Route path="/travel/:id" element={<SingleTravel/>}/>
        <Route path="/editTravel/:id" element={ <PrivateRoute><Travel/></PrivateRoute>}/>
        <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        <Route path="*" element={<NotFound404/>}/>
      </Routes>
    </div>
    </BrowserRouter>
   
  );
}

export default App;
