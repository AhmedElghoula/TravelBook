import {createAsyncThunk} from '@reduxjs/toolkit';
import * as API from '../service';

export const createTravel =createAsyncThunk("travel/createTravel",async ({Data,navigate,toast},{rejectWithValue})=>{
    try{
      const response  = await API.createTravel(Data);
      toast.success("Travel added Successfully");
      navigate("/");
      return response.data;
    }catch(e){
        return rejectWithValue(e.response.data);
    }

})

export const getTravels =createAsyncThunk("travel/getTravels",async (page,{rejectWithValue})=>{
  try{
    const response  = await API.getTravels(page);
    return response.data;
  }catch(e){
      return rejectWithValue(e.response.data);
  }

})

export const getTravelById =createAsyncThunk("travel/getTravelById",async (id,{rejectWithValue})=>{
  try{
    const response  = await API.getTravelById(id);
    return response.data;
  }catch(e){
      return rejectWithValue(e.response.data);
  }

})

export const getTravelsByUser =createAsyncThunk("travel/getTravelsByUser",async (userId,{rejectWithValue})=>{
  try{
    const response  = await API.getTravelsByUser(userId);
    return response.data;
  }catch(e){
      return rejectWithValue(e.response.data);
  }

})

export const deleteTravel =createAsyncThunk("travel/deleteTravel",async ({id,toast},{rejectWithValue})=>{
  try{
    console.log(id)
    const response  = await API.deleteTravel(id);
    toast.success("Travel deleted successfully");
    return response.data;
  }catch(e){
      return rejectWithValue(e.response.data);
  }

})

export const updateTravel =createAsyncThunk("travel/updateTravel",async ({id,updatedData,toast,navigate},{rejectWithValue})=>{
  try{
    console.log(id)
    const response  = await API.updateTravel(updatedData,id);
    toast.success("Travel updated successfully");
    navigate("/dashboard");
    return response.data;
  }catch(e){
      return rejectWithValue(e.response.data);
  }

})

export const searchTravel =createAsyncThunk("travel/searchTravel",async (searchQuery,{rejectWithValue})=>{
  try{
    const response  = await API.search(searchQuery);
    return response.data;
  }catch(e){
      return rejectWithValue(e.response.data);
  }

})


export const likeTravel =createAsyncThunk("travel/likeTravel",async ({_id},{rejectWithValue})=>{
  try{
    const response  = await API.likeTravel(_id);
    return response.data;
  }catch(e){
      return rejectWithValue(e.response.data);
  }

})

