import { Request,Response } from 'express';
import Message from "../Model/query"
// POST /messages route to create a new message
export const postMessage = async (req: Request, res: Response):Promise<any> => {
  try {
    const { name, email, message }: any = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new message including the current date and time
    const newMessage = new Message({
      name,
      email,
      message,
      date: new Date(), // Current date
      time: new Date(), // Current time
    });

    // Save the message to the database
    const savedMessage = await newMessage.save();
    return res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error saving message:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /messages route to fetch all messages
export const getMessage = async (req: Request, res: Response):Promise<any> => {
  try {
    // Retrieve all messages from the database
    const messages = await Message.find();

    // Return the messages including date and time
    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};