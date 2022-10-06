import axios from "axios";
const devEnv=process.env.NODE_ENV !== "production";
const {REACT_APP_DEV_API,REACT_APP_PROD_API} = process.env
const API =axios.create({ baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API } `});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization= `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
})

export const signIn =(formData)=>API.post("/users/signin",formData);
export const signUp =(formData)=>API.post("/users/signup",formData);

export const createTravel=(formData)=>API.post("/travel/createTravel",formData);
export const getTravels=(page)=>API.get(`/travel/getTravels?page=${page}`); 
export const getTravelById =(id)=>API.get(`/travel/getTravel/${id}`);
export const getTravelsByUser =(userId)=>API.get(`/travel/userTravels/${userId}`);
export const deleteTravel =(id)=>API.delete(`/travel/deleteTravel/${id}`);
export const updateTravel =(updatedData,id)=>API.patch(`/travel/updateTravel/${id}`,updatedData);
export const search=(searchQuery)=>API.get(`/travel/search?searchQuery=${searchQuery}`); 
export const likeTravel =(id)=>API.patch(`/travel/likeTravel/${id}`);