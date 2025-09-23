import { Router } from "express";
import { 
     changeCurrentPassword,
     getCurrentUser, 
     getUserChannelProfile,
     getWatchHistory,
     loginUser, 
     logOutUser, 
     refreshAccessToken, 
     registerUser, 
     updateAccountDetails, 
     updateUserAvatar, 
     updateUserCoverImage } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    //we r calling upload before registeruser
    //this is called middleware which is to do something before contacting actual backend
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logOutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT,changeCurrentPassword);
router.route("/current-user").get(verifyJWT,getCurrentUser);
router.route("/update-account").patch(verifyJWT,updateAccountDetails);
router.route("/avtar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar);
//we r using single here bcz we r updating only single field which is avatar here
/* Multer field name (upload.single("…"))
This must match the name of the input field sent from the client (e.g., form-data in Postman or your frontend).
It has nothing to do with your database field name. Multer just uses this to attach the uploaded file to req.file or req.files. */
router.route("/cover-image").patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage);
//coverImage is the resolved instance returned after image being uploaded on cloudinary
//so the multer middleware will has relationship with coverImage not coverimage(the DB field)
//hence we'll use coverImage with upload not coverimage here

router.route("/c/:username").get(verifyJWT,getUserChannelProfile);
//here username is a route parameter
//In Express, parameters in the URL path are indicated using a colon (:) in your route definition.
//the param name must be the same in which param data was extracted by req.params in controllers

router.route("/history").get(verifyJWT,getWatchHistory);

export default router;