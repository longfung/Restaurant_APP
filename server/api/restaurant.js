var express = require('express');
var Restaurant = require('../models/restaurant');

var router = express.Router();

router.get('/', (req, res) => {
    console.log("in Get");

    Restaurant.retrieveAll((err, rest) => {
        // console.log(err);
        // console.log(res);
        if (!err)
            return res.json(err); 
        // console.log(rest);
        return (res.json(rest));
    });
});

router.post('/', (req, res) => {
    // var name = req.body.name;
    console.log("in Post");
    var node = req.body;
    Restaurant.insert(node, (err, result) => { 
        if (err)
            return res.json(err);
        return res.json(result);
    });
});

module.exports = router;