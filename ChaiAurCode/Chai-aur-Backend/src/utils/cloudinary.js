import {v2 as cloudinary} from "cloudinary";//cloudinary is used for uploading and maintainance of files like images or videos
//Cloudinary is a cloud-based media management service.
import fs from "fs";//fs is File System module in Node.js.
//Provides an API to interact with the file system (read, write, update, delete, etc.).
//Works both in synchronous and asynchronous ways.It comes built in with node.js

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        });
        console.log("File has been uploaded",response.url);
    } catch (error) {
        fs.unlinkSync(localFilePath);//removes the temporary file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary}