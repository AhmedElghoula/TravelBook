import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import {register}from "../redux/Thunk/authThunk"
import "./Register.scss";
const Register = () => {

  const  className = "Register";
 
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
const { email, password,confirmPassword ,firstName,lastName} = formValue;
const dispatch =useDispatch();
const navigate = useNavigate();
const {loading,err} =useSelector((state =>({...state.auth})));


useEffect(() => {
    err && toast.error(err);

 
}, [err]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      return toast.error("Password should match");
    }
    if(email && password && firstName && lastName && confirmPassword) {
        dispatch(register({formValue,navigate,toast}));
    }
  };
  const onChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };






  return (
    <div className={className} >
    <MDBContainer fluid>

    <div className="p-5 bg-image" style={{backgroundImage: 'url(https://business-review.eu/wp-content/uploads/2022/08/0x0.jpg)', height: '300px'}}></div>

    <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-160px',alignItems:" center", background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
      <MDBCardBody className='p-5 text-center'style={{ maxWidth:'800px' }} >

        <h2 className="fw-bold mb-5" style={{ marginTop:'-50px' }}>CREATE AN ACCOUNT</h2>
       
        <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
        <MDBRow>
          <MDBCol col='6'>
            <MDBInput 
            wrapperClass='mb-4' 
            label='First name' 
            id='form1' 
            type='text'
            name='firstName'
            value={firstName}
            onChange={onChange}
            required
            invalid
            validation="Please provide your first name"
            />
          </MDBCol>

          <MDBCol col='6'>
            <MDBInput 
            wrapperClass='mb-4' 
            label='Last name' 
            id='form1' 
            type='text'
            name='lastName'
            value={lastName}
            onChange={onChange}
            required
            invalid
            validation="Please provide your last name"
            />
          </MDBCol>
        </MDBRow>
        <div className="col-md-12">
        <MDBInput 
        wrapperClass='mb-4' 
        label='Email' 
        id='form1' 
        type='email'
        name='email'
        size="lg" 
        value={email}
        onChange={onChange}
        required
        invalid
        validation="Please enter a valid email address"/>
        </div>
        <div className="col-md-12">
        <MDBInput 
        wrapperClass='mb-4' 
        label='Password' 
        id='form1' 
        size="lg" 
        type='password' 
        name='password'
        value={password}
        onChange={onChange}
        required
        invalid
        validation="Please enter your password"/>
        </div>
        <div className="col-md-12">
        <MDBInput 
        wrapperClass='mb-4' 
        label='Password Confirm' 
        id='form1' 
        size="lg" 
        type='password'
        name='confirmPassword'
        value={confirmPassword}
        onChange={onChange}
        required
        invalid
        validation="Please enter your confirm password"
        />
         </div>
            <MDBBtn className='w-100 mb-4' size='md' style={{ marginTop:'-5px' }}>
            {loading && (
                        <MDBSpinner
                        size="sm"
                        role="status"
                        tag="span"
                        className="me-2"
                        />
                    )}
              Register</MDBBtn>
        </MDBValidation>
    
        <Link to="/login"> <p  style={{color: '#393f81', marginTop:'-10px' }}>Already have an account ? <span style={{fontWeight: 'bold',color:'#ff6219'}}>Sign In</span></p></Link>
      </MDBCardBody>
    </MDBCard>

  </MDBContainer>
  </div>
  )
}

export default Register