import  express  from "express"

import dotenv from 'dotenv';
import morgan  from "morgan";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import CatergoryRoutes from "./routes/CatergoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from 'path';
//config dotenv
dotenv.config();

//Databse config
connectDB();

//rest object
const app = express();

//Middelware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname , './client/build)')))

// routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',CatergoryRoutes);
app.use("/api/v1/product",productRoutes);
//rest api
app.use("*",function(req,res)
{
    res.sendFile(path.join(__dirname , './client/build/index.html'))
})
app.get('/',(req,res)=>
{
    res.send("<h1>Welcome to our new E-Commerce website</h1>")
})
//PORT
const PORT = process.env.PORT || 3900;
//run listen
app.listen(PORT,()=>
{
    console.log(`server running on ${process.env.DEV_MODE}  mode on  ${PORT}`);
})