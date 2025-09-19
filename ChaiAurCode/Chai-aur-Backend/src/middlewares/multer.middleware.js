import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)//in real world we should add some uniqesuffix to it do gpt for more
  }
})

export const upload = multer({ storage : storage });