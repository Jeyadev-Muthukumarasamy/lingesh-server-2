  import express, { Request, Response } from "express";
  import mongoose from "mongoose";
  import { router } from "./src/View/view";
  import cors from "cors";

  const app = express();

  // Middleware to parse incoming requests with JSON payloads
  app.use(cors());

 
  app.use(express.json());

  // CORS configuration




  // Route to test if the server is working
  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "hi" });
  });

  // MongoDB connection
  mongoose
    .connect('mongodb+srv://jeydev007:uWGTs9KCMWRrcpCO@cluster0.opvwi.mongodb.net/')
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => {
      console.error('Connection error:', err);
      process.exit(1); // Exit the process if the connection fails
    });

  // Use the router for API routes
  app.use("/api", router);



  // Start the server
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
