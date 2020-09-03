var express = require("express");
const bcrypt = require("bcrypt");
var User = require("../models/user");

var router = express.Router();

router.get("/:id", (req, res) => {
  // console.log("in user Get");
  var node = req.query.userId;
  User.retrieveById(node, (err, user) => {
    // console.log(err);s
    // console.log(res);
    if (err) return res.status(404).send(err);
    if (user && user.length == 0) {
      return res.status(404).json({ error: "restaurant not found!!" });
    }
    return res.json(user[0]);
  });
});

router.post("/login", (req, res) => {
  // console.log("in user login");
  var username = req.body.username;
  var password = req.body.password;
  User.retrieveByUsername(username, (err, userList) => {
    // console.log(err);s
    // console.log(res);
    if (err) return res.status(404).send(err);
    // console.log(rest)
    if (userList.length == 0) {
      return res.status(404).json({ message: "Usernae not found!!" });
    }
    let user = userList[0];
    if (bcrypt.compareSync(password, user.password)) return res.json(user);
    else return res.status(404).json({ message: "password invalid" });
  });
});
router.delete("/", (req, res) => {
  const id = req.query.id;
  User.delete(id, (err, user) => {
    if (err) return res.status(404).send(err);
    return res.json(user);
  });
});

router.post("/", (req, res) => {
  // console.log("in User Post" + req.body);
  var node = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    node.password = bcrypt.hashSync(node.password, salt);
  } catch { }

  User.insert(node, (err, result) => {
    if (err) return res.status(404).send(err);
    return res.json(result);
  });
});

router.put("/", (req, res) => {
  const data = req.body;
  User.put(data, (err, result) => {
    if (err) return res.status(404).send(err);
    return res.json(result);
  });
});

module.exports = router;
