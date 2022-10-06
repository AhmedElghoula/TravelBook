import {createSlice} from '@reduxjs/toolkit';
import {createTravel,getTravels,getTravelById,getTravelsByUser,deleteTravel,updateTravel,searchTravel,likeTravel} from '../Thunk/travelThunk';

const travelSlice= createSlice({
    name:'travel',
    initialState: {
        travel: {},
        travels: [],
        usertravels:[],
        currentPage:1,
        numberOfPages: null,
        err: '',
        loading:false,
      

    },
    reducers:{
          setCurrentPage: (state,action)=>{
            state.currentPage = action.payload;
          }
    },
    extraReducers:{
        //////////////////////////////// createTravel  ////////////////////////////////
               [createTravel.pending]:(state,action) =>{
                state.loading=true;
               },
               [createTravel.fulfilled]:(state,action) =>{
                state.loading = false;
                state.travels = [action.payload];
               },
               [createTravel.rejected]:(state,action) =>{
                state.loading=false;
                state.err=action.payload.message;
               },
       //////////////////////////////// getTravels  ////////////////////////////////
       [getTravels.pending]:(state,action) =>{
        state.loading=true;
       },
       [getTravels.fulfilled]:(state,action) =>{
        state.loading = false;
        state.travels = action.payload.data;
        state.numberOfPages =action.payload.numberOfPages;
        state.currentPage= action.payload.currentPage;
       },
       [getTravels.rejected]:(state,action) =>{
        state.loading=false;
        state.err=action.payload.message;
       },
        //////////////////////////////// getTravelById  ////////////////////////////////
        [getTravelById.pending]:(state,action) =>{
            state.loading=true;
           },
           [getTravelById.fulfilled]:(state,action) =>{
            state.loading = false;
            state.travel = action.payload;
           },
           
           [getTravelById.rejected]:(state,action) =>{
            state.loading=false;
            state.err=action.payload.message;
           },
             //////////////////////////////// getTravelsByUser  ////////////////////////////////
           [getTravelsByUser.pending]:(state,action) =>{
            state.loading=true;
           },
           [getTravelsByUser.fulfilled]:(state,action) =>{
            state.loading = false;
            state.usertravels = action.payload;
           },
           [getTravelsByUser.rejected]:(state,action) =>{
            state.loading=false;
            state.err=action.payload.message;
           },
            //////////////////////////////// deleteTravel  ////////////////////////////////
            [deleteTravel.pending]:(state,action) =>{
                state.loading=true;
               },
               [deleteTravel.fulfilled]:(state,action) =>{
                state.loading = false;
               const {arg:{id},}=action.meta;
               if(id){ 
                state.usertravels=state.usertravels.filter((item)=>item._id !==id);
                state.travels=state.travels.filter((item)=>item._id !==id);
            }
               },
               [deleteTravel.rejected]:(state,action) =>{
                state.loading=false;
                state.err=action.payload.message;
               },
                //////////////////////////////// updateTravel  ////////////////////////////////
            [updateTravel.pending]:(state,action) =>{
                state.loading=true;
               },
               [updateTravel.fulfilled]:(state,action) =>{
                state.loading = false;
               const {arg:{id}}=action.meta;
               if(id){ 
                state.usertravels=state.usertravels.map((item)=>item._id ===id? action.payload : item);
                state.travels=state.travels.filter((item)=>item._id ===id? action.payload : item);
            }
               },
               [updateTravel.rejected]:(state,action) =>{
                state.loading=false;
                state.err=action.payload.message;
               },
                //////////////////////////////// searchTravel  ////////////////////////////////
             [searchTravel.pending]:(state,action) =>{
                 state.loading=true;
               },
             [searchTravel.fulfilled]:(state,action) =>{
                    state.loading = false;
                     state.travels = action.payload;
                },
                [searchTravel.rejected]:(state,action) =>{
                  state.loading=false;
                state.err=action.payload.message;
                },
               //////////////////////////////// likeTravel  ////////////////////////////////
            [likeTravel.pending]:(state,action) =>{},
             [likeTravel.fulfilled]:(state,action) =>{
              state.loading = false;
             const {arg:{_id}}=action.meta;
             if(_id){ 
              state.travels=state.travels.filter((item)=>item._id ===_id? action.payload : item);
          }
             },
             [likeTravel.rejected]:(state,action) =>{
              state.err=action.payload.message;
             },

        }
    });
   
    export const {setCurrentPage} =travelSlice.actions;
    export default travelSlice.reducer;