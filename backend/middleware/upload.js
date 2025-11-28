// const multer = require("multer");
// const path = require("path");

// // Store uploaded files in /uploads folder
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); 
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
//   fileFilter: function (req, file, cb) {
//     const filetypes = /jpeg|jpg|png/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     if (mimetype && extname) return cb(null, true);
//     cb(new Error("Only images (jpeg, jpg, png) are allowed"));
//   },
// });

// module.exports = upload;



const multer = require("multer");
const path = require("path");

// Your storage config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Multer setup
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png/;
    const mimetype = allowed.test(file.mimetype);
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && ext) return cb(null, true);
    cb(new Error("Only images (jpeg, jpg, png) are allowed"));
  },
});

// CUSTOM MIDDLEWARE WRAPPER
const uploadSingleWithErrors = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      // File too large
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ status: false, message: "File too large. Max 2MB allowed." });
      }

      // Invalid File Type
      if (err && err.message === "Only images (jpeg, jpg, png) are allowed") {
        return res.status(400).json({ status: false, message: err.message });
      }

      // Other upload errors
      if (err) {
        return res
          .status(400)
          .json({ status: false, message: "File upload failed." });
      }

      // No errors → continue
      next();
    });
  };
};

module.exports = { uploadSingleWithErrors };
