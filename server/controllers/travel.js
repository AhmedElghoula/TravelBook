import mongoose from 'mongoose';
import TravelModal from '../models/travel.js'

export const createTravel = async (req,res) => {  
    const travel=req.body;
    const newtravel= new TravelModal({ ... travel, authorName:req.userId, createdAt: new Date().toISOString()});

    try{
        await newtravel.save();
        res.status(201).json(newtravel);
    }catch(err){res.status(404).json({message:'Something went wrong'})}
 };

 export const getTravels = async (req,res) => {
  const {page}=req.query;  
    try{
        const limit = 6;
        const startIndex = (Number(page)-1) * limit;
        const total =await TravelModal.countDocuments({});
        const travels = await TravelModal.find().limit(limit).skip(startIndex);
        res.status(200).json({data: travels, currentPage: Number(page),totalTravels: total,numberOfPages: Math.ceil(total/limit),});
    }catch(err){res.status(404).json({message:'Something went wrong'})}
 };

 export const getTravelById = async (req,res) => {  
  const {id}=req.params;
  try{
    const travel = await TravelModal.findById(id);
      res.status(200).json(travel);
  }catch(err){res.status(404).json({message:'Something went wrong'})}
};

export const getTravelByUser = async (req,res) => {  
  const {id}=req.params;
  try{
    if(!mongoose.Types.ObjectId.isValid(id)){
      res.status(404).json({message:"User doesn't exist"});
    }
    const usertravels = await TravelModal.find({ creator: id } );
      res.status(200).json(usertravels);
  }catch(err){res.status(404).json({message:'Something went wrong'})}
};

export const deleteTravel = async (req,res) => {  
  const {id}=req.params;
  try{
    if(!mongoose.Types.ObjectId.isValid(id)){
      res.status(404).json({message:"Travel doesn't exist"});
    }
     await TravelModal.findByIdAndRemove(id);
     res.json({ message: "Tour deleted successfully" });
  }catch(err){res.status(404).json({message:'Something went wrong'})}
};

export const updateTravel = async (req,res) => {  
  const {id}=req.params;
  const {title,authorName,description,imageFile,tags}=req.body;
  try{
    if(!mongoose.Types.ObjectId.isValid(id)){
      res.status(404).json({message:"Travel doesn't exist"});
    }
    const updatedTravel={
      authorName,
      title,
      description,
      imageFile,
      tags,
      _id: id,
    }
     await TravelModal.findByIdAndUpdate(id,updatedTravel,{new : true});
      res.json(updatedTravel);
  }catch(err){res.status(404).json({message:'Something went wrong'})}
};

export const search = async (req,res) => {  
  const {searchQuery}=req.query;
  try{
     const term =new RegExp(searchQuery, "i");
     const travels =await TravelModal.find({term});
     res.json(travels);
  }catch(err){res.status(404).json({message:'Something went wrong'})}
};

export const likeTravel = async (req,res) => {
  const {id} = req.params;
try{
  if(!req.userId){
    return res.json({ message: 'User is not authenticated'})
  }

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ message: 'No travels exist'})
  }
  const travel = await TravelModal.findById(id);
  const index = travel.likes.findIndex((id) => id===String(req.userId));
  if(index === -1){
    travel.likes.push(req.userId);
  }else{
    travel.likes = travel.likes.filter((id) => id !== String(req.userId) );
  }
  const updated = await TravelModal.findByIdAndUpdate(id, travel,{new: true});


  res.status(200).json(updated)
}catch(err){res.status(404).json({message:'Something went wrong'})}
}