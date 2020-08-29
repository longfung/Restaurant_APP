const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const bodyParser = require("body-parser");

var db = require("./database");
const cors = require('cors');
const imageUtil = require("./api/imageUtil");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use("/api/restaurant", require("./api/restaurant"));
app.use("/api/menu", require("./api/menu"));
app.use("/api/entityT", require("./api/entityT"));
app.use("/api/category", require("./api/category"));
app.use("/api/topping", require("./api/topping"));
app.use("/api/user", require("./api/user"));
app.use("/api/orders", require("./api/orders"));
app.use("/api/rating", require("./api/rating"));

app.post("/api/fileupload", (req, res) => {
  // console.log(`"fileuplaod2" + ${workspaceFolder}`);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ err: "NO file uploaded" });
  }
  let image = req.files.file;
  // let path = req.file.path;
  // let curDir = `${process.cwd()}/client/public/images/${path}`;
  // try {
  //   fs.mkdirSync(curDir);
  //   console.log(`Directory ${curDir} created!`);
  // } catch (err) {
  //   if (err.code === "EEXIST") {
  //     // curDir already exists!
  //     console.log(`Directory ${curDir} already exists!`);
  //     //   return curDir;
  //   }
  // }
  // let filepath = __dirname + '\\images\\' + image.name
  // let filepath = process.cwd() + '\\client\\public\\images\\' + image.name;
  // add for not actually upload image, just to get the name back and upload picture to public folder 
  // separate manually

  // upload(req, res, (err) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(400).json({ errors: err });
  //   }
  //   console.log(req.files.file);
  //   console.log(req);
  //   return res.status(200).json({ message: 'File uploaded successfully.' });
  // });
  // console.log(`${process.cwd()}/client/public/images/${image.name}`);
  // res.json({ filename: image.name, filepath: `/images/${image.name}` });
  // image.mv(
  //   `${process.cwd()}/client/public/images/${path}/${image.name}`,
  //   (err) => {
  //     if (err) {
  //       console.error(err);
  //       return res.status(500).send(err);
  //     }

  // let imagepath = "/images/" + image.name;
  //     // console.log("upload file name " + filepath + ":" + image.name + " : " + process.cwd());
  //     // res.send({filename: imagepath});
  //     // res.json({filename: imagepath});
  //     console.log(`${process.cwd()}/client/public/images/${image.name}`);
  res.json({ filename: image.name, filepath: `/images/${image.name}` });
  //     // res.send({filename: filepath});
  //   }
  // );
});
//DO
app.post("/api/doupload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ err: "NO file uploaded" });
  }
  return imageUtil.upload(req, res);
});

app.get('/api/dodownload', function (req, res, next) {
  imageUtil.download(req, res);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} ......`);
});

db.query("select now()", (err, res) => {
  if (err.error) return console.log(err.error);
  console.log(`PostgreSQL connected: ${res[0].now}.`);
});
module.exports = app;
