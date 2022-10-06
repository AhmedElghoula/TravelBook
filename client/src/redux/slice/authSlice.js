import {createSlice} from '@reduxjs/toolkit';
import {login,register} from '../Thunk/authThunk'


const authSlice= createSlice({
    name:'auth',
    initialState: {
        user: null,
        err: '',
        loading:false,
    },
    reducers:{
        setUser:(state,action)=>{
            state.user =action.payload;
        },
        setLogout:(state,action)=>{
            localStorage.clear();
            state.user=null;
        }
    },
    extraReducers:{
    //////////////////////////////// Login  ////////////////////////////////
           [login.pending]:(state,action) =>{
            state.loading=true;
           },
           [login.fulfilled]:(state,action) =>{
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload;
           },
           [login.rejected]:(state,action) =>{
            state.loading=false;
            state.err=action.payload.message;
           },
    //////////////////////////////// Register  ////////////////////////////////
           [register.pending]:(state,action) =>{
            state.loading=true;
           },
           [register.fulfilled]:(state,action) =>{
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload;
           },
           [register.rejected]:(state,action) =>{
            state.loading=false;
            state.err=action.payload.message;
           },
    }
});
export const {setUser,setLogout}=authSlice.actions;

export default authSlice.reducer;