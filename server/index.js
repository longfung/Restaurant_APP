const path = require("path");
const express = require("express");
const fileUpload = require('express-fileupload');
const fs = require('fs');
const bodyParser = require("body-parser");

var db = require('./database');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());

 
// app.use('/api/cities', require('./api/cities'));
// app.use('/api/weather', require('./api/weather'));
app.use('/api/restaurant', require('./api/restaurant'));
app.use('/api/menu', require('./api/menu'));
app.use('/api/category', require('./api/category'));
app.use('/api/user', require('./api/user'));
// app.use('/api/fileupload', require('./api/fileupload')); 
app.post('/fileupload', (req, res) => {
    console.log(`"fileuplaod2" + ${workspaceFolder}`);
    if (!req.files || Object.keys(req.files).length ===0 ) {
        return res.status(400).json({'err': 'NO file uploaded'});
    }
    let image = req.files.file;
    let path = req.file.path;
    let curDir = `${process.cwd()}/client/public/images/${path}`;
    try {
        fs.mkdirSync(curDir);
        console.log(`Directory ${curDir} created!`);
      } catch (err) {
        if (err.code === 'EEXIST') { // curDir already exists!
          console.log(`Directory ${curDir} already exists!`);
        //   return curDir; 
        }
    }
    // let filepath = __dirname + '\\images\\' + image.name
    // let filepath = process.cwd() + '\\client\\public\\images\\' + image.name;
    image.mv(`${process.cwd()}/client/public/images/${path}/${image.name}`, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        let imagepath = "\/images\/" + image.name;
        // console.log("upload file name " + filepath + ":" + image.name + " : " + process.cwd());    
        // res.send({filename: imagepath});
        // res.json({filename: imagepath});
        console.log(`${process.cwd()}/client/public/images/${image.name}`)
        res.json({filename: image.name, filepath: `/images/${image.name}`});
        // res.send({filename: filepath});
        

    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} ......`);
});


db.query('select now()', (err, res) => { 
   
    if (err.error) 
        return console.log(err.error);
    console.log(`PostgreSQL connected: ${res[0].now}.`);
})
module.exports = app;

