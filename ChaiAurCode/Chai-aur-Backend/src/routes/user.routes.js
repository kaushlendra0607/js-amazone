import { Router } from "express";
import { loginUser, logOutUser, registerUser } from "../controllers/user.controller.js";
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

export default router;