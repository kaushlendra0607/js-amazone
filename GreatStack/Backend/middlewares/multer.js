import multer from "multer";

const storageConfig = multer.diskStorage({//here we will configure multer's storage engine
    filename: function (req, file, callback) {
        callback(null, file.originalname);
        //req is request object as usual
        //file is file object representing uploaded file
        //and last is callback(error, filename) where null means no error
        //Warning: Using originalname can overwrite files
        //If two users upload image.jpg, the second one replaces the first one. */
        //better to use  Date.now() + '-' + file.originalname instead
    }
});

const upload = multer({ storage: storageConfig });

export default upload;