import React from 'react';
import {
    MDBCardImage, 
    MDBCardText,
    MDBCardTitle,
    MDBCardGroup,
    MDBCard,
    MDBCardBody,
    MDBBtn,
    MDBIcon,
    MDBTooltip
  } from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { likeTravel } from '../redux/Thunk/travelThunk';
const TravelCard = ({imageFile,description,title,tags,_id,name,likes}) => {
  const{user}= useSelector((state)=> ({ ...state.auth}))
  const userId = user?.result?._id;
  const dispatch = useDispatch();
  const str=(str)=>{
    if(str.length>45){
      str=str.substring(0,45) +"...";
    }
    return str;
  }
  const Likes =()=>{
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" />
          &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${likes.length - 1} other people likes`}
            >
              {likes.length} Likes
            </MDBTooltip>
          ) : (
            `${likes.length} Like${likes.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon="thumbs-up" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;Like
      </>
    );
  };
  const handleLike = () => { dispatch( likeTravel({_id}) )}
  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth:"20rem"}}>
       <MDBCardImage src={imageFile} alt={title} position='top' style={{ maxWidth:"100%" ,height:"180px"}}/>
       <div className="top-left">{name}</div>
       <span className="text-start tags-card">{tags?.map((tag,index)=> <span className="tag-card" key={index}>{` #${tag}`}</span>)}
       <MDBBtn style={{ float: 'right'}} tag='a' color='none' onClick={!user?.result ? null :handleLike}> 
        {!user?.result ?(
          <MDBTooltip tag="a" title={"Please login to like"}> 
           <Likes/> </MDBTooltip>
        ):(<Likes/>)}
      </MDBBtn>
       </span>
       <MDBCardBody>
        <MDBCardTitle className="text-start" >{title}</MDBCardTitle>
        <MDBCardText className="text-start" >{str(description)} <Link to={`/travel/${_id}`}> read more</Link> </MDBCardText>
       </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  )
}

export default TravelCard