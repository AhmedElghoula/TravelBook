import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {createTravel,updateTravel} from "../redux/Thunk/travelThunk";
import { Spinner} from "../components";
const Travel = () => {
  const [travelData, setTravelData] = useState({
    title: "",
    description: "",
    tags: []
  });
  const { title, description, tags } = travelData;
  const dispatch= useDispatch();
  const navigate=useNavigate();
  const {id}=useParams();
  const {loading,err,usertravels} =useSelector((state =>({...state.travel})));
  const {user} =useSelector((state =>({...state.auth})));


useEffect(()=>{
  if(id){
    const singleTravel = usertravels.find((travel)=>travel._id === id);
    setTravelData({...singleTravel})
  }
},[id]);


useEffect(()=>{
  err && toast.error(err);
},[err]);



const handleSubmit=(e)=> {
    e.preventDefault();
    if(title && description && tags){
      const Data={ ...travelData,name:user?.result?.name};
      
      if (!id) {
        dispatch(createTravel({Data,navigate,toast}));
      } else {
        dispatch(updateTravel({ id, Data, toast, navigate }));
      }
      
      handleClear();
    }
   
}
const onInputChange=(e)=> { 
    const {name, value} = e.target;
    setTravelData({...travelData,[name]:value});
}
const handleAddTag=(tag)=> {
    setTravelData({...travelData,tags:[...travelData.tags,tag]});}
const handleDeleteTag=(deletedTag)=> {setTravelData({...travelData,tags:travelData.tags.filter((tag)=>tag !==deletedTag)});}
const handleClear=()=> {setTravelData({title: "",
description: "",
tags: []})}


if(loading){
  return <Spinner/>
}
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "650px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
      <h5>{id ? "Update Travel" : "Add Travel"}</h5>
        <MDBCardBody>
        <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
          <div className="col-md-12">
            <MDBInput
              placeholder="title"
              type="text"
              value={title}
              name="title"
              onChange={onInputChange}
              className="form-control"
              required
              invalid
              validation="Please enter title"
            />
          </div>
          <div className="col-md-12">
            <MDBInput
              placeholder="description"
              type="text"
              textarea
              row={4}
              value={description}
              name="description"
              onChange={onInputChange}
              className="form-control"
              required
              invalid
              validation="Please enter description"
            />
          </div>
          <div className="col-md-12">
          <ChipInput
              name="tags"
              variant="outlined"
              placeholder="Please enter a tag"
              fullWidth
              value={tags}
              onAdd={(tag) => handleAddTag(tag)}
              onDelete={(tag) => handleDeleteTag(tag)}
            /> 
          </div>
          
          <div className="d-flex justify-content-start">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setTravelData({ ...travelData, imageFile: base64 })
              }
            />
          </div>
          <div className="col-md-12">
            <MDBBtn style={{ width: "100%" }}>{id ? "Update" : "Submit"}</MDBBtn>
            <MDBBtn
              style={{ width: "100%" }}
              className="mt-2"
              color="danger"
              onClick={handleClear}
            >
              Clear
            </MDBBtn>
          </div>
        </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default Travel;
