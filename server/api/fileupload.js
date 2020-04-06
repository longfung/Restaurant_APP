const express = require("express");
const fileupload = require("express-fileupload");
const app = express();
app.use(fileupload);

// const router = express.Router();
var router = express.Router();

router.post("/", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ err: "NO file uploaded" });
  }

  let image = req.files.file;
  console.log("upload file name" + image.name);
});
