import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getTravels } from "../redux/Thunk/travelThunk";
import { setCurrentPage } from "../redux/slice/travelSlice";
import {TravelCard} from "../components"
import {Spinner} from "../components"
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();
  const {travels,loading,currentPage,numberOfPages}=useSelector((state)=>({...state.travel}));
  useEffect(() => {
    dispatch(getTravels(currentPage));
  },[currentPage])

  if(loading){
    return <Spinner/>
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
<MDBRow className="mt-5">
{ travels.length ===  0 && location.pathname === "/" && (
  <MDBTypography className="text-center mb-0" tag="h2"> No Travels Found</MDBTypography>
)}
  <MDBCol>
    <MDBContainer>
      <MDBRow  className="row-cols-1 row-cols-md-3 g-2" >
        {travels.map((travel,index)=> <TravelCard {...travel} key={index}/>)}
      </MDBRow>
    </MDBContainer>
  </MDBCol>
</MDBRow>
{travels.length > 0 && !searchQuery && (
        <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          dispatch={dispatch}
        />
      )}

    </div>
  )
}

export default Home