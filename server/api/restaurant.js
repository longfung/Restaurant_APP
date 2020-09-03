var express = require("express");
var Restaurant = require("../models/restaurant");

var router = express.Router();

router.get("/", (req, res) => {
  console.log("in Get");

  Restaurant.retrieveAll((err, rest) => {
    // console.log(err);
    // console.log(res);
    if (!err) return res.json(err);
    // console.log(rest);
    return res.json(rest);
  });
});

router.get("/:ownerId", (req, res) => {
  const query = req.query;
  Restaurant.retrieveRestaurantByOwnerId(query, (err, rest) => {
    // console.log(err);
    // console.log(res);
    if (err) return res.status(404).send(err);
    // console.log(rest);
    if (rest && rest.length == 0) {
      return res.status(404).json({ error: "restaurant not found!!" });
    }
    return res.json(rest[0]);
  });
});

router.post("/", (req, res) => {
  // var name = req.body.name;
  // console.log("in Post");
  var node = req.body;
  Restaurant.insert(node, (err, result) => {
    if (err) {
      // console.log("error in API Post restaurant " + err.message)
      // res.writeHead(401);
      // res.write(err.message);
      // res.end();
      // res.addHeader("Access-Control-Allow-Origin", "*");
      // res.addHeader("Access-Control-Allow-Headers", "*");
      // res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      // res.header('content-type', 'application/x-www-form-urlencoded');
      return res.status(404).send(err);
      // res.status(412).send('Not Acceptable');
      // res.setStatus(412);
      // res.setContentType("application/json");
      // res.setCharacterEncoding("UTF-8");
      // res.getWriter().write(err);
    } else
      return res.json(result);
  });
});

router.put("/", (req, res) => {
  // var name = req.body.name;
  // console.log("in Restaurant Put");
  var node = req.body;
  Restaurant.put(node, (err, result) => {
    if (err) return res.status(404).send(err);
    return res.json(result);
  });
});

module.exports = router;
