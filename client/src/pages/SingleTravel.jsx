import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getTravelById} from "../redux/Thunk/travelThunk";



const SingleTravel = () => {
    const dispatch = useDispatch();
    const {travel} = useSelector((state)=>({...state.travel}));
    const {id} =useParams();


    useEffect(() => {
        if(id) {
            dispatch(getTravelById(id));
        }
    },[id])
  return (
    
    <div
    style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1200px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
       
      <MDBContainer>
   
      
        <MDBCard className="mb-3 mt-2">

       
        <MDBCardImage
        
        position="top"
        style={{width: "100%",objectFill:"fill"}}
        src={travel?.imageFile}
        alt={travel?.title}
        />
        <MDBCardBody>
            <h3> {travel?.title}</h3>
            <span>
                <p className="text-start tourName"> <span style={{color: '#0095E9'}}>Created By:</span> {travel?.name}</p>
            </span>
            <br />
            <div style={{float: 'left'}}>
                <span className="text-start">
                    {travel?.tags?.map((tag,index)=> <span className="tag-card" key={index}>{` #${tag}`}</span> )}
                </span>
            </div>
            <br />
            <MDBCardText className="text-start  mt-2">
                <MDBIcon
                style={{float:'left',margin:'5px'}}
                far
                icon="calendar-alt"
                size="lg"
                />
                <small className="text-muted">
                     {moment(travel?.createdAt).fromNow()}
                </small>
            </MDBCardText>
            <MDBCardText className="lead mb- text-start">
            {travel?.description}
            </MDBCardText>
        </MDBCardBody>
        </MDBCard>
      </MDBContainer>
        
    
    </div>
  )
}

export default SingleTravel