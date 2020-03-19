var express = require("express");
const bcrypt = require('bcrypt');
var User = require("../models/user");


var router = express.Router();

router.get('/:id', (req, res) => {
    console.log("in user Get");
    var node = req.query.userId;
    Category.retrieveById(node, (err, user) => {
        // console.log(err);s
        // console.log(res);
        if (!err)
            return res.json(err);   
        // console.log(rest)
        return (res.json(user));
    });
});

router.post('/login', (req, res) => {
    console.log("in user login");
    var username = req.body.username;
    var password = req.body.password;
    User.retrieveByUsername(username, (err, userList) => {
        // console.log(err);s
        // console.log(res);
        if (!err)
            return res.json(err);   
        // console.log(rest)
        let user = userList[0];
        if (bcrypt.compareSync(password, user.password))
            return (res.json(user));
        else
            return res.status(400).send("not allowed");
    });
});

router.delete('/', (req, res) => {
    const id = req.query.id;
    User.delete(id, (err, user) => {
        if (err.error)
            return res.json(err);
        return (res.json(user));
    })
})

router.post('/', (req, res) => {
    console.log("in User Post" + req.body); 
    var node = req.body;
    try {
        const salt = bcrypt.genSaltSync();
        node.password = bcrypt.hashSync(node.password, salt);
    } catch { 
 
    }
    
    User.insert(node, (err, result) => {  
        if (err) 
            return res.json(err);
        return res.json(result);
    });
});

router.put('/', (req, res) => {
    const data = req.body;
    User.put(data, (err, result) => {
        if (err.error)
            return res.json(err);
        return res.json(result);
    });
})

module.exports = router; 