var express = require("express");

var Category = require("../models/category");

var router = express.Router();

router.get("/", (req, res) => {
  console.log("in category Get");
  var node = req.query;
  Category.retrieveAllByRestaurant(node, (err, category) => {
    // console.log(err);s
    // console.log(res);
    if (err) return res.status(404).send(err);
    // console.log(rest)
    return res.json(category);
  });
});

router.delete("/", (req, res) => {
  const query = req.query;
  Category.delete(query, (err, category) => {
    if (err) return res.status(404).send(err);
    return res.json(category);
  });
});

router.post("/", (req, res) => {
  console.log("in Menu Post" + req.body);
  var node = req.body;
  Category.insert(node, (err, result) => {
    if (err) return res.status(404).send(err);
    return res.json(result);
  });
});

router.put("/", (req, res) => {
  const data = req.body;
  Category.put(data, (err, result) => {
    if (err) return res.status(404).send(err);
    return res.json(result);
  });
});

module.exports = router;
