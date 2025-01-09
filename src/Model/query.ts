import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the document
interface IMessage extends Document {
  name: string;
  email: string;
  message: string;
  date: Date;      // Adding 'date' to store the date
  time: Date;      // Adding 'time' to store the time
}

// Define the schema for the collection
const MessageSchema: Schema<IMessage> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Optional email validation
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,  // Automatically sets the current date
    },
    time: {
      type: Date,
      default: Date.now,  // Automatically sets the current time
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Create and export the model
const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
