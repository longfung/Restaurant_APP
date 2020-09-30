var express = require("express");

var Menu = require("../models/menu");

var router = express.Router();

router.get("/", (req, res) => {
  // console.log("in Menu Get");

  // var node = req.query;
  var node = req.query;
  // var categoryId = req.query.categoryId;

  // var categoryId = req.query.categoryId;
  Menu.retrieveByRestaurant(node, (err, menu) => {
    // console.log(err);
    // console.log(res);
    if (err) return res.status(404).send(err);
    // console.log(rest).
    return res.json(menu);
  });
});

router.get("/category", (req, res) => {
  // console.log("in Menu Get By Category" + JSON.stringify(req.query));

  var node = req.query;
  // var node = req.query.restaurant_id;
  // var categoryId = req.query.categoryId;

  // var categoryId = req.query.categoryId;
  Menu.retrieveByCategory(node, (err, menu) => {
    // console.log(err);
    // console.log(res);
    if (err) return res.status(404).send(err)
    // console.log(rest)
    return res.json(menu);
  });
});

router.post("/", (req, res) => {
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
    if (err) return res.status(404).send(err)
    return res.json(result);
  });
});

router.put("/", (req, res) => {
  const data = req.body;
  Menu.put(data, (err, result) => {
    if (err) return res.status(404).send(err)
    return res.json(result);
  });
});

router.put("/rating", (req, res) => {
  const data = req.body;
  Menu.updateRating(data, (err, result) => {
    if (err) return res.status(404).send(err)
    return res.json(result);
  });
});

router.delete("/", (req, res) => {
  const id = req.query.id;
  Menu.delete(id, (err, menu) => {
    if (err) return res.status(404).send(err)
    return res.json(menu);
  });
});

module.exports = router;
