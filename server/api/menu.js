var express = require("express");

var Menu = require("../models/menu");


var router = express.Router();

router.get('/', (req, res) => {
    console.log("in Menu Get");

    Menu.retrieveAll((err, menu) => {
        // console.log(err);
        // console.log(res);
        if (!err)
            return res.json(err); 
        // console.log(rest)
        return (res.json(menu));
    });
});

router.post('/', (req, res) => {
    // var name = req.body.name;
    // if(req.files == null) {
    //     console.log("no file upload");
    //     return res.status(400).json({msg: "no file upload"})
    // }
    // const file = req.files.file;
    // console.log("inage name" + file.name);
    console.log("in Menu Post" + req.body); 
    var node = req.body;
    Menu.insert(node, (err, result) => { 
        if (err)
            return res.json(err);
        return res.json(result);
    });
});

module.exports = router; 