import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/user.js'
import travelRouter from './routes/travel.js'
import dotenv from 'dotenv';
const app = express();
dotenv.config();


app.use(express.json({limit: "30mb",extended: true}));
app.use(express.urlencoded({limit: "30mb",extended: true}));
app.use(cors());

app.use("/users",userRouter);
app.use("/travel",travelRouter);
app.get("/",(req,res) =>{ res.send("Welcome to TravelBook")})





const CONNECTION_URL ='mongodb+srv://Tourbook:Tourbook123@cluster0.3cv1wvb.mongodb.net/tourbook_db?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> app.listen(PORT,()=> console.log(`server running on port: ${PORT}`)))
.catch((error) =>console.log(error.message));
