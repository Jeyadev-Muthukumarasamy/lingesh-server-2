import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface for the document
interface IData extends Document {
  name: string;
  title: string;
  video: string;
}

// Define the schema
const dataSchema: Schema<IData> = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  video: {
    type: String,
    required: true
  }
});

// Create the model
const DataModel: Model<IData> = mongoose.model<IData>('Data', dataSchema);

// Export the model
export default DataModel;
