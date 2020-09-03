var express = require("express");

var EntityT = require("../models/entityT");

var router = express.Router();

router.get("/menu", (req, res) => {
  console.log("in MenuT name Get");

  // var node = req.query;
  var node = req.query;
  // var categoryId = req.query.categoryId;

  // var categoryId = req.query.categoryId;
  EntityT.retrieveMenuTByRestaurant(node, (err, menu) => {
    // console.log(err);
    // console.log(res);
    if (err) return res.status(404).send(err);;
    // console.log(rest).
    return res.json(menu);
  });
});

router.get("/desc", (req, res) => {
  console.log("in MenuT desc Get");

  // var node = req.query;
  var node = req.query;
  // var categoryId = req.query.categoryId;

  // var categoryId = req.query.categoryId;
  EntityT.retrieveDescTByRestaurant(node, (err, menu) => {
    // console.log(err);
    // console.log(res);
    if (err) return res.status(404).send(err);
    // console.log(rest).
    return res.json(menu);
  });
});

router.get("/category", (req, res) => {
  console.log("in MenuT Get");

  // var node = req.query;
  var node = req.query;
  // var categoryId = req.query.categoryId;

  // var categoryId = req.query.categoryId;
  EntityT.retrieveCategoryTByRestaurant(node, (err, menu) => {
    // console.log(err);
    // console.log(res);
    if (err) return res.status(404).send(err);;
    // console.log(rest).
    return res.json(menu);
  });
});

router.get("/topping", (req, res) => {
  console.log("in MenuT Get topping");

  // var node = req.query;
  var node = req.query;
  // var categoryId = req.query.categoryId;

  // var categoryId = req.query.categoryId;
  EntityT.retrieveToppingTByRestaurant(node, (err, menu) => {
    // console.log(err);
    // console.log(res);
    if (err) return res.status(404).send(err);
    // console.log(rest).
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
  // console.log("in Menu Post" + req.body);
  var node = req.body;
  EntityT.insert(node, (err, result) => {
    if (err) res.status(404).send(err);
    return res.json(result);
  });
});

router.put("/", (req, res) => {
  const data = req.body;
  EntityT.put(data, (err, result) => {
    if (err)
      return res.status(404).send(err);
    else
      return res.json(result);
  });
});

router.delete("/", (req, res) => {
  const id = req.query.id;
  EntityT.delete(id, (err, menu) => {
    if (err) return res.status(404).send(err);
    return res.json(menu);
  });
});

module.exports = router;
