// //this code is taken from the npm documentation
// import OpenAI from "openai";
// import 'dotenv/config';
// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Make sure your API key is set in environment variables
// });


//   const response = await client.responses.create({
//     model: "gpt-4o-mini",
//     input: "Are semicolons optional in JavaScript?",
 
//   });

//   console.log(response.output_text);



// Install first: npm install @google/generative-ai dotenv


import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
 const app = express();
  const PORT = 8080;
   app.use(express.json());
   app.use(cors());
app.use("/api",chatRoutes);
   app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`);
    connectDB();
   });



   const connectDB = async() => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected with Database");

    } catch(err) {
      console.log("Failed to connect with db",err);
    }
   }






import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Pick a model (e.g., "gemini-1.5-flash" or "gemini-1.5-pro")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run() {
  const prompt = "hii";
  
  const result = await model.generateContent(prompt);
  
  // console.log(result.response.text());
}

run();




