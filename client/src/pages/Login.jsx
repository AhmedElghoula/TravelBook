import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";

import {toast} from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import {login}from "../redux/Thunk/authThunk"


const Login = () => {



  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
const { email, password } = formValue;
const dispatch =useDispatch();
const navigate = useNavigate();
const {loading,err} =useSelector((state =>({...state.auth})));


useEffect(() => {
    err && toast.error(err);

 
}, [err]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && password) {
        dispatch(login({formValue,navigate,toast}));
    }
  };
  const onChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const googleSuccess = (resp) => {
    const email = resp?.profileObj?.email;
    console.log('jdshgfj',email);
  }

  const googleFailure =(err) => {
    toast.error(err);
  }
  return (
  <div style={{
    margin: "auto",
    padding: "15px",
    alignContent: "center",
    marginTop: "60px",
  }}
  className="container">
    <MDBContainer className="my-5"   >

      <MDBCard style={{marginTop:'-41px' ,height: '550px'}}>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
           
            <MDBCardImage src='https://industry.visitcalifornia.com/-/media/industry-site/images/partner-opportunities/campaigns/california-roadtrip-republic/vca_campaign_caroadtriprepublic_thumb-vert.jpg' alt="login form" className='rounded-start w-100'   style={{height: '550px'}}/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                {/* <MDBIcon fas icon="trav" style={{ color: '#ff6219' }}/> */}
                {/* <span className="h1 fw-bold mb-0">TravelBook</span> */}
              </div>

              <MDBIcon fas icon="user-circle" size="5x" style={{ color: '#ff6219' , paddingTop: '30px' }}/>
              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
                <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
               <div className="col-md-12">
                <MDBInput 
                wrapperClass='mb-4' 
                label='Email address' 
                type='email' 
                size="lg" 
                name="email" 
                value={email}
                onChange={onChange}
                required
                invalid
                validation="Please enter a valid email address"
                />
                </div>
                <div className="col-md-12">
                <MDBInput
                wrapperClass='mb-4' 
                label='Password'  
                type='password'
                name="password" 
                size="lg" 
                value={password}
                onChange={onChange}
                required
                invalid
                validation="Please enter your password"
                />
                </div>
                 <MDBBtn   
                 className="mb-4 px-5"  
                 size='lg' 
                 style={{ backgroundColor: '#0093E9' }}>
                    {loading && (
                        <MDBSpinner
                        size="sm"
                        role="status"
                        tag="span"
                        className="me-2"
                        />
                    )}
                    Login
                    </MDBBtn>
                </MDBValidation>
                                               
             <Link to="/register"> <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <span style={{fontWeight: 'bold',color:'#ff6219'}}>Register here</span></p></Link>

            

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
    </div>
  );
};

export default Login;
