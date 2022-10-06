import React ,{ useState }from 'react'
import {
MDBNavbar,
MDBContainer,
MDBIcon,
MDBNavbarNav,
MDBNavbarItem,
MDBNavbarLink,
MDBNavbarToggler,
MDBCollapse,
MDBNavbarBrand,
} from "mdb-react-ui-kit";
import {useDispatch,useSelector} from "react-redux"
import {setLogout} from '../redux/slice/authSlice'
import {searchTravel} from "../redux/Thunk/travelThunk"
import {useNavigate} from "react-router-dom"
import decode from "jwt-decode";
const Header = () => {

const [show,setShow]=useState(false);
const [search,setsearch]=useState("");
const {user}= useSelector((state=>({...state.auth})));
const token =user?.token;
const dispatch= useDispatch();  
const navigate= useNavigate();

if(token){
  const decodedToken = decode(token);
  if (decodedToken.exp * 1000 < new Date().getTime()) {
    dispatch(setLogout());
    window.open("session expired")
  }
}

const handleLogout=()=>{
  dispatch(setLogout());
}
const onSubmit=(e)=>{
  e.preventDefault();
  if(search){
    dispatch(searchTravel(search));
    navigate(`/search?searchQuery=${search}`);
    setsearch("");
  }else{
    navigate("/");
    setsearch("");
  }
}
return (
    <MDBNavbar fixed='top' expand='lg' light style={{ backgroundColor: '#e3f2fd' }}>

        <MDBContainer>
            <MDBNavbarBrand href="/" style={{color: '#0095E9',fontWeight:'700',fontSize:'28px', fontFamily:'Brush Script MT'}}>
            <img
              src='/images/Air-travel-logo.png'
              height='40'
              alt=''
              loading='lazy'
            />
                 TravelBook
            </MDBNavbarBrand>
            <MDBNavbarToggler type='button' aria-label="Toogle navigation" aria-expanded='false' onClick={()=>setShow(!show)} style={{color: '#606080'}}>
               <MDBIcon icon="bars" fas/>
            </MDBNavbarToggler>
            <MDBCollapse show={show} navbar>
            <form className="d-flex input-group w-auto" onSubmit={onSubmit}>
                   <input className="form-control" style={{borderRadius:'8px'}} type="text" placeholder="Search..." value={search} onChange={(e) => {setsearch(e.target.value)}}/>
                   <div style={{ marginTop: "5px", marginLeft: "5px" }}>
                    <MDBIcon fas icon="search"/>
                   </div>
                </form>
                <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0" >
                 
                  <MDBNavbarItem>
                 
                   <MDBNavbarLink href="/"> <p className="Navbar-p"><MDBIcon fas icon="home" />  Home</p> </MDBNavbarLink>
                  </MDBNavbarItem>
                  {user?.result?._id && (
                    <>
                     <MDBNavbarItem>
                   <MDBNavbarLink href="/addTravel"> <p className="Navbar-p"> <MDBIcon fas icon="plus-circle" />  Add Travel</p> </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                   <MDBNavbarLink href="/dashboard"> <p className="Navbar-p"><MDBIcon fas icon="columns" />  Dashboard </p> </MDBNavbarLink>
                  </MDBNavbarItem>
                    </>
                  )}
                  {user?.result?._id ?( <MDBNavbarItem>
                   <MDBNavbarLink href="/login" onClick={handleLogout}> <p className="Navbar-p"> <MDBIcon fas icon="sign-out-alt" />  Logout </p> </MDBNavbarLink>
                  </MDBNavbarItem>
                  ):  (
                  <MDBNavbarItem>
                   <MDBNavbarLink href="/login"> <p className="Navbar-p"><MDBIcon fas icon="sign-in-alt" />  LogIn </p> </MDBNavbarLink>
                  </MDBNavbarItem>
          
                )}
                  {user?.result?._id && (
                    
                    <h6 className="Navbar-p" style={{marginTop:'30px',marginLeft: "5px"}} ><MDBIcon fas icon="user-circle" /> {user?.result?.name}</h6>
                  )}
                 </MDBNavbarNav>
              
            </MDBCollapse>
        </MDBContainer>
    </MDBNavbar>
  )
}

export default Header