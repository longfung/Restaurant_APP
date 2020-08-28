const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  accessKeyId: process.env.DO_ACCESS_KEY || 'KH3JHRJ2EWC5EL5RLUPO',
  secretAccessKey: process.env.DO_SECRET_KEY || 'EClLksylzm82QfRm0S9mAIx+M0icHP1vQNVgFAyWzi8'
});

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint(process.env.DO_ENDPOINT || 'sfo2.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const fileFilter = (file, res) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    return;
  } else {
    return res.status(404).json({ error: 'Invalid Mime Type, only JPEG and PNG' });
  }
}

const upload = (req, res) => {
  const image = req.files.file;
  const name = image.name;
  const pathId = req.body.pathId;
  fileFilter(image, res);
  var params = {
    Body: image.data,
    Bucket: process.env.DO_BUCKET || "takeorder",
    Key: pathId + '/' + name,
  };
  s3.putObject(params, function (err, data) {
    if (err)
      return res.status(404).json({ error: err });
    else res.send(name);
  });
}

const download = (req, res) => {
  const imagePath = req.query.imagePath;
  var params = {
    Bucket: "takeorder",
    Key: imagePath,
  };
  s3.getObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else {
      const buffer = 'data:image/jpeg;base64, ' + encode(data.Body);
      res.send(buffer);
    }
  });
};

const encode = (data) => {
  let buf = Buffer.from(data);
  let base64 = buf.toString('base64');
  return base64
}



module.exports = { upload, download };

// const express = require("express");
// const fileupload = require("express-fileupload");
// const app = express();
// app.use(fileupload);

// // const router = express.Router();
// var router = express.Router();

// router.post("/", (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).json({ err: "NO file uploaded" });
//   }

//   let image = req.files.file;
//   console.log("upload file name" + image.name);
// });
