import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from './slice/authSlice'
import TravelReducer from './slice/travelSlice'

export default  configureStore({

    reducer: {
        auth:AuthReducer,
        travel:TravelReducer,
    },
});
