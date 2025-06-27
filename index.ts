import mongoose from "mongoose";
import {router} from "./src/View/view"
import express,{Request,Response} from "express";
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express();
app.use(cors());

app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MongoDB connection URI not found in environment variables");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("Connection error:", err);
    process.exit(1);
  });
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "hi" });
});
app.use("/api", router);

export default app
