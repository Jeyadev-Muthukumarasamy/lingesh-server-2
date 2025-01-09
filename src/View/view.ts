import express from "express"; // Use lowercase `express` here
import { getMedia, postMedia } from "../Controller/data";
import { getMessage, postMessage } from "../Controller/Message";

export const router = express.Router(); // Correct way to create an Express instance
router.post("/", postMedia); // Correctly map POST request to the `postVideo` function
router.get("/", getMedia);
router.post("/postMessage",postMessage)
router.get("/getMessage",getMessage)