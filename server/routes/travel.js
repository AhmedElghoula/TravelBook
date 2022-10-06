import express from 'express';
import {createTravel, getTravels,getTravelById,getTravelByUser,updateTravel,deleteTravel,search,likeTravel}from '../controllers/travel.js';
import auth from "../middleware/auth.js";

const router =express.Router();

router.post('/createTravel',auth,createTravel);
router.get('/getTravels',getTravels);
router.get('/getTravel/:id',getTravelById);
router.get('/userTravels/:id',auth,getTravelByUser);
router.delete('/deleteTravel/:id',auth,deleteTravel);
router.patch('/updateTravel/:id',auth,updateTravel);
router.get('/search',search);
router.patch('/likeTravel/:id',auth,likeTravel);


export default router;