import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from "../api/routes/user.route.js";
import authRoutes from '../api/routes/auth.route.js'


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express(); 
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on  ${PORT}...`);
});

app.use("/api/user", userRoutes);
app.use('/api/auth',authRoutes)


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({success:false,statusCode,message})
});
