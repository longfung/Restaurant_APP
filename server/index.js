const path = require("path");
const express = require("express");
const fileUpload = require('express-fileupload');
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
    console.log("fileuplaod");
    if (!req.files || Object.keys(req.files).length ===0 ) {
        return res.status(400).json({'err': 'NO file uploaded'});
    }
    let image = req.files.file;
    // let filepath = __dirname + '\\images\\' + image.name
    let filepath = process.cwd() + '\\client\\public\\images\\' + image.name;
    image.mv(filepath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        
        let imagepath = "\/images\/" + image.name;
        console.log("upload file name " + filepath + ":" + image.name + " : " + process.cwd());    
        // res.send({filename: imagepath});
        res.json({filename: imagepath});
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

