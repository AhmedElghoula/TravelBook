import {createAsyncThunk} from '@reduxjs/toolkit';
import * as API from '../service';


export const login =createAsyncThunk("auth/login",async ({formValue,navigate,toast},{rejectWithValue})=>{
    try{
      const response  = await API.signIn(formValue);
      toast.success("Login Successfully");
      navigate("/");
      return response.data;
    }catch(e){
        return rejectWithValue(e.response.data);
    }

})


export const register =createAsyncThunk("auth/register",async ({formValue,navigate,toast},{rejectWithValue})=>{
  try{
    const response  = await API.signUp(formValue);
    toast.success("Register Successfully");
    navigate("/");
    return response.data;
  }catch(e){
      return rejectWithValue(e.response.data);
  }

})