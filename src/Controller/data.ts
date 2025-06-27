import { Request,Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from "multer";
import DataModel from '../Model/DataSchema';


// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dcnazksc1',
  api_key: '728534263632896',
  api_secret: 'KmVzrLvwLeHk5MQ3M6UsEXBMji0'
});

// Create multer instance with storage configuration
const upload = multer({ dest: '/tmp' });

export const postMedia = async (req: Request, res: Response) => {
    console.log(req.body)
  const uploadSingle = upload.single('video'); // 'media' is the field name for the file

  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "File upload failed", error: err.message });
    }

    try {
      // Ensure file is uploaded
      if (!req.file) {
        return res.status(400).json({ message: "Media file is required" });
      }

      // Extract name and title from req.body
      const { name, title }:any = req.body;
      console.log(name,title)

      // Ensure name and title are provided
      if (!name || !title) {
        return res.status(400).json({ message: "Name and title are required" });
      }

      // Upload the media (photo or video) to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto", // Automatically detects if the file is a photo or video
        public_id: `${name}_${title}`
      });

      // Save data to MongoDB
      const response = await new DataModel({
        name,
        title,
        video: result.secure_url
      }).save();

      // Respond with the Cloudinary URL and saved data
      res.status(200).json({
        message: "Media uploaded successfully",
        mediaUrl: result.secure_url,
        data: response
      });
    } catch (error) {
      console.error("Error uploading media:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};

export const getMedia = async(req:Request,res:Response) =>{
    try {
        const response = await DataModel.find();
        console.log(response)
        res.json({
            data:response
        })
    } catch (error) {
        console.log(error)
    }
}
