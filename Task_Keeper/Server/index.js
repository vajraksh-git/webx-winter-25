import mongoose from "mongoose";
import axios from "axios";
import express from "express";
import { Task } from "./models/Task.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const password=process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://pymail:${password}@cluster0.d8jgeoh.mongodb.net/?appName=Cluster0`;
const port = 3000;

mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB! 🚀"))
  .catch((err) => console.error("Connection Failed:", err));

  


const App=express();

App.use(cors());
App.use(express.json());


App.post("/tasks" , async(req,res)=>{
  const {username ,task}  = req.body;
  const newTask = new Task({username, task});
  await newTask.save();
  res.status(201).json(newTask);
})

App.get("/users", async (req, res) => {
  const username = req.query.username;
  console.log("Fetching tasks for user:", username);
  try{
  const tasks = await Task.find({username: username});
  res.json(tasks);
  }catch (error){
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

}); 

App.delete("/tasks:id" , async(req,res) => {
  const {username , taskIndex} = req.body;
  try{
    await Task.findByIdAndDelete(taskIndex);
    res.status(200).json({Message :"Task deleted successfully"})
  }
  catch(error){
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

App.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});