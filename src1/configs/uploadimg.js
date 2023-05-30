import multer from "multer";

const imgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(__dirname + "/public/img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const imgUploader = multer({ Storage: imgStorage });
